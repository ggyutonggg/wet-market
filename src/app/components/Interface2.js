'use client';

import styles from './Interface.module.css';

export default function Interface2() {
  return (
    <div className={styles.interface} style={{ backgroundImage: 'url(/images/market_background1.png)' }}>
      <img 
        src="/images/market_intro 2.png" 
        className={`${styles.bounce} ${styles.introImage}`} 
        alt="Intro 2" 
      />
      <img 
        src="/images/market_btn_next.png" 
        className={`${styles.bounce} ${styles.nextButton}`} 
        alt="Next" 
      />
    </div>
  );
} 