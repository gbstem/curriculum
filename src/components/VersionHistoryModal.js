import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Badge, Alert } from 'react-bootstrap';
import { getVersionHistory, restoreVersion } from '../services/curriculumService';

const VersionHistoryModal = ({ show, onHide, course, lessonNumber, curriculumId }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restoring, setRestoring] = useState(null);

  useEffect(() => {
    if (show && course && lessonNumber) {
      loadVersionHistory();
    }
  }, [show, course, lessonNumber]);

  const loadVersionHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const history = await getVersionHistory(course, lessonNumber);
      setVersions(history);
    } catch (err) {
      setError('Error loading version history: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (versionId) => {
    console.log('Restoring version:', versionId);
    setRestoring(versionId);
    try {
      await restoreVersion(versionId, curriculumId);
      onHide();
      // You might want to refresh the current lesson data here
      window.location.reload();
    } catch (err) {
      setError('Error restoring version: ' + err.message);
    } finally {
      setRestoring(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header className="bg-info text-white">
        <Modal.Title>
          <i className="fas fa-history me-2"></i>
          Version History
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        
        <div className="mb-3">
          <h6>Course: {course}</h6>
          <h6>Lesson: {lessonNumber}</h6>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading version history...</p>
          </div>
        ) : versions.length === 0 ? (
          <div className="text-center py-4">
            <i className="fas fa-history fa-3x text-muted mb-3"></i>
            <p>No version history found for this lesson.</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Version</th>
                <th>Date</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((version, index) => (
                <tr key={version.id}>
                  <td>
                    <Badge bg={index === 0 ? 'success' : 'secondary'}>
                      {index === 0 ? 'Current' : `v${versions.length - index}`}
                    </Badge>
                  </td>
                  <td>{formatDate(version.versionTimestamp)}</td>
                  <td>{version.title || 'Untitled'}</td>
                  <td>
                    {index > 0 && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleRestore(version.id)}
                        disabled={restoring === version.id}
                      >
                        {restoring === version.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Restoring...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-undo me-1"></i>
                            Restore
                          </>
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default VersionHistoryModal; 
