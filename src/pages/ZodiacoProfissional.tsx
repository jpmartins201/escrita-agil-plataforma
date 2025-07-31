import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion } from '@/components/QuizQuestion';
import { QuizResult } from '@/components/QuizResult';
import { useQuizQuestions, useArquetipos } from '@/hooks/useQuizData';
import { calcularPerfil, salvarResultado } from '@/utils/quizCalculator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, Star, Users, TrendingUp } from 'lucide-react';
import type { QuizResult as QuizResultType } from '@/utils/quizCalculator';

export default function ZodiacoProfissional() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [resultado, setResultado] = useState<QuizResultType | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: questions, isLoading: loadingQuestions } = useQuizQuestions();
  const { data: arquetipos, isLoading: loadingArquetipos } = useArquetipos();

  const totalQuestions = questions?.length || 12;
  const progress = respostas.length > 0 ? ((respostas.length) / totalQuestions) * 100 : 0;

  const handleAnswer = (value: number) => {
    const newRespostas = [...respostas];
    newRespostas[currentQuestion] = value;
    setRespostas(newRespostas);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Finalizar teste
      finalizarTeste(newRespostas);
    }
  };

  const finalizarTeste = async (respostasFinais: number[]) => {
    if (!arquetipos) {
      toast({
        title: "Erro",
        description: "Dados dos arquétipos não carregados. Tente novamente.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = calcularPerfil(respostasFinais, arquetipos);
      setResultado(result);
      
      // Salvar resultado
      await salvarResultado(result, respostasFinais, user?.id);
      
      setShowResult(true);
      
      toast({
        title: "Teste concluído!",
        description: `Seu perfil é: ${result.arquetipo.nome}`,
      });
    } catch (error) {
      console.error('Erro ao finalizar teste:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar resultado. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1 && respostas[currentQuestion]) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const reiniciarTeste = () => {
    setCurrentQuestion(0);
    setRespostas([]);
    setResultado(null);
    setShowResult(false);
  };

  const handleUpgrade = () => {
    // TODO: Implementar integração com Stripe
    toast({
      title: "Em breve",
      description: "Sistema de pagamento será implementado em breve.",
    });
  };

  const handleLogin = () => {
    // Salvar a rota atual para retornar após o login
    sessionStorage.setItem('redirectAfterLogin', '/zodiaco-profissional');
    window.location.href = '/login';
  };

  if (loadingQuestions || loadingArquetipos) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando teste...</p>
        </div>
      </div>
    );
  }

  if (showResult && resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Seu Zodíaco Profissional
            </h1>
            <p className="text-muted-foreground">
              Baseado no modelo científico Big Five
            </p>
          </div>
          
          <QuizResult 
            result={resultado} 
            onUpgrade={handleUpgrade}
            onLogin={handleLogin}
          />
          
          <div className="text-center mt-8">
            <Button onClick={reiniciarTeste} variant="outline">
              Fazer Teste Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10 pt-20">
      <div className="container mx-auto px-4">
        {/* Hero Section - only show when quiz hasn't started */}
        {respostas.length === 0 && (
          <div className="py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-aristotelica">
                  Zodíaco Profissional
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  Descubra seu superpoder profissional oculto com nosso teste científico baseado no modelo Big Five
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-background to-accent/10">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-foreground font-aristotelica">Científico</h3>
                    <p className="text-muted-foreground leading-relaxed">Baseado no modelo Big Five de personalidade validado cientificamente</p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-background to-secondary/10">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-foreground font-aristotelica">Rápido</h3>
                    <p className="text-muted-foreground leading-relaxed">Apenas 12 perguntas estratégicas, 2 minutos do seu tempo</p>
                  </CardContent>
                </Card>
                
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-background to-accent/10">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-foreground font-aristotelica">Personalizado</h3>
                    <p className="text-muted-foreground leading-relaxed">Insights únicos e recomendações específicas para sua carreira</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        <div className="py-8">
          <div className="max-w-3xl mx-auto">
            {questions && questions.length > 0 && (
              <>
                {/* Fixed Header with Progress Bar */}
                <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-background to-accent/5">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-foreground font-aristotelica">
                        Autodescoberta Profissional
                      </h2>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-primary">
                          {Math.round(progress)}%
                        </span>
                        <p className="text-sm text-muted-foreground">concluído</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-muted-foreground">
                          Pergunta {currentQuestion + 1} de {totalQuestions}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <Progress 
                          value={progress} 
                          className="h-3 bg-muted shadow-inner"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Question */}
                <Card className="mb-8 shadow-xl border-0 bg-gradient-to-br from-background to-accent/5 hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <QuizQuestion
                      question={questions[currentQuestion]}
                      value={respostas[currentQuestion] || null}
                      onChange={handleAnswer}
                    />
                  </CardContent>
                </Card>

                {/* Navigation */}
                {respostas[currentQuestion] && (
                  <div className="flex justify-between">
                    <Button 
                      onClick={goToPrevious}
                      variant="outline"
                      disabled={currentQuestion === 0}
                      className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </Button>
                    
                    {currentQuestion < totalQuestions - 1 ? (
                      <Button 
                        onClick={goToNext}
                        className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        Próxima
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => finalizarTeste(respostas)}
                        className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70"
                      >
                        Finalizar Teste
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}