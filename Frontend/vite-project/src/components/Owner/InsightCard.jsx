import React from 'react';
import styles from './InsightCard.module.css';
import { Lightbulb, TrendingUp, Info } from 'lucide-react';

const InsightCard = ({ insight }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Lightbulb className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>AI Performance Insight</h4>
        <p className={styles.description}>{insight}</p>
      </div>
      <div className={styles.badge}>
         <TrendingUp className={styles.badgeIcon} />
         <span>Top Route</span>
      </div>
    </div>
  );
};

export default InsightCard;
