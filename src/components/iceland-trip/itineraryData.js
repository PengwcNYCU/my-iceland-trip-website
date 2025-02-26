// src/components/iceland-trip/itineraryData.js

// 完整的冰島旅遊行程資料
export const daysData = [
  {
    date: "3/2 (六)",
    title: "抵達冰島",
    sunrise: "08:32",
    sunset: "18:50",
    activities: [
      {
        type: "航班抵達",
        details: "凱夫拉維克國際機場 (Keflavík International Airport, KEF)",
        coordinates: { lat: 63.985, lng: -22.605 },
        image: "/api/placeholder/500/300",
        description: "抵達冰島的第一天，我們將從凱夫拉維克國際機場開始我們的冰島冒險。"
      },
      {
        type: "住宿",
        details: "機場附近住宿",
        image: "/api/placeholder/500/300",
        description: "在機場附近休息，為接下來的行程養精蓄銳。"
      }
    ]
  },
  {
    date: "3/3 (日)",
    title: "斯奈山半島",
    sunrise: "08:28",
    sunset: "18:53",
    activities: [
      {
        time: "上午",
        location: "Gunnuhver 火山地熱景點",
        duration: "1-1.5 小時",
        details: "參觀火山地熱區，欣賞泥漿池和噴氣孔等特殊地貌",
        transport: "機場附近住宿 → Gunnuhver：🚗 約 10 分鐘",
        coordinates: { lat: 63.818, lng: -22.682 },
        image: "/api/placeholder/500/300",
        description: "Gunnuhver是冰島最大的地熱區之一，以其蒸汽噴口和泥漿池而聞名。這裡還有關於女巫Gunna的民間傳說，為這個地方增添了神秘色彩。"
      },
      {
        time: "下午",
        location: "教會山 (Kirkjufell)",
        details: [
          "前往 KEF 機場接嘉豪",
          "雷克雅未克加油站加油",
          "教會山觀光 (1-2 小時停留)",
          "KEF → 教會山，2 小時 55 分鐘車程"
        ],
        coordinates: { lat: 64.927, lng: -23.308 },
        image: "/api/placeholder/500/300",
        description: "教會山是冰島最著名的山峰之一，其獨特的錐形外觀和附近的瀑布構成了一幅令人難忘的景觀。這裡也是《權力的遊戲》中的取景地之一。"
      },
      {
        time: "住宿",
        location: "格倫達菲厄澤 (Grundarfjörður)",
        image: "/api/placeholder/500/300",
        description: "在格倫達菲厄澤小鎮過夜，這個小鎮位於教會山附近，是觀賞北極光的絕佳地點。"
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
        coordinates: { lat: 64.927, lng: -23.308 },
        image: "/api/placeholder/500/300",
        description: "從不同角度欣賞教會山的獨特外觀，早晨的光線會讓它呈現不同的面貌。"
      },
      {
        location: "Svörtuloft 懸崖",
        duration: "1 小時",
        details: "欣賞懸崖海景",
        transport: "教會山 → Svörtuloft，🚗 19 分鐘",
        coordinates: { lat: 64.878, lng: -23.984 },
        image: "/api/placeholder/500/300",
        description: "Svörtuloft懸崖上有一座橙色的燈塔，與黑色的懸崖和藍色的海洋形成鮮明對比，是拍攝照片的絕佳地點。"
      },
      {
        location: "Djúpalónssandur 黑沙灘",
        duration: "1.5 - 2 小時",
        details: "體驗搬石頭、漫步黑沙灘",
        transport: "Svörtuloft → Djúpalónssandur，🚗 9 分鐘",
        coordinates: { lat: 64.752, lng: -23.994 },
        image: "/api/placeholder/500/300",
        description: "這個黑沙灘有四塊不同重量的「力量測試石」，傳統上漁民必須能夠舉起這些石頭才能成為船員。海灘上還有一艘沉船的殘骸。"
      },
      {
        location: "Arnarstapi 石拱",
        duration: "1-1.5 小時",
        details: "欣賞石拱、海蝕柱",
        transport: "Djúpalónssandur → Arnarstapi，🚗 17 分鐘",
        coordinates: { lat: 64.769, lng: -23.625 },
        image: "/api/placeholder/500/300",
        description: "Arnarstapi有令人印象深刻的玄武岩柱和自然石拱，還有海蝕洞穴和豐富的鳥類。"
      },
      {
        location: "布迪爾黑教堂 (Búðakirkja)",
        duration: "30-45 分鐘",
        details: "參觀黑教堂、拍照",
        transport: "Arnarstapi → 布迪爾黑教堂，🚗 24 分鐘",
        coordinates: { lat: 64.822, lng: -23.383 },
        image: "/api/placeholder/500/300",
        description: "布迪爾黑教堂是冰島最著名的黑色教堂之一，其黑色木結構與周圍熔岩田和山脈形成鮮明對比。"
      },
      {
        type: "備用景點",
        location: "瓦汀舍利爾洞穴 (Vatnshellir Cave)",
        duration: "1 小時",
        details: "洞穴導覽行程",
        image: "/api/placeholder/500/300",
        description: "這是一個8000年前形成的熔岩洞穴，可以參加導覽團深入地下35米，探索獨特的地下世界。"
      },
      {
        time: "住宿",
        location: "博爾加內斯 (Borgarnes) 或 雷克雅維克 (Reykjavík)",
        image: "/api/placeholder/500/300",
        description: "前往博爾加內斯或雷克雅維克入住，為明天的黃金圈之旅做準備。"
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
        coordinates: { lat: 64.255, lng: -21.130 },
        image: "/api/placeholder/500/300",
        description: "這裡是歐亞板塊與北美板塊的交界處，也是世界上最古老的議會所在地。您可以在兩個大陸之間的裂縫中漫步，感受地質活動的壯觀。"
      },
      {
        time: "下午",
        location: "Geysir 間歇泉",
        duration: "1-1.5 小時",
        details: "觀賞間歇泉噴發",
        transport: "Þingvellir → Geysir，🚗 51 分鐘，免費",
        coordinates: { lat: 64.313, lng: -20.301 },
        image: "/api/placeholder/500/300",
        description: "Geysir地熱區以其間歇泉Strokkur而聞名，每隔5-10分鐘就會噴發一次，水柱高度可達20-30米。"
      },
      {
        location: "Gullfoss 瀑布",
        duration: "1-1.5 小時",
        details: "欣賞壯闊瀑布",
        transport: "Geysir → Gullfoss，🚗 10 分鐘，免費",
        coordinates: { lat: 64.327, lng: -20.128 },
        image: "/api/placeholder/500/300",
        description: "Gullfoss是冰島最著名的瀑布之一，水流分兩段落下32米深的峽谷，氣勢磅礴。在陽光照射下，水霧中常常會出現彩虹。"
      },
      {
        time: "傍晚",
        location: "Sky Lagoon",
        duration: "2-3 小時",
        details: "享受海景溫泉、放鬆",
        transport: "Gullfoss → Sky Lagoon，🚗 1 小時 18 分鐘，門票 €65-85/人",
        coordinates: { lat: 64.106, lng: -21.922 },
        image: "/api/placeholder/500/300",
        description: "Sky Lagoon是一個新開的溫泉，擁有無邊際的設計，可以一邊泡在溫泉中，一邊欣賞大西洋的壯麗景色。"
      },
      {
        time: "住宿",
        location: "雷克雅未克 (Reykjavík)",
        image: "/api/placeholder/500/300",
        description: "返回雷克雅未克市區休息，為明天的南岸之旅做準備。"
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
        coordinates: { lat: 63.615, lng: -19.991 },
        image: "/api/placeholder/500/300",
        description: "塞里雅蘭瀑布的特別之處在於可以走到瀑布後面，從水簾後方欣賞景色，是一種獨特的體驗。"
      },
      {
        location: "斯科加瀑布 (Skógafoss)",
        duration: "1-1.5 小時",
        details: "爬階梯登頂、欣賞彩虹瀑布",
        transport: "塞里雅蘭瀑布 → 斯科加瀑布，🚗 29 分鐘，免費",
        coordinates: { lat: 63.532, lng: -19.511 },
        image: "/api/placeholder/500/300",
        description: "斯科加瀑布寬60米，高25米，水量充沛。可以沿著階梯爬到瀑布頂部，俯瞰周圍的美麗風景。陽光照射下，瀑布前常出現單彩或雙彩虹。"
      },
      {
        location: "維克黑沙灘 (Reynisfjara Black Sand Beach)",
        duration: "1.5-2 小時",
        details: "欣賞玄武岩柱、海蝕洞",
        transport: "斯科加瀑布 → 維克黑沙灘，🚗 11 分鐘，免費",
        coordinates: { lat: 63.406, lng: -19.044 },
        image: "/api/placeholder/500/300",
        description: "這是冰島最著名的黑沙灘，特色是黑色的沙子、壯觀的玄武岩柱和海中的巨石。需注意此處海浪危險，請保持安全距離。"
      },
      {
        time: "住宿",
        location: "維克 (Vík)",
        image: "/api/placeholder/500/300",
        description: "在維克小鎮過夜，這是冰島南岸最南端的小鎮，四周環繞著美麗的風景。"
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
        coordinates: { lat: 63.531, lng: -19.352 },
        image: "/api/placeholder/500/300",
        description: "在專業嚮導的帶領下探索冰川，欣賞冰川上的冰裂隙、冰洞和獨特的冰川地形。這是一次安全而令人難忘的冰川體驗。"
      },
      {
        time: "下午",
        location: "傑古沙龍冰河湖 (Jökulsárlón Glacier Lagoon)",
        duration: "2-3 小時",
        details: "欣賞冰河湖、鑽石沙灘",
        transport: "索爾黑馬冰川 → 冰河湖，🚗 2 小時 24 分鐘，停留 1 小時",
        coordinates: { lat: 64.047, lng: -16.181 },
        image: "/api/placeholder/500/300",
        description: "冰河湖中漂浮著藍白相間的冰山，是冰島最令人驚嘆的自然奇觀之一。附近的鑽石沙灘有許多冰塊被沖上岸，在陽光下閃閃發光如同鑽石。"
      },
      {
        location: "霍芬 (Höfn)",
        transport: "冰河湖 → 霍芬，🚗 1 小時 5 分鐘",
        image: "/api/placeholder/500/300",
        description: "前往霍芬鎮，這是冰島東南部的主要城鎮，以其新鮮的龍蝦而聞名。"
      },
      {
        time: "住宿",
        location: "霍芬 (Höfn) 推薦住宿：Hótel Höfn（含早餐）",
        image: "/api/placeholder/500/300",
        description: "在霍芬過夜，您可以嘗試當地著名的龍蝦料理，為長途旅行補充能量。"
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
        coordinates: { lat: 64.047, lng: -16.181 },
        image: "/api/placeholder/500/300",
        description: "藍冰洞是冬季限定的自然奇觀，冰川融水在夏季形成通道，冬季凍結後形成藍色冰洞。在洞內，冰川冰呈現出不可思議的藍色調，是攝影師的天堂。"
      },
      {
        time: "下午",
        location: "蝙蝠山 (Vestrahorn)",
        duration: "2-3 小時",
        details: "拍攝點：黑沙灘與雪山倒影（停留 2 小時）攝影、欣賞海景",
        transport: "冰河湖 → 蝙蝠山，🚗 14 分鐘，門票 €8",
        coordinates: { lat: 64.248, lng: -14.987 },
        image: "/api/placeholder/500/300",
        description: "蝙蝠山是冰島東部最著名的山峰之一，其尖峭的山峰與前方的黑沙灘形成強烈對比，是攝影愛好者必訪的地點。"
      },
      {
        time: "住宿",
        location: "霍芬 (Höfn)",
        image: "/api/placeholder/500/300",
        description: "繼續在霍芬住宿，放鬆身心，為明天長途返回雷克雅未克做準備。"
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
        transport: "霍芬 → 雷克雅未克，🚗 5 小時 38 分鐘車程",
        description: "今天將是一個長途驅車日，從霍芬返回雷克雅未克，沿途可以欣賞冰島南部和東部的壯麗風景。"
      },
      {
        time: "傍晚",
        location: "雷克雅未克市區漫遊",
        duration: "2-3 小時",
        details: "探索冰島首都的特色建築和文化",
        coordinates: { lat: 64.146, lng: -21.942 },
        image: "/api/placeholder/500/300",
        description: "抵達雷克雅未克後，您可以在市中心漫步，參觀哈爾格林姆教堂、太陽航行者雕塑、音樂廳等地標。"
      },
      {
        type: "可選行程",
        location: "Blue Lagoon",
        duration: "2-3 小時",
        details: "若安排，可於傍晚前往",
        coordinates: { lat: 63.880, lng: -22.449 },
        image: "/api/placeholder/500/300",
        description: "藍湖是冰島最著名的地熱溫泉，富含礦物質的乳白色溫泉水對皮膚有益。這是放鬆身心、結束冰島旅程的完美方式。"
      },
      {
        time: "住宿",
        location: "雷克雅未克 (Reykjavík) 或 機場附近 (KEF)",
        image: "/api/placeholder/500/300",
        description: "最後一晚可以選擇住在雷克雅未克市區或靠近機場的地方，視明天的航班時間而定。"
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
        coordinates: { lat: 63.985, lng: -22.605 },
        image: "/api/placeholder/500/300",
        description: "結束我們的冰島旅程，帶著滿滿的回憶和照片返程。"
      }
    ]
  }
];

