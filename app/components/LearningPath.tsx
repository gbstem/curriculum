import React from 'react';
import { LearningPathStep } from '../data/tracks';

interface LearningPathProps {
  steps: LearningPathStep[];
}

export default function LearningPath({ steps }: LearningPathProps) {
  return (
    <div className="bg-light py-12" data-testid="learning-path">
      <div className="site-container">
        <div className="mb-12 flow-root text-center">
          <h2>Recommended Learning Path</h2>
          <p className="text-lead font-light text-muted narrow:text-[1.1rem]">
            Follow this progression to build your programming skills
          </p>
        </div>
        <div className="-mx-3 -mt-6 flex flex-wrap items-center justify-center text-center">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={step.stepNumber}>
                <div
                  className="mt-6 w-full shrink-0 px-3 md:w-1/6"
                  data-testid="learning-path-step"
                >
                  <div
                    className="mb-4 inline-flex size-[90px] items-center justify-center rounded-full p-6"
                    style={{
                      backgroundColor: step.bgOpacity,
                      color: step.color,
                    }}
                  >
                    <i className={`${step.icon} fa-2x`}></i>
                  </div>
                  <h5 className="font-bold">{step.title}</h5>
                  {step.subtitles.map((sub, sIdx) => (
                    <p
                      key={sIdx}
                      className={`text-[0.875em] text-muted ${sIdx === 0 ? 'mb-1' : 'mb-0'}`}
                    >
                      {sub}
                    </p>
                  ))}
                </div>
                {!isLast && (
                  <div className="mt-6 hidden w-full shrink-0 px-3 md:block md:w-1/12">
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
