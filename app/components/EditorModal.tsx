'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { verifyEditorPassword } from '../actions';
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
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = await verifyEditorPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err: any) {
      setError('An error occurred during verification.');
      console.error(err);
    }
  };

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
      // Reload the page to reflect changes
      window.location.reload();
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

  if (!isAuthenticated) {
    return (
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
        <Modal.Header className="bg-primary text-white" closeButton>
          <Modal.Title>
            <i className="fas fa-lock me-2"></i>
            Curriculum Editor Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4 text-center">
            <h4>Password Required</h4>
            <p className="text-muted">Please enter the password to access the curriculum editor.</p>
          </div>

          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
              />
              {error && (
                <Alert variant="danger" className="mt-2">
                  {error}
                </Alert>
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={onHide} className="flex-fill">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-fill">
                <i className="fas fa-sign-in-alt me-2"></i>
                Access Editor
              </Button>
            </div>
          </Form>
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
            <Row className="mb-3">
              <Col md={4}>
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
              <Col md={2}>
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
              <Col md={6}>
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
              <div className="d-flex flex-column flex-md-row gap-3" style={{ width: '100%' }}>
                {/* Editor Side */}
                <div className="editor-col" style={{ width: '50%', minWidth: 0 }}>
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
                  <Form.Control
                    id="content-textarea"
                    as="textarea"
                    rows={15}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter lesson content in Markdown format..."
                    style={{
                      fontFamily: 'monospace',
                      height: '25rem',
                      width: '100%',
                      resize: 'vertical',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  />
                </div>
                {/* Preview Side */}
                <div style={{ width: '50%' }}>
                  <Form.Label className="mb-2" style={{ fontWeight: 500 }}>
                    Preview
                  </Form.Label>
                  <div style={{ height: '25rem', overflowY: 'auto' }}>
                    <div className="preview-col d-flex flex-column" style={{ minWidth: 0 }}>
                      <div
                        className="curriculum-content card grow shadow-sm"
                        style={{
                          background: '#f8f9fa',
                          border: '1px solid #e0e0e0',
                          padding: '1.5rem',
                        }}
                      >
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
