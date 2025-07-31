import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserRankingData {
  user_id: string;
  full_name: string;
  total_points: number;
  video_points: number;
  course_points: number;
  level: string;
  level_color: string;
  watched_videos: number;
  completed_courses: number;
  rank_position: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  requirement: {
    type: 'videos' | 'courses' | 'points';
    value: number;
  };
}

export const useUserRanking = () => {
  const { user } = useAuth();
  const [globalRanking, setGlobalRanking] = useState<UserRankingData[]>([]);
  const [userRank, setUserRank] = useState<UserRankingData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const predefinedAchievements: Achievement[] = [
    {
      id: 'first-video',
      name: 'Primeiro Passo',
      description: 'Assistir ao primeiro vídeo',
      icon: '🎬',
      color: 'blue',
      unlocked: false,
      requirement: { type: 'videos', value: 1 }
    },
    {
      id: 'persistent',
      name: 'Persistente',
      description: 'Assistir 5 vídeos',
      icon: '🔥',
      color: 'orange',
      unlocked: false,
      requirement: { type: 'videos', value: 5 }
    },
    {
      id: 'dedicated',
      name: 'Dedicado',
      description: 'Assistir 20 vídeos',
      icon: '💪',
      color: 'green',
      unlocked: false,
      requirement: { type: 'videos', value: 20 }
    },
    {
      id: 'marathoner',
      name: 'Maratonista',
      description: 'Assistir 50 vídeos',
      icon: '🏃‍♂️',
      color: 'purple',
      unlocked: false,
      requirement: { type: 'videos', value: 50 }
    },
    {
      id: 'graduate',
      name: 'Graduado',
      description: 'Concluir primeiro curso',
      icon: '🎓',
      color: 'yellow',
      unlocked: false,
      requirement: { type: 'courses', value: 1 }
    },
    {
      id: 'specialist',
      name: 'Especialista',
      description: 'Concluir 3 cursos',
      icon: '👑',
      color: 'gold',
      unlocked: false,
      requirement: { type: 'courses', value: 3 }
    }
  ];

  const calculateLevel = (points: number) => {
    if (points >= 501) return { level: 'Mestre', color: 'purple' };
    if (points >= 301) return { level: 'Especialista', color: 'orange' };
    if (points >= 151) return { level: 'Estudante', color: 'blue' };
    if (points >= 51) return { level: 'Explorador', color: 'green' };
    return { level: 'Iniciante', color: 'slate' };
  };

  const fetchRanking = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Buscar progresso de todos os usuários
      const { data: allProgress, error } = await supabase
        .from('user_progress')
        .select('user_id, watched, curso_slug');

      if (error) throw error;

      // Buscar perfis dos usuários
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (profilesError) throw profilesError;

      // Buscar informações dos cursos
      const { data: courses, error: coursesError } = await supabase
        .from('cursos')
        .select('slug');

      if (coursesError) throw coursesError;

      // Buscar vídeos por curso
      const { data: videos, error: videosError } = await supabase
        .from('course_videos')
        .select('course_slug, id');

      if (videosError) throw videosError;

      // Criar mapa de perfis para busca rápida
      const profilesMap = new Map();
      profiles?.forEach((profile) => {
        profilesMap.set(profile.id, profile.full_name || 'Usuário');
      });

      // Organizar dados por usuário
      const userProgressMap = new Map();

      allProgress?.forEach((progress) => {
        const userId = progress.user_id;
        if (!userProgressMap.has(userId)) {
          userProgressMap.set(userId, {
            user_id: userId,
            full_name: profilesMap.get(userId) || 'Usuário',
            watched_videos: 0,
            completed_courses: 0,
            courses: new Map()
          });
        }

        const userData = userProgressMap.get(userId);
        
        if (progress.watched) {
          userData.watched_videos++;
          
          // Contar vídeos por curso
          const courseSlug = progress.curso_slug;
          if (!userData.courses.has(courseSlug)) {
            userData.courses.set(courseSlug, 0);
          }
          userData.courses.set(courseSlug, userData.courses.get(courseSlug) + 1);
        }
      });

      // Calcular cursos completos e pontuação
      const rankingData: UserRankingData[] = Array.from(userProgressMap.values()).map((userData) => {
        // Contar cursos completos
        let completedCourses = 0;
        userData.courses.forEach((watchedCount, courseSlug) => {
          const totalVideosInCourse = videos?.filter(v => v.course_slug === courseSlug).length || 0;
          if (totalVideosInCourse > 0 && watchedCount >= totalVideosInCourse) {
            completedCourses++;
          }
        });

        userData.completed_courses = completedCourses;

        // Calcular pontos
        const videoPoints = userData.watched_videos * 5;
        const coursePoints = completedCourses * 30;
        const totalPoints = videoPoints + coursePoints;

        const { level, color } = calculateLevel(totalPoints);

        return {
          user_id: userData.user_id,
          full_name: userData.full_name,
          total_points: totalPoints,
          video_points: videoPoints,
          course_points: coursePoints,
          level,
          level_color: color,
          watched_videos: userData.watched_videos,
          completed_courses: completedCourses,
          rank_position: 0 // Será definido abaixo
        };
      });

      // Ordenar por pontos e definir posições
      rankingData.sort((a, b) => b.total_points - a.total_points);
      rankingData.forEach((user, index) => {
        user.rank_position = index + 1;
      });

      setGlobalRanking(rankingData.slice(0, 10)); // Top 10

      // Encontrar dados do usuário atual
      const currentUser = rankingData.find(u => u.user_id === user.id);
      setUserRank(currentUser || null);

      // Calcular conquistas
      if (currentUser) {
        const updatedAchievements = predefinedAchievements.map(achievement => ({
          ...achievement,
          unlocked: 
            (achievement.requirement.type === 'videos' && currentUser.watched_videos >= achievement.requirement.value) ||
            (achievement.requirement.type === 'courses' && currentUser.completed_courses >= achievement.requirement.value) ||
            (achievement.requirement.type === 'points' && currentUser.total_points >= achievement.requirement.value)
        }));
        setAchievements(updatedAchievements);
      }

    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, [user]);

  return {
    globalRanking,
    userRank,
    achievements,
    loading,
    refreshRanking: fetchRanking,
  };
};