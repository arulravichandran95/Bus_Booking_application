import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './RevenueHeatmap.module.css';
import { DollarSign, TrendingUp } from 'lucide-react';

const RevenueHeatmap = ({ data, totalRevenue }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <DollarSign className={styles.titleIcon} />
          <h3 className={styles.title}>Revenue Performance</h3>
        </div>
        <div className={styles.totalWrapper}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalValue}>${totalRevenue.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#718096', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#718096', fontSize: 12 }} 
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: '#1a202c',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
              }}
              itemStyle={{ color: '#3eb8ff' }}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.revenue === maxRevenue ? '#3eb8ff' : 'rgba(62, 184, 255, 0.3)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.footer}>
         <div className={styles.insight}>
            <TrendingUp size={14} className={styles.insightIcon} />
            <span>Highest revenue on Saturday</span>
         </div>
      </div>
    </div>
  );
};

export default RevenueHeatmap;
