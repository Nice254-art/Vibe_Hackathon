import React from 'react';
import { ArrowRight, Database, Cpu, TrendingUp, Eye } from 'lucide-react';

const WorkflowDiagram = () => {
  const steps = [
    {
      id: 'gee',
      title: 'Google Earth Engine',
      subtitle: 'GEE Platform',
      icon: Database,
      color: 'bg-blue-500',
    },
    {
      id: 'sentinel',
      title: 'Sentinel-2 Data',
      subtitle: 'Satellite Imagery',
      icon: Eye,
      color: 'bg-purple-500',
    },
    {
      id: 'maize',
      title: 'Maize Algorithm',
      subtitle: 'Crop Classification',
      icon: Cpu,
      color: 'bg-green-500',
    },
    {
      id: 'gpr',
      title: 'GPR Framework',
      subtitle: 'ML Processing',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      id: 'prediction',
      title: 'Yield Prediction',
      subtitle: 'Final Output',
      icon: TrendingUp,
      color: 'bg-red-500',
    },
  ];

  const vegetationIndices = ['EVI', 'NDVI', 'SARVI', 'GCI', 'RVI', 'NPCRI', 'NDMI'];

  return (
    <div className="space-y-8">
      {/* Main Workflow */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center group">
                <div className={`${step.color} p-4 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{step.subtitle}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Supporting Data Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">Data Inputs</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-700">Maize Area Mapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-blue-700">Rainfall Datasets</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-blue-700">Production Datasets</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">Vegetation Indices</h3>
          <div className="grid grid-cols-3 gap-2">
            {vegetationIndices.map((index) => (
              <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium text-center">
                {index}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;