// src/components/TravelItinerary.js
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sun, Sunset, Clock, AlertCircle } from 'lucide-react';
import MapComponent from './MapComponent'; // 引入 MapComponent

const TravelItinerary = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [weather, setWeather] = useState(null);
  const mapKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // 冰島旅遊行程資料 (完整版，加入座標)
  const days = [
    {
      date: "3/2 (六)",
      title: "抵達冰島",
      sunrise: "08:32",
      sunset: "18:50",
      activities: [
        {
          type: "航班抵達",
          details: "凱夫拉維克國際機場 (Keflavík International Airport, KEF)",
          coordinates: { lat: 63.985, lng: -22.605 }  // KEF 機場座標
        },
        {
          type: "住宿",
          details: "機場附近住宿"
        }
      ]
    },
    {
      date: "3/3 (日)",
      title: "斯奈山半島 (Snæfellsnes Peninsula)",
      sunrise: "08:28",
      sunset: "18:53",
      activities: [
        {
          time: "上午",
          location: "Gunnuhver Volcano 及 Gunnuhver Hot Springs 火山地熱景點",
          duration: "1-1.5 小時",
          details: "參觀火山地熱區，欣賞泥漿池和噴氣孔等特殊地貌",
          transport: "機場附近住宿 → Gunnuhver：🚗 約 10 分鐘",
          coordinates: { lat: 63.818, lng: -22.682 } // Gunnuhver 座標
        },
        {
          time: "下午",
          location: "接機與教會山 (Kirkjufell)",
          details: [
            "前往 KEF 機場接嘉豪",
            "雷克雅未克加油站加油",
            "教會山觀光 (1-2 小時停留)",
            "KEF → 教會山，2 小時 55 分鐘車程"
          ],
          coordinates: { lat: 64.927, lng: -23.308 } // 教會山座標
        },
        {
          time: "住宿",
          location: "格倫達菲厄澤 (Grundarfjörður)"
        }
      ]
    },
    {
      date: "3/4 (一)",
      title: "斯奈山半島深度旅遊",
      sunrise: "08:25",
      sunset: "18:56",
      activities: [
        {
          location: "草帽山 (Kirkjufell)",
          duration: "再次欣賞",
          details: "可再次欣賞不同角度的草帽山",
          coordinates: { lat: 64.927, lng: -23.308 } // 教會山座標
        },
        {
          location: "Svörtuloft 懸崖",
          duration: "1 小時",
          details: "欣賞懸崖海景",
          transport: "教會山 → Svörtuloft，🚗 19 分鐘",
          coordinates: { lat: 64.878, lng: -23.984 }
        },
        {
          location: "Djúpalónssandur 黑沙灘",
          duration: "1.5 - 2 小時",
          details: "體驗搬石頭、漫步黑沙灘",
          transport: "Svörtuloft → Djúpalónssandur，🚗 9 分鐘",
          coordinates: { lat: 64.752, lng: -23.994 }
        },
        {
          location: "Arnarstapi 石拱",
          duration: "1-1.5 小時",
          details: "欣賞石拱、海蝕柱",
          transport: "Djúpalónssandur → Arnarstapi，🚗 17 分鐘",
          coordinates: { lat: 64.769, lng: -23.625 }
        },
        {
          location: "布迪爾黑教堂 (Búðakirkja)",
          duration: "30-45 分鐘",
          details: "參觀黑教堂、拍照",
          transport: "Arnarstapi → 布迪爾黑教堂，🚗 24 分鐘",
          coordinates: { lat: 64.822, lng: -23.383 }
        },
        {
          type: "備用景點",
          location: "瓦汀舍利爾洞穴 (Vatnshellir Cave)",
          duration: "1 小時",
          details: "洞穴導覽行程"
        },
        {
          time: "住宿",
          location: "博爾加內斯 (Borgarnes) 或 雷克雅維克 (Reykjavík)"
        }
      ]
    },
    {
      date: "3/5 (二)",
      title: "黃金圈 + Sky Lagoon",
      sunrise: "08:21",
      sunset: "18:59",
      activities: [
        {
          time: "上午",
          location: "Þingvellir 國家公園",
          duration: "2-3 小時",
          details: "地質奇觀、歷史遺跡巡禮",
          transport: "雷克雅未克 → Þingvellir，🚗 46 分鐘，停車費 €5",
          coordinates: { lat: 64.255, lng: -21.130 }
        },
        {
          time: "下午",
          location: "Geysir 間歇泉",
          duration: "1-1.5 小時",
          details: "觀賞間歇泉噴發",
          transport: "Þingvellir → Geysir，🚗 51 分鐘，免費",
          coordinates: { lat: 64.313, lng: -20.301 }
        },
        {
          location: "Gullfoss 瀑布",
          duration: "1-1.5 小時",
          details: "欣賞壯闊瀑布",
          transport: "Geysir → Gullfoss，🚗 10 分鐘，免費",
          coordinates: { lat: 64.327, lng: -20.128 }
        },
        {
          time: "傍晚",
          location: "Sky Lagoon",
          duration: "2-3 小時",
          details: "享受海景溫泉、放鬆",
          transport: "Gullfoss → Sky Lagoon，🚗 1 小時 18 分鐘，門票 €65-85/人",
          coordinates: { lat: 64.106, lng: -21.922 }
        },
        {
          time: "住宿",
          location: "雷克雅未克 (Reykjavík)"
        }
      ]
    },
    {
      date: "3/6 (三)",
      title: "南岸瀑布與黑沙灘",
      sunrise: "08:18",
      sunset: "19:02",
      activities: [
        {
          location: "塞里雅蘭瀑布 (Seljalandsfoss)",
          duration: "1.5-2 小時",
          details: "體驗水簾洞瀑布",
          transport: "雷克雅未克 → 塞里雅蘭瀑布，🚗 1 小時 54 分鐘，免費",
          coordinates: { lat: 63.615, lng: -19.991 }
        },
        {
          location: "斯科加瀑布 (Skógafoss)",
          duration: "1-1.5 小時",
          details: "爬階梯登頂、欣賞彩虹瀑布",
          transport: "塞里雅蘭瀑布 → 斯科加瀑布，🚗 29 分鐘，免費",
          coordinates: { lat: 63.532, lng: -19.511 }
        },
        {
          location: "維克黑沙灘 (Reynisfjara Black Sand Beach)",
          duration: "1.5-2 小時",
          details: "欣賞玄武岩柱、海蝕洞",
          transport: "斯科加瀑布 → 維克黑沙灘，🚗 11 分鐘，免費",
          coordinates: { lat: 63.406, lng: -19.044 }
        },
        {
          transport: "雷克雅未克 → 維克 (Vík) 車程約 2 小時 34 分鐘"
        },
        {
          time: "住宿",
          location: "維克 (Vík)"
        }
      ]
    },
    {
      date: "3/7 (四)",
      title: "冰川健行 + 冰河湖",
      sunrise: "08:14",
      sunset: "19:05",
      activities: [
        {
          time: "上午",
          location: "索爾黑馬冰川 (Sólheimajökull)",
          details: [
            "冰川健行（參團，3 小時，09:00 場次，€90-120/人）",
            "注意：需穿防水登山鞋，提供冰爪與冰鎬"
          ],
          transport: "維克 → 索爾黑馬冰川，🚗 23 分鐘",
          duration: "冰川健行 Tour 已包含停留時間",
          coordinates: { lat: 63.531, lng: -19.352 }
        },
        {
          time: "下午",
          location: "傑古沙龍冰河湖 (Jökulsárlón Glacier Lagoon)",
          duration: "2-3 小時",
          details: "欣賞冰河湖、鑽石沙灘",
          transport: "索爾黑馬冰川 → 冰河湖，🚗 2 小時 24 分鐘，停留 1 小時",
          coordinates: { lat: 64.047, lng: -16.181 }
        },
        {
          location: "霍芬 (Höfn)",
          transport: "冰河湖 → 霍芬，🚗 1 小時 5 分鐘"
        },
        {
          time: "住宿",
          location: "霍芬 (Höfn) 推薦住宿：Hótel Höfn（含早餐）"
        }
      ]
    },
    {
      date: "3/8 (五)",
      title: "藍冰洞探險 + 蝙蝠山",
      sunrise: "08:11",
      sunset: "19:08",
      activities: [
        {
          time: "上午",
          location: "傑古沙龍冰河湖 (Jökulsárlón Glacier Lagoon)",
          details: "藍冰洞探險（參團，3 小時，10:00 場次，€150-180/人）",
          transport: "霍芬 → 冰河湖，🚗 1 小時 4 分鐘",
          duration: "藍冰洞 Tour 已包含停留時間",
          coordinates: { lat: 64.047, lng: -16.181 }
        },
        {
          time: "下午",
          location: "蝙蝠山 (Vestrahorn)",
          duration: "2-3 小時",
          details: "拍攝點：黑沙灘與雪山倒影（停留 2 小時）攝影、欣賞海景",
          transport: "冰河湖 → 蝙蝠山，🚗 14 分鐘，門票 €8",
          coordinates: { lat: 64.248, lng: -14.987 }
        },
        {
          time: "住宿",
          location: "霍芬 (Höfn)"
        }
      ]
    },
    {
      date: "3/9 (六)",
      title: "返回雷克雅未克 + Blue Lagoon",
      sunrise: "08:07",
      sunset: "19:11",
      activities: [
        {
          transport: "霍芬 → 雷克雅未克，🚗 5 小時 38 分鐘車程"
        },
        {
          time: "傍晚",
          location: "雷克雅未克市區漫遊"
        },
        {
          type: "可選行程",
          location: "Blue Lagoon",
          duration: "2-3 小時",
          details: "若安排，可於傍晚前往"
        },
        {
          time: "住宿",
          location: "雷克雅未克 (Reykjavík) 或 機場附近 (KEF)"
        }
      ]
    },
    {
      date: "3/10 (日)",
      title: "回程",
      sunrise: "08:04",
      sunset: "19:14",
      activities: [
        {
          time: "上午 09:00",
          type: "抵達 KEF 機場",
          details: "搭機返回",
          coordinates: { lat: 63.985, lng: -22.605 }
        }
      ]
    }
  ];

  // 計算當前選定天數的所有地點 (有座標的活動)
  const selectedDayLocations =
    days[selectedDay - 1]?.activities.filter(activity => activity.coordinates).map(activity => activity.coordinates) || [];

  // 使用 useEffect 來抓取即時天氣資訊
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 使用 OpenWeatherMap API
        const weatherKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Reykjavik,is&units=metric&appid=${weatherKey}`
        );
        if (!response.ok) {
          throw new Error('網路回應錯誤');
        }
        const data = await response.json();
        setWeather({
          temperature: data.main.temp,
          condition: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      } catch (error) {
        console.error('取得天氣資料錯誤:', error);
      }
    };

    fetchWeather();
  }, []);

  // 添加 API 金鑰檢查
  useEffect(() => {
    if (!mapKey) {
      console.error('Google Maps API 金鑰未設定');
    }
  }, [mapKey]);

  // 添加錯誤處理
  if (!days || !days[selectedDay - 1]) {
    return <div>載入中...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <main>
        {/* 日期選擇器 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">冰島旅遊行程</h2>
          <div className="flex flex-wrap gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDay === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm">{day.date}</div>
                <div className="text-xs">{day.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 當前日期資訊 */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">
              {days[selectedDay - 1]?.title}
            </h3>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Sun className="w-4 h-4" />
              <span>日出: {days[selectedDay - 1]?.sunrise}</span>
            </div>
            <div className="flex items-center gap-1">
              <Sunset className="w-4 h-4" />
              <span>日落: {days[selectedDay - 1]?.sunset}</span>
            </div>
          </div>
        </div>

        {/* 天氣資訊 */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div id="weather" className="flex items-center gap-2">
            {weather ? (
              <>
                {weather.icon && (
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt="Weather Icon"
                    className="weather-icon"
                  />
                )}
                <span className="text-xl font-semibold">{weather.temperature}°C</span>
                <span className="text-sm">{weather.condition}</span>
              </>
            ) : (
              <span className="text-sm">
                即時天氣資訊讀取中... (若無法顯示，請稍後再試)
              </span>
            )}
          </div>
        </div>

        {/* 地圖容器 - 添加錯誤處理 */}
        <div className="mb-6">
          {!mapKey ? (
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-red-600">請設定 Google Maps API 金鑰</p>
            </div>
          ) : selectedDayLocations.length > 0 ? (
            <MapComponent apiKey={mapKey} locations={selectedDayLocations} />
          ) : (
            <div className="bg-gray-100 h-[400px] flex items-center justify-center">
              <p>此日期無地圖標記點</p>
            </div>
          )}
        </div>

        {/* 行程活動列表 */}
        <div className="space-y-6">
          {days[selectedDay - 1]?.activities.map((activity, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    {activity.time && `${activity.time} - `}
                    {activity.location || activity.type}
                  </h3>
                  {activity.transport && (
                    <p className="text-gray-600 mt-1">
                      <Clock className="w-4 h-4 inline mr-2" />
                      {activity.transport}
                    </p>
                  )}
                  {activity.duration && (
                    <p className="text-gray-600">
                      建議停留：{activity.duration}
                    </p>
                  )}
                  {activity.details && (
                    <div className="mt-2">
                      {Array.isArray(activity.details) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {activity.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{activity.details}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 注意事項 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-xl font-semibold">注意事項</h3>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>• 以上時間皆為預估，實際情況可能因交通、天氣、個人步調等因素有所差異。</li>
            <li>• 冬季冰島天氣多變，行前請務必關注天氣預報及路況資訊，並預留更充裕的交通時間。</li>
            <li>• 景點停留時間為綜合網路資訊及一般遊客經驗所建議的參考時長，您可以依照個人興趣及行程彈性調整。</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TravelItinerary;
