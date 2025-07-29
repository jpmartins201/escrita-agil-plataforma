
import { useState, useEffect } from 'react';
import { BookOpen, Play, Calendar, Download, Award, Clock, TrendingUp, Users, CheckCircle, ShoppingCart, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAccess } from '@/hooks/useUserAccess';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useUserQuizResult } from '@/hooks/useUserQuizResult';
import { CourseProgress } from '@/components/CourseProgress';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: userProfile } = useUserAccess();
  const { getOverallProgress, getCourseProgress, loading: progressLoading } = useUserProgress();
  const { data: userQuizResult } = useUserQuizResult();
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        // Buscar cursos da tabela consolidada
        const { data: courses, error } = await supabase
          .from('cursos')
          .select('*')
          .eq('status', 'ativo')
          .order('ordem_exibicao', { ascending: true });

        if (!error && courses) {
          const coursesWithAccess = courses.map(course => ({
            ...course,
            hasAccess: userProfile?.cursos_liberados?.includes(course.slug) || 
                      userProfile?.status === 'admin' || false
          }));
          
          setAvailableCourses(coursesWithAccess);
        }
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    if (userProfile) {
      fetchAvailableCourses();
    }
  }, [userProfile]);

  const enrolledCourses = availableCourses.filter(course => course.hasAccess);
  const availableForPurchase = availableCourses.filter(course => !course.hasAccess);
  
  const overallProgress = getOverallProgress();

  const stats = [
    { 
      label: 'Cursos Matriculado', 
      value: enrolledCourses.length.toString(), 
      icon: CheckCircle, 
      color: 'text-primary',
      description: 'Cursos com acesso liberado'
    },
    { 
      label: 'Progresso Geral', 
      value: `${overallProgress.overallPercentage}%`, 
      icon: TrendingUp, 
      color: 'text-secondary',
      description: `${overallProgress.watchedVideos} de ${overallProgress.totalVideos} vídeos`
    },
    { 
      label: 'Cursos Concluídos', 
      value: overallProgress.completedCourses.toString(), 
      icon: Award, 
      color: 'text-primary',
      description: `De ${overallProgress.totalCourses} cursos matriculados`
    },
    { 
      label: 'Status da Conta', 
      value: userProfile?.status || 'gratuito', 
      icon: Users, 
      color: 'text-secondary',
      description: 'Nível de acesso atual'
    }
  ];

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-aristotelica">
                Olá, {userProfile.full_name || user.email}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Continue sua jornada de aprendizado científico
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Status da conta</p>
                <Badge variant={userProfile.status === 'ativo' ? 'default' : 'secondary'}>
                  {userProfile.status || 'gratuito'}
                </Badge>
              </div>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">
                  {(userProfile.full_name || user.email || '').charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progresso Geral */}
        {!progressLoading && overallProgress.totalVideos > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-aristotelica">
                <TrendingUp className="h-5 w-5" />
                Resumo do Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progresso Geral</span>
                  <span className="text-sm text-muted-foreground">
                    {overallProgress.overallPercentage}%
                  </span>
                </div>
                <Progress value={overallProgress.overallPercentage} className="h-3" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-primary">{overallProgress.watchedVideos}</p>
                    <p className="text-xs text-muted-foreground">Vídeos Assistidos</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-secondary">{overallProgress.totalVideos}</p>
                    <p className="text-xs text-muted-foreground">Total de Vídeos</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{overallProgress.completedCourses}</p>
                    <p className="text-xs text-muted-foreground">Cursos Concluídos</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-secondary">{overallProgress.totalCourses}</p>
                    <p className="text-xs text-muted-foreground">Total de Cursos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground font-aristotelica">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Zodíaco Profissional */}
        {userQuizResult ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-aristotelica">
                <Brain className="h-5 w-5" />
                Seu Zodíaco Profissional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{userQuizResult.arquetipo_nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    Nível de confiança: {userQuizResult.nivel_confianca} • 
                    Teste realizado em {new Date(userQuizResult.created_at).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {Object.entries(userQuizResult.niveis_calculados).map(([trait, level]) => (
                      <span key={trait} className="text-xs bg-secondary/20 px-2 py-1 rounded-full">
                        {trait}: {level}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to="/zodiaco-resultado">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2 font-aristotelica">Descubra seu Zodíaco Profissional</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Faça nosso teste científico baseado no modelo Big Five e descubra seu perfil profissional ideal.
              </p>
              <Link to="/zodiaco-profissional">
                <Button>
                  <Brain className="h-4 w-4 mr-2" />
                  Fazer Teste Gratuito
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full lg:w-auto grid-cols-3">
            <TabsTrigger value="courses">Meus Cursos</TabsTrigger>
            <TabsTrigger value="available">Cursos Disponíveis</TabsTrigger>
            <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => {
                  const courseProgress = getCourseProgress(course.slug);
                  return (
                    <Card key={course.slug} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg font-aristotelica">{course.titulo}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Liberado</Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.nivel}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {course.descricao && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {course.descricao}
                          </p>
                        )}
                        
                        {courseProgress && (
                          <CourseProgress courseProgress={courseProgress} showDetails={true} />
                        )}
                        
                        <div className="flex gap-2">
                          <Link to={`/curso/${course.slug}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              <Play className="h-4 w-4 mr-2" />
                              Acessar Curso
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2 font-aristotelica">Nenhum curso liberado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Você ainda não tem acesso a nenhum curso. Adquira um curso para começar sua jornada científica!
                  </p>
                   <Button onClick={() => {
                     const tab = document.querySelector('[data-value="available"]') as HTMLButtonElement;
                     if (tab) {
                       tab.click();
                     }
                   }}>
                    Ver Cursos Disponíveis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Available Courses Tab */}
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {availableForPurchase.map((course) => (
                <Card key={course.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-aristotelica">{course.titulo}</CardTitle>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Disponível para compra</Badge>
                      {course.preco && (
                        <span className="text-lg font-bold text-primary">
                          R$ {course.preco.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.descricao && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.descricao}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duracao_estimada}</span>
                      <Badge variant="secondary" className="text-xs">
                        {course.nivel}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link to={`/curso/${course.slug}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Link to={`/comprar/${course.slug}`}>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Comprar
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nome Completo</label>
                    <p className="text-gray-900">{userProfile.full_name || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{userProfile.email || user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">CPF</label>
                    <p className="text-gray-900">{userProfile.cpf || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefone</label>
                    <p className="text-gray-900">{userProfile.phone || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Interesses de Estudo</label>
                    <p className="text-gray-900">
                      {userProfile.study_interests?.join(', ') || 'Não informado'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Qualificações</label>
                    <p className="text-gray-900">
                      {userProfile.qualifications?.join(', ') || 'Não informado'}
                    </p>
                  </div>
                </div>
                
                {(!userProfile.cpf || !userProfile.phone) && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ Complete seu perfil para ter acesso completo à plataforma.
                    </p>
                    <Link to="/profile-setup">
                      <Button size="sm" className="mt-2">
                        Completar Perfil
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

