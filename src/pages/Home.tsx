import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Users, 
  Clock, 
  BookOpen, 
  Target, 
  Briefcase, 
  TrendingUp, 
  CheckCircle, 
  Star,
  GraduationCap,
  Award,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-academic-professional.jpg';

const Home = () => {
  const stats = [
    { number: '10+', label: 'Instrutores especializados', icon: Users, color: 'text-blue-600' },
    { number: '1.500+', label: 'Carreiras transformadas', icon: TrendingUp, color: 'text-green-600' },
    { number: '200h+', label: 'Mentorias individuais', icon: Clock, color: 'text-purple-600' },
    { number: '400h+', label: 'Conteúdo especializado', icon: BookOpen, color: 'text-orange-600' }
  ];

  const services = [
    {
      title: 'Escrita Ágil para TCC',
      subtitle: 'Método comprovado em 30 dias',
      description: 'Transforme seu TCC de pesadelo em realidade. Nossa metodologia ágil já ajudou +1500 acadêmicos a conquistarem suas formações e adentrarem o mercado profissional com confiança.',
      features: ['14 videoaulas práticas', 'Modelos prontos para cada seção', '5 bônus exclusivos', 'Suporte dedicado'],
      cta: 'Garanta sua formação agora!',
      buttonText: 'Quero me formar',
      link: '/comprar/tcc-em-30-dias-metodo-agil',
      badge: 'Mais Popular',
      badgeColor: 'bg-green-500'
    },
    {
      title: 'Preparação para Mestrado',
      subtitle: 'Seu passaporte para a pós-graduação',
      description: 'Conquiste sua vaga no mestrado e acelere sua transição para o mercado acadêmico ou corporativo. Método testado com 95% de aprovação.',
      features: ['12 videoaulas estratégicas', 'Modelos de projeto de pesquisa', '5 bônus sensacionais', 'Mentoria de carreira'],
      cta: 'Transforme seu futuro hoje!',
      buttonText: 'Quero ser aprovado',
      link: '/comprar/preparacao-para-mestrado',
      badge: 'Alta Conversão',
      badgeColor: 'bg-blue-500'
    },
    {
      title: 'Método RAC Profissional',
      subtitle: 'Escrita científica para o mercado',
      description: 'Desenvolva habilidades de escrita técnica valorizadas pelo mercado. Ideal para quem quer migrar da academia para o setor corporativo.',
      features: ['8 capítulos práticos', 'Menos de 6h de leitura', 'Técnicas socioemocionais', 'Aplicação imediata'],
      cta: 'Seja seu próprio diferencial!',
      buttonText: 'Quero me destacar',
      link: '/comprar/metodo-rac-escrita-cientifica',
      badge: 'Novo',
      badgeColor: 'bg-purple-500'
    }
  ];

  const testimonials = [
    {
      text: 'Consegui minha primeira vaga como analista de pesquisa depois de aplicar o método. A diferença na minha escrita foi notável nos processos seletivos.',
      author: 'Lorena Silva',
      role: 'Ex-estudante de Matemática → Analista de Dados',
      rating: 5
    },
    {
      text: 'O curso superou todas as expectativas! Não só terminei meu TCC, como consegui uma posição em consultoria logo após a formatura.',
      author: 'Luana Costa',
      role: 'Ex-estudante de Pedagogia → Consultora Educacional',
      rating: 5
    },
    {
      text: 'Material didático excelente e aplicável. Uso as técnicas diariamente no meu trabalho em engenharia. Investimento que se paga sozinho.',
      author: 'Mauro Santos',
      role: 'Engenheiro Civil → Gerente de Projetos',
      rating: 5
    },
    {
      text: 'Revolução na minha produtividade! As técnicas me ajudaram tanto na faculdade quanto no estágio na indústria farmacêutica.',
      author: 'Jéssica Oliveira',
      role: 'Estudante de Farmácia → Estagiária P&D',
      rating: 5
    }
  ];

  const benefits = [
    { text: 'Metodologia validada com +1500 profissionais', icon: Award },
    { text: 'Suporte para transição academia → mercado', icon: TrendingUp },
    { text: 'Networking em congressos e eventos', icon: Users },
    { text: 'Atendimento humanizado e personalizado', icon: Target },
    { text: 'Investimento com ROI comprovado', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium">
                  Transição Academia → Mercado Profissional
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transforme seu
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> conhecimento acadêmico</span> em 
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> sucesso profissional</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Ajudamos acadêmicos ambiciosos a desenvolverem habilidades de escrita técnica e científica 
                  que abrem portas no mercado profissional. Sua transição de carreira começa aqui.
                </p>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className={`${stat.color} bg-white rounded-lg p-2`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link to="/cursos" className="flex items-center">
                    Acelerar minha carreira
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
                  asChild
                >
                  <Link to="/contato" className="flex items-center">
                    Falar com especialista
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={heroImage} 
                  alt="Profissional acadêmica em transição de carreira" 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">95% de aprovação</div>
                    <div className="text-sm text-gray-600">em processos seletivos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-4">
              Soluções Especializadas
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Como podemos acelerar sua transição?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodologias comprovadas para acadêmicos que querem se destacar no mercado profissional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={`${service.badgeColor} text-white`}>
                          {service.badge}
                        </Badge>
                        <div className="text-2xl">🚀</div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-lg font-medium text-blue-600 mb-4">
                        {service.subtitle}
                      </p>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-6">
                        <p className="text-blue-600 font-semibold text-lg mb-4">
                          {service.cta}
                        </p>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105" 
                          asChild
                        >
                          <Link to={service.link} className="flex items-center justify-center">
                            {service.buttonText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 mb-4">
              Sucessos Reais
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transformações que inspiram
            </h2>
            <p className="text-xl text-gray-600">
              Veja como nossos métodos mudaram carreiras e vidas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
            Pronto para acelerar sua carreira?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold"
              asChild
            >
              <Link to="/cursos" className="flex items-center">
                QUERO TRANSFORMAR MINHA CARREIRA AGORA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-white/80 text-lg">
            Junte-se a +1500 profissionais que já transformaram suas carreiras
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;