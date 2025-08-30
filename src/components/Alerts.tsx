import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info, Bell, Calendar, MapPin, Filter } from 'lucide-react';

interface Alert {
  id: string;
  type: 'weather' | 'health' | 'yield' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  field?: string;
  timestamp: string;
  read: boolean;
}

const Alerts = () => {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'weather',
      severity: 'high',
      title: 'Heavy Rainfall Warning',
      message: 'Heavy rainfall expected in the next 48 hours. Consider drainage preparation for North Field.',
      field: 'North Field',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'health',
      severity: 'medium',
      title: 'Vegetation Stress Detected',
      message: 'NDVI values below optimal range in South Field. Irrigation may be needed.',
      field: 'South Field',
      timestamp: '2024-01-15T08:15:00Z',
      read: false
    },
    {
      id: '3',
      type: 'yield',
      severity: 'low',
      title: 'Yield Forecast Updated',
      message: 'Predicted yield for East Field increased to 4.8 t/ha based on recent growth patterns.',
      field: 'East Field',
      timestamp: '2024-01-14T16:45:00Z',
      read: true
    },
    {
      id: '4',
      type: 'system',
      severity: 'low',
      title: 'Satellite Data Updated',
      message: 'New Sentinel-2 imagery processed for all fields. Updated vegetation indices available.',
      timestamp: '2024-01-14T12:00:00Z',
      read: true
    },
    {
      id: '5',
      type: 'weather',
      severity: 'critical',
      title: 'Drought Risk Alert',
      message: 'Extended dry period forecasted. Immediate irrigation planning recommended for all fields.',
      timestamp: '2024-01-13T14:20:00Z',
      read: false
    }
  ]);

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const getAlertIcon = (type: string, severity: string) => {
    const iconClass = severity === 'critical' ? 'h-6 w-6' : 'h-5 w-5';
    
    switch (type) {
      case 'weather':
        return <AlertTriangle className={`${iconClass} text-orange-500`} />;
      case 'health':
        return <XCircle className={`${iconClass} text-red-500`} />;
      case 'yield':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'system':
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <Bell className={`${iconClass} text-gray-500`} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.type === filter);
  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
          <p className="text-gray-600">Stay informed about important updates and warnings</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} unread
          </span>
          <button
            onClick={markAllAsRead}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-700">Filter by type:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'weather', 'health', 'yield', 'system'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === type
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-xl shadow-lg border-l-4 ${getSeverityColor(alert.severity)} ${
              !alert.read ? 'ring-2 ring-blue-100' : ''
            } hover:shadow-xl transition-all duration-200`}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type, alert.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${!alert.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {alert.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{alert.message}</p>
                      
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                        {alert.field && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{alert.field}</span>
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    {!alert.read && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="ml-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-green-100">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
          <p className="text-gray-600">No alerts match your current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;