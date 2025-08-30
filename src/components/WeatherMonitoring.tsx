import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, Calendar } from 'lucide-react';

const WeatherMonitoring = () => {
  const currentWeather = {
    temperature: 24,
    humidity: 68,
    windSpeed: 12,
    rainfall: 0,
    condition: 'Partly Cloudy',
    visibility: 10,
    pressure: 1013
  };

  const forecast = [
    { day: 'Today', high: 26, low: 18, condition: 'Partly Cloudy', rain: 10, icon: Cloud },
    { day: 'Tomorrow', high: 28, low: 20, condition: 'Sunny', rain: 0, icon: Sun },
    { day: 'Wednesday', high: 25, low: 19, condition: 'Light Rain', rain: 80, icon: CloudRain },
    { day: 'Thursday', high: 23, low: 17, condition: 'Rainy', rain: 90, icon: CloudRain },
    { day: 'Friday', high: 27, low: 21, condition: 'Sunny', rain: 5, icon: Sun },
    { day: 'Saturday', high: 29, low: 22, condition: 'Sunny', rain: 0, icon: Sun },
    { day: 'Sunday', high: 26, low: 20, condition: 'Partly Cloudy', rain: 15, icon: Cloud }
  ];

  const rainfallData = [
    { month: 'Jan', rainfall: 45, average: 52 },
    { month: 'Feb', rainfall: 38, average: 41 },
    { month: 'Mar', rainfall: 78, average: 69 },
    { month: 'Apr', rainfall: 142, average: 158 },
    { month: 'May', rainfall: 89, average: 95 },
    { month: 'Jun', rainfall: 23, average: 31 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Monitoring</h1>
        <p className="text-gray-600">Real-time weather conditions and forecasts for your fields</p>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          <span>Current Conditions</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl w-fit mx-auto mb-3">
              <Thermometer className="h-8 w-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{currentWeather.temperature}°C</p>
            <p className="text-gray-600">Temperature</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-3">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{currentWeather.humidity}%</p>
            <p className="text-gray-600">Humidity</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-4 rounded-2xl w-fit mx-auto mb-3">
              <Wind className="h-8 w-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{currentWeather.windSpeed}</p>
            <p className="text-gray-600">Wind (km/h)</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 rounded-2xl w-fit mx-auto mb-3">
              <CloudRain className="h-8 w-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{currentWeather.rainfall}</p>
            <p className="text-gray-600">Rainfall (mm)</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-semibold text-gray-900">Visibility</p>
                <p className="text-gray-600">{currentWeather.visibility} km</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Wind className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-semibold text-gray-900">Pressure</p>
                <p className="text-gray-600">{currentWeather.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-green-600" />
          <span>7-Day Forecast</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => {
            const Icon = day.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                <p className="font-semibold text-gray-900 mb-2">{day.day}</p>
                <div className="bg-white p-3 rounded-lg mb-3">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-gray-900">{day.high}°</p>
                  <p className="text-sm text-gray-600">{day.low}°</p>
                  <p className="text-xs text-blue-600">{day.rain}% rain</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rainfall Analysis */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <CloudRain className="h-5 w-5 text-blue-600" />
          <span>Rainfall Analysis</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Monthly Rainfall vs Average</h3>
            <div className="space-y-3">
              {rainfallData.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="w-8 text-sm font-medium text-gray-600">{data.month}</span>
                  <div className="flex-1 flex space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((data.rainfall / 200) * 100, 100)}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 bg-gray-400 h-4 w-1 rounded-full"
                        style={{ left: `${Math.min((data.average / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="w-12 text-sm font-semibold text-gray-900">{data.rainfall}mm</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Rainfall Alert</h4>
              <p className="text-sm text-blue-700">
                Above average rainfall expected this week. Monitor field drainage and consider delayed planting.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Optimal Conditions</h4>
              <p className="text-sm text-green-700">
                Current moisture levels are ideal for maize germination and early growth stages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMonitoring;