import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Alert } from '../lib/supabase';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          *,
          field:fields(name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setAlerts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('id', alertId);

      if (error) {
        throw error;
      }

      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to mark alert as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('read', false);

      if (error) {
        throw error;
      }

      setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to mark all alerts as read');
    }
  };

  const createAlert = async (alertData: Omit<Alert, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .insert([alertData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setAlerts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create alert');
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('alerts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'alerts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAlerts(prev => [payload.new as Alert, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setAlerts(prev => prev.map(alert => 
              alert.id === payload.new.id ? payload.new as Alert : alert
            ));
          } else if (payload.eventType === 'DELETE') {
            setAlerts(prev => prev.filter(alert => alert.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    alerts,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    createAlert,
    refetch: fetchAlerts
  };
};