// 即時資訊資料
export const liveInfoData = {
  roadConditions: [
    { road: "Route 1 (環島公路)", status: "開放", conditions: "部分結冰", lastUpdated: "今天 08:30" },
    { road: "Route 36 (黃金圈)", status: "開放", conditions: "良好", lastUpdated: "今天 08:45" },
    { road: "F-Roads (高地道路)", status: "關閉", conditions: "冬季關閉", lastUpdated: "昨天 18:00" }
  ],
  northernLights: {
    forecast: "4/9",
    bestTime: "22:00 - 01:00",
    bestLocations: ["Grundarfjörður", "Jökulsárlón", "Reykjahlíð"],
    visibility: "部分地區雲層覆蓋",
    lastUpdated: "今天 09:00"
  },
  localNews: [
    { title: "冰島南部地區明日預計大雪", time: "1小時前" },
    { title: "雷克雅維克市區今日舉行冬季燈光節", time: "3小時前" },
    { title: "Strokkur間歇泉噴發頻率增加，遊客注意安全", time: "6小時前" }
  ]
};

// 攝影景點資料
export const photoSpotsData = [
  {
    name: "教會山日落",
    location: "Kirkjufell",
    coordinates: { lat: 64.927, lng: -23.308 },
    bestTime: "16:30-18:00",
    tips: "使用長焦鏡頭可以壓縮前景瀑布與山的距離感",
    image: "/api/placeholder/400/300"
  },
  {
    name: "鑽石沙灘",
    location: "Diamond Beach",
    coordinates: { lat: 64.044, lng: -16.176 },
    bestTime: "早晨日出後",
    tips: "降低視角拍攝冰塊反光，使用偏光鏡增強對比度",
    image: "/api/placeholder/400/300"
  },
  {
    name: "維克黑沙灘",
    location: "Reynisfjara",
    coordinates: { lat: 63.406, lng: -19.044 },
    bestTime: "陰天或黃昏",
    tips: "使用長曝光捕捉海浪與岩石的對比",
    image: "/api/placeholder/400/300"
  },
  {
    name: "藍湖倒影",
    location: "Blue Lagoon",
    coordinates: { lat: 63.880, lng: -22.449 },
    bestTime: "黃昏或夜晚",
    tips: "注意設備防水，嘗試捕捉蒸汽和藍色溫泉的對比",
    image: "/api/placeholder/400/300"
  }
];