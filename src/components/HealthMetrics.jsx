import React, { useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { BsDroplet, BsHeart, BsActivity } from 'react-icons/bs';
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import EditMetricModal from './EditMetricModal';
import './HealthMetrics.css';

// Enhanced sparkline chart with animation and better visualization
const SparklineChart = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={60}>
    <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="75%" stopColor={color} stopOpacity={0.05} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={2}
        fill={`url(#gradient-${color.replace('#', '')})`}
        dot={false}
        activeDot={{ r: 4, strokeWidth: 1 }}
        isAnimationActive={true}
        animationDuration={1500}
        animationEasing="ease-out"
      />
    </AreaChart>
  </ResponsiveContainer>
);

// Detailed chart for expanded view
const DetailedChart = ({ data, color, title, unit }) => (
  <ResponsiveContainer width="100%" height={180} debounce={1}>
    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
      <XAxis 
        dataKey="name" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: '#64748b', fontSize: 10 }}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fill: '#64748b', fontSize: 10 }}
        domain={['dataMin - 10', 'dataMax + 10']}
        width={30}
      />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'rgba(255,255,255,0.9)', 
          backdropFilter: 'blur(10px)',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          color: '#1e293b'
        }}
        labelStyle={{ color: '#64748b' }}
        formatter={(value) => [`${value.toFixed(1)} ${unit}`, title]}
        isAnimationActive={true}
      />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        strokeWidth={3}
        dot={{ fill: color, strokeWidth: 2, r: 4, stroke: 'white' }}
        activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
        isAnimationActive={true}
        animationDuration={1500}
        animationEasing="ease-out"
      />
    </LineChart>
  </ResponsiveContainer>
);

const generateSmoothData = (baseValue) => {
  const numValue = Number(baseValue);
  // Generate more data points for a smoother chart
  return Array.from({ length: 12 }, (_, i) => {
    const progress = i / 11;
    const startValue = numValue - 15;
    const currentValue = startValue + (numValue - startValue) * progress;
    const variation = Math.sin(i / 2) * 3 + (Math.random() - 0.5) * 4;
    
    return {
      name: `Day ${i+1}`,
      value: currentValue + variation
    };
  });
};

const MetricCard = ({ metric, onEdit }) => {
  const { icon: Icon, title, value, unit, secondaryValue, status, color } = metric;
  const [chartData, setChartData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  // Generate new chart data whenever the value changes
  useEffect(() => {
    // Ensure we generate data even if the component just mounted
    const newData = generateSmoothData(value);
    setChartData(newData);
  }, [value]); // Only depend on value

  // Force re-render of graph when expanded changes
  useEffect(() => {
    if (expanded) {
      // Brief delay to ensure smooth transition
      setIsGraphVisible(false);
      const timer = setTimeout(() => {
        setIsGraphVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [expanded]);

  const toggleExpand = (e) => {
    // Prevent event bubbling to avoid triggering other handlers
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className={`metric-card ${expanded ? 'expanded' : ''}`}>
      <div className="card-header">
        <div className="title-section">
          <div className="icon-wrapper" style={{ backgroundColor: `${color}15` }}>
            <Icon className="metric-icon" style={{ color }} />
          </div>
          <span className="metric-title">{title}</span>
        </div>
        <div className="header-actions">
          <div className={`metric-status ${status}`}>
            <span className="status-dot"></span>
            {status}
          </div>
          <button 
            className="glass-button" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(metric);
            }}
            aria-label="Edit metric"
          >
            <FiEdit2 />
          </button>
        </div>
      </div>
      
      <div className="metric-content" onClick={toggleExpand}>
        <div className="metric-value">
          <span className="value">{value}</span>
          <span className="metric-unit">{unit}</span>
        </div>
        {secondaryValue && (
          <div className="secondary-value">{secondaryValue}</div>
        )}
      </div>

      <div className="metric-graph" onClick={toggleExpand}>
        {isGraphVisible && (expanded ? (
          <DetailedChart 
            data={chartData} 
            color={color} 
            title={title}
            unit={unit}
            key={`detailed-chart-${value}-${expanded}-${Date.now()}`}
          />
        ) : (
          <SparklineChart 
            data={chartData} 
            color={color} 
            key={`chart-${value}-${expanded}-${Date.now()}`}
          />
        ))}
      </div>
    </div>
  );
};

const HealthMetrics = () => {
  const [metrics, setMetrics] = useState([
    {
      id: 1,
      icon: BsDroplet,
      title: "Blood Glucose",
      value: "102",
      unit: "mg/dL",
      secondaryValue: "72 mg/dL",
      status: "Normal",
      color: "#3B82F6"
    },
    {
      id: 2,
      icon: BsHeart,
      title: "Blood Pressure",
      value: "98",
      unit: "bpm",
      status: "Normal",
      color: "#F87171"
    },
    {
      id: 3,
      icon: BsActivity,
      title: "Cholesterol",
      value: "139",
      unit: "mg/dL",
      status: "Normal",
      color: "#FBBF24"
    }
  ]);

  const [editingMetric, setEditingMetric] = useState(null);

  const handleEdit = (metric) => {
    setEditingMetric(metric);
  };

  const handleSave = (updatedMetric) => {
    const newStatus = updateMetricStatus(updatedMetric.value, updatedMetric);
    const finalMetric = {
      ...updatedMetric,
      value: String(updatedMetric.value), // Ensure value is a string
      status: newStatus
    };

    setMetrics(prevMetrics => 
      prevMetrics.map(metric => 
        metric.id === finalMetric.id ? finalMetric : metric
      )
    );
    setEditingMetric(null);
  };

  const updateMetricStatus = (value, metric) => {
    const numValue = Number(value);
    switch (metric.title) {
      case "Blood Glucose":
        if (numValue < 70) return "Low";
        if (numValue > 180) return "High";
        return "Normal";
      case "Blood Pressure":
        if (numValue < 60) return "Low";
        if (numValue > 100) return "High";
        return "Normal";
      case "Cholesterol":
        if (numValue < 130) return "Low";
        if (numValue > 200) return "High";
        return "Normal";
      default:
        return "Normal";
    }
  };

  return (
    <div className="health-metrics-container">
      <div className="health-metrics">
        {metrics.map((metric) => (
          <MetricCard 
            key={metric.id}
            metric={metric} 
            onEdit={handleEdit}
          />
        ))}
      </div>
      
      <EditMetricModal
        isOpen={!!editingMetric}
        metric={editingMetric}
        onClose={() => setEditingMetric(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default HealthMetrics; 