import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Badge, Alert, Form } from 'react-bootstrap';
import { getVersionHistory, restoreVersion } from '../services/curriculumService';
import DiffModal from './DiffModal';

const VersionHistoryModal = ({ show, onHide, course, lessonNumber, curriculumId, currentContent }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [restoring, setRestoring] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pendingRestoreVersionId, setPendingRestoreVersionId] = useState(null);
  const [showDiffModal, setShowDiffModal] = useState(false);
  const [diffVersion, setDiffVersion] = useState(null);

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
    setPendingRestoreVersionId(versionId);
    setShowPasswordModal(true);
  };

  const handleShowDiff = (version) => {
    setDiffVersion(version);
    setShowDiffModal(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'snow') {
      setPasswordError('');
      setShowPasswordModal(false);
      setPassword('');
      performRestore(pendingRestoreVersionId);
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const performRestore = async (versionId) => {
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
      setPendingRestoreVersionId(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <>
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
                <th>Diff</th>
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
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleShowDiff(version)}
                      >
                        <i className="fas fa-columns me-1"></i>
                        Diff
                      </Button>
                    )}
                  </td>
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

    {/* Diff Modal */}
    <DiffModal
      show={showDiffModal}
      onHide={() => setShowDiffModal(false)}
      currentContent={currentContent}
      version={diffVersion}
    />

    {/* Password Modal */}
    <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} backdrop="static" keyboard={false} centered>
      <Modal.Header className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-lock me-2"></i>
          Version Restore Access
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <h4>Password Required</h4>
          <p className="text-muted">Please enter the password to restore this version.</p>
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
            {passwordError && <Alert variant="danger" className="mt-2">{passwordError}</Alert>}
          </Form.Group>
          
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={() => setShowPasswordModal(false)} className="flex-fill">
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-fill">
              <i className="fas fa-sign-in-alt me-2"></i>
              Restore Version
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default VersionHistoryModal; 
