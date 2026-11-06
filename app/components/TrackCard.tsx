import Link from 'next/link';
import React from 'react';
import { Course } from '../data/tracks';
import { CARD_LIFT } from './cardStyles';

interface TrackCardProps {
  course: Course;
}

export default function TrackCard({ course }: TrackCardProps) {
  const isMultiLink = course.links.length > 1;

  return (
    <div className={CARD_LIFT} data-testid="course-card">
      <div className="flex flex-auto flex-col p-6">
        {/* Header */}
        <div className="mb-4 flex items-center">
          <div className="me-4 rounded-md p-4" style={{ background: course.bgOpacity }}>
            <i className={`${course.icon} fa-2x`} style={{ color: course.color }}></i>
          </div>
          <div>
            <h4 className="mb-1 font-bold">{course.title}</h4>
            <span
              className="inline-block rounded-md px-3 py-2 text-center text-xs leading-none font-bold whitespace-nowrap"
              style={{
                background: course.color,
                color: course.isDarkText ? '#212529' : '#fff',
              }}
            >
              {course.badge}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-muted">{course.description}</p>

        {/* Syllabus / Features list */}
        {course.syllabus && course.syllabus.length > 0 && (
          <ul className="mb-6 list-none pl-0">
            {course.syllabus.map((item, index) => (
              <li key={index}>
                <i className="fas fa-check me-2 text-success"></i>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Buttons / Actions */}
        <div className={`mt-auto ${isMultiLink ? 'flex gap-2' : ''}`}>
          {course.links.map((link, idx) => {
            let btnClass = 'btn';
            if (isMultiLink) {
              btnClass += ' flex-auto';
            } else {
              // Ensure full-width buttons for standard math/science/engineering track pages
              if (
                course.id.startsWith('math') ||
                course.id.startsWith('environmental') ||
                course.id.startsWith('physics') ||
                course.id.startsWith('engineering')
              ) {
                btnClass += ' w-full';
              }
            }

            if (link.variant) {
              btnClass += ` btn-${link.variant}`;
            }

            const textClass =
              link.textWhite === true ? 'text-white' : link.textWhite === false ? 'text-dark' : '';
            if (textClass) {
              btnClass += ` ${textClass}`;
            }

            return (
              <Link key={idx} href={link.href} className={btnClass} style={link.style}>
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
