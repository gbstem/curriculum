import { render, screen } from '@testing-library/react';
import React from 'react';
import { notFound } from 'next/navigation';
import { tracks } from '../app/data/tracks';
import TrackHero from '../app/components/TrackHero';
import TrackCard from '../app/components/TrackCard';
import LearningPath from '../app/components/LearningPath';
import TrackPage from '../app/[track]/page';
import Home from '../app/page';

// Mock next/navigation's notFound
jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NOT_FOUND');
  }),
}));

describe('tracks data configuration', () => {
  it('contains CS, Math, Science, and Engineering tracks', () => {
    expect(tracks.map((t) => t.id)).toEqual(['cs', 'math', 'science', 'engineering']);
  });

  it('contains expected structure for each track', () => {
    tracks.forEach((track) => {
      expect(track).toHaveProperty('title');
      expect(track).toHaveProperty('shortTitle');
      expect(track).toHaveProperty('description');
      expect(track).toHaveProperty('longDescription');
      expect(track).toHaveProperty('icon');
      expect(track).toHaveProperty('bgColor');
      expect(track).toHaveProperty('dropdownId');
      expect(track).toHaveProperty('dropdownItems');
      expect(track.dropdownItems.length).toBeGreaterThan(0);
      expect(track.courses.length).toBeGreaterThan(0);
    });
  });
});

describe('TrackHero component', () => {
  it('renders title, description, and icon correctly', () => {
    const { container } = render(
      <TrackHero
        title="Test Track"
        description="Test description of the track"
        icon="fas fa-test-icon"
        bgColor="#123456"
      />
    );

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test description of the track')).toBeInTheDocument();
    const iconElement = container.querySelector('.fa-test-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies text-dark class when isDarkText is true', () => {
    render(
      <TrackHero
        title="Dark Text Track"
        description="Description"
        icon="fas fa-icon"
        bgColor="#ffc107"
        isDarkText={true}
      />
    );

    const title = screen.getByText('Dark Text Track');
    expect(title).toHaveClass('text-dark');
  });
});

describe('TrackCard component', () => {
  const dummyCourse = {
    id: 'scratch1A',
    title: 'Scratch 1A',
    badge: 'Beginner Friendly',
    color: '#ffc107',
    bgOpacity: 'rgba(255, 193, 7, 0.1)',
    icon: 'fas fa-puzzle-piece',
    description: 'Learn programming fundamentals through block coding.',
    syllabus: ['Lesson 1', 'Lesson 2'],
    links: [{ label: 'Start Teaching', href: '/cs/scratch1A' }],
  };

  it('renders single link course details correctly', () => {
    render(<TrackCard course={dummyCourse} />);

    expect(screen.getByText('Scratch 1A')).toBeInTheDocument();
    expect(screen.getByText('Beginner Friendly')).toBeInTheDocument();
    expect(
      screen.getByText('Learn programming fundamentals through block coding.')
    ).toBeInTheDocument();
    expect(screen.getByText('Lesson 1')).toBeInTheDocument();
    expect(screen.getByText('Lesson 2')).toBeInTheDocument();

    const linkBtn = screen.getByRole('link', { name: 'Start Teaching' });
    expect(linkBtn).toBeInTheDocument();
    expect(linkBtn).toHaveAttribute('href', '/cs/scratch1A');
  });

  it('renders multi-link courses (like WebDev) correctly', () => {
    const multiLinkCourse = {
      ...dummyCourse,
      id: 'webdev',
      title: 'Web Dev',
      links: [
        { label: 'WebDev A', href: '/cs/webdevA', variant: 'primary' },
        { label: 'WebDev B', href: '/cs/webdevB', variant: 'outline-primary' },
      ],
    };

    render(<TrackCard course={multiLinkCourse} />);

    const linkA = screen.getByRole('link', { name: 'WebDev A' });
    const linkB = screen.getByRole('link', { name: 'WebDev B' });

    expect(linkA).toBeInTheDocument();
    expect(linkA).toHaveAttribute('href', '/cs/webdevA');
    expect(linkA).toHaveClass('btn-primary');

    expect(linkB).toBeInTheDocument();
    expect(linkB).toHaveAttribute('href', '/cs/webdevB');
    expect(linkB).toHaveClass('btn-outline-primary');
  });
});

describe('LearningPath component', () => {
  const steps = [
    {
      stepNumber: 1,
      title: '1. Step One',
      subtitles: ['Sub A', 'Sub B'],
      icon: 'fas fa-one',
      color: '#ffc107',
      bgOpacity: 'rgba(255, 193, 7, 0.1)',
    },
    {
      stepNumber: 2,
      title: '2. Step Two',
      subtitles: ['Sub C'],
      icon: 'fas fa-two',
      color: '#fd7e14',
      bgOpacity: 'rgba(253, 126, 20, 0.1)',
    },
  ];

  it('renders all steps and subtitles correctly', () => {
    render(<LearningPath steps={steps} />);

    expect(screen.getByText('Recommended Learning Path')).toBeInTheDocument();
    expect(screen.getByText('1. Step One')).toBeInTheDocument();
    expect(screen.getByText('Sub A')).toBeInTheDocument();
    expect(screen.getByText('Sub B')).toBeInTheDocument();
    expect(screen.getByText('2. Step Two')).toBeInTheDocument();
    expect(screen.getByText('Sub C')).toBeInTheDocument();
  });
});

describe('Home page component', () => {
  it('renders all tracks choices correctly', () => {
    render(<Home />);

    expect(screen.getByText('Choose a Curriculum Track')).toBeInTheDocument();
    tracks.forEach((track) => {
      expect(screen.getByText(track.title)).toBeInTheDocument();
      expect(screen.getByText(`Explore ${track.shortTitle}`)).toBeInTheDocument();
    });
  });
});

describe('TrackPage dynamic page component', () => {
  let mockTrackParam = 'cs';
  let reactUseSpy: jest.SpyInstance;

  beforeAll(() => {
    reactUseSpy = jest.spyOn(React, 'use').mockImplementation(() => ({
      track: mockTrackParam,
    }));
  });

  afterAll(() => {
    reactUseSpy.mockRestore();
  });

  it('renders valid track page content correctly', async () => {
    mockTrackParam = 'cs';
    const params = Promise.resolve({ track: 'cs' });
    render(<TrackPage params={params} />);

    // Check that track header is rendered
    expect(screen.getByRole('heading', { name: 'Computer Science' })).toBeInTheDocument();
    // Check that courses in track are rendered
    expect(screen.getAllByText('Scratch 1A').length).toBeGreaterThan(0);
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    // Check that CS recommended path is rendered
    expect(screen.getByText('Recommended Learning Path')).toBeInTheDocument();
  });

  it('calls notFound when track ID is invalid', async () => {
    mockTrackParam = 'invalid-track-id';
    const params = Promise.resolve({ track: 'invalid-track-id' });

    // We expect it to call notFound(), which throws an error in our mock
    expect(() => {
      render(<TrackPage params={params} />);
    }).toThrow('NOT_FOUND');

    expect(notFound).toHaveBeenCalled();
  });
});
