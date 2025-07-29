
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Play, ChevronDown, ChevronUp, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import CourseVideos from '@/components/CourseVideos';

const Courses = () => {
  const { user, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: 'TCC em 30 Dias - Método Ágil',
      slug: 'tcc-em-30-dias-metodo-agil',
      instructor: 'Dr. Ana Silva',
      description: 'Aprenda a escrever seu TCC de forma organizada e eficiente em apenas 30 dias usando nossa metodologia comprovada.',
      price: 'R$ 297,00',
      originalPrice: 'R$ 497,00',
      duration: '4 semanas',
      students: 2847,
      rating: 4.9,
      level: 'Intermediário',
      category: 'TCC',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Método RAC - Escrita Científica',
      slug: 'metodo-rac-escrita-cientifica',
      instructor: 'Prof. Carlos Santos',
      description: 'Domine a técnica RAC (Resumir, Analisar, Criticar) para escrever textos científicos de qualidade.',
      price: 'R$ 197,00',
      originalPrice: 'R$ 347,00',
      duration: '2 semanas',
      students: 1523,
      rating: 4.8,
      level: 'Básico',
      category: 'Metodologia',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Preparação para Mestrado',
      slug: 'preparacao-para-mestrado',
      instructor: 'Dra. Maria Oliveira',
      description: 'Prepare-se completamente para ingressar no mestrado: projeto de pesquisa, seleção e muito mais.',
      price: 'R$ 397,00',
      originalPrice: 'R$ 597,00',
      duration: '6 semanas',
      students: 987,
      rating: 4.9,
      level: 'Avançado',
      category: 'Pós-graduação',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Artigos Científicos de Impacto',
      slug: 'artigos-cientificos-de-impacto',
      instructor: 'Dr. Roberto Lima',
      description: 'Aprenda a escrever e publicar artigos científicos em revistas de alto impacto.',
      price: 'R$ 347,00',
      originalPrice: 'R$ 497,00',
      duration: '5 semanas',
      students: 756,
      rating: 4.7,
      level: 'Avançado',
      category: 'Publicação',
      image: '/placeholder.svg'
    }
  ];

  const handleEnrollClick = async (courseSlug: string) => {
    if (user) {
      // User is already logged in, navigate to purchase page
      navigate(`/comprar/${courseSlug}`);
      return;
    }

    // User not logged in, navigate to register page
    navigate('/register');
  };

  const toggleCourseContent = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos Cursos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cursos práticos e eficazes para acelerar sua jornada acadêmica e científica
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="space-y-4">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-secondary to-secondary/80 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                    {course.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students} alunos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-secondary">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEnrollClick(course.slug)}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {user ? 'Comprar Curso' : 'Comprar Curso'}
                      </Button>
                      
                      <Link to={`/curso/${course.slug}`}>
                        <Button variant="outline" size="default">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <Collapsible open={expandedCourse === course.id} onOpenChange={() => toggleCourseContent(course.id)}>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="default">
                            {expandedCourse === course.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Collapsible open={expandedCourse === course.id}>
                <CollapsibleContent>
                  <Card className="mt-4">
                    <CardContent className="pt-6">
                      <CourseVideos courseSlug={course.slug} courseTitle={course.title} />
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-secondary rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Entre em contato conosco e descubra como podemos ajudar você
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Falar com Especialista
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;
