'use client';

import React from 'react';
import TrackCard from '../components/TrackCard';
import TrackHero from '../components/TrackHero';
import LearningPath from '../components/LearningPath';
import { tracks } from '../data/tracks';

interface PageProps {
  params: Promise<{ track: string }>;
}

export default function TrackPage({ params }: PageProps) {
  const { track } = React.use(params);
  const normalizedTrack = track.toLowerCase();

  const trackData = tracks.find((t) => t.id === normalizedTrack);
  if (!trackData) {
    throw new Error('Track not found');
  }

  return (
    <div className="container-fluid p-0">
      <TrackHero
        title={trackData.title}
        description={trackData.longDescription}
        icon={trackData.icon}
        bgColor={trackData.bgColor}
        isDarkText={trackData.isDarkText}
      />

      <div className="container py-5">
        <div className="row g-4">
          {trackData.courses.map((course) => (
            <div key={course.id} className="col-lg-6">
              <TrackCard course={course} />
            </div>
          ))}
        </div>
      </div>

      {trackData.learningPath && <LearningPath steps={trackData.learningPath} />}
    </div>
  );
}
