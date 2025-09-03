import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'cooperative' | 'government' | 'ngo';
  location?: string;
  created_at: string;
}

export interface Field {
  id: string;
  user_id: string;
  name: string;
  location: string;
  area: number;
  crop_type: string;
  planting_date: string;
  health_score: number;
  predicted_yield: number;
  status: 'healthy' | 'warning' | 'critical';
  created_at: string;
  updated_at: string;
}

export interface Prediction {
  id: string;
  field_id: string;
  predicted_yield: number;
  confidence: number;
  vegetation_indices: {
    ndvi: number;
    evi: number;
    sarvi: number;
    gci: number;
    rvi: number;
    npcri: number;
    ndmi: number;
  };
  weather_data: {
    temperature: number;
    rainfall: number;
    humidity: number;
  };
  prediction_date: string;
  created_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  field_id?: string;
  type: 'weather' | 'health' | 'yield' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}