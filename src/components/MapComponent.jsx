import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ onCitySelect }) => {
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    onCitySelect({ lat, lng });
  };

  const MapEventHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const europeBounds =[
    [41.902783, -0.127758],
    [60.169856, 24.938379]
  ];

  return (
    <MapContainer 
      center={[48.864716, 2.349014]} 
      zoom={6} 
      style={{ height: '70vh', width: '100%' }}  
      maxBounds={europeBounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEventHandler />
    </MapContainer>
  );
};

export default MapComponent;
