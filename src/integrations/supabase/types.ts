export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      arquetipos: {
        Row: {
          carreiras_favoraveis: string[]
          created_at: string
          cursos_indicados: string[]
          cursos_sugeridos: string[]
          descricao: string
          entusiasta: string
          id: string
          mente_aberta: string
          nome: string
          organizado: string
          sensivel: string
          tecnico: string
          updated_at: string
        }
        Insert: {
          carreiras_favoraveis?: string[]
          created_at?: string
          cursos_indicados?: string[]
          cursos_sugeridos?: string[]
          descricao: string
          entusiasta: string
          id?: string
          mente_aberta: string
          nome: string
          organizado: string
          sensivel: string
          tecnico: string
          updated_at?: string
        }
        Update: {
          carreiras_favoraveis?: string[]
          created_at?: string
          cursos_indicados?: string[]
          cursos_sugeridos?: string[]
          descricao?: string
          entusiasta?: string
          id?: string
          mente_aberta?: string
          nome?: string
          organizado?: string
          sensivel?: string
          tecnico?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_videos: {
        Row: {
          course_slug: string
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          order_index: number | null
          preco: number | null
          title: string
          upload_date: string | null
          video_url: string
        }
        Insert: {
          course_slug: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          order_index?: number | null
          preco?: number | null
          title: string
          upload_date?: string | null
          video_url: string
        }
        Update: {
          course_slug?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          order_index?: number | null
          preco?: number | null
          title?: string
          upload_date?: string | null
          video_url?: string
        }
        Relationships: []
      }
      cursos: {
        Row: {
          created_at: string
          descricao: string | null
          duracao_estimada: string | null
          instrutor: string | null
          moeda: string | null
          nivel: string | null
          ordem_exibicao: number | null
          preco: number | null
          price_id: string | null
          slug: string
          status: string | null
          tipo_preco: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          duracao_estimada?: string | null
          instrutor?: string | null
          moeda?: string | null
          nivel?: string | null
          ordem_exibicao?: number | null
          preco?: number | null
          price_id?: string | null
          slug: string
          status?: string | null
          tipo_preco?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          duracao_estimada?: string | null
          instrutor?: string | null
          moeda?: string | null
          nivel?: string | null
          ordem_exibicao?: number | null
          preco?: number | null
          price_id?: string | null
          slug?: string
          status?: string | null
          tipo_preco?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      darcy_bd: {
        Row: {
          created_at: string
          id: string
          numero_mensagem: number
          texto: string
        }
        Insert: {
          created_at?: string
          id?: string
          numero_mensagem: number
          texto: string
        }
        Update: {
          created_at?: string
          id?: string
          numero_mensagem?: number
          texto?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          cpf: string | null
          created_at: string | null
          cursos_liberados: string[] | null
          education_level: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          qualifications: string[] | null
          status: string | null
          study_interests: string[] | null
          updated_at: string | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          cursos_liberados?: string[] | null
          education_level?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          qualifications?: string[] | null
          status?: string | null
          study_interests?: string[] | null
          updated_at?: string | null
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          cursos_liberados?: string[] | null
          education_level?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          qualifications?: string[] | null
          status?: string | null
          study_interests?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          inverso: boolean
          pergunta_numero: number
          texto: string
          traco: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          inverso?: boolean
          pergunta_numero: number
          texto: string
          traco: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          inverso?: boolean
          pergunta_numero?: number
          texto?: string
          traco?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          arquetipo_nome: string
          created_at: string
          id: string
          niveis_calculados: Json
          nivel_confianca: string
          respostas: Json
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          arquetipo_nome: string
          created_at?: string
          id?: string
          niveis_calculados: Json
          nivel_confianca: string
          respostas: Json
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          arquetipo_nome?: string
          created_at?: string
          id?: string
          niveis_calculados?: Json
          nivel_confianca?: string
          respostas?: Json
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          created_at: string
          curso_slug: string
          id: string
          updated_at: string
          user_id: string
          video_id: string
          watched: boolean
          watched_at: string | null
        }
        Insert: {
          created_at?: string
          curso_slug: string
          id?: string
          updated_at?: string
          user_id: string
          video_id: string
          watched?: boolean
          watched_at?: string | null
        }
        Update: {
          created_at?: string
          curso_slug?: string
          id?: string
          updated_at?: string
          user_id?: string
          video_id?: string
          watched?: boolean
          watched_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
