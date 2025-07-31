import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, TrendingUp } from "lucide-react";

interface PointsDisplayProps {
  totalPoints: number;
  videoPoints: number;
  coursePoints: number;
  level: string;
  levelColor: string;
  pointsToNextLevel: number;
  levelProgress: number;
}

export const PointsDisplay = ({
  totalPoints,
  videoPoints,
  coursePoints,
  level,
  levelColor,
  pointsToNextLevel,
  levelProgress
}: PointsDisplayProps) => {
  const getLevelIcon = () => {
    switch (level) {
      case 'Mestre': return <Trophy className="h-5 w-5" />;
      case 'Especialista': return <Star className="h-5 w-5" />;
      case 'Estudante': return <Target className="h-5 w-5" />;
      case 'Explorador': return <TrendingUp className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const getLevelGradient = () => {
    switch (levelColor) {
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${getLevelGradient()} opacity-5`} />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gradient-to-br ${getLevelGradient()} text-white`}>
              {getLevelIcon()}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{totalPoints}</h3>
              <p className="text-sm text-muted-foreground">Pontos Totais</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`bg-gradient-to-r ${getLevelGradient()} text-white border-0`}
          >
            {level}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Vídeos</span>
            <span className="font-medium">{videoPoints} pts</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Cursos</span>
            <span className="font-medium">{coursePoints} pts</span>
          </div>
        </div>

        {pointsToNextLevel > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Próximo nível</span>
              <span className="text-sm font-medium">{pointsToNextLevel} pts restantes</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getLevelGradient()} transition-all duration-500`}
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};