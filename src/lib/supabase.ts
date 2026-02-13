import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check .env.local');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Database Types Interface
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
    public: {
      Tables: {
        batches: {
          Row: {
            id: string
            created_at: string
            name: string
            program: string
            start_date: string
            end_date: string
          }
          Insert: {
            id?: string
            created_at?: string
            name: string
            program: string
            start_date: string
            end_date: string
          }
          Update: {
            id?: string
            created_at?: string
            name?: string
            program?: string
            start_date?: string
            end_date?: string
          }
        }
        students: {
          Row: {
            id: string
            created_at: string
            user_id: string | null
            application_id: string | null
            batch_id: string | null
            enrollment_number: string
            current_semester: number
            full_name: string | null
            email: string | null
            phone: string | null
          }
          Insert: {
            id?: string
            created_at?: string
            user_id?: string | null
            application_id?: string | null
            batch_id?: string | null
            enrollment_number: string
            current_semester?: number
            full_name?: string | null
            email?: string | null
            phone?: string | null
          }
          Update: {
            id?: string
            created_at?: string
            user_id?: string | null
            application_id?: string | null
            batch_id?: string | null
            enrollment_number?: string
            current_semester?: number
            full_name?: string | null
            email?: string | null
            phone?: string | null
          }
        }
        notices: {
          Row: {
            id: string
            created_at: string
            title: string
            content: string
            audience_type: 'all' | 'batch' | 'program'
            target_batch_id: string | null
            is_active: boolean
            author_id: string | null
          }
          Insert: {
            id?: string
            created_at?: string
            title: string
            content: string
            audience_type?: 'all' | 'batch' | 'program'
            target_batch_id?: string | null
            is_active?: boolean
            author_id?: string | null
          }
          Update: {
            id?: string
            created_at?: string
            title?: string
            content?: string
            audience_type?: 'all' | 'batch' | 'program'
            target_batch_id?: string | null
            is_active?: boolean
            author_id?: string | null
          }
        }
        news: {
          Row: {
            id: string
            created_at: string
            title: string
            content: string
            image_url: string | null
            published_at: string
            is_active: boolean
          }
          Insert: {
            id?: string
            created_at?: string
            title: string
            content: string
            image_url?: string | null
            published_at?: string
            is_active?: boolean
          }
          Update: {
            id?: string
            created_at?: string
            title?: string
            content?: string
            image_url?: string | null
            published_at?: string
            is_active?: boolean
          }
        }
        admission_cycles: {
          Row: {
            id: string
            created_at: string
            program: string
            start_date: string
            end_date: string
            is_open: boolean
          }
          Insert: {
            id?: string
            created_at?: string
            program: string
            start_date: string
            end_date: string
            is_open?: boolean
          }
          Update: {
            id?: string
            created_at?: string
            program?: string
            start_date?: string
            end_date?: string
            is_open?: boolean
          }
        }
        leads: {
          Row: {
            id: string
            created_at: string
            name: string
            email: string
            phone: string
            program: string
            status: 'new' | 'contacted' | 'admitted' | 'rejected'
            notes: string | null
          }
          Insert: {
            id?: string
            created_at?: string
            name: string
            email: string
            phone: string
            program: string
            status?: 'new' | 'contacted' | 'admitted' | 'rejected'
            notes?: string | null
          }
          Update: {
            id?: string
            created_at?: string
            name?: string
            email?: string
            phone?: string
            program?: string
            status?: 'new' | 'contacted' | 'admitted' | 'rejected'
            notes?: string | null
          }
        }
        payments: {
          Row: {
            id: string
            created_at: string
            lead_id: string
            amount: number
            status: 'pending' | 'success' | 'failed'
            transaction_id: string
            payment_method: string | null
          }
          Insert: {
            id?: string
            created_at?: string
            lead_id: string
            amount: number
            status?: 'pending' | 'success' | 'failed'
            transaction_id: string
            payment_method?: string | null
          }
          Update: {
            id?: string
            created_at?: string
            lead_id?: string
            amount?: number
            status?: 'pending' | 'success' | 'failed'
            transaction_id?: string
            payment_method?: string | null
          }
        }
        applications: {
          Row: {
            id: string
            created_at: string
            updated_at: string
            lead_id: string | null
            status: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected'
            current_step: number
            step_data: Json
            documents: Json
            fee_amount: number
            coupon_code: string | null
            applicant_name: string | null
            applicant_email: string | null
            applicant_phone: string | null
          }
          Insert: {
            id?: string
            created_at?: string
            updated_at?: string
            lead_id?: string | null
            status?: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected'
            current_step?: number
            step_data?: Json
            documents?: Json
            fee_amount?: number
            coupon_code?: string | null
            applicant_name?: string | null
            applicant_email?: string | null
            applicant_phone?: string | null
          }
          Update: {
            id?: string
            created_at?: string
            updated_at?: string
            lead_id?: string | null
            status?: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected'
            current_step?: number
            step_data?: Json
            documents?: Json
            fee_amount?: number
            coupon_code?: string | null
            applicant_name?: string | null
            applicant_email?: string | null
            applicant_phone?: string | null
          }
        }
        coupons: {
          Row: {
            code: string
            created_at: string
            discount_type: 'percentage' | 'fixed'
            discount_value: number
            active: boolean
            max_uses: number | null
            used_count: number
          }
          Insert: {
            code: string
            created_at?: string
            discount_type: 'percentage' | 'fixed'
            discount_value: number
            active?: boolean
            max_uses?: number | null
            used_count?: number
          }
          Update: {
            code?: string
            created_at?: string
            discount_type?: 'percentage' | 'fixed'
            discount_value?: number
            active?: boolean
            max_uses?: number | null
            used_count?: number
          }
        }
        app_settings: {
          Row: {
            key: string
            value: Json
            updated_at: string
          }
          Insert: {
            key: string
            value: Json
            updated_at?: string
          }
          Update: {
            key?: string
            value?: Json
            updated_at?: string
          }
        }
      }
    }
  }

