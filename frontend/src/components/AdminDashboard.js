// frontend/src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminDashboard = ({ token, onLogout = () => {} }) => {
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [docs, setDocs] = useState([]);
  const [newGallery, setNewGallery] = useState({ title: '', category: '', imageUrl: '' });
  const [newDoc, setNewDoc] = useState({ title: '', type: 'policy', year: '', url: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const authHeader = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : null;

  // Fetch data
  useEffect(() => {
    if (!authHeader) {
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [msgRes, galRes, docRes] = await Promise.all([
          api.get('/admin/messages', authHeader),
          api.get('/gallery'),
          api.get('/documents'),
        ]);
        setMessages(msgRes.data);
        setGallery(galRes.data);
        setDocs(docRes.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setStatus('Session expired. Please log in again.');
          onLogout?.();
        } else {
          setStatus('Failed to load admin data.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token, onLogout]);

  const handleGalleryChange = (e) => {
    const { name, value } = e.target;
    setNewGallery((prev) => ({ ...prev, [name]: value }));
  };
  const handleDocChange = (e) => {
    const { name, value } = e.target;
    setNewDoc((prev) => ({ ...prev, [name]: value }));
  };

  const addGalleryItem = async (e) => {
    e.preventDefault();
    setStatus('');
    if (!authHeader) {
      setStatus('You are not authenticated.');
      return;
    }
    try {
      const { data } = await api.post('/admin/gallery', newGallery, authHeader);
      setGallery([data, ...gallery]);
      setNewGallery({ title: '', category: '', imageUrl: '' });
      setStatus('Gallery item added successfully');
    } catch (err) {
      setStatus('Error adding gallery item');
    }
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    if (!authHeader) {
      setStatus('You are not authenticated.');
      return;
    }
    try {
      await api.delete(`/admin/gallery/${id}`, authHeader);
      setGallery(gallery.filter((item) => item._id !== id));
    } catch (err) {
      setStatus('Error deleting gallery item');
    }
  };

  const addDocument = async (e) => {
    e.preventDefault();
    setStatus('');
    if (!authHeader) {
      setStatus('You are not authenticated.');
      return;
    }
    try {
      const payload = { ...newDoc };
      if (!payload.year) delete payload.year;
      const { data } = await api.post('/admin/documents', payload, authHeader);
      setDocs([data, ...docs]);
      setNewDoc({ title: '', type: 'policy', year: '', url: '' });
      setStatus('Document added successfully');
    } catch (err) {
      setStatus('Error adding document');
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    if (!authHeader) {
      setStatus('You are not authenticated.');
      return;
    }
    try {
      await api.delete(`/admin/documents/${id}`, authHeader);
      setDocs(docs.filter((doc) => doc._id !== id));
    } catch (err) {
      setStatus('Error deleting document');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <h2 className="m-0">Admin Dashboard</h2>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>
      {status && <p className="small text-danger">{status}</p>}
      {loading && <p className="text-muted">Loading data...</p>}

      {/* Contact Messages */}
      <section className="mt-4">
        <h4>Contact Messages</h4>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
                    <td>{new Date(msg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Gallery Manager */}
      <section className="mt-5">
        <h4>Gallery Manager</h4>
        <form className="row g-3 mb-3" onSubmit={addGalleryItem}>
          <div className="col-md-4">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={newGallery.title}
              onChange={handleGalleryChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={newGallery.category}
              onChange={handleGalleryChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="imageUrl"
              className="form-control"
              placeholder="Image URL"
              value={newGallery.imageUrl}
              onChange={handleGalleryChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary btn-sm">
              Add
            </button>
          </div>
        </form>
        {gallery.length === 0 ? (
          <p>No gallery items found.</p>
        ) : (
          <ul className="list-group">
            {gallery.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {item.title} - {item.category}
                </span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteGalleryItem(item._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Documents Manager */}
      <section className="mt-5">
        <h4>Documents Manager</h4>
        <form className="row g-3 mb-3" onSubmit={addDocument}>
          <div className="col-md-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={newDoc.title}
              onChange={handleDocChange}
            />
          </div>
          <div className="col-md-3">
            <select
              name="type"
              className="form-select"
              value={newDoc.type}
              onChange={handleDocChange}
            >
              <option value="policy">Policy</option>
              <option value="fees">Fees</option>
              <option value="admission">Admission</option>
              <option value="calendar">Calendar</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="year"
              className="form-control"
              placeholder="Year (optional)"
              value={newDoc.year}
              onChange={handleDocChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="url"
              className="form-control"
              placeholder="File URL"
              value={newDoc.url}
              onChange={handleDocChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary btn-sm">
              Add
            </button>
          </div>
        </form>
        {docs.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          <ul className="list-group">
            {docs.map((doc) => (
              <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {doc.title} ({doc.type})
                </span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteDocument(doc._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;