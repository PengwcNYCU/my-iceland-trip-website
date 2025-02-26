// src/components/iceland-trip/photoSpots.js
import React from 'react';
import { Camera, MapPin, Image } from 'lucide-react';
import { photoSpotsData } from './itineraryData';

const PhotoSpots = ({ theme, setSelectedDay, setActiveSection, setSelectedMarker, days }) => {
  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-semibold flex items-center gap-2 mb-4`}>
        <Camera className={`h-6 w-6 ${theme.highlight}`} />
        <span>冰島攝影景點</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photoSpotsData.map((spot, idx) => (
          <div key={idx} className={`${theme.cardBg} rounded-xl overflow-hidden ${theme.cardBorder}`}>
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
              <div className={`absolute bottom-0 left-0 right-0 ${theme.darkMode ? 'bg-gradient-to-t from-black to-transparent' : 'bg-gradient-to-t from-white to-transparent bg-opacity-75'} py-2 px-3`}>
                <h3 className="font-bold text-lg">{spot.name}</h3>
                <p className={`text-sm ${theme.darkMode ? 'text-blue-200' : 'text-blue-800'}`}>{spot.location}</p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className={`text-xs ${theme.secondaryText}`}>最佳拍攝時間</div>
                  <div className="font-medium">{spot.bestTime}</div>
                </div>
                <div>
                  <div className={`text-xs ${theme.secondaryText}`}>地點</div>
                  <div className="font-medium flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> 
                    {spot.location}
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className={`text-xs ${theme.secondaryText} mb-1`}>攝影建議</div>
                <p className="text-sm">{spot.tips}</p>
              </div>
              
              <button 
                className={`mt-2 w-full py-2 ${theme.button} text-white rounded-lg flex items-center justify-center gap-2`}
                onClick={() => {
                  const dayIndex = days.findIndex(day => 
                    day.activities.some(act => 
                      act.coordinates && 
                      act.coordinates.lat === spot.coordinates.lat && 
                      act.coordinates.lng === spot.coordinates.lng
                    )
                  );
                  
                  if (dayIndex !== -1) {
                    setSelectedDay(dayIndex + 1);
                    setActiveSection('itinerary');
                    setSelectedMarker(spot.coordinates);
                  }
                }}
              >
                <Image className="w-4 h-4" />
                <span>查看相關行程</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className={`${theme.cardBg} rounded-xl p-5 ${theme.cardBorder}`}>
        <h3 className="text-lg font-semibold mb-3">攝影小貼士</h3>
        
        <div className="space-y-3">
          <div className={`p-3 ${theme.darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} rounded-lg`}>
            <h4 className="font-medium">北極光攝影</h4>
            <p className="text-sm mt-1">使用三腳架、遠離光害、曝光時間15-30秒、ISO 800-3200、光圈f/2.8或更大、使用手動對焦設置為無限遠。</p>
          </div>
          <div className={`p-3 ${theme.darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} rounded-lg`}>
            <h4 className="font-medium">冰川攝影</h4>
            <p className="text-sm mt-1">使用偏光鏡消除反光、尋找有紋理的冰面、利用對比色增加戲劇性、使用小光圈獲得更大景深。</p>
          </div>
          <div className={`p-3 ${theme.darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} rounded-lg`}>
            <h4 className="font-medium">設備保養</h4>
            <p className="text-sm mt-1">攜帶額外電池並保持溫暖、防止鏡頭結霜、使用防潮袋、等待設備適應溫度再開箱、攜帶防水保護裝備。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSpots;