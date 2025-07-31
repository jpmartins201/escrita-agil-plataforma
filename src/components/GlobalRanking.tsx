import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { UserRankingData } from "@/hooks/useUserRanking";

interface GlobalRankingProps {
  ranking: UserRankingData[];
  userRank: UserRankingData | null;
  loading?: boolean;
}

export const GlobalRanking = ({ ranking, userRank, loading }: GlobalRankingProps) => {
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Award className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-400 to-amber-600';
      default: return 'from-slate-300 to-slate-500';
    }
  };

  const getLevelGradient = (levelColor: string) => {
    switch (levelColor) {
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'orange': return 'from-orange-500 to-orange-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Ranking Global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="w-24 h-4 bg-muted rounded mb-1" />
                  <div className="w-16 h-3 bg-muted rounded" />
                </div>
                <div className="w-12 h-4 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Ranking Global
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {ranking.map((user) => (
            <div
              key={user.user_id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                user.user_id === userRank?.user_id ? 'bg-primary/10 border border-primary/20' : ''
              }`}
            >
              <div className={`relative p-2 rounded-full bg-gradient-to-r ${getRankColor(user.rank_position)}`}>
                {getRankIcon(user.rank_position)}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{user.rank_position}</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium truncate">{user.full_name}</h4>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs bg-gradient-to-r ${getLevelGradient(user.level_color)} text-white border-0`}
                  >
                    {user.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {user.watched_videos} vídeos • {user.completed_courses} cursos
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{user.total_points}</p>
                <p className="text-xs text-muted-foreground">pontos</p>
              </div>
            </div>
          ))}
        </div>

        {userRank && userRank.rank_position > 10 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="p-2 rounded-full bg-primary/20">
                <Award className="h-4 w-4 text-primary" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-background border border-border rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{userRank.rank_position}</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Sua posição</h4>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs bg-gradient-to-r ${getLevelGradient(userRank.level_color)} text-white border-0`}
                  >
                    {userRank.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {userRank.watched_videos} vídeos • {userRank.completed_courses} cursos
                </p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg">{userRank.total_points}</p>
                <p className="text-xs text-muted-foreground">pontos</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};