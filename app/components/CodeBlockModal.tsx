'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Modal, { ModalBody, ModalFooter, ModalHeader } from './Modal';

interface CodeBlockModalProps {
  show: boolean;
  onHide: () => void;
  onInsert: (language: string, code: string) => void;
}

const CodeBlockModal: React.FC<CodeBlockModalProps> = ({ show, onHide, onInsert }) => {
  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>('');

  const handleInsert = () => {
    if (code.trim()) {
      onInsert(language, code.trim());
      setCode('');
      onHide();
    }
  };

  const getLanguageDisplayName = (lang: string): string => {
    const languageMap: Record<string, string> = {
      python: 'Python',
      javascript: 'JavaScript',
      html: 'HTML',
      css: 'CSS',
      java: 'Java',
      cpp: 'C++',
      csharp: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      go: 'Go',
      rust: 'Rust',
      swift: 'Swift',
      kotlin: 'Kotlin',
      typescript: 'TypeScript',
      sql: 'SQL',
      bash: 'Bash',
      powershell: 'PowerShell',
      json: 'JSON',
      yaml: 'YAML',
      scratchblocks: 'Scratch Blocks',
    };
    return languageMap[lang] || lang;
  };

  const supportedLanguages: string[] = [
    'python',
    'javascript',
    'html',
    'css',
    'java',
    'cpp',
    'csharp',
    'php',
    'ruby',
    'go',
    'rust',
    'swift',
    'kotlin',
    'typescript',
    'sql',
    'bash',
    'powershell',
    'json',
    'yaml',
    'scratchblocks',
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg" centered testId="code-block-modal">
      <ModalHeader className="bg-dark text-white" onClose={onHide}>
        <i className="fas fa-code me-2"></i>
        Insert Code Block
      </ModalHeader>
      <ModalBody>
        <div className="-mx-3 flex flex-wrap">
          <div className="mb-4 w-full shrink-0 px-3 md:w-1/2">
            <label htmlFor="code-block-language" className="mb-2">
              Language
            </label>
            <select
              id="code-block-language"
              className="select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {supportedLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {getLanguageDisplayName(lang)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="code-block-code" className="mb-2">
            Code
          </label>
          <textarea
            id="code-block-code"
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Enter your ${getLanguageDisplayName(language)} code here...`}
            className="input font-mono"
          />
        </div>

        {code && (
          <div className="mb-4">
            <label className="mb-2">Preview</label>
            <div className="rounded-md border border-divider">
              <SyntaxHighlighter
                language={language === 'scratchblocks' ? 'text' : language}
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleInsert}
          disabled={!code.trim()}
        >
          <i className="fas fa-plus me-2"></i>
          Insert Code Block
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default CodeBlockModal;
