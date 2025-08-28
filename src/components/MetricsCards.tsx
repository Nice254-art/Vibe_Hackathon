import React from 'react';
import { TrendingUp, TrendingDown, MapPin, Cloud, Droplets, Thermometer } from 'lucide-react';

const MetricsCards = () => {
  const metrics = [
    {
      title: 'Predicted Yield',
      value: '4.2 t/ha',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      description: 'Above average for this season'
    },
    {
      title: 'Area Mapped',
      value: '125,340 ha',
      change: '+5%',
      trend: 'up',
      icon: MapPin,
      color: 'blue',
      description: 'Sentinel-2 coverage complete'
    },
    {
      title: 'Avg. NDVI',
      value: '0.74',
      change: '-3%',
      trend: 'down',
      icon: Droplets,
      color: 'purple',
      description: 'Healthy vegetation detected'
    },
    {
      title: 'Weather Risk',
      value: 'Low',
      change: 'Stable',
      trend: 'stable',
      icon: Cloud,
      color: 'orange',
      description: 'Favorable conditions'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colorClasses = {
          green: 'from-green-500 to-green-600',
          blue: 'from-blue-500 to-blue-600', 
          purple: 'from-purple-500 to-purple-600',
          orange: 'from-orange-500 to-orange-600',
        };

        return (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${colorClasses[metric.color as keyof typeof colorClasses]} p-3 rounded-xl`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                {metric.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-gray-600 font-medium text-sm mb-2">{metric.title}</p>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;