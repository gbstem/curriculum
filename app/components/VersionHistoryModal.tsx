'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  getVersionHistory,
  restoreVersion,
  CurriculumVersion,
} from '../services/curriculumService';
import Alert from './Alert';
import DiffModal from './DiffModal';
import Modal, { ModalBody, ModalFooter, ModalHeader } from './Modal';
import Spinner from './Spinner';
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
      <Modal show={show} onHide={onHide} size="lg" centered testId="version-history-modal">
        <ModalHeader className="bg-info text-white" onClose={onHide}>
          <i className="fas fa-history me-2"></i>
          Version History
        </ModalHeader>
        <ModalBody>
          {error && <Alert onClose={() => setError('')}>{error}</Alert>}

          <div className="mb-4">
            <h6>Course: {course}</h6>
            <h6>Lesson: {lessonNumber}</h6>
          </div>

          {loading ? (
            <div className="py-6 text-center">
              <Spinner />
              <p className="mt-2">Loading version history...</p>
            </div>
          ) : versions.length === 0 ? (
            <div className="py-6 text-center">
              <i className="fas fa-history fa-3x mb-4 text-muted"></i>
              <p>No version history found for this lesson.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="mb-4 w-full border-divider align-top text-black">
                <thead className="align-bottom">
                  <tr className="border-y border-divider">
                    {['Version', 'Date', 'Title', 'Diff', 'Actions'].map((heading) => (
                      <th key={heading} className="border-x border-divider bg-white p-2">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="align-top">
                  {versions.map((version, index) => (
                    <tr key={version.id} className="group border-y border-divider">
                      <td className="border-x border-divider bg-white p-2 group-odd:bg-[#f2f2f2] group-hover:bg-[#ececec]">
                        <span
                          className={`inline-block rounded-md px-3 py-2 text-center text-xs leading-none font-bold whitespace-nowrap text-white ${index === 0 ? 'bg-success' : 'bg-secondary'}`}
                        >
                          {index === 0 ? 'Current' : `v${versions.length - index}`}
                        </span>
                      </td>
                      <td className="border-x border-divider bg-white p-2 group-odd:bg-[#f2f2f2] group-hover:bg-[#ececec]">
                        {formatDate(version.versionTimestamp)}
                      </td>
                      <td className="border-x border-divider bg-white p-2 group-odd:bg-[#f2f2f2] group-hover:bg-[#ececec]">
                        {version.title || 'Untitled'}
                      </td>
                      <td className="border-x border-divider bg-white p-2 group-odd:bg-[#f2f2f2] group-hover:bg-[#ececec]">
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-outline-info btn-sm"
                            onClick={() => handleShowDiff(version)}
                          >
                            <i className="fas fa-columns me-1"></i>
                            Diff
                          </button>
                        )}
                      </td>
                      <td className="border-x border-divider bg-white p-2 group-odd:bg-[#f2f2f2] group-hover:bg-[#ececec]">
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleRestore(version.id!)}
                            disabled={restoring === version.id}
                          >
                            {restoring === version.id ? (
                              <>
                                <Spinner small className="me-1" />
                                Restoring...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-undo me-1"></i>
                                Restore
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" onClick={onHide}>
            Close
          </button>
        </ModalFooter>
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
        staticBackdrop
        centered
        testId="restore-blocked-modal"
      >
        <ModalHeader
          className="bg-danger text-white"
          onClose={() => setShowAccessDeniedModal(false)}
        >
          <i className="fas fa-exclamation-triangle me-2"></i>
          Restore Blocked
        </ModalHeader>
        <ModalBody>
          <div className="py-4 text-center">
            <h4 className="text-danger">Access Denied</h4>
            <p className="mt-2 text-muted">You need to login as an editor to make edits.</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowAccessDeniedModal(false)}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default VersionHistoryModal;
