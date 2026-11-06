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
      className="py-12"
      data-testid="track-hero"
      style={{
        backgroundColor: bgColor,
        color: isDarkText ? '#212529' : '#fff',
      }}
    >
      <div className="site-container py-4">
        <div className="-mx-3 flex flex-wrap items-center">
          <div className="w-full shrink-0 px-3 lg:w-2/3">
            <h1 className={`mb-4 text-display-4 font-bold narrow:text-[2.5rem] ${textColorClass}`}>
              {title}
            </h1>
            <p className={`mb-0 text-lead font-light narrow:text-[1.1rem] ${textColorClass}`}>
              {description}
            </p>
          </div>
          <div
            className={`mt-6 w-full shrink-0 px-3 text-center lg:mt-0 lg:w-1/3 ${textColorClass}`}
          >
            <i className={`${icon} fa-5x`} data-testid="track-hero-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
