import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactDiffViewer from 'react-diff-viewer';

const DiffModal = ({ show, onHide, currentContent, version }) => {
  if (!version) return null;
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton className="bg-info text-white">
        <Modal.Title>
          <i className="fas fa-columns me-2"></i>
          Diff: Current vs. {version.title || 'Untitled'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
              },
            },
          }}
        />
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
