'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Table, Badge, Alert } from 'react-bootstrap';
import {
  getVersionHistory,
  restoreVersion,
  CurriculumVersion,
} from '../services/curriculumService';
import DiffModal from './DiffModal';
import { useSession } from '@/lib/useSession';

interface VersionHistoryModalProps {
  show: boolean;
  onHide: () => void;
  course: string;
  lessonNumber: number;
  curriculumId?: string;
  currentContent?: string;
}

const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  show,
  onHide,
  course,
  lessonNumber,
  curriculumId,
  currentContent = '',
}) => {
  const { session } = useSession();
  const isEditor = session.role === 'editor';
  const [versions, setVersions] = useState<CurriculumVersion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [restoring, setRestoring] = useState<string | null>(null);
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState<boolean>(false);
  const [showDiffModal, setShowDiffModal] = useState<boolean>(false);
  const [diffVersion, setDiffVersion] = useState<CurriculumVersion | null>(null);

  const loadVersionHistory = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const history = await getVersionHistory(course, lessonNumber);
      setVersions(history);
    } catch (err: any) {
      setError('Error loading version history: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [course, lessonNumber]);

  useEffect(() => {
    if (show && course && lessonNumber !== undefined && lessonNumber !== null) {
      loadVersionHistory();
    }
  }, [show, course, lessonNumber, loadVersionHistory]);

  const handleRestore = async (versionId: string) => {
    if (!isEditor) {
      setShowAccessDeniedModal(true);
      return;
    }
    const isConfirmed = window.confirm(
      'Are you sure you want to revert to an older version? This will overwrite the current content.'
    );
    if (isConfirmed) {
      performRestore(versionId);
    }
  };

  const handleShowDiff = (version: CurriculumVersion) => {
    setDiffVersion(version);
    setShowDiffModal(true);
  };

  const performRestore = async (versionId: string) => {
    if (!curriculumId) return;
    setRestoring(versionId);
    try {
      await restoreVersion(versionId, curriculumId);
      onHide();
      // Refresh the current page to reload the data
      window.location.reload();
    } catch (err: any) {
      setError('Error restoring version: ' + err.message);
    } finally {
      setRestoring(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header className="bg-info text-white" closeButton>
          <Modal.Title>
            <i className="fas fa-history me-2"></i>
            Version History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <div className="mb-3">
            <h6>Course: {course}</h6>
            <h6>Lesson: {lessonNumber}</h6>
          </div>

          {loading ? (
            <div className="py-4 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading version history...</p>
            </div>
          ) : versions.length === 0 ? (
            <div className="py-4 text-center">
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
                          onClick={() => handleRestore(version.id!)}
                          disabled={restoring === version.id}
                        >
                          {restoring === version.id ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-1"
                                role="status"
                                aria-hidden="true"
                              ></span>
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

      {/* Access Denied Modal */}
      <Modal
        show={showAccessDeniedModal}
        onHide={() => setShowAccessDeniedModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="bg-danger text-white" closeButton>
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Restore Blocked
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-3 text-center">
            <h4 className="text-danger">Access Denied</h4>
            <p className="text-muted mt-2">You need to login as an editor to make edits.</p>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={() => setShowAccessDeniedModal(false)}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VersionHistoryModal;
