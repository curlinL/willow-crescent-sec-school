// frontend/src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const fallbackGallery = [
  {
    _id: '1',
    title: 'Science Labs',
    category: 'Science Labs',
    imageUrl:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '2',
    title: 'Resource Centre',
    category: 'Resource Centre',
    imageUrl:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '3',
    title: 'Sports Grounds',
    category: 'Sports Grounds',
    imageUrl:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '4',
    title: 'IT Centre',
    category: 'IT Centre',
    imageUrl:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '5',
    title: 'Creative Arts',
    category: 'Creative Arts',
    imageUrl:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: '6',
    title: 'School Hall',
    category: 'School Hall',
    imageUrl:
      'https://images.unsplash.com/photo-1577896335477-28d5d424c3cd?auto=format&fit=crop&w=600&q=80',
  },
];

const Gallery = () => {
  const [items, setItems] = useState(fallbackGallery);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data && data.length) setItems(data);
      } catch {
        setError('Showing featured highlights while the gallery loads.');
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="container">
      <div className="text-center">
        <h2>Campus Gallery</h2>
        <p className="mb-5">A glimpse into life at Willow Crescent.</p>
      </div>
      {error && <p className="alert alert-warning text-center">{error}</p>}
      <div className="row g-4">
        {items.map((item) => (
          <div className="col-md-4 col-sm-6" key={item._id}>
            <img src={item.imageUrl} alt={item.title} className="gallery-img" />
            <p className="text-center mt-2 fw-bold small">{item.category || item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;