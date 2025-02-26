// src/components/iceland-trip/mapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Map } from 'lucide-react';

const MapComponent = ({ locations, selectedMarker, setSelectedMarker, darkMode, theme, getActivityForLocation }) => {
  const mapStyles = {
    height: "500px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 64.9631,
    lng: -19.0208 // 冰島中心點
  };

  // 添加錯誤處理
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`${darkMode ? 'bg-red-900 bg-opacity-50' : 'bg-red-100'} p-4 rounded-lg`}>
        <p className={darkMode ? 'text-white' : 'text-red-600'}>請設定 Google Maps API 金鑰</p>
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      loadingElement={
        <div className={`h-[500px] flex items-center justify-center ${darkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-50'}`}>
          <p className={darkMode ? 'text-white' : 'text-blue-800'}>地圖載入中...</p>
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={locations.length === 1 ? 13 : 7}
        center={locations[0] || defaultCenter}
        options={{
          styles: darkMode ? [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
            { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
          ] : [] // 淺色模式使用默認地圖樣式
        }}
      >
        {locations.map((location, index) => {
          const activity = getActivityForLocation(location);
          
          return (
            <Marker
              key={index}
              position={location}
              title={activity?.location || activity?.type || "地點"}
              onClick={() => setSelectedMarker(location)}
            />
          );
        })}
        
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className={`p-2 max-w-xs ${!darkMode && 'text-gray-800'}`}>
              {(() => {
                const activity = getActivityForLocation(selectedMarker);
                return activity ? (
                  <>
                    <h3 className="font-bold text-sm">{activity.location || activity.type}</h3>
                    {activity.duration && <p className="text-xs mt-1">建議停留: {activity.duration}</p>}
                    {activity.description && <p className="text-xs mt-1">{activity.description.slice(0, 100)}...</p>}
                  </>
                ) : (
                  <p>地點資訊</p>
                );
              })()}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

// 備用地圖組件（無API金鑰時使用）
export const FallbackMapComponent = ({ locations, days, selectedDay, darkMode, theme }) => {
  return (
    <div className={`${darkMode ? 'bg-blue-800 bg-opacity-50' : 'bg-blue-100'} h-[500px] relative overflow-hidden rounded-lg`}>
      {/* SVG Map of Iceland - This is a simplified version */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="h-full w-full opacity-20">
          <path d="M38,24 C44,15 56,10 65,10 C76,10 82,15 88,15 C94,15 100,10 110,10 C120,10 130,15 140,20 C150,25 160,35 170,40 C180,45 185,55 180,65 C175,75 165,80 155,80 C145,80 140,75 130,75 C120,75 115,80 105,80 C95,80 90,75 80,75 C70,75 65,80 55,80 C45,80 35,75 25,65 C15,55 20,45 25,35 C30,25 32,33 38,24 Z" 
            fill={darkMode ? '#4299e1' : '#2563eb'} stroke="white" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Location markers overlay */}
      <div className="absolute inset-0 p-4">
        <div className={`text-center mb-2 ${darkMode ? 'text-blue-100' : 'text-blue-800'} text-sm font-semibold`}>
          冰島地圖 - 行程點
        </div>
        
        {locations.map((location, index) => {
          // Calculate a rough position in our SVG viewport
          const xPos = (location.lng + 24) * 4; // Rough scaling for longitude
          const yPos = 100 - (location.lat - 63) * 25; // Rough scaling for latitude
          
          return (
            <div key={index} 
              className={`absolute ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full w-3 h-3 border border-white`}
              style={{ 
                left: `${xPos}%`, 
                top: `${yPos}%`,
                transform: 'translate(-50%, -50%)'
              }}>
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 ${darkMode ? 'bg-blue-900 bg-opacity-80' : 'bg-blue-700'} text-white text-xs px-2 py-1 rounded whitespace-nowrap`}>
                {days[selectedDay - 1]?.activities.find(a => 
                  a.coordinates && a.coordinates.lat === location.lat && a.coordinates.lng === location.lng
                )?.location || "地點"}
              </div>
            </div>
          );
        })}
        
        {/* Legend */}
        <div className={`absolute bottom-2 right-2 ${darkMode ? 'bg-blue-900 bg-opacity-80' : 'bg-blue-700'} text-xs p-2 rounded`}>
          <div className="flex items-center mb-1">
            <div className={`w-2 h-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} rounded-full mr-2`}></div>
            <span className="text-white">行程點</span>
          </div>
          <div className={darkMode ? "text-blue-200" : "text-blue-100"}>總計: {locations.length} 個地點</div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;