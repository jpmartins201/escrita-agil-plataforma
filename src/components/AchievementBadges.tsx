import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Achievement } from "@/hooks/useUserRanking";
import { Lock } from "lucide-react";

interface AchievementBadgesProps {
  achievements: Achievement[];
}

export const AchievementBadges = ({ achievements }: AchievementBadgesProps) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const getColorClasses = (color: string, unlocked: boolean) => {
    if (!unlocked) return 'bg-muted text-muted-foreground';
    
    switch (color) {
      case 'blue': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'orange': return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      case 'green': return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'purple': return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'yellow': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      default: return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          Conquistas
          <Badge variant="secondary" className="ml-auto">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Conquistas desbloqueadas */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Desbloqueadas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="relative group"
                >
                  <div className={`p-4 rounded-lg border-2 border-transparent ${getColorClasses(achievement.color, true)} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={achievement.name}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm">{achievement.name}</h5>
                        <p className="text-xs opacity-90 truncate">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip de conquista desbloqueada */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-background border border-border rounded-lg p-2 shadow-lg whitespace-nowrap">
                      <p className="text-xs font-medium">✨ Conquistado!</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conquistas bloqueadas */}
        {lockedAchievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Disponíveis</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="relative group"
                >
                  <div className="p-4 rounded-lg border-2 border-dashed border-muted bg-muted/30 transition-all duration-300 hover:border-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className="text-2xl opacity-50" role="img" aria-label={achievement.name}>
                          {achievement.icon}
                        </span>
                        <Lock className="h-3 w-3 absolute -bottom-1 -right-1 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm text-muted-foreground">{achievement.name}</h5>
                        <p className="text-xs text-muted-foreground/70 truncate">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tooltip de requisito */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-background border border-border rounded-lg p-2 shadow-lg whitespace-nowrap">
                      <p className="text-xs">
                        Requisito: {achievement.requirement.value} {
                          achievement.requirement.type === 'videos' ? 'vídeos' :
                          achievement.requirement.type === 'courses' ? 'cursos' :
                          'pontos'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-4xl mb-2 block">🎯</span>
            <p className="text-sm">Assista vídeos e complete cursos para desbloquear conquistas!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};