// src/components/iceland-trip/EnhancedItinerary.js
import React, { useState } from 'react';
import { Calendar, MapPin, Sun, Sunset, Clock, ExternalLink, Navigation, AlertCircle, Coffee, Home, Car, Info } from 'lucide-react';
import MapComponent, { FallbackMapComponent } from './MapComponent';

const EnhancedItinerary = ({ theme, setSelectedMarker }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [expandedTips, setExpandedTips] = useState(false);
  const [expandedAccommodation, setExpandedAccommodation] = useState(false);
  const [selectedMarker, setLocalSelectedMarker] = useState(null);

  // Detailed itinerary data based on the provided information
  const daysData = [
    {
      date: "3/2 (六)",
      title: "抵達冰島",
      sunrise: "08:18",
      sunset: "18:37",
      activities: [
        {
          type: "航班抵達",
          time: "23:20",
          location: "凱夫拉維克國際機場 (Keflavík International Airport, KEF)",
          coordinates: { lat: 63.985, lng: -22.605 },
          mapLink: "https://maps.app.goo.gl/4Vxvw7nwidhKZNtK9",
          image: "/api/placeholder/500/300",
          description: "抵達冰島的第一天，我們將從凱夫拉維克國際機場開始我們的冰島冒險。",
          transportTips: [
            "機場巴士：Flybus 或 Airport Direct，車程約 45 分鐘到 Keflavík。",
            "租車：機場租車，車程約 15-20 分鐘到住宿。",
            "出租車：車程約 15-20 分鐘，費用較高。"
          ],
          notes: "抵達時間較晚，建議提前預訂交通並盡快前往住宿休息。"
        }
      ],
      tips: [
        "機場免稅店的酒類（如冰島伏特加 Brennivín）價格比市區便宜，適合購買紀念品。"
      ],
      accommodation: {
        name: "Sailors House",
        address: "Álftatjörn 3 260, 260 Keflavík, 冰島",
        coordinates: { lat: 64.0100, lng: -22.5620 },
        mapLink: "https://maps.app.goo.gl/4Vxvw7nwidhKZNtK9"
      }
    },
    {
      date: "3/3 (日)",
      title: "斯耐山半島初探",
      sunrise: "08:15",
      sunset: "18:40",
      activities: [
        {
          time: "上午",
          location: "Gunnuhver 火山地熱景點",
          address: "Möðruvallavegur, Möðruvellir, 冰島",
          coordinates: { lat: 63.8194, lng: -22.6858 },
          mapLink: "https://maps.app.goo.gl/fypu5z2ydsVusU7W6",
          duration: "1-1.5 小時",
          transport: "從 Keflavík 出發，車程約 1 小時。",
          image: "/api/placeholder/500/300",
          description: "參觀火山地熱區，欣賞泥漿池和噴氣孔等特殊地貌",
          notes: "地熱區地面濕滑，建議穿防滑鞋並遠離危險區域。"
        },
        {
          time: "14:20",
          type: "接機",
          location: "凱夫拉維克國際機場 (KEF)",
          coordinates: { lat: 63.985, lng: -22.605 },
          mapLink: "https://maps.app.goo.gl/4Vxvw7nwidhKZNtK9",
          transport: "從 Gunnuhver 返回 KEF 機場，車程約 1 小時。"
        },
        {
          time: "下午",
          location: "教會山瀑布 (Kirkjufellsfossar)",
          address: "WMGQ+FFJ, 351 Grundarfjörður, 冰島",
          coordinates: { lat: 64.9275, lng: -23.3117 },
          mapLink: "https://maps.app.goo.gl/rVsDMv7DSTQyb1tU7",
          transport: "從 KEF 機場出發，車程約 2.5 小時。",
          image: "/api/placeholder/500/300",
          description: "欣賞冰島最具標誌性的山峰之一，特別是在黃昏時分美景更加壯觀",
          notes: "建議攜帶相機和三腳架，捕捉日落時分的美景。"
        }
      ],
      tips: [
        "Gunnuhver 蒸汽濃密，建議攜帶防水相機保護設備。",
        "Kirkjufellsfossar 在冬季結冰時更顯夢幻，日落時段是最佳攝影時機。",
        "Grundarfjörður 有機會看到極光，建議下載極光預報 App（如 Aurora Forecast）。"
      ],
      accommodation: {
        name: "格倫達菲厄澤旅舍",
        address: "Hlidarvegur 15, 350 格倫達菲厄澤, 冰島",
        coordinates: { lat: 64.9186, lng: -23.2533 },
        mapLink: "https://maps.app.goo.gl/ANQBh6dRLC7jC18C7"
      }
    },
    {
      date: "3/4 (一)",
      title: "斯耐山半島深度旅遊",
      sunrise: "08:11",
      sunset: "18:43",
      activities: [
        {
          location: "草帽山 (Kirkjufell)",
          coordinates: { lat: 64.97, lng: -23.82 },
          mapLink: "https://maps.app.goo.gl/mwG2d6veTWA2RVYa9",
          duration: "再次欣賞",
          details: "可再次欣賞不同角度的草帽山",
          image: "/api/placeholder/500/300",
          description: "從不同角度欣賞教會山的獨特外觀，早晨的光線會讓它呈現不同的面貌。"
        },
        {
          location: "Svörtuloft 懸崖",
          coordinates: { lat: 64.86, lng: -24.11 },
          mapLink: "https://maps.app.goo.gl/KMWzGLxYSjNTFttz8",
          duration: "1 小時",
          transport: "教會山 → Svörtuloft，車程約 19 分鐘",
          image: "/api/placeholder/500/300",
          description: "欣賞懸崖海景，壯觀的海浪拍打黑色岩石海岸的景象令人震撼。"
        },
        {
          location: "Djúpalónssandur 黑沙灘",
          coordinates: { lat: 64.7528, lng: -23.8969 },
          mapLink: "https://maps.app.goo.gl/whY98pZEGhGeaEPr9",
          duration: "1.5 - 2 小時",
          transport: "Svörtuloft → Djúpalónssandur，車程約 9 分鐘",
          image: "/api/placeholder/500/300",
          description: "體驗搬石頭、漫步黑沙灘，欣賞獨特的黑色卵石沙灘和船難遺跡。"
        },
        {
          location: "Arnarstapi 石拱",
          coordinates: { lat: 64.7667, lng: -23.6167 },
          mapLink: "https://maps.app.goo.gl/dHB1f17pDo8qznbc8",
          duration: "1-1.5 小時",
          transport: "Djúpalónssandur → Arnarstapi，車程約 17 分鐘",
          image: "/api/placeholder/500/300",
          description: "欣賞石拱、海蝕柱，沿著海岸線徒步欣賞火山岩地貌和豐富的鳥類。"
        },
        {
          location: "布迪爾黑教堂 (Búðakirkja)",
          coordinates: { lat: 64.8222, lng: -23.385 },
          mapLink: "https://maps.app.goo.gl/fSFbhagdkidZ3JPc8",
          duration: "30-45 分鐘",
          transport: "Arnarstapi → 布迪爾黑教堂，車程約 24 分鐘",
          image: "/api/placeholder/500/300",
          description: "參觀黑教堂、拍照，這座黑色木結構小教堂與周圍熔岩荒原形成鮮明對比。"
        },
        {
          type: "備用景點",
          location: "瓦汀舍利爾洞穴 (Vatnshellir Cave)",
          coordinates: { lat: 64.75, lng: -23.8167 },
          mapLink: "https://maps.app.goo.gl/LjpbjS9fQpBJpiU68",
          duration: "1 小時",
          details: "洞穴導覽行程",
          notes: "洞穴探險需預訂導覽（約 45 分鐘），穿保暖衣物和防滑鞋。",
          image: "/api/placeholder/500/300",
          description: "這是一個8000年前形成的熔岩洞穴，可以參加導覽團深入地下35米，探索獨特的地下世界。"
        }
      ],
      tips: [
        "Djúpalónssandur 的「力量石」是維京傳統，挑戰舉起最小塊（54 公斤）體驗歷史。",
        "Vatnshellir 洞穴內溫度約 0°C，建議穿羽絨服與手套。"
      ],
      accommodation: {
        name: "Kirkjuteigur 23 2nd",
        address: "Kirkjuteigur 23 2nd, 105 Reykjavík, 冰島",
        coordinates: { lat: 64.1436, lng: -21.9186 },
        mapLink: "https://maps.app.goo.gl/qh7qv3thg8k1LgxV6",
        transport: "從斯耐山半島返回雷克雅維克，車程約 2.5 小時。"
      }
    },
    {
      date: "3/5 (二)",
      title: "黃金圈之旅",
      sunrise: "08:07",
      sunset: "18:46",
      activities: [
        {
          location: "Þingvellir 國家公園",
          coordinates: { lat: 64.2559, lng: -21.1305 },
          mapLink: "https://maps.app.goo.gl/mY9YpmZhL1eJqm7eA",
          duration: "2-3 小時",
          transport: "雷克雅維克 → Þingvellir，車程約 45 分鐘，停車費 €5",
          details: "地質奇觀、歷史遺跡巡禮",
          image: "/api/placeholder/500/300",
          description: "這裡是歐亞板塊與北美板塊的交界處，也是世界上最古老的議會所在地。您可以在兩個大陸之間的裂縫中漫步，感受地質活動的壯觀。"
        },
        {
          location: "Geysir 間歇泉",
          coordinates: { lat: 64.3104, lng: -20.3024 },
          mapLink: "https://maps.app.goo.gl/8svau2duFMa48Vaa9",
          duration: "1-1.5 小時",
          transport: "Þingvellir → Geysir，車程約 1 小時",
          details: "觀賞間歇泉噴發",
          image: "/api/placeholder/500/300",
          description: "Geysir地熱區以其間歇泉Strokkur而聞名，每隔5-10分鐘就會噴發一次，水柱高度可達20-30米。"
        },
        {
          location: "Gullfoss 瀑布",
          coordinates: { lat: 64.3275, lng: -20.1214 },
          mapLink: "https://maps.app.goo.gl/PgbRnYcgSPMTbS777",
          duration: "1-1.5 小時",
          transport: "Geysir → Gullfoss，車程約 10 分鐘",
          details: "欣賞壯闊瀑布",
          image: "/api/placeholder/500/300",
          description: "Gullfoss是冰島最著名的瀑布之一，水流分兩段落下32米深的峽谷，氣勢磅礴。在陽光照射下，水霧中常常會出現彩虹。"
        },
        {
          location: "Glymur 瀑布",
          coordinates: { lat: 64.3905, lng: -21.2515 },
          mapLink: "https://maps.app.goo.gl/pSrV15rv3HccJHff8",
          duration: "3-4 小時",
          transport: "Gullfoss → Glymur（經雷克雅維克）：約 1.5 小時",
          details: "徒步觀賞冰島第二高瀑布",
          notes: "Glymur 瀑布需徒步 3-4 小時往返，穿徒步鞋並攜帶水和食物。",
          image: "/api/placeholder/500/300",
          description: "冰島第二高的瀑布，壯麗的景色需要透過一段有挑戰性的徒步才能欣賞到。"
        }
      ],
      tips: [
        "Þingvellir 的 Silfra 裂縫水溫僅 2°C，若參加浮潛需穿全套保暖潛水衣。",
        "Geysir 的 Strokkur 間歇泉噴發高度可達 20-40 公尺，站在上風處避免蒸汽。"
      ],
      accommodation: {
        name: "Vík Hostel",
        address: "Suðurvíkurvegur 5, 870 維克, 冰島",
        coordinates: { lat: 63.4184, lng: -19.0064 },
        mapLink: "https://maps.app.goo.gl/AyuTnCpR1FHBAFe69",
        transport: "從 Gullfoss 前往 Vík，車程約 2.5 小時。"
      }
    },
    {
      date: "3/6 (三)",
      title: "南岸瀑布與黑沙灘",
      sunrise: "08:04",
      sunset: "18:50",
      activities: [
        {
          location: "塞里雅蘭瀑布 (Seljalandsfoss)",
          coordinates: { lat: 63.615, lng: -19.991 },
          duration: "1.5-2 小時",
          transport: "Vík → Seljalandsfoss：約 1 小時",
          details: "體驗水簾洞瀑布",
          image: "/api/placeholder/500/300",
          description: "塞里雅蘭瀑布的特別之處在於可以走到瀑布後面，從水簾後方欣賞景色，是一種獨特的體驗。"
        },
        {
          location: "斯科加瀑布 (Skógafoss)",
          coordinates: { lat: 63.532, lng: -19.511 },
          duration: "1-1.5 小時",
          transport: "塞里雅蘭瀑布 → 斯科加瀑布：約 30 分鐘",
          details: "爬階梯登頂、欣賞彩虹瀑布",
          image: "/api/placeholder/500/300",
          description: "斯科加瀑布寬60米，高25米，水量充沛。可以沿著階梯爬到瀑布頂部，俯瞰周圍的美麗風景。陽光照射下，瀑布前常出現單彩或雙彩虹。"
        },
        {
          location: "Kvernufoss 瀑布",
          coordinates: { lat: 63.5267, lng: -19.4788 },
          mapLink: "https://maps.app.goo.gl/6nPzKzL8mK9nP8zL7",
          duration: "1 小時",
          transport: "Skógafoss → Kvernufoss：徒步約 20 分鐘",
          details: "隱藏瀑布，較少遊客",
          image: "/api/placeholder/500/300",
          description: "一個較少人知道的隱藏瀑布，從斯科加瀑布徒步即可到達，可以走到瀑布後面。"
        },
        {
          location: "維克黑沙灘 (Reynisfjara)",
          coordinates: { lat: 63.406, lng: -19.044 },
          duration: "1.5-2 小時",
          transport: "斯科加瀑布 → 維克黑沙灘：約 30 分鐘",
          details: "欣賞玄武岩柱、海蝕洞",
          image: "/api/placeholder/500/300",
          description: "這是冰島最著名的黑沙灘，特色是黑色的沙子、壯觀的玄武岩柱和海中的巨石。"
        },
        {
          location: "Dyrhólaey 海崖與燈塔",
          coordinates: { lat: 63.3996, lng: -19.1263 },
          mapLink: "https://maps.app.goo.gl/7nKzP9QzPJug3e298",
          duration: "1 小時",
          transport: "Reynisfjara → Dyrhólaey：約 15 分鐘",
          details: "欣賞海崖和燈塔",
          image: "/api/placeholder/500/300",
          description: "可以欣賞到壯觀的海崖和遠處的黑沙灘，夏季還可能看到海鸚鵡。"
        }
      ],
      tips: [
        "Seljalandsfoss 後方步道濕滑，穿防水外套避免被水花淋濕。",
        "Reynisfjara 的「潛浪」極具危險性，務必遠離海邊至少 30 公尺。",
        "Skógafoss 登頂階梯約 400 階，建議攜帶水並穿保暖透氣衣物。"
      ],
      accommodation: {
        name: "Suðurvíkurvegur 5",
        address: "Suðurvíkurvegur 5, 870 Vík, 冰島",
        coordinates: { lat: 63.4184, lng: -19.0064 },
        mapLink: "https://maps.app.goo.gl/AyuTnCpR1FHBAFe69"
      }
    },
    {
      date: "3/7 (四)",
      title: "蝙蝠山攝影之旅",
      sunrise: "08:00",
      sunset: "18:53",
      activities: [
        {
          location: "Víkurfjara 黑沙灘與 Reynisdrangar",
          coordinates: { lat: 63.4045, lng: -19.0735 },
          mapLink: "https://maps.app.goo.gl/WzNmP9QzPJug3e298",
          duration: "1 小時",
          transport: "Vík → Víkurfjara：約 5 分鐘",
          details: "黑沙灘與海中石柱",
          image: "/api/placeholder/500/300",
          description: "從不同角度欣賞Reynisdrangar海中石柱，是拍攝日出的絕佳地點。"
        },
        {
          location: "Fjaðrárgljúfur 峽谷",
          coordinates: { lat: 63.7711, lng: -18.1719 },
          mapLink: "https://maps.app.goo.gl/8nPqKzL8mK9nP8zL7",
          duration: "1-2 小時",
          transport: "Vík → Fjaðrárgljúfur：約 1 小時",
          details: "壯觀的苔蘚覆蓋峽谷",
          image: "/api/placeholder/500/300",
          description: "令人驚嘆的綠色苔蘚覆蓋峽谷，有幾個觀景平台可以俯瞰整個峽谷。"
        },
        {
          location: "傑古沙龍冰河湖 (Jökulsárlón)",
          coordinates: { lat: 64.047, lng: -16.181 },
          duration: "2-3 小時",
          transport: "Fjaðrárgljúfur → 冰河湖：約 2 小時",
          details: "欣賞冰河湖、鑽石沙灘",
          image: "/api/placeholder/500/300",
          description: "冰河湖中漂浮著藍白相間的冰山，是冰島最令人驚嘆的自然奇觀之一。附近的鑽石沙灘有許多冰塊被沖上岸，在陽光下閃閃發光如同鑽石。"
        },
        {
          location: "蝙蝠山 (Vestrahorn)",
          coordinates: { lat: 64.248, lng: -14.987 },
          duration: "2-3 小時",
          transport: "冰河湖 → 蝙蝠山：約 1 小時",
          details: "拍攝點：黑沙灘與雪山倒影",
          image: "/api/placeholder/500/300",
          description: "蝙蝠山是冰島東部最著名的山峰之一，其尖峭的山峰與前方的黑沙灘形成強烈對比，是攝影愛好者必訪的地點。"
        }
      ],
      tips: [
        "Vestrahorn 的 Stokksnes 海灘在漲潮時反射效果最佳，建議查詢潮汐時間。",
        "Hvalnes Lighthouse 周圍有野生海豹，攜帶望遠鏡或長焦鏡頭可捕捉畫面。"
      ],
      accommodation: {
        name: "霍芬旅館",
        address: "Hvannabraut 3, 780 霍芬, 冰島",
        coordinates: { lat: 64.253, lng: -15.209 },
        mapLink: "https://maps.app.goo.gl/EusbSPi87oxx6yhS8"
      }
    },
    {
      date: "3/8 (五)",
      title: "冰川健行與藍冰洞",
      sunrise: "07:56",
      sunset: "18:56",
      activities: [
        {
          time: "9:00 - 15:00",
          location: "Vatnajökull 冰川健行與藍冰洞探險",
          meetingPoint: "Glacier Adventure Base Camp, Hali",
          coordinates: { lat: 64.25, lng: -15.85 },
          mapLink: "https://maps.app.goo.gl/2xtMhLici6W8Udzo8",
          transport: "從霍芬出發，車程約 1 小時。",
          details: "藍冰洞探險（參團，約6小時）",
          image: "/api/placeholder/500/300",
          description: "藍冰洞是冬季限定的自然奇觀，冰川融水在夏季形成通道，冬季凍結後形成藍色冰洞。在洞內，冰川冰呈現出不可思議的藍色調，是攝影師的天堂。",
          notes: "穿保暖防水衣物和登山鞋。"
        }
      ],
      tips: [
        "藍冰洞內光線柔和，建議用慢速快門拍攝（1/15 秒以上）捕捉冰藍色澤。",
        "Hali 的餐廳提供熱羊肉湯，適合健行後補充能量。"
      ],
      accommodation: {
        name: "Stóra-Mörk III Guesthouse",
        address: "Stóra Mörk, 861 Stora Mork, 冰島",
        coordinates: { lat: 64.05, lng: -19.95 },
        mapLink: "https://maps.app.goo.gl/TaMB8iSBSRRRzmKc7",
        transport: "從 Hali 返回 Stóra Mörk，車程約 2.5 小時。"
      }
    },
    {
      date: "3/9 (六)",
      title: "返回雷克雅維克與 Sky Lagoon",
      sunrise: "07:53",
      sunset: "18:59",
      activities: [
        {
          time: "上午",
          type: "市區觀光",
          location: "雷克雅維克市區漫遊",
          details: [
            "哈爾格林姆斯教堂 - 64.1417° N, 21.9278° W - https://maps.app.goo.gl/qzLnP9QzPJug3e298",
            "哈帕音樂廳 - 64.1500° N, 21.9333° W - https://maps.app.goo.gl/rzMnP9QzPJug3e298"
          ],
          transport: "Stóra-Mörk → 雷克雅維克，車程約 2.5 小時。",
          notes: "建議提前購買教堂塔頂門票。",
          image: "/api/placeholder/500/300",
          description: "在雷克雅維克市中心漫步，參觀標誌性的哈爾格林姆教堂和哈帕音樂廳等地標建築。"
        },
        {
          time: "16:00",
          location: "Sky Lagoon",
          coordinates: { lat: 64.1285, lng: -21.94 },
          mapLink: "https://maps.app.goo.gl/qzLnP9QzPJug3e298",
          duration: "2-3 小時",
          transport: "從雷克雅維克市中心出發，車程約 15 分鐘。",
          details: "享受海景溫泉、放鬆",
          notes: "攜帶泳衣和毛巾，需提前預訂。",
          image: "/api/placeholder/500/300",
          description: "Sky Lagoon是一個新開的溫泉，擁有無邊際的設計，可以一邊泡在溫泉中，一邊欣賞大西洋的壯麗景色。"
        }
      ],
      tips: [
        "Laugavegur 街有二手店，可淘到獨特冰島毛衣（Lopapeysa）。",
        "哈爾格林姆斯教堂塔頂票價約 1000 ISK，建議準備現金。"
      ],
      accommodation: {
        name: "Kirkjuteigur 23 2nd",
        address: "Kirkjuteigur 23 2nd, 105 Reykjavík, 冰島",
        coordinates: { lat: 64.1436, lng: -21.9186 },
        mapLink: "https://maps.app.goo.gl/qh7qv3thg8k1LgxV6"
      }
    },
    {
      date: "3/10 (日)",
      title: "快樂返程",
      sunrise: "07:49",
      sunset: "19:02",
      activities: [
        {
          time: "09:00",
          type: "抵達 KEF 機場",
          location: "凱夫拉維克國際機場 (KEF)",
          coordinates: { lat: 63.985, lng: -22.605 },
          mapLink: "https://maps.app.goo.gl/4Vxvw7nwidhKZNtK9",
          transport: "從雷克雅維克出發，車程約 45 分鐘。",
          details: "搭機返回",
          notes: "提前 2-3 小時抵達機場，辦理登機手續並退租車。",
          image: "/api/placeholder/500/300",
          description: "結束我們的冰島旅程，帶著滿滿的回憶和照片返程。"
        }
      ],
      tips: [
        "KEF 機場退稅櫃檯需提前排隊，建議預留 30 分鐘辦理。",
        "機場的 Bónus 超市販售平價三明治，適合作為登機前早餐。",
        "確認租車歸還時油箱已加滿，避免額外費用。"
      ]
    }
  ];

  // 計算當前選定天數的所有地點 (有座標的活動)
  const selectedDayLocations =
    daysData[selectedDay - 1]?.activities
      .filter(activity => activity.coordinates)
      .map(activity => activity.coordinates) || [];

  const toggleActivityExpansion = (index) => {
    if (expandedActivity === index) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(index);
    }
  };

  // 找到當前選擇的標記相關的活動
  const getActivityForLocation = (location) => {
    return daysData[selectedDay - 1]?.activities.find(activity => 
      activity.coordinates && 
      activity.coordinates.lat === location.lat && 
      activity.coordinates.lng === location.lng
    );
  };

  // 生成簡單的座標文本
  const formatCoordinates = (coordinates) => {
    if (!coordinates) return "";
    return `${coordinates.lat.toFixed(4)}°N, ${coordinates.lng.toFixed(4)}°E`;
  };

  return (
    <>
      {/* Date selector - 行程日期選擇器 */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {daysData.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index + 1)}
              className={`px-4 py-3 rounded-lg flex-shrink-0 transition-all transform ${
                selectedDay === index + 1
                  ? `${theme.darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white shadow-lg scale-105`
                  : `${theme.darkMode ? 'bg-white bg-opacity-10 hover:bg-opacity-20' : 'bg-white hover:bg-blue-50'}`
              }`}
            >
              <div className="text-sm font-medium">{day.date}</div>
              <div className="text-xs truncate max-w-32">{day.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current day info - 日出日落 */}
      <div className={`mb-6 ${theme.cardBg} rounded-xl p-4 ${theme.cardBorder}`}>
        <div className="flex items-center gap-3 mb-2">
          <Calendar className={`w-5 h-5 ${theme.highlight}`} />
          <h3 className="text-xl font-semibold">
            {daysData[selectedDay - 1]?.title}
          </h3>
        </div>
        <div className={`mt-2 flex items-center gap-4 text-sm ${theme.secondaryText}`}>
          <div className="flex items-center gap-1">
            <Sun className={`w-4 h-4 ${theme.darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
            <span>日出: {daysData[selectedDay - 1]?.sunrise}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sunset className={`w-4 h-4 ${theme.darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
            <span>日落: {daysData[selectedDay - 1]?.sunset}</span>
          </div>
        </div>
      </div>

      {/* Activities - 行程表 */}
      <div className="space-y-4 mb-6">
        <h3 className={`text-lg font-semibold flex items-center gap-2 mb-4`}>
          <Calendar className={`h-5 w-5 ${theme.highlight}`} />
          <span>當日行程</span>
        </h3>
        
        {daysData[selectedDay - 1]?.activities.map((activity, index) => (
          <div key={index} className={`${theme.cardBg} rounded-xl p-4 ${theme.cardBorder}`}>
            <div>
              {/* 活動標題區 */}
              <div 
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => toggleActivityExpansion(index)}
              >
                <MapPin className={`w-5 h-5 ${theme.highlight} mt-1 flex-shrink-0`} />
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      {activity.time && `${activity.time} - `}
                      {activity.location || activity.type}
                    </h3>
                    <div className={`ml-2 p-1 rounded-full ${theme.darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
                      {expandedActivity === index ? (
                        <span className="block w-5 h-5 text-center">-</span>
                      ) : (
                        <span className="block w-5 h-5 text-center">+</span>
                      )}
                    </div>
                  </div>
                  
                  {/* 基本資訊始終顯示 */}
                  {activity.duration && (
                    <p className={`${theme.secondaryText} text-sm`}>
                      建議停留：{activity.duration}
                    </p>
                  )}
                  {activity.transport && (
                    <p className={`${theme.secondaryText} text-sm mt-1 flex items-center`}>
                      <Car className={`w-4 h-4 inline mr-2 ${theme.highlight}`} />
                      {activity.transport}
                    </p>
                  )}
                  {/* Coordinates are used for the map but not displayed */}
                  {activity.mapLink && (
                    <a 
                      href={activity.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`text-sm mt-1 flex items-center ${theme.highlight}`}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      在 Google 地圖中開啟
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* 展開後顯示的詳細資訊 */}
              {expandedActivity === index && (
                <div className="mt-4 pl-8">
                  <div className="grid grid-cols-1 gap-4">
                    
                    <div>
                      {activity.description && (
                        <p className="mb-3">{activity.description}</p>
                      )}
                      
                      {Array.isArray(activity.details) ? (
                        <div>
                          <h4 className={`text-sm font-medium ${theme.highlight} mb-1`}>詳細資訊</h4>
                          <ul className={`list-disc list-inside space-y-1 text-sm ${theme.secondaryText}`}>
                            {activity.details.map((detail, i) => (
                              <li key={i}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      ) : activity.details ? (
                        <div>
                          <h4 className={`text-sm font-medium ${theme.highlight} mb-1`}>詳細資訊</h4>
                          <p className={`text-sm ${theme.secondaryText}`}>{activity.details}</p>
                        </div>
                      ) : null}
                      
                      {activity.notes && (
                        <div className={`mt-3 p-2 rounded-lg ${theme.darkMode ? 'bg-amber-900 bg-opacity-20' : 'bg-amber-50'}`}>
                          <div className="flex items-start gap-2">
                            <AlertCircle className={`w-4 h-4 ${theme.darkMode ? 'text-amber-300' : 'text-amber-500'} mt-0.5 flex-shrink-0`} />
                            <p className="text-sm">{activity.notes}</p>
                          </div>
                        </div>
                      )}
                      
                      {activity.transportTips && activity.transportTips.length > 0 && (
                        <div className="mt-3">
                          <h4 className={`text-sm font-medium ${theme.highlight} mb-1`}>交通提示</h4>
                          <ul className={`list-disc list-inside space-y-1 text-sm ${theme.secondaryText}`}>
                            {activity.transportTips.map((tip, i) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {activity.coordinates && (
                        <button 
                          className={`mt-3 px-4 py-2 ${theme.button} text-white rounded flex items-center gap-2 text-sm`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocalSelectedMarker(activity.coordinates);
                            setSelectedMarker(activity.coordinates);
                            // 滾動到地圖
                            document.querySelector('.map-section')?.scrollIntoView({behavior: 'smooth'});
                          }}
                        >
                          <MapPin className="w-4 h-4" />
                          <span>在地圖中顯示</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      {daysData[selectedDay - 1]?.tips && daysData[selectedDay - 1]?.tips.length > 0 && (
        <div className={`mb-6 ${theme.cardBg} rounded-xl p-4 ${theme.cardBorder}`}>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedTips(!expandedTips)}
          >
            <div className="flex items-center gap-2">
              <Coffee className={`w-5 h-5 ${theme.highlight}`} />
              <h3 className="text-lg font-semibold">旅行小提示</h3>
            </div>
            <div className={`p-1 rounded-full ${theme.darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
              {expandedTips ? (
                <span className="block w-5 h-5 text-center">-</span>
              ) : (
                <span className="block w-5 h-5 text-center">+</span>
              )}
            </div>
          </div>
          
          {expandedTips && (
            <div className="mt-3 pl-7">
              <ul className="space-y-2">
                {daysData[selectedDay - 1].tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className={`${theme.darkMode ? 'text-blue-300' : 'text-blue-500'} mt-1`}>•</div>
                    <p className="text-sm">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Accommodation Section */}
      {daysData[selectedDay - 1]?.accommodation && (
        <div className={`mb-6 ${theme.cardBg} rounded-xl p-4 ${theme.cardBorder}`}>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedAccommodation(!expandedAccommodation)}
          >
            <div className="flex items-center gap-2">
              <Home className={`w-5 h-5 ${theme.highlight}`} />
              <h3 className="text-lg font-semibold">住宿資訊</h3>
            </div>
            <div className={`p-1 rounded-full ${theme.darkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
              {expandedAccommodation ? (
                <span className="block w-5 h-5 text-center">-</span>
              ) : (
                <span className="block w-5 h-5 text-center">+</span>
              )}
            </div>
          </div>
          
          {expandedAccommodation && (
            <div className="mt-3 pl-7">
              <div className="space-y-2">
                <p className="font-medium">{daysData[selectedDay - 1].accommodation.name}</p>
                <p className="text-sm">{daysData[selectedDay - 1].accommodation.address}</p>
                
                {/* Accommodation coordinates used for map but not displayed */}
                
                {daysData[selectedDay - 1].accommodation.transport && (
                  <p className={`text-sm ${theme.secondaryText} flex items-center`}>
                    <Car className="w-4 h-4 mr-1" />
                    {daysData[selectedDay - 1].accommodation.transport}
                  </p>
                )}
                
                {daysData[selectedDay - 1].accommodation.mapLink && (
                  <a 
                    href={daysData[selectedDay - 1].accommodation.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-sm flex items-center ${theme.highlight}`}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    在 Google 地圖中開啟
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
                
                {daysData[selectedDay - 1].accommodation.coordinates && (
                  <button 
                    className={`mt-2 px-4 py-2 ${theme.button} text-white rounded flex items-center gap-2 text-sm`}
                    onClick={() => {
                      setLocalSelectedMarker(daysData[selectedDay - 1].accommodation.coordinates);
                      setSelectedMarker(daysData[selectedDay - 1].accommodation.coordinates);
                      // 滾動到地圖
                      document.querySelector('.map-section')?.scrollIntoView({behavior: 'smooth'});
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>在地圖中顯示住宿地點</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map section */}
      <div className="overflow-hidden rounded-xl shadow-lg map-section">
        {selectedDayLocations.length > 0 ? (
          <div className="relative">
            <div className={`absolute top-0 left-0 right-0 z-10 ${theme.darkMode ? 'bg-gradient-to-b from-blue-900 to-transparent' : 'bg-gradient-to-b from-white to-transparent'} h-8 opacity-70`}></div>
            {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
              <MapComponent 
                locations={selectedDayLocations} 
                selectedMarker={selectedMarker}
                setSelectedMarker={(marker) => {
                  setLocalSelectedMarker(marker);
                  setSelectedMarker(marker);
                }}
                darkMode={theme.darkMode}
                theme={theme}
                getActivityForLocation={getActivityForLocation}
              />
            ) : (
              <FallbackMapComponent 
                locations={selectedDayLocations}
                days={daysData}
                selectedDay={selectedDay}
                darkMode={theme.darkMode}
                theme={theme}
                selectedMarker={selectedMarker}
              />
            )}
            <div className={`absolute bottom-0 left-0 right-0 z-10 ${theme.darkMode ? 'bg-gradient-to-t from-blue-900 to-transparent' : 'bg-gradient-to-t from-white to-transparent'} h-8 opacity-70`}></div>
          </div>
        ) : (
          <div className={`${theme.darkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-50'} h-64 flex items-center justify-center`}>
            <p>此日期無地圖標記點</p>
          </div>
        )}
      </div>

      {/* 注意事項 */}
      <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className={`w-6 h-6 ${theme.darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} />
          <h3 className="text-xl font-semibold">注意事項</h3>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-yellow-300' : 'text-yellow-600'}>•</span>
            <span>以上時間皆為預估，實際情況可能因交通、天氣、個人步調等因素有所差異。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-yellow-300' : 'text-yellow-600'}>•</span>
            <span>冬季冰島天氣多變，行前請務必關注天氣預報及路況資訊，並預留更充裕的交通時間。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-yellow-300' : 'text-yellow-600'}>•</span>
            <span>景點停留時間為綜合網路資訊及一般遊客經驗所建議的參考時長，您可以依照個人興趣及行程彈性調整。</span>
          </li>
          <li className="flex items-start gap-2">
            <span className={theme.darkMode ? 'text-yellow-300' : 'text-yellow-600'}>•</span>
            <span>冰島緊急電話：112。下載冰島112官方應用程式，可在緊急情況下快速求助。</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default EnhancedItinerary;