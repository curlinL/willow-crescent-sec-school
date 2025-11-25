// frontend/src/components/Policies.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const Policies = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const { data } = await api.get('/documents');
        setDocs(data);
      } catch {
        // ignore for now
      }
    };
    fetchDocs();
  }, []);

  const getLabelIcon = (type) => {
    if (type === 'calendar') {
      return <i className="bi bi-calendar-event-fill text-primary fs-4 me-2"></i>;
    }
    return <i className="bi bi-file-pdf-fill text-danger fs-4 me-2"></i>;
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5">
          <h2>Documents &amp; Policies</h2>
          <p>
            Download important school documentation here. Ensure you have the Code of Conduct signed
            before the term begins.
          </p>
          <div className="d-none d-lg-block">
            <i
              className="bi bi-file-earmark-text-fill"
              style={{ fontSize: '10rem', color: 'var(--primary-navy)', opacity: 0.1 }}
            ></i>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="neo-card">
            <h4 className="mb-4">Downloads</h4>

            {docs.length === 0 && (
              <>
                {/* fallback UI if no docs from API yet */}
                <div className="policy-item">
                  <div>
                    <i className="bi bi-file-pdf-fill text-danger fs-4 me-2"></i>
                    <strong>School Code of Conduct 2024</strong>
                  </div>
                  <button className="btn btn-sm btn-outline-dark">Download</button>
                </div>
                <div className="policy-item">
                  <div>
                    <i className="bi bi-file-pdf-fill text-danger fs-4 me-2"></i>
                    <strong>Admission Requirements</strong>
                  </div>
                  <button className="btn btn-sm btn-outline-dark">Download</button>
                </div>
                <div className="policy-item">
                  <div>
                    <i className="bi bi-file-pdf-fill text-danger fs-4 me-2"></i>
                    <strong>School Fee Structure</strong>
                  </div>
                  <button className="btn btn-sm btn-outline-dark">Download</button>
                </div>
                <div className="policy-item">
                  <div>
                    <i className="bi bi-calendar-event-fill text-primary fs-4 me-2"></i>
                    <strong>Term Calendar 2024</strong>
                  </div>
                  <button className="btn btn-sm btn-outline-dark">View</button>
                </div>
              </>
            )}

            {docs.map((doc) => (
              <div className="policy-item" key={doc._id}>
                <div>
                  {getLabelIcon(doc.type)}
                  <strong>{doc.title}</strong>
                </div>
                <a href={doc.url} target="_blank" rel="noreferrer">
                  <button className="btn btn-sm btn-outline-dark">
                    {doc.type === 'calendar' ? 'View' : 'Download'}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;