import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlockModal = ({ show, onHide, onInsert }) => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');

  const handleInsert = () => {
    if (code.trim()) {
      onInsert(language, code.trim());
      setCode('');
      onHide();
    }
  };

  const getLanguageDisplayName = (lang) => {
    const languageMap = {
      'python': 'Python',
      'javascript': 'JavaScript',
      'html': 'HTML',
      'css': 'CSS',
      'java': 'Java',
      'cpp': 'C++',
      'csharp': 'C#',
      'php': 'PHP',
      'ruby': 'Ruby',
      'go': 'Go',
      'rust': 'Rust',
      'swift': 'Swift',
      'kotlin': 'Kotlin',
      'typescript': 'TypeScript',
      'sql': 'SQL',
      'bash': 'Bash',
      'powershell': 'PowerShell',
      'json': 'JSON',
      'yaml': 'YAML',
      'scratchblocks': 'Scratch Blocks'
    };
    return languageMap[lang] || lang;
  };

  const supportedLanguages = [
    'python', 'javascript', 'html', 'css', 'java', 'cpp', 'csharp',
    'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript',
    'sql', 'bash', 'powershell', 'json', 'yaml', 'scratchblocks'
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-code me-2"></i>
          Insert Code Block
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
              >
                {supportedLanguages.map(lang => (
                  <option key={lang} value={lang}>
                    {getLanguageDisplayName(lang)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Enter your ${getLanguageDisplayName(language)} code here...`}
            style={{ fontFamily: 'monospace' }}
          />
        </Form.Group>

        {code && (
          <Form.Group className="mb-3">
            <Form.Label>Preview</Form.Label>
            <div className="border rounded">
              <SyntaxHighlighter
                language={language === 'scratchblocks' ? 'text' : language}
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem'
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleInsert}
          disabled={!code.trim()}
        >
          <i className="fas fa-plus me-2"></i>
          Insert Code Block
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CodeBlockModal; 
