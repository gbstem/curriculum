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
    <div>
      <TrackHero
        title={trackData.title}
        description={trackData.longDescription}
        icon={trackData.icon}
        bgColor={trackData.bgColor}
        isDarkText={trackData.isDarkText}
      />

      <div className="site-container py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {trackData.courses.map((course) => (
            <TrackCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {trackData.learningPath && <LearningPath steps={trackData.learningPath} />}
    </div>
  );
}
