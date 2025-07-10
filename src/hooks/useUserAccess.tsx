
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  status: string | null;
  cursos_liberados: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  cpf: string | null;
  phone: string | null;
  study_interests: string[] | null;
  education_level: string | null;
  qualifications: string[] | null;
}

export const useUserAccess = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-access', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      console.log('Fetching user profile for access control:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      
      console.log('User profile data:', data);
      return data as UserProfile;
    },
    enabled: !!user
  });
};

export const useCanAccessCourse = (courseSlug: string) => {
  const { data: userProfile, isLoading } = useUserAccess();
  
  const canAccess = React.useMemo(() => {
    if (isLoading || !userProfile) {
      console.log('🚫 Acesso negado: Loading ou sem perfil de usuário');
      return false;
    }
    
    console.log('🔍 Verificando acesso ao curso:', courseSlug);
    console.log('👤 Status do usuário:', userProfile.status);
    console.log('📚 Cursos liberados:', userProfile.cursos_liberados);
    
    // ADMIN tem acesso a tudo
    if (userProfile.status === 'admin') {
      console.log('🔓 ADMIN: Acesso total liberado!');
      return true;
    }
    
    // Usuários com status "ativo" podem acessar cursos liberados
    if (userProfile.status === 'ativo' && userProfile.cursos_liberados) {
      const hasAccess = userProfile.cursos_liberados.includes(courseSlug);
      console.log(`${hasAccess ? '✅' : '❌'} Status ativo: ${hasAccess ? 'Tem' : 'Não tem'} acesso ao curso`);
      return hasAccess;
    }
    
    // Usuários gratuitos não podem acessar cursos pagos
    console.log('🚫 Status gratuito/pendente: Sem acesso a cursos');
    return false;
  }, [userProfile, courseSlug, isLoading]);
  
  return {
    canAccess,
    userStatus: userProfile?.status,
    isLoading
  };
};
