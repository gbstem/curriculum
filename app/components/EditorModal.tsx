'use client';

import { navigateTo } from '@/lib/navigation';
import { useSession } from '@/lib/useSession';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { CurriculumItem, deleteCurriculum } from '../services/curriculumService';
import Alert from './Alert';
import CodeBlockModal from './CodeBlockModal';
import Modal, { ModalBody, ModalFooter, ModalHeader } from './Modal';
import Spinner from './Spinner';
import { LESSON_TEXT, RenderContent } from './renderContent';

// The form, its content field and the editor box each pass the dialog's leftover height down to
// the markdown editor on desktop. On phones the dialog grows with its content instead.
const EDITOR_FILL = 'flex min-h-0 flex-auto flex-col narrow:flex-none';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface EditorModalProps {
  show: boolean;
  onHide: () => void;
  curriculumData: Partial<CurriculumItem> | null;
  onSave: (curriculumData: CurriculumItem) => Promise<void>;
  isLoading?: boolean;
}

const EditorModal: React.FC<EditorModalProps> = ({
  show,
  onHide,
  curriculumData,
  onSave,
  isLoading = false,
}) => {
  const { session } = useSession();
  const [error, setError] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [lessonNumber, setLessonNumber] = useState<string>('');
  const [showCodeBlockModal, setShowCodeBlockModal] = useState<boolean>(false);

  useEffect(() => {
    if (show && curriculumData) {
      setTitle(curriculumData.title || '');
      setContent(curriculumData.content || '');
      setCourse(curriculumData.course || '');
      setLessonNumber(curriculumData.lessonNumber?.toString() || '');
      setError('');
    }
  }, [show, curriculumData]);

  // Inject interactive draggable divider between editor and preview columns
  useEffect(() => {
    if (!show) return;

    const setupDivider = () => {
      const editorContent = document.querySelector('.w-md-editor-content');
      if (!editorContent) return false;

      const area = editorContent.querySelector('.w-md-editor-area');
      const preview = editorContent.querySelector('.w-md-editor-preview');

      if (area && preview && !editorContent.querySelector('.w-md-editor-drag-divider')) {
        const divider = document.createElement('div');
        divider.className = 'w-md-editor-drag-divider';
        divider.title = 'Drag horizontally to resize editor / preview columns';
        divider.innerHTML = '<span>⋮</span>';

        // At 768px and below (matching the stacked mobile layout in globals.css) the
        // divider resizes editor vs. preview height instead of width.
        const isStackedLayout = () => window.matchMedia('(max-width: 768px)').matches;

        const startResize = () => {
          const vertical = isStackedLayout();
          document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
          document.body.style.userSelect = 'none';

          const applyPosition = (clientX: number, clientY: number) => {
            const rect = editorContent.getBoundingClientRect();
            if (vertical) {
              const offsetY = clientY - rect.top;
              const newPercent = Math.max(15, Math.min(85, (offsetY / rect.height) * 100));
              (editorContent as HTMLElement).style.setProperty(
                '--split-percent-y',
                `${newPercent}%`
              );
            } else {
              const offsetX = clientX - rect.left;
              const newPercent = Math.max(15, Math.min(85, (offsetX / rect.width) * 100));
              (editorContent as HTMLElement).style.setProperty('--split-percent', `${newPercent}%`);
            }
          };

          const handleMouseMove = (moveEvent: MouseEvent) => {
            applyPosition(moveEvent.clientX, moveEvent.clientY);
          };

          const handleTouchMove = (touchEvent: TouchEvent) => {
            const touch = touchEvent.touches[0];
            if (!touch) return;
            touchEvent.preventDefault();
            applyPosition(touch.clientX, touch.clientY);
          };

          const stopResize = () => {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopResize);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', stopResize);
          };

          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', stopResize);
          window.addEventListener('touchmove', handleTouchMove, { passive: false });
          window.addEventListener('touchend', stopResize);
        };

        divider.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault();
          startResize();
        });

        divider.addEventListener('touchstart', () => {
          startResize();
        });

        area.after(divider);
        return true;
      }
      return false;
    };

    if (setupDivider()) return;

    const interval = setInterval(() => {
      if (setupDivider()) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [show]);

  const handleSave = async () => {
    try {
      const curriculumToSave: CurriculumItem = {
        ...curriculumData,
        title,
        content,
        course,
        lessonNumber: parseInt(lessonNumber, 10),
      } as CurriculumItem;

      await onSave(curriculumToSave);
      onHide();
    } catch (err: any) {
      setError('Error saving curriculum: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!curriculumData || !curriculumData.id) return;
    if (!window.confirm('Are you sure you want to delete this lesson? This cannot be undone.'))
      return;
    try {
      await deleteCurriculum(curriculumData.id);
      onHide();
      // Determine the redirect URL (remove /lesson and everything after it)
      let redirectUrl = '/';
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const lessonIndex = pathname.indexOf('/lesson');
        if (lessonIndex !== -1) {
          redirectUrl = pathname.substring(0, lessonIndex);
        } else {
          redirectUrl = pathname;
        }
      }
      navigateTo(redirectUrl);
    } catch (err: any) {
      setError('Error deleting curriculum: ' + err.message);
    }
  };

  const insertCodeBlock = (language: string, code: string) => {
    const codeBlock = `\`\`\`${language}\n${code}\n\`\`\``;
    setContent((prev) => (prev ? `${prev}\n\n${codeBlock}` : codeBlock));
  };

  const codeBlockCommand = {
    name: 'gbstemCodeBlock',
    keyCommand: 'gbstemCodeBlock',
    buttonProps: { 'aria-label': 'Insert code block', title: 'Insert Code Block' },
    icon: <i className="fas fa-code" />,
    execute: () => setShowCodeBlockModal(true),
  };

  const isEditor = session.role === 'editor';

  if (!isEditor) {
    return (
      <Modal show={show} onHide={onHide} staticBackdrop centered testId="editor-access-modal">
        <ModalHeader className="bg-primary text-white" onClose={onHide}>
          <i className="fas fa-lock me-2"></i>
          Curriculum Editor Access
        </ModalHeader>
        <ModalBody>
          <Alert className="mb-0 py-6 text-center">
            <i className="fas fa-exclamation-triangle fa-2x mb-4 text-danger"></i>
            <h4>Access Denied</h4>
            <p className="mb-0">You need to login as an editor to make edits.</p>
          </Alert>
          <div className="mt-4 flex justify-end">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="fullscreen"
        testId="editor-modal"
        className="lesson-editor h-[96vh] narrow:h-auto narrow:min-h-dvh narrow:rounded-none"
      >
        <ModalHeader className="bg-primary text-white" onClose={onHide}>
          <i className="fas fa-edit me-2"></i>
          Curriculum Editor
        </ModalHeader>
        {/* On phones the whole dialog scrolls as one, instead of this body scrolling inside it:
            a scroller nested in another can stop at its own end and strand the footer below. */}
        <ModalBody className="flex flex-col overflow-hidden overscroll-contain p-5 narrow:overflow-visible">
          {error && <Alert onClose={() => setError('')}>{error}</Alert>}

          <form className={EDITOR_FILL}>
            <div className="-mx-3 mb-4 flex flex-wrap md:items-end">
              <div className="mb-4 w-full shrink-0 px-3 md:mb-0 md:w-1/3">
                <div>
                  <label htmlFor="course-select" className="mb-2">
                    Course
                  </label>
                  <select
                    id="course-select"
                    className="select"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    <option value="python1A">Python 1A</option>
                    <option value="python1B">Python 1B</option>
                    <option value="python2A">Python 2A</option>
                    <option value="python2B">Python 2B</option>
                    <option value="python3A">Python 3A</option>
                    <option value="python3B">Python 3B</option>
                    <option value="scratch1A">Scratch 1A</option>
                    <option value="scratch1B">Scratch 1B</option>
                    <option value="scratch2A">Scratch 2A</option>
                    <option value="scratch2B">Scratch 2B</option>
                    <option value="scratch3A">Scratch 3A</option>
                    <option value="scratch3B">Scratch 3B</option>
                    <option value="webdevA">Web Development A</option>
                    <option value="webdevB">Web Development B</option>
                    <option value="math1A">Math 1A</option>
                    <option value="math1B">Math 1B</option>
                    <option value="math2A">Math 2A</option>
                    <option value="math2B">Math 2B</option>
                    <option value="math3A">Math 3A</option>
                    <option value="math3B">Math 3B</option>
                    <option value="math4A">Math 4A</option>
                    <option value="math4B">Math 4B</option>
                    <option value="math5A">Math 5A</option>
                    <option value="math5B">Math 5B</option>
                    <option value="engineering1A">Engineering 1A</option>
                    <option value="engineering1B">Engineering 1B</option>
                    <option value="engineering2A">Engineering 2A</option>
                    <option value="engineering2B">Engineering 2B</option>
                    <option value="engineering3A">Engineering 3A</option>
                    <option value="engineering3B">Engineering 3B</option>
                    <option value="environmentalA">Environmental Science A</option>
                    <option value="environmentalB">Environmental Science B</option>
                    <option value="physicsA">Physics A</option>
                    <option value="physicsB">Physics B</option>
                  </select>
                </div>
              </div>
              <div className="mb-4 w-full shrink-0 px-3 md:mb-0 md:w-1/6">
                <div>
                  <label htmlFor="lesson-number-input" className="mb-2">
                    Lesson Number
                  </label>
                  <input
                    id="lesson-number-input"
                    className="input"
                    type="number"
                    value={lessonNumber}
                    onChange={(e) => setLessonNumber(e.target.value)}
                    placeholder="Lesson number"
                  />
                </div>
              </div>
              <div className="mb-4 w-full shrink-0 px-3 md:mb-0 md:w-1/2">
                <div>
                  <label htmlFor="title-input" className="mb-2">
                    Title
                  </label>
                  <input
                    id="title-input"
                    className="input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Lesson title"
                  />
                </div>
              </div>
            </div>

            <div className={EDITOR_FILL}>
              <label htmlFor="content-textarea" className="mb-2">
                Content
              </label>
              <div className={EDITOR_FILL} data-color-mode="light" data-testid="editor-column">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  height="100%"
                  preview="live"
                  extraCommands={[codeBlockCommand]}
                  textareaProps={{
                    id: 'content-textarea',
                    placeholder: 'Enter lesson content in Markdown format...',
                  }}
                  components={{
                    preview: (source) => (
                      <div className={`min-w-0 p-6 ${LESSON_TEXT}`} data-testid="editor-preview">
                        <RenderContent content={typeof source === 'string' ? source : ''} />
                      </div>
                    ),
                  }}
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter testId="editor-modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Cancel
          </button>
          {curriculumData && curriculumData.id && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              <i className="fas fa-trash me-2"></i>
              Delete
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isLoading || !title || !content || !course || !lessonNumber}
          >
            {isLoading ? (
              <>
                <Spinner small className="me-2" />
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Save
              </>
            )}
          </button>
        </ModalFooter>
      </Modal>

      <CodeBlockModal
        show={showCodeBlockModal}
        onHide={() => setShowCodeBlockModal(false)}
        onInsert={insertCodeBlock}
      />
    </>
  );
};

export default EditorModal;
