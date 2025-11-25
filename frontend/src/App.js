// frontend/src/App.js
import React from 'react';
import NavbarWC from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AboutAcademics from './components/AboutAcademics';
import Gallery from './components/Gallery';
import Policies from './components/Policies';
import AdminPortal from './components/AdminPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavbarWC />
      <main data-bs-spy="scroll" data-bs-target="#mainNav" data-bs-offset="100">
        <section id="home" className="hero-section">
          <Hero />
        </section>
        <section className="container" style={{ paddingTop: 0 }}>
          <Stats />
        </section>
        <section id="about" className="section-sky">
          <AboutAcademics />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="policies" className="section-sky">
          <Policies />
        </section>
        <section id="admin">
          <AdminPortal />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;