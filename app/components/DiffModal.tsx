'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactDiffViewer from 'react-diff-viewer';

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
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>
          <i className="fas fa-columns me-2"></i>
          Diff: Current vs. {version.title || 'Untitled'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="max-h-[70vh] overflow-y-auto">
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiffModal;
