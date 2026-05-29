import React from 'react';

interface TrackHeroProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  isDarkText?: boolean;
}

export default function TrackHero({
  title,
  description,
  icon,
  bgColor,
  isDarkText = false,
}: TrackHeroProps) {
  const textColorClass = isDarkText ? 'text-dark' : 'text-white';
  return (
    <div
      className="py-5"
      style={{
        backgroundColor: bgColor,
        color: isDarkText ? '#212529' : '#fff',
      }}
    >
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className={`display-4 fw-bold mb-3 ${textColorClass}`}>{title}</h1>
            <p className={`lead mb-0 ${textColorClass}`}>{description}</p>
          </div>
          <div className={`col-lg-4 d-none d-lg-block text-center ${textColorClass}`}>
            <i className={`${icon} fa-5x`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
