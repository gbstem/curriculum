import React from 'react';

export interface DropdownItem {
  title: string;
  href: string;
}

export interface CourseLink {
  label: string;
  href: string;
  variant?: string;
  style?: React.CSSProperties;
  textWhite?: boolean;
}

export interface Course {
  id: string;
  title: string;
  badge: string;
  color: string;
  bgOpacity: string;
  icon: string;
  description: string;
  syllabus?: string[];
  links: CourseLink[];
  isDarkText?: boolean;
}

export interface LearningPathStep {
  stepNumber: number;
  title: string;
  subtitles: string[];
  icon: string;
  color: string;
  bgOpacity: string;
}

export interface Track {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  bgColor: string;
  isDarkText?: boolean;
  dropdownId: string;
  dropdownItems: DropdownItem[];
  courses: Course[];
  learningPath?: LearningPathStep[];
  homeIcon: string;
  homeIconColorClass: string;
  homeBtnVariant: string;
}

export const tracks: Track[] = [
  {
    id: 'cs',
    title: 'Computer Science',
    shortTitle: 'CS',
    description:
      'Learn programming with Python and Scratch, build games, and create interactive projects.',
    longDescription:
      'Teach programming fundamentals and advanced concepts through hands-on projects and interactive learning experiences.',
    icon: 'fas fa-laptop-code',
    bgColor: '#1D2256',
    isDarkText: false,
    dropdownId: 'cs-dropdown',
    homeIcon: 'fas fa-laptop-code fa-3x',
    homeIconColorClass: 'text-primary',
    homeBtnVariant: 'primary',
    dropdownItems: [
      { title: 'Python 1A', href: '/cs/python1A' },
      { title: 'Python 1B', href: '/cs/python1B' },
      { title: 'Python 2A', href: '/cs/python2A' },
      { title: 'Python 2B', href: '/cs/python2B' },
      { title: 'Scratch 1A', href: '/cs/scratch1A' },
      { title: 'Scratch 1B', href: '/cs/scratch1B' },
      { title: 'Scratch 2A', href: '/cs/scratch2A' },
      { title: 'Scratch 2B', href: '/cs/scratch2B' },
      { title: 'Web Development A', href: '/cs/webdevA' },
      { title: 'Web Development B', href: '/cs/webdevB' },
    ],
    courses: [
      {
        id: 'scratch1A',
        title: 'Scratch 1A',
        badge: 'Beginner Friendly',
        color: '#ffc107',
        bgOpacity: 'rgba(255, 193, 7, 0.1)',
        icon: 'fas fa-puzzle-piece',
        description:
          'Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.',
        syllabus: [
          '24 comprehensive lessons',
          'Visual programming concepts',
          'Game development projects',
          'Interactive storytelling',
        ],
        links: [
          { label: 'Start Teaching', href: '/cs/scratch1A', variant: 'warning', textWhite: true },
        ],
      },
      {
        id: 'scratch1B',
        title: 'Scratch 1B',
        badge: 'Beginner Friendly',
        color: '#ffc107',
        bgOpacity: 'rgba(255, 193, 7, 0.1)',
        icon: 'fas fa-puzzle-piece',
        description:
          'Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.',
        syllabus: [
          '24 comprehensive lessons',
          'Visual programming concepts',
          'Game development projects',
          'Interactive storytelling',
        ],
        links: [
          { label: 'Start Teaching', href: '/cs/scratch1B', variant: 'warning', textWhite: true },
        ],
      },
      {
        id: 'scratch2A',
        title: 'Scratch 2A',
        badge: 'Beginner Friendly',
        color: '#fd7e14',
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
        icon: 'fas fa-puzzle-piece',
        description:
          'Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.',
        syllabus: [
          '24 comprehensive lessons',
          'Visual programming concepts',
          'Game development projects',
          'Interactive storytelling',
        ],
        links: [
          {
            label: 'Start Teaching',
            href: '/cs/scratch2A',
            style: { background: '#fd7e14' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'scratch2B',
        title: 'Scratch 2B',
        badge: 'Beginner Friendly',
        color: '#fd7e14',
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
        icon: 'fas fa-puzzle-piece',
        description:
          'Learn programming fundamentals through visual block-based coding. Create games, animations, and interactive stories while developing computational thinking skills.',
        syllabus: [
          '24 comprehensive lessons',
          'Visual programming concepts',
          'Game development projects',
          'Interactive storytelling',
        ],
        links: [
          {
            label: 'Start Teaching',
            href: '/cs/scratch2B',
            style: { background: '#fd7e14' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'python1A',
        title: 'Python 1A',
        badge: 'Intermediate',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fab fa-python',
        description:
          'Dive into text-based programming with Python. Learn syntax, data structures, and problem-solving techniques through engaging projects.',
        syllabus: [
          '24 structured lessons',
          'Python fundamentals',
          'Data structures & algorithms',
          'Real-world applications',
        ],
        links: [{ label: 'Start Teaching', href: '/cs/python1A', variant: 'primary' }],
      },
      {
        id: 'python1B',
        title: 'Python 1B',
        badge: 'Intermediate',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fab fa-python',
        description:
          'Dive into text-based programming with Python. Learn syntax, data structures, and problem-solving techniques through engaging projects.',
        syllabus: [
          '24 structured lessons',
          'Python fundamentals',
          'Data structures & algorithms',
          'Real-world applications',
        ],
        links: [{ label: 'Start Teaching', href: '/cs/python1B', variant: 'primary' }],
      },
      {
        id: 'python2A',
        title: 'Python 2A',
        badge: 'Advanced',
        color: '#198754',
        bgOpacity: 'rgba(25, 135, 84, 0.1)',
        icon: 'fab fa-python',
        description:
          'Advanced Python programming concepts including object-oriented programming, file handling, and complex data manipulation.',
        syllabus: [
          '17 advanced lessons',
          'Object-oriented programming',
          'File I/O & data processing',
          'Advanced algorithms',
        ],
        links: [
          { label: 'Start Teaching', href: '/cs/python2A', variant: 'success', textWhite: true },
        ],
      },
      {
        id: 'python2B',
        title: 'Python 2B',
        badge: 'Advanced',
        color: '#198754',
        bgOpacity: 'rgba(25, 135, 84, 0.1)',
        icon: 'fab fa-python',
        description:
          'Advanced Python programming concepts including object-oriented programming, file handling, and complex data manipulation.',
        syllabus: [
          '17 advanced lessons',
          'Object-oriented programming',
          'File I/O & data processing',
          'Advanced algorithms',
        ],
        links: [
          { label: 'Start Teaching', href: '/cs/python2B', variant: 'success', textWhite: true },
        ],
      },
      {
        id: 'webdev',
        title: 'Web Development',
        badge: 'Modern Web',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fas fa-globe',
        description:
          'Learn to build modern websites using HTML, CSS, and JavaScript. Create responsive designs and interactive web applications.',
        syllabus: [
          'HTML & CSS fundamentals',
          'JavaScript programming',
          'Responsive design',
          'Web applications',
        ],
        links: [
          { label: 'WebDev A', href: '/cs/webdevA', variant: 'primary', textWhite: true },
          { label: 'WebDev B', href: '/cs/webdevB', variant: 'outline-primary' },
        ],
      },
    ],
    learningPath: [
      {
        stepNumber: 1,
        title: '1. Scratch I',
        subtitles: ['Scratch 1A', 'Scratch 1B'],
        icon: 'fas fa-puzzle-piece',
        color: '#ffc107',
        bgOpacity: 'rgba(255, 193, 7, 0.1)',
      },
      {
        stepNumber: 2,
        title: '2. Scratch II',
        subtitles: ['Scratch 2A', 'Scratch 2B'],
        icon: 'fas fa-puzzle-piece',
        color: '#fd7e14',
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
      },
      {
        stepNumber: 3,
        title: '3. Python I',
        subtitles: ['Python 1A', 'Python 1B'],
        icon: 'fab fa-python',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
      },
      {
        stepNumber: 4,
        title: '4. Python II',
        subtitles: ['Python 2A', 'Python 2B'],
        icon: 'fab fa-python',
        color: '#198754',
        bgOpacity: 'rgba(25, 135, 84, 0.1)',
      },
    ],
  },
  {
    id: 'math',
    title: 'Mathematics',
    shortTitle: 'Math',
    description:
      'Teach mathematical concepts through interactive lessons and real-world applications.',
    longDescription:
      'Teach mathematical concepts through interactive lessons and real-world applications.',
    icon: 'fas fa-calculator',
    bgColor: '#198754',
    isDarkText: false,
    dropdownId: 'math-dropdown',
    homeIcon: 'fas fa-calculator fa-3x',
    homeIconColorClass: 'text-success',
    homeBtnVariant: 'success text-white',
    dropdownItems: [
      { title: 'Math 1A', href: '/math/math1A' },
      { title: 'Math 1B', href: '/math/math1B' },
      { title: 'Math 2A', href: '/math/math2A' },
      { title: 'Math 2B', href: '/math/math2B' },
      { title: 'Math 3A', href: '/math/math3A' },
      { title: 'Math 3B', href: '/math/math3B' },
      { title: 'Math 4A', href: '/math/math4A' },
      { title: 'Math 4B', href: '/math/math4B' },
      { title: 'Math 5A', href: '/math/math5A' },
      { title: 'Math 5B', href: '/math/math5B' },
    ],
    courses: [
      {
        id: 'math1A',
        title: 'Math 1A',
        badge: 'Foundation',
        color: '#198754',
        bgOpacity: 'rgba(25, 135, 84, 0.1)',
        icon: 'fas fa-calculator',
        description:
          'Build a strong foundation in mathematical concepts and problem-solving skills.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math1A',
            style: { background: '#198754' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math1B',
        title: 'Math 1B',
        badge: 'Foundation',
        color: '#198754',
        bgOpacity: 'rgba(25, 135, 84, 0.1)',
        icon: 'fas fa-calculator',
        description:
          'Build a strong foundation in mathematical concepts and problem-solving skills.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math1B',
            style: { background: '#198754' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math2A',
        title: 'Math 2A',
        badge: 'Intermediate',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fas fa-chart-line',
        description: 'Explore advanced mathematical concepts and analytical thinking.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math2A',
            style: { background: '#0d6efd' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math2B',
        title: 'Math 2B',
        badge: 'Intermediate',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fas fa-chart-line',
        description: 'Explore advanced mathematical concepts and analytical thinking.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math2B',
            style: { background: '#0d6efd' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math3A',
        title: 'Math 3A',
        badge: 'Advanced',
        color: '#6f42c1',
        bgOpacity: 'rgba(111, 66, 193, 0.1)',
        icon: 'fas fa-square-root-alt',
        description: 'Master complex mathematical theories and applications.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math3A',
            style: { background: '#6f42c1' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math3B',
        title: 'Math 3B',
        badge: 'Advanced',
        color: '#6f42c1',
        bgOpacity: 'rgba(111, 66, 193, 0.1)',
        icon: 'fas fa-square-root-alt',
        description: 'Master complex mathematical theories and applications.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math3B',
            style: { background: '#6f42c1' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math4A',
        title: 'Math 4A',
        badge: 'Expert',
        color: '#20c997',
        bgOpacity: 'rgba(32, 201, 151, 0.1)',
        icon: 'fas fa-infinity',
        description: 'Delve into advanced mathematical analysis and proofs.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math4A',
            style: { background: '#20c997' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math4B',
        title: 'Math 4B',
        badge: 'Expert',
        color: '#20c997',
        bgOpacity: 'rgba(32, 201, 151, 0.1)',
        icon: 'fas fa-infinity',
        description: 'Delve into advanced mathematical analysis and proofs.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math4B',
            style: { background: '#20c997' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math5A',
        title: 'Math 5A',
        badge: 'Master',
        color: '#fd7e14',
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
        icon: 'fas fa-brain',
        description: 'Explore the frontiers of mathematical knowledge and research.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math5A',
            style: { background: '#fd7e14' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'math5B',
        title: 'Math 5B',
        badge: 'Master',
        color: '#fd7e14',
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
        icon: 'fas fa-brain',
        description: 'Explore the frontiers of mathematical knowledge and research.',
        links: [
          {
            label: 'Start Teaching',
            href: '/math/math5B',
            style: { background: '#fd7e14' },
            textWhite: true,
          },
        ],
      },
    ],
  },
  {
    id: 'science',
    title: 'Science',
    shortTitle: 'Science',
    description: 'Discover physics, environmental science, and conduct virtual experiments.',
    longDescription: 'Discover physics, environmental science, and conduct virtual experiments.',
    icon: 'fas fa-flask',
    bgColor: '#20c997',
    isDarkText: false,
    dropdownId: 'science-dropdown',
    homeIcon: 'fas fa-flask fa-3x',
    homeIconColorClass: 'text-info',
    homeBtnVariant: 'info text-white',
    dropdownItems: [
      { title: 'Environmental Science A', href: '/science/environmentalA' },
      { title: 'Environmental Science B', href: '/science/environmentalB' },
      { title: 'Physics A', href: '/science/physicsA' },
      { title: 'Physics B', href: '/science/physicsB' },
    ],
    courses: [
      {
        id: 'environmentalA',
        title: 'Environmental Science A',
        badge: 'Ecology',
        color: '#20c997',
        bgOpacity: 'rgba(32, 201, 151, 0.1)',
        icon: 'fas fa-leaf',
        description:
          'Explore environmental systems, sustainability, and the impact of human activities on our planet.',
        links: [
          {
            label: 'Start Teaching',
            href: '/science/environmentalA',
            style: { background: '#20c997' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'environmentalB',
        title: 'Environmental Science B',
        badge: 'Ecology',
        color: '#20c997',
        bgOpacity: 'rgba(32, 201, 151, 0.1)',
        icon: 'fas fa-leaf',
        description:
          'Explore environmental systems, sustainability, and the impact of human activities on our planet.',
        links: [
          {
            label: 'Start Teaching',
            href: '/science/environmentalB',
            style: { background: '#20c997' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'physicsA',
        title: 'Physics A',
        badge: 'Mechanics',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fas fa-atom',
        description:
          'Understand the fundamental laws of nature, motion, energy, and the universe around us.',
        links: [
          {
            label: 'Start Teaching',
            href: '/science/physicsA',
            style: { background: '#0d6efd' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'physicsB',
        title: 'Physics B',
        badge: 'Mechanics',
        color: '#0d6efd',
        bgOpacity: 'rgba(13, 110, 253, 0.1)',
        icon: 'fas fa-atom',
        description:
          'Understand the fundamental laws of nature, motion, energy, and the universe around us.',
        links: [
          {
            label: 'Start Teaching',
            href: '/science/physicsB',
            style: { background: '#0d6efd' },
            textWhite: true,
          },
        ],
      },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    shortTitle: 'Engineering',
    description: 'Design, build, and test solutions to real-world engineering challenges.',
    longDescription: 'Design, build, and test solutions to real-world engineering challenges.',
    icon: 'fas fa-cogs',
    bgColor: '#ffc107',
    isDarkText: true,
    dropdownId: 'engineering-dropdown',
    homeIcon: 'fas fa-cogs fa-3x',
    homeIconColorClass: 'text-warning',
    homeBtnVariant: 'warning text-white',
    dropdownItems: [
      { title: 'Engineering 1A', href: '/engineering/engineering1A' },
      { title: 'Engineering 1B', href: '/engineering/engineering1B' },
      { title: 'Engineering 2A', href: '/engineering/engineering2A' },
      { title: 'Engineering 2B', href: '/engineering/engineering2B' },
      { title: 'Engineering 3A', href: '/engineering/engineering3A' },
      { title: 'Engineering 3B', href: '/engineering/engineering3B' },
    ],
    courses: [
      {
        id: 'engineering1A',
        title: 'Engineering 1A',
        badge: 'Intro',
        color: '#ffc107',
        isDarkText: true,
        bgOpacity: 'rgba(255, 193, 7, 0.1)',
        icon: 'fas fa-cogs',
        description: 'Introduction to engineering principles and hands-on projects.',
        links: [
          {
            label: 'Start Teaching',
            href: '/engineering/engineering1A',
            style: { background: '#ffc107' },
            textWhite: false,
          },
        ],
      },
      {
        id: 'engineering1B',
        title: 'Engineering 1B',
        badge: 'Intro',
        color: '#ffc107',
        isDarkText: true,
        bgOpacity: 'rgba(255, 193, 7, 0.1)',
        icon: 'fas fa-cogs',
        description: 'Introduction to engineering principles and hands-on projects.',
        links: [
          {
            label: 'Start Teaching',
            href: '/engineering/engineering1B',
            style: { background: '#ffc107' },
            textWhite: false,
          },
        ],
      },
      {
        id: 'engineering2A',
        title: 'Engineering 2A',
        badge: 'Intermediate',
        color: '#fd7e14',
        isDarkText: false,
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
        icon: 'fas fa-tools',
        description: 'Dive deeper into engineering design, prototyping, and teamwork.',
        links: [
          {
            label: 'Start Teaching',
            href: '/engineering/engineering2A',
            style: { background: '#fd7e14' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'engineering2B',
        title: 'Engineering 2B',
        badge: 'Intermediate',
        color: '#fd7e14',
        isDarkText: false,
        bgOpacity: 'rgba(253, 126, 20, 0.1)',
        icon: 'fas fa-tools',
        description: 'Dive deeper into engineering design, prototyping, and teamwork.',
        links: [
          {
            label: 'Start Teaching',
            href: '/engineering/engineering2B',
            style: { background: '#fd7e14' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'engineering3A',
        title: 'Engineering 3A',
        badge: 'Advanced',
        color: '#6f42c1',
        isDarkText: false,
        bgOpacity: 'rgba(111, 66, 193, 0.1)',
        icon: 'fas fa-drafting-compass',
        description: 'Advanced engineering concepts, innovation, and real-world problem solving.',
        links: [
          {
            label: 'Start Teaching',
            href: '/engineering/engineering3A',
            style: { background: '#6f42c1' },
            textWhite: true,
          },
        ],
      },
      {
        id: 'engineering3B',
        title: 'Engineering 3B',
        badge: 'Advanced',
        color: '#6f42c1',
        isDarkText: false,
        bgOpacity: 'rgba(111, 66, 193, 0.1)',
        icon: 'fas fa-drafting-compass',
        description: 'Advanced engineering concepts, innovation, and real-world problem solving.',
        links: [
          {
            label: 'Start Teaching',
            href: '/engineering/engineering3B',
            style: { background: '#6f42c1' },
            textWhite: true,
          },
        ],
      },
    ],
  },
];
