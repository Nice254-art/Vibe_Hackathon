/*
  # Create predictions table for yield predictions

  1. New Tables
    - `predictions`
      - `id` (uuid, primary key)
      - `field_id` (uuid, foreign key) - references fields.id
      - `predicted_yield` (decimal) - predicted yield in tons per hectare
      - `confidence` (decimal) - prediction confidence percentage (0-100)
      - `vegetation_indices` (jsonb) - vegetation index values
      - `weather_data` (jsonb) - weather data used for prediction
      - `model_version` (text) - ML model version used
      - `prediction_date` (date) - date for which prediction is made
      - `created_at` (timestamp) - prediction creation time

  2. Security
    - Enable RLS on `predictions` table
    - Add policy for users to read predictions for their fields
    - Add policy for cooperatives/government to read predictions
*/

CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE NOT NULL,
  predicted_yield decimal(10,2) NOT NULL CHECK (predicted_yield >= 0),
  confidence decimal(5,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  vegetation_indices jsonb DEFAULT '{}',
  weather_data jsonb DEFAULT '{}',
  model_version text DEFAULT 'GPR-v1.0',
  prediction_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Policy for users to read predictions for their fields
CREATE POLICY "Users can read own field predictions"
  ON predictions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM fields 
      WHERE fields.id = predictions.field_id 
      AND fields.user_id = auth.uid()
    )
  );

-- Policy for cooperatives/government to read predictions
CREATE POLICY "Cooperatives can read predictions"
  ON predictions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('cooperative', 'government', 'ngo')
    )
  );

-- Policy for system to insert predictions
CREATE POLICY "System can insert predictions"
  ON predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM fields
      WHERE fields.id = predictions.field_id
      AND fields.user_id = auth.uid()
    )
  );

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_predictions_field_id ON predictions(field_id);
CREATE INDEX IF NOT EXISTS idx_predictions_date ON predictions(prediction_date);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions(created_at);