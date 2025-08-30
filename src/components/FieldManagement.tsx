import React, { useState } from 'react';
import { Plus, MapPin, Edit, Trash2, Eye, Calendar, Ruler } from 'lucide-react';

interface Field {
  id: string;
  name: string;
  location: string;
  area: number;
  cropType: string;
  plantingDate: string;
  healthScore: number;
  predictedYield: number;
  status: 'healthy' | 'warning' | 'critical';
}

const FieldManagement = () => {
  const [fields, setFields] = useState<Field[]>([
    {
      id: '1',
      name: 'North Field',
      location: 'Nakuru County, Kenya',
      area: 5.2,
      cropType: 'Maize',
      plantingDate: '2024-03-15',
      healthScore: 92,
      predictedYield: 4.8,
      status: 'healthy'
    },
    {
      id: '2',
      name: 'South Field',
      location: 'Nakuru County, Kenya',
      area: 3.8,
      cropType: 'Maize',
      plantingDate: '2024-03-20',
      healthScore: 76,
      predictedYield: 3.9,
      status: 'warning'
    },
    {
      id: '3',
      name: 'East Field',
      location: 'Nakuru County, Kenya',
      area: 7.1,
      cropType: 'Maize',
      plantingDate: '2024-03-10',
      healthScore: 88,
      predictedYield: 4.5,
      status: 'healthy'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({
    name: '',
    location: '',
    area: '',
    cropType: 'Maize',
    plantingDate: ''
  });

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    const field: Field = {
      id: Date.now().toString(),
      name: newField.name,
      location: newField.location,
      area: parseFloat(newField.area),
      cropType: newField.cropType,
      plantingDate: newField.plantingDate,
      healthScore: Math.floor(Math.random() * 30) + 70,
      predictedYield: Math.random() * 2 + 3,
      status: Math.random() > 0.7 ? 'warning' : 'healthy'
    };
    
    setFields([...fields, field]);
    setNewField({ name: '', location: '', area: '', cropType: 'Maize', plantingDate: '' });
    setShowAddForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Field Management</h1>
          <p className="text-gray-600">Monitor and manage your agricultural fields</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Field</span>
        </button>
      </div>

      {/* Add Field Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Field</h2>
            <form onSubmit={handleAddField} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., North Field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newField.location}
                  onChange={(e) => setNewField({ ...newField, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Nakuru County, Kenya"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (hectares)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newField.area}
                  onChange={(e) => setNewField({ ...newField, area: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., 5.2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                <select
                  value={newField.cropType}
                  onChange={(e) => setNewField({ ...newField, cropType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Maize">Maize</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Sorghum">Sorghum</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
                <input
                  type="date"
                  value={newField.plantingDate}
                  onChange={(e) => setNewField({ ...newField, plantingDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Add Field
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div key={field.id} className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{field.name}</h3>
                <p className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{field.location}</span>
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(field.status)}`}>
                {field.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 flex items-center space-x-1">
                  <Ruler className="h-4 w-4" />
                  <span>Area</span>
                </span>
                <span className="font-semibold text-gray-900">{field.area} ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Crop Type</span>
                <span className="font-semibold text-gray-900">{field.cropType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Planted</span>
                </span>
                <span className="font-semibold text-gray-900">{new Date(field.plantingDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Health Score</span>
                  <span className="font-semibold text-gray-900">{field.healthScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      field.healthScore >= 85 ? 'bg-green-500' : 
                      field.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${field.healthScore}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Predicted Yield</span>
                  <span className="font-semibold text-green-600">{field.predictedYield.toFixed(1)} t/ha</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-green-50 text-green-700 py-2 px-3 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>View</span>
              </button>
              <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button className="bg-red-50 text-red-700 py-2 px-3 rounded-lg font-medium hover:bg-red-100 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{fields.length}</p>
              <p className="text-sm text-gray-600">Total Fields</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Ruler className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{fields.reduce((sum, field) => sum + field.area, 0).toFixed(1)}</p>
              <p className="text-sm text-gray-600">Total Area (ha)</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{(fields.reduce((sum, field) => sum + field.predictedYield, 0) / fields.length).toFixed(1)}</p>
              <p className="text-sm text-gray-600">Avg Yield (t/ha)</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{Math.round(fields.reduce((sum, field) => sum + field.healthScore, 0) / fields.length)}</p>
              <p className="text-sm text-gray-600">Avg Health Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldManagement;