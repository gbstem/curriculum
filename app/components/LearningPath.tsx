import React from 'react';
import { LearningPathStep } from '../data/tracks';

interface LearningPathProps {
  steps: LearningPathStep[];
}

export default function LearningPath({ steps }: LearningPathProps) {
  return (
    <div className="bg-light learning-path py-5">
      <div className="container">
        <div className="row mb-5 text-center">
          <div className="col-12">
            <h2 className="fw-bold">Recommended Learning Path</h2>
            <p className="lead text-muted">
              Follow this progression to build your programming skills
            </p>
          </div>
        </div>
        <div className="row align-items-center justify-content-center g-4 text-center">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={step.stepNumber}>
                <div className="col-md-2 learning-path-step">
                  <div
                    className="rounded-circle d-inline-block mb-3 p-4"
                    style={{
                      backgroundColor: step.bgOpacity,
                      color: step.color,
                      width: '90px',
                      height: '90px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className={`${step.icon} fa-2x`}></i>
                  </div>
                  <h5 className="fw-bold">{step.title}</h5>
                  {step.subtitles.map((sub, sIdx) => (
                    <p key={sIdx} className={`text-muted small ${sIdx === 0 ? 'mb-1' : 'mb-0'}`}>
                      {sub}
                    </p>
                  ))}
                </div>
                {!isLast && (
                  <div className="col-md-1 d-none d-md-block">
                    <i className="fas fa-arrow-right fa-2x text-muted"></i>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
