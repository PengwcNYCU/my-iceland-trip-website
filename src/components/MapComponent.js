// src/components/MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ apiKey, locations }) => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 64.9631,
    lng: -19.0208 // 冰島中心點
  };

  // 添加錯誤處理
  if (!apiKey) {
    return (
      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-red-600">錯誤：未設定 Google Maps API 金鑰</p>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={
        <div className="h-[400px] flex items-center justify-center bg-gray-100">
          <p>地圖載入中...</p>
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={locations.length === 1 ? 13 : 7}
        center={locations[0] || defaultCenter}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={location}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;