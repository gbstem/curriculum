import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { marked } from 'marked';
import CodeBlockModal from './CodeBlockModal';

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
        textarea.setSelectionRange(start + newText.length, start + newText.length);
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
            
            <div className="d-grid">
              <Button type="submit" variant="primary" size="lg">
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
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Select 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">Select Course</option>
                    <option value="python1">Python 1</option>
                    <option value="python2">Python 2</option>
                    <option value="scratch">Scratch</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Lesson Number</Form.Label>
                  <Form.Control
                    type="number"
                    value={lessonNumber}
                    onChange={(e) => setLessonNumber(e.target.value)}
                    placeholder="Lesson number"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lesson title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <div className="mb-2">
                <div className="btn-group me-2" role="group">
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => insertMarkdown('**{text}**')}
                    title="Bold"
                  >
                    <i className="fas fa-bold"></i>
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => insertMarkdown('*{text}*')}
                    title="Italic"
                  >
                    <i className="fas fa-italic"></i>
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => insertMarkdown('- {text}')}
                    title="Bullet List"
                  >
                    <i className="fas fa-list-ul"></i>
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => insertMarkdown('1. {text}')}
                    title="Numbered List"
                  >
                    <i className="fas fa-list-ol"></i>
                  </Button>
                </div>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setShowCodeBlockModal(true)}
                >
                  <i className="fas fa-code me-1"></i>
                  Insert Code Block
                </Button>
              </div>
              <Form.Control
                id="content-textarea"
                as="textarea"
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter lesson content in Markdown format..."
                style={{ fontFamily: 'monospace' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preview</Form.Label>
              <div 
                className="border p-3 rounded"
                style={{ 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  backgroundColor: '#f8f9fa'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: marked(content || '') 
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
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
