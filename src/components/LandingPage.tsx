import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Satellite, TrendingUp, MapPin, Users, ArrowRight, CheckCircle, BarChart3, Shield, Smartphone } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Satellite,
      title: 'Satellite Monitoring',
      description: 'Real-time crop health analysis using Sentinel-2 imagery and vegetation indices'
    },
    {
      icon: TrendingUp,
      title: 'AI Yield Prediction',
      description: 'Machine learning models trained on African datasets for accurate maize yield forecasting'
    },
    {
      icon: MapPin,
      title: 'Field Mapping',
      description: 'Interactive maps showing field boundaries, health zones, and risk areas'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights with charts, trends, and actionable recommendations'
    },
    {
      icon: Shield,
      title: 'Early Warnings',
      description: 'Proactive alerts for weather risks, disease outbreaks, and irrigation needs'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First',
      description: 'Designed for smartphones with SMS integration for farmers without internet'
    }
  ];

  const stats = [
    { value: '25,000+', label: 'Farmers Served' },
    { value: '87%', label: 'Prediction Accuracy' },
    { value: '150,000', label: 'Hectares Monitored' },
    { value: '12%', label: 'Yield Improvement' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
                <Satellite className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CropSight</h1>
                <p className="text-xs text-gray-500">Smart Agriculture for Africa</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Predict Your <span className="text-green-600">Harvest</span>
              <br />Before You Plant
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empower African farmers with satellite-powered crop monitoring, AI yield predictions, 
              and real-time alerts to maximize harvests and reduce risks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Optimize Your Farm
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From satellite monitoring to AI predictions, CropSight provides comprehensive tools 
              for modern agricultural management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-xl w-fit mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Solving Africa's Agricultural Challenges
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reliable Yield Forecasting</h3>
                    <p className="text-gray-600">AI models trained specifically on African datasets for accurate predictions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Farmer-Friendly Design</h3>
                    <p className="text-gray-600">Simple dashboards and SMS alerts designed for smartphone users</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Affordable Technology</h3>
                    <p className="text-gray-600">Freemium model makes advanced agriculture tech accessible to all</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1"
              >
                Join CropSight Today
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yield Improvement</span>
                    <span className="font-semibold text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Reduction</span>
                    <span className="font-semibold text-green-600">-35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost Savings</span>
                    <span className="font-semibold text-green-600">$200/ha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers already using CropSight to increase yields and reduce risks.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-lg">
                  <Satellite className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">CropSight</h3>
                  <p className="text-gray-400 text-sm">Smart Agriculture for Africa</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering African farmers with satellite-powered crop monitoring and AI yield predictions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dashboard</li>
                <li>Field Management</li>
                <li>Yield Prediction</li>
                <li>Weather Monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Training</li>
                <li>API Docs</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CropSight. Transforming agriculture across Africa.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;