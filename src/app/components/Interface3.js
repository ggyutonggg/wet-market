'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Interface.module.css';

export default function Interface3() {
  const [pressedKeys, setPressedKeys] = useState({});
  const spaceAudioRef = useRef(null);
  const [bouncingKey, setBouncingKey] = useState(null);
  const bounceTimerRef = useRef(null);
  const [initialBounceTriggered, setInitialBounceTriggered] = useState(false);

  useEffect(() => {
    if (!spaceAudioRef.current) {
      spaceAudioRef.current = new Audio('/sounds/space.MP3');
    }

    if (!initialBounceTriggered) {
      const allKeys = ['A', 'W', 'E', 'F', 'SPACE', 'H', 'U', 'I', 'L'];
      let delay = 0;
      allKeys.forEach((key, index) => {
        setTimeout(() => {
          triggerBounce(key);
        }, delay + index * 100);
      });

      setInitialBounceTriggered(true);
    }

    const handleKeyPress = (event) => {
      let key = event.key.toUpperCase();
      if (event.code === 'Space') {
        key = 'SPACE';

        if (spaceAudioRef.current) {
          if (!spaceAudioRef.current.paused) {
            spaceAudioRef.current.pause();
            spaceAudioRef.current.currentTime = 0;
            setPressedKeys(prev => ({ ...prev, [key]: false }));
            triggerBounce(key);
          } else {
            spaceAudioRef.current.play();
            setPressedKeys(prev => ({ ...prev, [key]: true }));
            triggerBounce(key);
          }
        }
      } else if ('AWEFHUIL'.includes(key)) {
        if (!pressedKeys[key]) {
          setPressedKeys(prev => ({ ...prev, [key]: true }));
          const audio = new Audio(`/sounds/${getSoundForKey(key)}.MP3`);
          audio.play();
          triggerBounce(key);
        }
      }
    };

    const handleKeyUp = (event) => {
      let key = event.key.toUpperCase();
      if (event.code === 'Space') {
        key = 'SPACE';
      }

      if ('AWEFHUIL'.includes(key)) {
        if (pressedKeys[key]) {
          setPressedKeys(prev => ({ ...prev, [key]: false }));
          triggerBounce(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
      if (spaceAudioRef.current) {
        spaceAudioRef.current.pause();
        spaceAudioRef.current = null;
      }
      if (bounceTimerRef.current) {
        clearTimeout(bounceTimerRef.current);
      }
    };
  }, [initialBounceTriggered]);

  const triggerBounce = (keyToBounce) => {
    if (bounceTimerRef.current) {
      clearTimeout(bounceTimerRef.current);
    }
    setBouncingKey(keyToBounce);
    bounceTimerRef.current = setTimeout(() => {
      setBouncingKey(null);
    }, 500);
  };

  const getSoundForKey = (key) => {
    const soundMap = {
      'A': 'motorbike',
      'W': 'basket',
      'E': 'light',
      'F': 'boss',
      'SPACE': 'space',
      'H': 'board',
      'U': 'scale',
      'I': 'bag',
      'L': 'fishbowl'
    };
    return soundMap[key];
  };

  const getImageForKey = (key) => {
    if (key === 'SPACE') {
      if (spaceAudioRef.current && !spaceAudioRef.current.paused) {
        return 'market_space2';
      } else {
        return 'market_space';
      }
    }
    
    if (pressedKeys[key]) {
      const imageMap = {
        'A': 'market_motorbike',
        'W': 'market_basket',
        'E': 'market_light',
        'F': 'market_boss',
        'H': 'market_board',
        'U': 'market_scale',
        'I': 'market_bag',
        'L': 'market_fishbowl'
      };
      return imageMap[key];
    }
    return `market_${key}`;
  };

  const getButtonClass = (key) => {
    let classNames = [styles.gridItem];

    if (key === 'SPACE') {
      classNames.push(styles.spaceButton);
    }

    if (bouncingKey === key) {
      classNames.push(styles.bounce);
    }

    return classNames.join(' ');
  };

  return (
    <div className={styles.interface} style={{ backgroundImage: 'url(/images/market_background1.png)' }}>
      <div className={styles.mainContainer}>
        <img 
          src="/images/main.png" 
          className={styles.mainImage}
          alt="Main" 
        />
        <div className={styles.gridContainer}>
          {['A', 'W', 'E', 'F', 'SPACE', 'H', 'U', 'I', 'L'].map((key) => (
            <img
              key={key}
              src={`/images/${getImageForKey(key)}.png`}
              className={getButtonClass(key)}
              alt={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 