/*
  # Create fields table for field management

  1. New Tables
    - `fields`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - references users.id
      - `name` (text) - field name
      - `location` (text) - field location description
      - `coordinates` (jsonb) - field boundary coordinates
      - `area` (decimal) - field area in hectares
      - `crop_type` (text) - type of crop planted
      - `planting_date` (date) - when crop was planted
      - `health_score` (integer) - current health score (0-100)
      - `predicted_yield` (decimal) - predicted yield in tons per hectare
      - `status` (text) - field status (healthy, warning, critical)
      - `created_at` (timestamp) - field creation time
      - `updated_at` (timestamp) - last field update

  2. Security
    - Enable RLS on `fields` table
    - Add policy for users to manage their own fields
    - Add policy for cooperatives/government to read fields in their region
*/

CREATE TABLE IF NOT EXISTS fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  location text NOT NULL,
  coordinates jsonb,
  area decimal(10,2) NOT NULL CHECK (area > 0),
  crop_type text NOT NULL DEFAULT 'Maize',
  planting_date date,
  health_score integer DEFAULT 0 CHECK (health_score >= 0 AND health_score <= 100),
  predicted_yield decimal(10,2) DEFAULT 0 CHECK (predicted_yield >= 0),
  status text DEFAULT 'healthy' CHECK (status IN ('healthy', 'warning', 'critical')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own fields
CREATE POLICY "Users can select own fields"
  ON fields
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own fields
CREATE POLICY "Users can insert own fields"
  ON fields
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own fields
CREATE POLICY "Users can update own fields"
  ON fields
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own fields
CREATE POLICY "Users can delete own fields"
  ON fields
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for cooperatives/government to read fields (can be expanded based on location)
CREATE POLICY "Cooperatives can read fields"
  ON fields
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('cooperative', 'government', 'ngo')
    )
  );

-- Trigger to automatically update updated_at
CREATE TRIGGER update_fields_updated_at
  BEFORE UPDATE ON fields
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index for better query performance
CREATE INDEX IF NOT EXISTS idx_fields_user_id ON fields(user_id);
CREATE INDEX IF NOT EXISTS idx_fields_status ON fields(status);
CREATE INDEX IF NOT EXISTS idx_fields_crop_type ON fields(crop_type);