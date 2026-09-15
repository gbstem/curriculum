import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';

const COPYRIGHT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com/The-Greater-Boston-STEM-Program-104063908337961',
    label: 'Facebook',
    Icon: Facebook,
  },
  { href: 'https://twitter.com/gbstemprogram', label: 'Twitter', Icon: Twitter },
  { href: 'https://www.instagram.com/gbstem/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.linkedin.com/company/gbstem-program', label: 'LinkedIn', Icon: Linkedin },
];

const Footer = () => {
  return (
    <footer>
      <section className="bg-dark py-5 text-center text-white">
        <div className="container">
          <a href="mailto:contact@gbstem.org" className="text-primary">
            <u>contact@gbstem.org</u>
          </a>
          <div className="row justify-content-center">
            <ul className="clear socials d-flex justify-content-center mt-4 list-none p-0 text-blue-600">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={label} className="mx-3">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="text-white"
                  >
                    <Icon size={35} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-white">
          The Greater Boston STEM Program is an independent non-profit 501(c)3 organization, EIN
          88-1760321
        </p>
        <small className="d-block mt-5 text-white">
          © {COPYRIGHT_YEAR} The Greater Boston STEM Program, all rights reserved
        </small>
      </section>
    </footer>
  );
};

export default Footer;
