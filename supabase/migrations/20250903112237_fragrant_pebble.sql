/*
  # Create alerts table for notifications

  1. New Tables
    - `alerts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - references users.id
      - `field_id` (uuid, foreign key, optional) - references fields.id
      - `type` (text) - alert type (weather, health, yield, system)
      - `severity` (text) - alert severity (low, medium, high, critical)
      - `title` (text) - alert title
      - `message` (text) - alert message
      - `read` (boolean) - whether alert has been read
      - `created_at` (timestamp) - alert creation time

  2. Security
    - Enable RLS on `alerts` table
    - Add policy for users to manage their own alerts
    - Add policy for system to create alerts
*/

CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  field_id uuid REFERENCES fields(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('weather', 'health', 'yield', 'system')),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own alerts
CREATE POLICY "Users can select own alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own alerts
CREATE POLICY "Users can insert own alerts"
  ON alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own alerts
CREATE POLICY "Users can update own alerts"
  ON alerts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own alerts
CREATE POLICY "Users can delete own alerts"
  ON alerts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for cooperatives/government to read alerts in their region
CREATE POLICY "Cooperatives can read alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('cooperative', 'government', 'ngo')
    )
  );

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_field_id ON alerts(field_id);
CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(type);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_read ON alerts(read);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at);