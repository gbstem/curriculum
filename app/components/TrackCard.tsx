import Link from 'next/link';
import React from 'react';
import { Course } from '../data/tracks';

interface TrackCardProps {
  course: Course;
}

export default function TrackCard({ course }: TrackCardProps) {
  const isMultiLink = course.links.length > 1;

  return (
    <div className="card hover-lift h-100 border-0 shadow-sm">
      <div className="card-body d-flex flex-column p-4">
        {/* Header */}
        <div className="d-flex align-items-center mb-3">
          <div className="me-3 rounded p-3" style={{ background: course.bgOpacity }}>
            <i className={`${course.icon} fa-2x`} style={{ color: course.color }}></i>
          </div>
          <div>
            <h4 className="card-title fw-bold mb-1">{course.title}</h4>
            <span
              className="badge"
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
        <p className="card-text text-muted mb-3">{course.description}</p>

        {/* Syllabus / Features list */}
        {course.syllabus && course.syllabus.length > 0 && (
          <ul className="list-unstyled mb-4">
            {course.syllabus.map((item, index) => (
              <li key={index}>
                <i className="fas fa-check text-success me-2"></i>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Buttons / Actions */}
        <div className={`mt-auto ${isMultiLink ? 'd-flex gap-2' : ''}`}>
          {course.links.map((link, idx) => {
            let btnClass = 'btn';
            if (isMultiLink) {
              btnClass += ' flex-fill';
            } else {
              // Ensure full-width buttons for standard math/science/engineering track pages
              if (
                course.id.startsWith('math') ||
                course.id.startsWith('environmental') ||
                course.id.startsWith('physics') ||
                course.id.startsWith('engineering')
              ) {
                btnClass += ' w-100';
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
