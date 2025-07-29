import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  slug: string;
  titulo: string;
  descricao: string | null;
  instrutor: string | null;
  duracao_estimada: string | null;
  nivel: string | null;
  status: string | null;
  preco: number | null;
  moeda: string | null;
  tipo_preco: string | null;
  ordem_exibicao: number | null;
  created_at: string;
  updated_at: string;
}

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      console.log('Fetching courses...');
      
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .eq('status', 'ativo')
        .order('ordem_exibicao', { ascending: true });
      
      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      
      console.log('Fetched courses:', data);
      return data as Course[];
    },
    enabled: true
  });
};