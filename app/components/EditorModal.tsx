'use client';

import { navigateTo } from '@/lib/navigation';
import { useSession } from '@/lib/useSession';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { CurriculumItem, deleteCurriculum } from '../services/curriculumService';
import CodeBlockModal from './CodeBlockModal';
import { RenderContent } from './renderContent';

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

        divider.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault();
          document.body.style.cursor = 'col-resize';
          document.body.style.userSelect = 'none';

          const handleMouseMove = (moveEvent: MouseEvent) => {
            const rect = editorContent.getBoundingClientRect();
            const offsetX = moveEvent.clientX - rect.left;
            const newPercent = Math.max(15, Math.min(85, (offsetX / rect.width) * 100));
            (editorContent as HTMLElement).style.setProperty('--split-percent', `${newPercent}%`);
          };

          const handleMouseUp = () => {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };

          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
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
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
        <Modal.Header className="bg-primary text-white" closeButton>
          <Modal.Title>
            <i className="fas fa-lock me-2"></i>
            Curriculum Editor Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" className="mb-0 py-4 text-center">
            <i className="fas fa-exclamation-triangle fa-2x text-danger mb-3"></i>
            <h4>Access Denied</h4>
            <p className="mb-0">You need to login as an editor to make edits.</p>
          </Alert>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Modal show={show} onHide={onHide} dialogClassName="modal-almost-fullscreen">
        <Modal.Header className="bg-primary text-white" closeButton>
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            Curriculum Editor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <Form className="editor-form">
            <Row className="align-items-md-end mb-3">
              <Col md={4} className="mb-md-0 mb-3">
                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Select value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    <option value="python1A">Python 1A</option>
                    <option value="python1B">Python 1B</option>
                    <option value="python2A">Python 2A</option>
                    <option value="python2B">Python 2B</option>
                    <option value="scratch1A">Scratch 1A</option>
                    <option value="scratch1B">Scratch 1B</option>
                    <option value="scratch2A">Scratch 2A</option>
                    <option value="scratch2B">Scratch 2B</option>
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
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2} className="mb-md-0 mb-3">
                <Form.Group>
                  <Form.Label>Lesson Number</Form.Label>
                  <Form.Control
                    type="number"
                    value={lessonNumber}
                    onChange={(e) => setLessonNumber(e.target.value)}
                    placeholder="Lesson number"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-md-0 mb-3">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Lesson title"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="editor-content-group">
              <Form.Label>Content</Form.Label>
              <div className="editor-col" data-color-mode="light">
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
                      <div className="curriculum-content preview-col min-w-0 p-4">
                        <RenderContent content={typeof source === 'string' ? source : ''} />
                      </div>
                    ),
                  }}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          {curriculumData && curriculumData.id && (
            <Button variant="danger" onClick={handleDelete}>
              <i className="fas fa-trash me-2"></i>
              Delete
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isLoading || !title || !content || !course || !lessonNumber}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save me-2"></i>
                Save
              </>
            )}
          </Button>
        </Modal.Footer>
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
