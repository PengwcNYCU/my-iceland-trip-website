// src/components/iceland-trip/PenguinPet.js
import React, { useState, useEffect, useRef } from 'react';

const PenguinPet = ({ theme }) => {
  // 基本狀態
  const [position, setPosition] = useState({ left: 20, top: window.innerHeight - 100 });
  const [isWaving, setIsWaving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [direction, setDirection] = useState(1); // 1為右, -1為左
  const [activeInterval, setActiveInterval] = useState(true); // 控制移動間隔

  // 使用ref記錄訊息清除的計時器，便於取消
  const messageTimerRef = useRef(null);
  
  // 團隊成員
  const teamMembers = [
    '阿彭',
    '帥潮GD',
    'LamKaHou',
    'MengGo',
    '阿榤',
    '最強打野泡菜',
    '1誠',
    '海豹嗷嗷'
  ];
  
  // 隨機取得1位團隊成員
  const getRandomMember = () => {
    return teamMembers[Math.floor(Math.random() * teamMembers.length)];
  };
  
  // 隨機取得2位不同的團隊成員
  const getTwoRandomMembers = () => {
    const first = getRandomMember();
    let second;
    do {
      second = getRandomMember();
    } while (second === first);
    return [first, second];
  };

  // 訊息模板
  const messageTemplates = [
    // 可愛風格
    'NAME醬～企鵝抱抱～',
    'NAME今天好可愛喔～讓企鵝忍不住想捏捏～',
    'NAME可以摸摸企鵝的頭嗎？啾啾～',
    'NAME要不要跟企鵝一起跳舞呀～',
    
    // 稱讚風格
    'NAME的攝影角度太專業了！完全是專業級別！',
    'NAME今天的髮型超級適合在冰島拍照～',
    'NAME的英文發音好標準，連企鵝都聽得懂～',
    'NAME昨天的晚餐選擇太讚了！企鵝也想吃～',
    
    // 中二病風格
    '以冰島之名，NAME，接受吾之祝福，邁向極光聖域吧！',
    'NAME啊，汝之靈魂與冰島的靈脈共鳴，這是命運的指引！',
    '黑夜的守護者NAME，唯有汝能喚醒沉睡的北歐諸神！',
    '企鵝見證NAME之勇氣，冰原的考驗將為汝敞開勝利之門！',
    
    // 發狠風格
    'NAME！再不走快點我就把你留在這座冰川上！',
    'NAME你給我過來！企鵝數到三！一、二...！',
    'NAME明天不准賴床！不然企鵝會銜走你的護照！',
    'NAME你再拍照我就把你的記憶卡吃掉！',
    
    // 矯情風格
    'NAME喔～你知道嗎？每片雪花融化的聲音都在呼喚你的名字～',
    'NAME看著那天際線，企鵝突然感受到了宇宙的孤獨～',
    '當冰川融化的眼淚遇見NAME的微笑，時光仿佛在此凝固～',
    'NAME，若此刻能與你共赴黑沙灘，哪怕消失也無憾了～',
    
    // 安慰風格
    'NAME不用擔心，迷路只是找到新風景的開始～',
    'NAME今天走得累了吧？要靠在企鵝肩膀上休息一下嗎？',
    'NAME別難過，明天還有更美的風景等著我們呢！',
    'NAME的計劃雖然被天氣打亂了，但意外總是旅行的調味料～',
    
    // 鼓勵風格
    'NAME加油！再冷的冰川都阻擋不了你熱情的心！',
    'NAME勇敢向前吧！企鵝相信你能登上最高峰！',
    'NAME拿起相機！捕捉這一生可能只有一次的美景！',
    'NAME今晚守夜看極光，絕對值得！企鵝陪你！',
    
    // 物理教授風格 (薛丁格方程式)
    '根據薛丁格方程式，NAME同時處於想睡覺和想看極光的疊加態，觀測前無法確定。',
    'NAME，如果將你的行走軌跡用波函數Ψ表示，其平方即為在冰川滑倒的概率密度。',
    '有趣的是，NAME的位置和動量不能同時精確測量，這解釋了為何你總是找不到廁所。',
    '從量子力學角度來看，NAME進入溫泉會導致波函數坍縮，熵增加，舒適度提高。',
    
    // 團隊互動（兩人名）
    'NAME1和NAME2今天走得最快，是被極光召喚了嗎？',
    'NAME1和NAME2的合照真是完美構圖，企鵝要偷偷存一份！',
    'NAME1請負責導航，NAME2負責防熊，企鵝負責賣萌！',
    'NAME1和NAME2在溫泉裡待太久，都快變成水煮企鵝了～',
    'NAME1眼中只有風景，NAME2眼中只有美食，企鵝眼中只有你們～'
  ];
  
  // 冰島資訊訊息
  const icelandMessages = [
    '冰島好冷啊！不過我喜歡～',
    '記得多拍照！冰島的風景稍縱即逝，光線變化很快。',
    '黑沙灘超棒的！但要小心海浪，千萬別靠太近。',
    '冰河湖是我的家～那裡的冰塊像鑽石一樣閃耀。',
    '記得帶足夠的衣物！冰島即使夏天也可能很冷，尤其是遇到強風時。',
    '極光好美！為了捕捉極光，相機要用手動設定，ISO1600左右，快門至少15秒。',
    '小心路上結冰喔！特別是在峽谷和高處的道路。',
    '這裡的溫泉泡起來超舒服的！但記得帶泳衣，大部分溫泉都是公共場所。',
    '天氣變化無常，一天可能經歷四季！隨時準備好雨具非常重要。',
    '別忘了試試冰島羊肉湯，超暖胃！傳統湯品在寒冷天氣是完美選擇。',
    '冰島沒有蚊子喔！是不是很棒？可以放心在夏季露營。',
    '不要隨便摸冰川，很危險的！冰面可能不穩定，務必跟專業嚮導一起。',
    '冰島的自來水可以直接喝，超乾淨！不需要買瓶裝水。',
    '記得關好車門，冰島的風很大，會吹壞車門！這是租車公司的常見警告。',
    '冰島的瀑布背後常有隱藏小路，但行走要非常小心，地面通常很滑。',
    '各地的溫泉溫度不同，進入前先試試水溫，有些地方可能非常燙！'
  ];

  // 初始化屏幕邊界
  const [bounds, setBounds] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // 更新屏幕邊界
  useEffect(() => {
    const handleResize = () => {
      setBounds({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      // 確保企鵝保持在可見範圍內
      setPosition(prev => ({
        left: Math.min(prev.left, window.innerWidth - 80),
        top: Math.min(prev.top, window.innerHeight - 100)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 企鵝隨機移動
  useEffect(() => {
    if (!activeInterval) return;
    
    const moveInterval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% 機率移動，減少干擾
        // 決定移動距離和方向
        const moveX = (Math.random() * 80 + 30) * direction;
        const moveY = (Math.random() - 0.5) * 80; // 減少垂直移動幅度
        
        // 計算新位置
        const newLeft = Math.max(10, Math.min(bounds.width - 80, position.left + moveX));
        const newTop = Math.max(10, Math.min(bounds.height - 100, position.top + moveY));
        
        // 若碰到屏幕邊緣則改變方向
        if (newLeft <= 10 || newLeft >= bounds.width - 80) {
          setDirection(direction * -1);
        }
        
        // 更新位置
        setPosition({ left: newLeft, top: newTop });
        
        // 偶爾在移動時跳躍
        if (Math.random() > 0.7) {
          setIsJumping(true);
          setTimeout(() => setIsJumping(false), 500);
        }
      }
    }, 5000); // 增加間隔時間，減少干擾

    return () => clearInterval(moveInterval);
  }, [position, direction, bounds, activeInterval]);

  // 隨機生成帶有團隊成員名字的訊息
  const getRandomMessage = () => {
    const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    
    if (template.includes('NAME1') && template.includes('NAME2')) {
      // 雙人訊息模板
      const [member1, member2] = getTwoRandomMembers();
      return template.replace('NAME1', member1).replace('NAME2', member2);
    } else {
      // 單人訊息模板
      return template.replace('NAME', getRandomMember());
    }
  };

  // 計算訊息顯示時間 (依字數調整)
  const calculateMessageDisplayTime = (msg) => {
    // 基礎顯示時間 3 秒加上每個字符 100 毫秒
    const baseTime = 3000;
    const timePerChar = 100;
    return baseTime + (msg.length * timePerChar);
  };

  // 點擊處理
  const handleClick = () => {
    // 清除之前可能存在的訊息計時器
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
  
    // 決定顯示冰島資訊還是團隊成員訊息
    const showPersonalMessage = Math.random() > 0.4; // 60% 機率顯示團隊成員訊息
    
    // 設定訊息
    const newMessage = showPersonalMessage 
      ? getRandomMessage() 
      : icelandMessages[Math.floor(Math.random() * icelandMessages.length)];
    
    setMessage(newMessage);
    
    // 揮手動畫
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 800);
    
    // 跳躍動畫 (70% 機率)
    if (Math.random() > 0.3) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 800);
    }
    
    // 偶爾改變方向 (30% 機率)
    if (Math.random() > 0.7) {
      setDirection(direction * -1);
    }
    
    // 根據訊息長度計算顯示時間
    const displayTime = calculateMessageDisplayTime(newMessage);
    
    // 設定計時器並保存引用以便後續清除
    messageTimerRef.current = setTimeout(() => {
      setMessage('');
    }, displayTime);
  };

  // 暫時隱藏企鵝
  const handleHide = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    // 5-10分鐘後重新出現，避免頻繁打擾
    const reappearTime = 300000 + Math.random() * 300000; // 5-10分鐘
    setTimeout(() => setIsVisible(true), reappearTime);
  };

  // 設置不活躍狀態 (不再隨機移動)
  const handleInactive = (e) => {
    e.stopPropagation();
    setActiveInterval(false);
    
    // 顯示提示訊息
    setMessage('不打擾你了，點擊我可以再次聊天！');
    
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
    
    // 5秒後自動清除訊息
    messageTimerRef.current = setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  // 恢復活躍狀態
  const handleActive = (e) => {
    e.stopPropagation();
    setActiveInterval(true);
    
    // 顯示提示訊息
    setMessage('我回來啦！繼續陪你探索冰島～');
    
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
    
    // 4秒後自動清除訊息
    messageTimerRef.current = setTimeout(() => {
      setMessage('');
    }, 4000);
  };

  // 清理副作用
  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  // 確保企鵝不會在移動設備上遮擋太多內容
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // 在移動設備上，將企鵝放置在右下角
      setPosition({
        left: window.innerWidth - 100,
        top: window.innerHeight - 120
      });
      // 移動設備上默認不活躍，減少干擾
      setActiveInterval(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-40 transition-all duration-700 ease-in-out group"
      style={{ 
        left: `${position.left}px`, 
        top: `${position.top}px`,
        transition: 'left 0.8s ease-in-out, top 0.8s ease-in-out',
      }}
    >
      {/* 訊息氣泡 - 修復反轉問題 */}
      {message && (
        <div 
          className={`absolute bottom-full mb-2 p-3 rounded-lg max-w-xs text-xs ${theme.darkMode ? 'bg-blue-900 text-white' : 'bg-white text-blue-800'} border ${theme.darkMode ? 'border-blue-700' : 'border-blue-200'} shadow-lg`}
          style={{
            transform: `scaleX(${direction})`, // 確保氣泡方向與企鵝一致
            transformOrigin: 'bottom center',
            maxWidth: '220px',
            lineHeight: '1.3',
            left: direction > 0 ? '-30px' : '-20px', // 根據方向調整位置
          }}
        >
          <div style={{ transform: `scaleX(${direction})` }}> {/* 再次反轉讓文字恢復正常 */}
            {message}
          </div>
          <div 
            className={`absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 ${theme.darkMode ? 'bg-blue-900' : 'bg-white'} border-r ${theme.darkMode ? 'border-blue-700' : 'border-blue-200'} border-b ${theme.darkMode ? 'border-blue-700' : 'border-blue-200'}`}
          ></div>
        </div>
      )}
      
      {/* 企鵝 SVG */}
      <div 
        onClick={handleClick}
        className={`relative ${isWaving ? 'animate-wave' : ''} ${isJumping ? 'animate-jump' : ''} cursor-pointer`}
        style={{ 
          transform: `scaleX(${direction})`,
          opacity: activeInterval ? 1 : 0.7, // 非活躍狀態下降低透明度
          transition: 'opacity 0.3s ease',
        }}
      >
        <svg 
          width="70" 
          height="80" 
          viewBox="0 0 100 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md hover:drop-shadow-lg transition-all"
        >
          {/* 企鵝身體 */}
          <ellipse cx="50" cy="70" rx="35" ry="40" fill="#111827" />
          
          {/* 白色肚子 */}
          <ellipse cx="50" cy="75" rx="25" ry="30" fill="white" />
          
          {/* 頭部 */}
          <circle cx="50" cy="30" r="20" fill="#111827" />
          
          {/* 臉頰 */}
          <circle cx="35" cy="35" r="5" fill="#FFC0CB" opacity="0.3" />
          <circle cx="65" cy="35" r="5" fill="#FFC0CB" opacity="0.3" />
          
          {/* 眼睛 */}
          <circle cx="40" cy="25" r="5" fill="white" />
          <circle cx="60" cy="25" r="5" fill="white" />
          
          {/* 瞳孔 */}
          <circle cx="42" cy="24" r="2.5" fill="black" />
          <circle cx="58" cy="24" r="2.5" fill="black" />
          <circle cx="43" cy="23" r="1" fill="white" />
          <circle cx="59" cy="23" r="1" fill="white" />
          
          {/* 眉毛 */}
          <path d="M35 19 Q 40 17 45 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M55 19 Q 60 17 65 19" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* 嘴巴 */}
          <path d="M47 32 L53 32 L50 38 Z" fill="#FF9900" />
          
          {/* 翅膀 */}
          <path d="M15 70 Q 30 50 30 90 Q 20 95 15 70" fill="#111827" />
          <path d="M85 70 Q 70 50 70 90 Q 80 95 85 70" fill="#111827" />
          
          {/* 腳 */}
          <path d="M40 110 L45 100 L50 110 Z" fill="#FF9900" />
          <path d="M60 110 L55 100 L50 110 Z" fill="#FF9900" />
        </svg>
      </div>
      
      {/* 控制按鈕 - 增強型面板 (懸停時顯示) */}
      <div 
        className={`absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-0.5 -translate-y-6 -translate-x-1`}
        style={{ transform: `scaleX(${direction})` }} // 確保按鈕方向與企鵝一致
      >
        {/* 關閉按鈕 (隱藏企鵝) */}
        <button 
          onClick={handleHide}
          className={`w-5 h-5 flex items-center justify-center text-xs rounded-full ${theme.darkMode ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-400'} opacity-80 hover:opacity-100 transition-all duration-300 shadow-sm`}
          title="隱藏企鵝 (5-10分鐘後自動返回)"
          style={{ transform: `scaleX(${direction})` }} // 再次反轉讓文字圖標正常
        >
          ×
        </button>
        
        {/* 暫停/恢復按鈕 */}
        <button 
          onClick={activeInterval ? handleInactive : handleActive}
          className={`w-5 h-5 flex items-center justify-center text-xs rounded-full ${theme.darkMode ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'} opacity-80 hover:opacity-100 transition-all duration-300 shadow-sm`}
          title={activeInterval ? "停止自動移動" : "恢復自動移動"}
          style={{ transform: `scaleX(${direction})` }} // 再次反轉讓文字圖標正常
        >
          {activeInterval ? "⏸" : "▶"}
        </button>
      </div>
      
      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes jump {
          0% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          50% { transform: translateY(-25px); }
          60% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        
        .animate-wave {
          animation: wave 0.8s ease-in-out;
          transform-origin: center bottom;
        }
        
        .animate-jump {
          animation: jump 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PenguinPet;