import React from 'react';

const COPYRIGHT_YEAR = new Date().getFullYear();

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
              <li className="mx-3">
                <a
                  href="https://facebook.com/The-Greater-Boston-STEM-Program-104063908337961"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="https://twitter.com/gbstemprogram"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="https://www.instagram.com/gbstem/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </li>
              <li className="mx-3">
                <a
                  href="https://www.linkedin.com/company/gbstem-program"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </li>
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
