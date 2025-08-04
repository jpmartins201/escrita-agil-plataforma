
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAccess } from '@/hooks/useUserAccess';
import { supabase } from '@/integrations/supabase/client';

const Purchase = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: userProfile } = useUserAccess();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseSlug) return;

      // Buscar dados do curso na tabela cursos
      const { data: curso, error: cursoError } = await supabase
        .from('cursos')
        .select('*')
        .eq('slug', courseSlug)
        .single();

      if (cursoError || !curso) {
        console.error('Curso não encontrado:', cursoError);
        navigate('/cursos');
        setLoading(false);
        return;
      }

      // Buscar vídeos do curso
      const { data: videos, error: videosError } = await supabase
        .from('course_videos')
        .select('*')
        .eq('course_slug', courseSlug)
        .order('order_index');

      if (videosError) {
        console.error('Erro ao buscar vídeos:', videosError);
      }

      const courseData = {
        slug: courseSlug,
        title: curso.titulo,
        description: curso.descricao,
        preco: curso.preco,
        videoCount: videos?.length || 0,
        totalDuration: videos?.reduce((sum, video) => sum + (video.duration_minutes || 0), 0) || 0
      };
      
      console.log('Dados do curso carregados:', courseData);
      setCourseData(courseData);
      setLoading(false);
    };

    fetchCourseData();
  }, [courseSlug, navigate]);

  const getCourseTitleFromSlug = (slug: string) => {
    const titles: { [key: string]: string } = {
      'tcc-em-30-dias-metodo-agil': 'TCC em 30 Dias - Método Ágil',
      'metodo-rac-escrita-cientifica': 'Método RAC - Escrita Científica',
      'preparacao-para-mestrado': 'Preparação para Mestrado',
      'artigos-cientificos-de-impacto': 'Artigos Científicos de Impacto'
    };
    return titles[slug] || slug;
  };

  const getCourseDescriptionFromSlug = (slug: string) => {
    const descriptions: { [key: string]: string } = {
      'tcc-em-30-dias-metodo-agil': 'Um método comprovado para concluir seu TCC em apenas 30 dias, com técnicas ágeis e eficientes.',
      'metodo-rac-escrita-cientifica': 'Domine a metodologia RAC (Resumo, Análise, Comentário) para escrita científica de qualidade.',
      'preparacao-para-mestrado': 'Prepare-se completamente para o processo seletivo do mestrado com estratégias comprovadas.',
      'artigos-cientificos-de-impacto': 'Aprenda a escrever e publicar artigos científicos em revistas de alto impacto.'
    };
    return descriptions[slug] || 'Curso de alta qualidade para seu desenvolvimento acadêmico.';
  };

  const handlePurchase = async () => {
    if (!user || !courseSlug) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { courseSlug }
      });

      if (error) {
        console.error('Payment error:', error);
        alert('Erro ao processar pagamento. Tente novamente.');
        return;
      }

      if (data.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do curso...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Curso não encontrado</h2>
          <Button onClick={() => navigate('/cursos')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Cursos
          </Button>
        </div>
      </div>
    );
  }

  // Check if user already has access
  const hasAccess = userProfile?.cursos_liberados?.includes(courseSlug || '');
  if (hasAccess) {
    navigate(`/curso/${courseSlug}`);
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate('/cursos')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Cursos
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Adquira seu curso
            </h1>
            <p className="text-gray-600">
              Invista no seu futuro acadêmico
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Course Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{courseData.title}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  Curso Premium
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{courseData.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    {courseData.videoCount} vídeo aulas
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    {Math.floor(courseData.totalDuration / 60)}h {courseData.totalDuration % 60}min de conteúdo
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-purple-600 mr-2" />
                    Acesso vitalício
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Certificado de conclusão
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's included */}
            <Card>
              <CardHeader>
                <CardTitle>O que está incluído</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Todas as aulas em vídeo HD
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Material didático complementar
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Acesso vitalício ao conteúdo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Certificado de conclusão
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Suporte da comunidade
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  R$ {courseData.preco?.toFixed(2).replace('.', ',')}
                </div>
                <Badge variant="secondary">Pagamento único</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {!user ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-600">
                      Faça login para comprar este curso
                    </p>
                    <Button 
                      onClick={() => navigate('/login')}
                      className="w-full"
                    >
                      Fazer Login
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      onClick={handlePurchase}
                      className="w-full"
                      size="lg"
                      disabled={loading}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {loading ? 'Processando...' : 'Comprar Agora'}
                    </Button>
                    
                    <div className="text-center text-xs text-gray-500">
                      <Shield className="h-4 w-4 inline mr-1" />
                      Pagamento 100% seguro
                    </div>
                  </>
                )}

                <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {courseData.preco?.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impostos:</span>
                    <span>Inclusos</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {courseData.preco?.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;

