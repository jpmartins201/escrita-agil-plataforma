
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCanAccessCourse } from '@/hooks/useUserAccess';
import { useCourses } from '@/hooks/useCourses';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, ArrowLeft } from 'lucide-react';
import CourseVideos from '@/components/CourseVideos';

const CourseDetails = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { canAccess, userStatus, isLoading: accessLoading } = useCanAccessCourse(courseSlug || '');
  const { data: courses, isLoading: coursesLoading } = useCourses();

  // Debug logs
  console.log('🔍 CourseDetails - Course Slug:', courseSlug);
  console.log('👤 CourseDetails - User:', user);
  console.log('🔐 CourseDetails - Can Access:', canAccess);
  console.log('📊 CourseDetails - User Status:', userStatus);
  console.log('⏳ CourseDetails - Access Loading:', accessLoading);

  // Find course in database
  const course = courses?.find(c => c.slug === courseSlug);

  if (coursesLoading || accessLoading) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando curso...</p>
        </div>
      </div>
    );
  }

  if (!courseSlug || !course) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Curso não encontrado</h1>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Cursos
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Acesso Restrito</h2>
            <p className="text-muted-foreground mb-4">
              Você precisa fazer login para acessar este curso.
            </p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Cursos
        </Button>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{course.nivel}</Badge>
            {canAccess && (
              <Badge variant="default">Acesso Liberado</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4 font-aristotelica">{course.titulo}</h1>
          <p className="text-lg text-muted-foreground mb-2">{course.descricao}</p>
          <p className="text-sm text-muted-foreground">Instrutor: {course.instrutor}</p>
        </div>

        {canAccess ? (
          // User has access - show CourseVideos component with interactive player
          <CourseVideos courseSlug={courseSlug || ''} courseTitle={course.titulo} />
        ) : (
          // User doesn't have access - show upgrade message
          <Card className="text-center py-12">
            <CardContent>
              <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Acesso Restrito
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Você ainda não tem acesso a este curso. Faça sua assinatura ou compre o curso individual para começar a estudar.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Status atual: <Badge variant="outline">{userStatus}</Badge>
                </p>
                <div className="flex gap-4 justify-center">
                  <Button>
                    Comprar Curso
                  </Button>
                  <Button variant="outline">
                    Ver Planos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
