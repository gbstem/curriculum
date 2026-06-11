'use client';

import { navigateTo } from '@/lib/navigation';
import { useSession } from '@/lib/useSession';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { CurriculumItem, deleteCurriculum } from '../services/curriculumService';
import CodeBlockModal from './CodeBlockModal';
import { RenderContent } from './renderContent';

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
    if (curriculumData) {
      setTitle(curriculumData.title || '');
      setContent(curriculumData.content || '');
      setCourse(curriculumData.course || '');
      setLessonNumber(curriculumData.lessonNumber?.toString() || '');
    }
  }, [curriculumData]);

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
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement | null;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + codeBlock + content.substring(end);
      setContent(newContent);

      // Set cursor position after the inserted code block
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + codeBlock.length, start + codeBlock.length);
      }, 0);
    }
  };

  const insertMarkdown = (markdown: string) => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement | null;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      const newText = markdown.replace('{text}', selectedText);
      const newContent = content.substring(0, start) + newText + content.substring(end);
      setContent(newContent);
      // Set cursor position after the inserted markdown
      setTimeout(() => {
        textarea.focus();
        // If no text is selected, move cursor back inside the formatting
        if (start === end) {
          if (markdown === '**{text}**') {
            textarea.setSelectionRange(start + 2, start + 2);
          } else if (markdown === '*{text}*') {
            textarea.setSelectionRange(start + 1, start + 1);
          } else {
            textarea.setSelectionRange(start + newText.length, start + newText.length);
          }
        } else {
          textarea.setSelectionRange(start + newText.length, start + newText.length);
        }
      }, 0);
    }
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
      <Modal show={show} onHide={onHide} size="xl" centered>
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

          <Form>
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

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <div className="d-flex flex-column flex-md-row w-full gap-3">
                {/* Editor Side */}
                <div className="editor-col w-full md:w-1/2">
                  <div className="d-flex mb-2 gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center btn-primary gap-1 text-white shadow-sm"
                      onClick={() => insertMarkdown('**{text}**')}
                      title="Bold"
                    >
                      <i className="fas fa-bold"></i>
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center btn-primary gap-1 text-white shadow-sm"
                      onClick={() => insertMarkdown('*{text}*')}
                      title="Italic"
                    >
                      <i className="fas fa-italic"></i>
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center btn-primary gap-1 text-white shadow-sm"
                      onClick={() => insertMarkdown('- {text}')}
                      title="Bullet List"
                    >
                      <i className="fas fa-list-ul"></i>
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center btn-primary gap-1 text-white shadow-sm"
                      onClick={() => insertMarkdown('1. {text}')}
                      title="Numbered List"
                    >
                      <i className="fas fa-list-ol"></i>
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center btn-primary gap-1 text-white shadow-sm"
                      onClick={() => setShowCodeBlockModal(true)}
                      title="Insert Code Block"
                    >
                      <i className="fas fa-code"></i>
                    </Button>
                  </div>
                  {/* Keep this as h[25rem] despite IDE suggestCanonicalClasses to avoid it stretching to the content size */}
                  <Form.Control
                    id="content-textarea"
                    as="textarea"
                    rows={15}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter lesson content in Markdown format..."
                    className="font-monospace h-[25rem] w-full resize-y wrap-break-word whitespace-pre-wrap"
                  />
                </div>
                {/* Preview Side */}
                <div className="w-full md:w-1/2">
                  <Form.Label className="mb-2 font-medium">Preview</Form.Label>
                  {/* Keep this as h[25rem] despite IDE suggestCanonicalClasses to avoid it stretching to the content size */}
                  <div className="h-[25rem] overflow-y-auto">
                    <div className="preview-col d-flex flex-column min-w-0">
                      <div className="curriculum-content card grow border border-[#e0e0e0] bg-[#f8f9fa]! p-6 shadow-sm">
                        <RenderContent content={content} />
                      </div>
                    </div>
                  </div>
                </div>
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
