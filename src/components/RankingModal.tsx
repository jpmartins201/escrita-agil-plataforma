import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award } from "lucide-react";
import { useUserRanking } from "@/hooks/useUserRanking";
import { PointsDisplay } from "./PointsDisplay";
import { GlobalRanking } from "./GlobalRanking";
import { AchievementBadges } from "./AchievementBadges";

interface RankingModalProps {
  children: React.ReactNode;
}

export const RankingModal = ({ children }: RankingModalProps) => {
  const { globalRanking, userRank, achievements, loading } = useUserRanking();

  const calculateLevelProgress = (points: number) => {
    if (points >= 501) return { pointsToNext: 0, progress: 100 };
    if (points >= 301) return { pointsToNext: 501 - points, progress: ((points - 301) / 200) * 100 };
    if (points >= 151) return { pointsToNext: 301 - points, progress: ((points - 151) / 150) * 100 };
    if (points >= 51) return { pointsToNext: 151 - points, progress: ((points - 51) / 100) * 100 };
    return { pointsToNext: 51 - points, progress: (points / 50) * 100 };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            Ranking e Conquistas
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Pontos do Usuário */}
          {userRank && (
            <PointsDisplay
              totalPoints={userRank.total_points}
              videoPoints={userRank.video_points}
              coursePoints={userRank.course_points}
              level={userRank.level}
              levelColor={userRank.level_color}
              pointsToNextLevel={calculateLevelProgress(userRank.total_points).pointsToNext}
              levelProgress={calculateLevelProgress(userRank.total_points).progress}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ranking Global */}
            <GlobalRanking 
              ranking={globalRanking} 
              userRank={userRank} 
              loading={loading} 
            />

            {/* Conquistas */}
            <AchievementBadges achievements={achievements} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};