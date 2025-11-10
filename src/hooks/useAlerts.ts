import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Alert } from '../lib/supabase';

export const useAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          *,
          field:fields(name)
        `)
        .eq('user_id', user.id)
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
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('id', alertId)
        .eq('user_id', user.id);

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
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('read', false)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to mark all alerts as read');
    }
  };

  const createAlert = async (alertData: Omit<Alert, 'id' | 'created_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('alerts')
        .insert([{ ...alertData, user_id: user.id }])
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setAlerts(prev => [data, ...prev]);
        return data;
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create alert');
    }
  };

  useEffect(() => {
    fetchAlerts();

    if (!user) return;

    const subscription = supabase
      .channel(`alerts:${user.id}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'alerts', filter: `user_id=eq.${user.id}` },
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
  }, [user]);

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