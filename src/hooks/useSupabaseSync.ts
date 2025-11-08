import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSupabaseSync = () => {
  const { user, isAuthenticated } = useAuth0();
  const { toast } = useToast();

  useEffect(() => {
    const syncUserToSupabase = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const { error } = await supabase
          .from('users')
          .upsert(
            {
              auth0_id: user.sub!,
              email: user.email!,
              name: user.name || null,
              picture: user.picture || null,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'auth0_id',
            }
          );

        if (error) {
          console.error('Error syncing user to Supabase:', error);
          toast({
            title: 'Sync Error',
            description: 'Failed to sync user data. Some features may not work correctly.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error in user sync:', error);
      }
    };

    syncUserToSupabase();
  }, [user, isAuthenticated, toast]);
};
