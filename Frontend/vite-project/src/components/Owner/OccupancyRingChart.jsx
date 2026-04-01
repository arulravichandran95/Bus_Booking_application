import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import styles from './OccupancyRingChart.module.css';
import { Users } from 'lucide-react';

const OccupancyRingChart = ({ percentage }) => {
  const data = [
    { name: 'Occupied', value: percentage },
    { name: 'Empty', value: 100 - percentage },
  ];

  const COLORS = ['#3eb8ff', 'rgba(255, 255, 255, 0.05)'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
           <Users className={styles.titleIcon} />
           <h3 className={styles.title}>Live Occupancy</h3>
        </div>
        <div className={styles.statusBadge}>Live</div>
      </div>
      
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                value={`${Math.round(percentage)}%`}
                position="center"
                className={styles.label}
                fill="#ffffff"
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.footer}>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
             <span className={styles.dotOccupied} />
             <span>Occupied</span>
          </div>
          <div className={styles.legendItem}>
             <span className={styles.dotEmpty} />
             <span>Empty</span>
          </div>
        </div>
        <p className={styles.note}>Updates every 3s</p>
      </div>
    </div>
  );
};

export default OccupancyRingChart;
