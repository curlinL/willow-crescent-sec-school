// frontend/src/components/Contact.js
import React, { useState } from 'react';
import api from '../api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setStatus('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await api.post('/contact', form);
      setStatus('Thank you! Your message has been sent.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="row g-4">
        {/* contact details */}
        <div className="col-lg-8 offset-lg-4">
          <div className="neo-card">
            <h2>Contact Us</h2>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Address:</strong>
                  <br />
                  123 Willow Crescent Drive,
                  <br />
                  Eldorado Park, Gauteng
                </p>
                <p>
                  <strong>Email:</strong>
                  <br />
                  admin@willowcrescent.co.za
                </p>
                <p>
                  <strong>Phone:</strong>
                  <br />
                  +27 11 987 6543
                </p>
              </div>
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      style={{ border: '2px solid var(--primary-navy)' }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      style={{ border: '2px solid var(--primary-navy)' }}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      style={{ border: '2px solid var(--primary-navy)' }}
                    ></textarea>
                  </div>
                    <button className="btn-custom w-100" type="submit">
                      Send Message
                    </button>
                    {status && <p className="mt-2 small">{status}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;