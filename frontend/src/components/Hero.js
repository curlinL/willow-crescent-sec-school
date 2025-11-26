// frontend/src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <>
      <div className="doodle doodle-blob-1"></div>
      <div className="doodle doodle-blob-2"></div>

      <div className="container position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mb-3">
              <span
                className="badge"
                style={{ background: 'var(--accent-red)', color: 'white', border: '1px solid var(--primary-navy)' }}
              >
                EST. 2010
              </span>
              <span
                className="badge ms-2"
                style={{ background: 'var(--bg-sky)', color: 'var(--primary-navy)', border: '1px solid var(--primary-navy)' }}
              >
                ELDORADO PARK
              </span>
            </div>
            <h1>
              WE DON&apos;T JUST TEACH. <br /> WE{' '}
              <span style={{ color: 'var(--accent-red)', textDecoration: 'underline wavy' }}>INSPIRE.</span>
            </h1>
            <p className="mt-4 lead">
              Willow Crescent Secondary is where community values meet academic excellence. Join the family in Eldos.
            </p>
            <div className="d-flex gap-3 mt-4 justify-content-lg-start justify-content-center">
              <a href="#about" className="btn-custom">
                Enroll Now
              </a>
              <a href="#about" className="btn-custom btn-outline">
                Read More
              </a>
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  width: '100%',
                  height: '100%',
                  border: '3px solid var(--accent-red)',
                  borderRadius: 'var(--radius)',
                  zIndex: -1,
                }}
              ></div>
              <img
                src="https://schoolhive.co.za/wp-content/uploads/2023/05/Willow-Crescent-Secondary-School-Eldorado-Park-Admissions-Contact-Details-800x600.jpeg"
                alt="Students"
                className="img-fluid"
                style={{
                  border: '3px solid var(--primary-navy)',
                  borderRadius: 'var(--radius)',
                  background: 'white',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
