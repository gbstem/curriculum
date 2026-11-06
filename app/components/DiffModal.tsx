'use client';

import React, { useEffect, useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import Modal, { ModalBody, ModalFooter, ModalHeader } from './Modal';

interface DiffModalProps {
  show: boolean;
  onHide: () => void;
  currentContent: string;
  version: {
    title?: string;
    content?: string;
  } | null;
}

const DiffModal: React.FC<DiffModalProps> = ({ show, onHide, currentContent, version }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!version) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl" centered testId="diff-modal">
      <ModalHeader className="bg-info text-white" onClose={onHide}>
        <i className="fas fa-columns me-2"></i>
        Diff: Current vs. {version.title || 'Untitled'}
      </ModalHeader>
      <ModalBody className="max-h-[70vh] overflow-y-auto p-4">
        {mounted && (
          <ReactDiffViewer
            oldValue={version.content || ''}
            newValue={currentContent || ''}
            splitView={true}
            leftTitle="Selected Version"
            rightTitle="Current Version"
            showDiffOnly={false}
            styles={{
              variables: {
                light: {
                  diffViewerBackground: '#f8f9fa',
                  addedBackground: '#e6ffed',
                  removedBackground: '#ffeef0',
                  wordAddedBackground: '#acf2bd',
                  wordRemovedBackground: '#fdb8c0',
                  addedColor: '#24292e',
                  removedColor: '#24292e',
                  addedGutterBackground: '#cdffd8',
                  removedGutterBackground: '#ffdce0',
                  gutterBackground: '#f1f8ff',
                  gutterColor: '#c8c8c8',
                  emptyLineBackground: '#fafbfc',
                },
              },
            }}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <button type="button" className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DiffModal;
