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
      compressed_documents: {
        Row: {
          id: string
          user_id: string
          original_name: string
          compressed_name: string
          original_size: number
          compressed_size: number
          compression_level: 'high' | 'medium' | 'low'
          storage_path: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          original_name: string
          compressed_name: string
          original_size: number
          compressed_size: number
          compression_level: 'high' | 'medium' | 'low'
          storage_path: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          original_name?: string
          compressed_name?: string
          original_size?: number
          compressed_size?: number
          compression_level?: 'high' | 'medium' | 'low'
          storage_path?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      compression_level: 'high' | 'medium' | 'low'
    }
  }
}