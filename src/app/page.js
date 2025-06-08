'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Interface1 from './components/Interface1';
import Interface2 from './components/Interface2';
import Interface3 from './components/Interface3';

export default function Home() {
  const [currentInterface, setCurrentInterface] = useState(1);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        if (currentInterface < 3) {
          const audio = new Audio('/sounds/boss.MP3'); // 播放 boss.mp3
          audio.play();
          setCurrentInterface(prev => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentInterface]);

  return (
    <main className={styles.main}>
      {currentInterface === 1 && <Interface1 />}
      {currentInterface === 2 && <Interface2 />}
      {currentInterface === 3 && <Interface3 />}
    </main>
  );
}
