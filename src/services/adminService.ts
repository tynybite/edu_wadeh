import { supabase } from "@/lib/supabase";
import { Database, Json } from "@/lib/supabase";

export type Application = Database['public']['Tables']['applications']['Row'];
export type Coupon = Database['public']['Tables']['coupons']['Row'];
export type AppSetting = Database['public']['Tables']['app_settings']['Row'];

export const adminService = {
  // Applications
  async getApplications() {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateApplicationStatus(id: string, status: Application['status']) {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  },

  // Coupons
  async getCoupons() {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async createCoupon(coupon: Database['public']['Tables']['coupons']['Insert']) {
    const { data, error } = await supabase
      .from('coupons')
      .insert(coupon)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async toggleCoupon(code: string, active: boolean) {
    const { error } = await supabase
      .from('coupons')
      .update({ active })
      .eq('code', code);
      
    if (error) throw error;
  },

  // Settings
  async getSettings() {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*');
      
    if (error) throw error;
    return data;
  },

  async updateSetting(key: string, value: Json) {
    // Upsert to handle creation if missing
    const { data, error } = await supabase
      .from('app_settings')
      .upsert({ key, value }, { onConflict: 'key' })
      .select();
      
    if (error) throw error;
    return data;
  }
};
