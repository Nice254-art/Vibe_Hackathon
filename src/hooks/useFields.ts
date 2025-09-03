import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Field } from '../lib/supabase';

export const useFields = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFields = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('fields')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setFields(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fields');
    } finally {
      setLoading(false);
    }
  };

  const addField = async (fieldData: Omit<Field, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('fields')
        .insert([fieldData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setFields(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add field');
    }
  };

  const updateField = async (id: string, updates: Partial<Field>) => {
    try {
      const { data, error } = await supabase
        .from('fields')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setFields(prev => prev.map(field => field.id === id ? data : field));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update field');
    }
  };

  const deleteField = async (id: string) => {
    try {
      const { error } = await supabase
        .from('fields')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setFields(prev => prev.filter(field => field.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete field');
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  return {
    fields,
    loading,
    error,
    addField,
    updateField,
    deleteField,
    refetch: fetchFields
  };
};