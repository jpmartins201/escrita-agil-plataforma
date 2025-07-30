import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { QuizResult as QuizResultType } from '@/utils/quizCalculator';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAccess } from '@/hooks/useUserAccess';
import { Lock, Crown, Star } from 'lucide-react';

interface QuizResultProps {
  result: QuizResultType;
  onUpgrade: () => void;
  onLogin: () => void;
}

export function QuizResult({ result, onUpgrade, onLogin }: QuizResultProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: userProfile } = useUserAccess();
  
  const isPremium = userProfile?.status === 'admin' || userProfile?.status === 'ativo';
  const isLoggedIn = !!user;
  
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'Alto': return 'text-green-600 bg-green-100';
      case 'Médio': return 'text-yellow-600 bg-yellow-100';
      case 'Baixo': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getTraitLevel = (level: string) => {
    switch (level) {
      case 'Alto': return { value: 80, color: 'bg-green-500' };
      case 'Médio': return { value: 50, color: 'bg-yellow-500' };
      case 'Baixo': return { value: 20, color: 'bg-red-500' };
      default: return { value: 0, color: 'bg-gray-500' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header do Resultado */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-primary">
              {result.arquetipo.nome}
            </CardTitle>
            <Badge className={getConfidenceColor(result.nivelConfianca)}>
              Confiança: {result.nivelConfianca}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {Object.entries(result.niveis).map(([trait, level]) => {
              const { value, color } = getTraitLevel(level);
              return (
                <div key={trait} className="text-center">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-muted-foreground">{trait}</span>
                  </div>
                  <Progress value={value} className="h-2 mb-2" />
                  <Badge variant="outline" className="text-xs">
                    {level}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          {/* Descrição - Sempre visível para usuários logados */}
          {isLoggedIn ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {result.arquetipo.descricao}
              </p>
            </div>
          ) : (
            <div className="bg-accent/30 rounded-lg p-4 text-center">
              <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground mb-3">
                Faça login para ver a descrição completa do seu perfil
              </p>
              <Button onClick={onLogin} variant="outline">
                Fazer Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cursos Recomendados - Sempre visível para usuários logados */}
      {isLoggedIn && result.arquetipo.cursos_indicados.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Cursos Recomendados da Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.arquetipo.cursos_indicados.map((curso, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{curso}</span>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/curso/escrita-agil`)}>
                    Ver Curso
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conteúdo Premium */}
      {isPremium ? (
        <div className="space-y-6">
          {/* Carreiras Favoráveis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Carreiras Favoráveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.arquetipo.carreiras_favoraveis.map((carreira, index) => (
                  <div key={index} className="p-2 bg-accent/30 rounded">
                    {carreira}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cursos Sugeridos */}
          <Card>
            <CardHeader>
              <CardTitle>Cursos Sugeridos para Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.arquetipo.cursos_sugeridos.map((curso, index) => (
                  <div key={index} className="p-2 bg-accent/30 rounded">
                    {curso}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-2 border-dashed border-primary/30">
          <CardContent className="text-center py-8">
            <Crown className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-bold mb-2">Relatório Completo - R$ 10,99</h3>
            <p className="text-muted-foreground mb-4">
              Desbloqueie carreiras ideais e cursos sugeridos para o seu perfil
            </p>
            <ul className="text-sm text-muted-foreground mb-6 space-y-1">
              <li>✓ Lista completa de carreiras favoráveis</li>
              <li>✓ Cursos recomendados para desenvolvimento</li>
              <li>✓ Plano de evolução profissional personalizado</li>
            </ul>
            <Button onClick={onUpgrade} size="lg" className="bg-gradient-to-r from-primary to-primary/80">
              Comprar Relatório Completo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Menos de R$ 0,50 por dia pelo seu futuro profissional
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}