/*
  # Create weather_data table for weather monitoring

  1. New Tables
    - `weather_data`
      - `id` (uuid, primary key)
      - `location` (text) - location identifier
      - `coordinates` (jsonb) - lat/lng coordinates
      - `temperature` (decimal) - temperature in Celsius
      - `humidity` (decimal) - humidity percentage
      - `rainfall` (decimal) - rainfall in mm
      - `wind_speed` (decimal) - wind speed in km/h
      - `pressure` (decimal) - atmospheric pressure in hPa
      - `visibility` (decimal) - visibility in km
      - `condition` (text) - weather condition description
      - `forecast_date` (date) - date for forecast data
      - `data_source` (text) - source of weather data
      - `created_at` (timestamp) - data creation time

  2. Security
    - Enable RLS on `weather_data` table
    - Add policy for authenticated users to read weather data
*/

CREATE TABLE IF NOT EXISTS weather_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  coordinates jsonb,
  temperature decimal(5,2),
  humidity decimal(5,2) CHECK (humidity >= 0 AND humidity <= 100),
  rainfall decimal(8,2) DEFAULT 0 CHECK (rainfall >= 0),
  wind_speed decimal(6,2) DEFAULT 0 CHECK (wind_speed >= 0),
  pressure decimal(7,2),
  visibility decimal(6,2),
  condition text,
  forecast_date date NOT NULL,
  data_source text DEFAULT 'API',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read weather data
CREATE POLICY "Authenticated users can read weather data"
  ON weather_data
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for system to insert weather data
CREATE POLICY "System can insert weather data"
  ON weather_data
  FOR INSERT
  TO authenticated
  USING (true);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_weather_location ON weather_data(location);
CREATE INDEX IF NOT EXISTS idx_weather_forecast_date ON weather_data(forecast_date);
CREATE INDEX IF NOT EXISTS idx_weather_created_at ON weather_data(created_at);