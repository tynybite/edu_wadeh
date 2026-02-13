import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'wadeh_application_id';

export function useApplicationForm() {
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize or Restore
  useEffect(() => {
    const initApplication = async () => {
      try {
        const storedId = localStorage.getItem(STORAGE_KEY);
        
        if (storedId) {
          // Verify it exists in DB
          const { data, error } = await supabase
            .from('applications')
            .select('id, step_data, current_step, status')
            .eq('id', storedId)
            .single();

          if (!error && data && data.status === 'draft') {
            console.log("Restoring application:", data.id);
            setApplicationId(data.id);
            // We return data so the component can pre-fill
            return data; 
          } else {
            // Invalid or submitted, clear it
            localStorage.removeItem(STORAGE_KEY);
          }
        }

        // Create new draft if none exists or invalid
        // logic moved to explicit "start" or lazy create?
        // Let's lazy create on first save/interaction or just create now.
        // Creating now ensures we have an ID to track "Lead" immediately.
        await createNewApplication();
        
      } catch (error) {
        console.error("Error initializing application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initApplication();
  }, []);

  const createNewApplication = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([{ status: 'draft', current_step: 1 }])
        .select()
        .single();

      if (error) throw error;
      
      setApplicationId(data.id);
      localStorage.setItem(STORAGE_KEY, data.id);
      return data;
    } catch (error) {
      console.error("Failed to create application draft", error);
    }
  };

  const saveProgress = useCallback(async (step: number, formData: any) => {
    if (!applicationId) return;

    try {
      const { error } = await supabase
        .from('applications')
        .update({
          current_step: step,
          step_data: formData, // JSONB updates the whole object or merges? Supabase sends the whole JSON usually. 
                               // We should probably merge existing? 
                               // For simplicity, we sending the *current* form state. 
                               // Ideally we fetch existing, merge, then update. 
                               // But react-hook-form has full state.
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;
      // console.log("Progress saved");
    } catch (error) {
      console.error("Failed to auto-save", error);
    }
  }, [applicationId]);

  const updateStatus = async (status: 'submitted' | 'draft') => {
    if (!applicationId) return;
    await supabase.from('applications').update({ status }).eq('id', applicationId);
    if (status === 'submitted') {
        localStorage.removeItem(STORAGE_KEY); // Clear local ref after submit
    }
  };

  return { applicationId, isLoading, saveProgress, updateStatus };
}
