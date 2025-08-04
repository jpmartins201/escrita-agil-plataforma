import { useAuth } from '@/contexts/AuthContext';
import { useUserAccess } from '@/hooks/useUserAccess';

export const usePurchaseButton = (courseSlug: string) => {
  const { user } = useAuth();
  const { data: userProfile, isLoading } = useUserAccess();

  const hasAccess = userProfile?.cursos_liberados?.includes(courseSlug) || false;
  const isAdmin = userProfile?.status === 'admin';

  // Admin sempre tem acesso
  const canAccess = isAdmin || hasAccess;

  return {
    user,
    canAccess,
    isLoading,
    buttonText: canAccess ? 'Acessar Curso' : 'Comprar Curso',
    buttonAction: canAccess ? 'access' : 'purchase'
  };
};