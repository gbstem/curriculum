import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import CodeBlockModal from './CodeBlockModal';
import { renderContent } from './renderContent';
import { deleteCurriculum } from '../services/curriculumService';

const EditorModal = ({ 
  show, 
  onHide, 
  curriculumData, 
  onSave, 
  isLoading = false 
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [lessonNumber, setLessonNumber] = useState('');
  const [showCodeBlockModal, setShowCodeBlockModal] = useState(false);

  useEffect(() => {
    if (curriculumData) {
      setTitle(curriculumData.title || '');
      setContent(curriculumData.content || '');
      setCourse(curriculumData.course || '');
      setLessonNumber(curriculumData.lessonNumber || '');
    }
  }, [curriculumData]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'snow') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      const curriculumToSave = {
        ...curriculumData,
        title,
        content,
        course,
        lessonNumber: parseInt(lessonNumber),
        lastModified: new Date()
      };
      
      await onSave(curriculumToSave);
      onHide();
    } catch (error) {
      setError('Error saving curriculum: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (!curriculumData.id) return;
    if (!window.confirm('Are you sure you want to delete this lesson? This cannot be undone.')) return;
    try {
      await deleteCurriculum(curriculumData.id);
      onHide();
      // Optionally, reload the page or refresh the curriculum list
      window.location.reload();
    } catch (error) {
      setError('Error deleting curriculum: ' + error.message);
    }
  };

  const insertCodeBlock = (language, code) => {
    const codeBlock = `\`\`\`${language}\n${code}\n\`\`\``;
    const textarea = document.getElementById('content-textarea');
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

  const insertMarkdown = (markdown) => {
    const textarea = document.getElementById('content-textarea');
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
        <Modal.Header className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-lock me-2"></i>
            Curriculum Editor Access
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
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
              {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
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
        <Modal.Header className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            Curriculum Editor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
          
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Select 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    <option value="python1A">Python 1A</option>
                    <option value="python1B">Python 1B</option>
                    <option value="python2A">Python 2A</option>
                    <option value="python2B">Python 2B</option>
                    <option value="python1">Python I</option>
                    <option value="python2">Python II</option>
                    <option value="scratch">Scratch</option>
                    <option value="scratch1A">Scratch 1A</option>
                    <option value="scratch1B">Scratch 1B</option>
                    <option value="scratch2A">Scratch 2A</option>
                    <option value="scratch2B">Scratch 2B</option>
                    <option value="webdev">Web Development</option>
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
                    <option value="engineering1">Engineering 1A</option>
                    <option value="engineering1B">Engineering 1B</option>
                    <option value="engineering2A">Engineering 2A</option>
                    <option value="engineering2B">Engineering 2B</option>
                    <option value="engineering3A">Engineering 3A</option>
                    <option value="engineering3B">Engineering 3B</option>
                    <option value="environmental">Environmental Science</option>
                    <option value="physics">Physics</option>
                    <option value="math1">Math I</option>
                    <option value="math2">Math II</option>
                    <option value="math3">Math III</option>
                    <option value="math4">Math IV</option>
                    <option value="math5">Math V</option>
                    <option value="engineering1">Engineering I</option>
                    <option value="engineering2">Engineering II</option>
                    <option value="engineering3">Engineering III</option>
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
                  <div className="mb-2 d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="shadow-sm d-flex align-items-center gap-1 text-white btn-primary"
                      onClick={() => insertMarkdown('**{text}**')}
                      title="Bold"
                    >
                      <i className="fas fa-bold"></i>
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="shadow-sm d-flex align-items-center gap-1 text-white btn-primary"
                      onClick={() => insertMarkdown('*{text}*')}
                      title="Italic"
                    >
                      <i className="fas fa-italic"></i>
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="shadow-sm d-flex align-items-center gap-1 text-white btn-primary"
                      onClick={() => insertMarkdown('- {text}')}
                      title="Bullet List"
                    >
                      <i className="fas fa-list-ul"></i>
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="shadow-sm d-flex align-items-center gap-1 text-white btn-primary"
                      onClick={() => insertMarkdown('1. {text}')}
                      title="Numbered List"
                    >
                      <i className="fas fa-list-ol"></i>
                    </Button>
                  </div>
                  <Form.Control
                    id="content-textarea"
                    as="textarea"
                    rows={15}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter lesson content in Markdown format..."
                    style={{ fontFamily: 'monospace', height: '25rem', width: '100%', resize: 'vertical', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  />
                </div>
                {/* Preview Side */}
                <div style={{ width: '50%' }}>
                <Form.Label className="mb-2" style={{ fontWeight: 500 }}>Preview</Form.Label>
                <div style={{ height: '25rem', overflowY: 'auto' }}>
                <div className="preview-col d-flex flex-column" style={{minWidth: 0, overflowY: 'auto' }}>
                  <div
                    className="curriculum-content card shadow-sm flex-grow-1"
                    style={{
                      background: '#f8f9fa',
                      border: '1px solid #e0e0e0',
                      padding: '1.5rem'
                    }}
                  >
                    {renderContent(content)}
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
          {curriculumData.id && (
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
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
