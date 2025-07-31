import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProgress {
  id: string;
  user_id: string;
  curso_slug: string;
  video_id: string;
  watched: boolean;
  watched_at: string | null;
}

export interface CourseProgress {
  curso_slug: string;
  total_videos: number;
  watched_videos: number;
  progress_percentage: number;
  completed: boolean;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Buscar progresso do usuário
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setUserProgress(progress || []);

      // Calcular progresso por curso
      const { data: videos, error: videosError } = await supabase
        .from('course_videos')
        .select('course_slug, id');

      if (videosError) throw videosError;

      const coursesMap = new Map<string, { total: number; watched: number }>();

      // Contar total de vídeos por curso
      videos?.forEach((video) => {
        const current = coursesMap.get(video.course_slug) || { total: 0, watched: 0 };
        current.total += 1;
        coursesMap.set(video.course_slug, current);
      });

      // Contar vídeos assistidos por curso
      progress?.forEach((p) => {
        if (p.watched) {
          const current = coursesMap.get(p.curso_slug);
          if (current) {
            current.watched += 1;
          }
        }
      });

      // Converter para array de progresso
      const progressArray: CourseProgress[] = Array.from(coursesMap.entries()).map(
        ([curso_slug, { total, watched }]) => ({
          curso_slug,
          total_videos: total,
          watched_videos: watched,
          progress_percentage: total > 0 ? Math.round((watched / total) * 100) : 0,
          completed: watched === total && total > 0,
        })
      );

      setCourseProgress(progressArray);
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const markVideoAsWatched = async (videoId: string, courseSlug: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          video_id: videoId,
          curso_slug: courseSlug,
          watched: true,
          watched_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Atualizar estado local
      await fetchProgress();
    } catch (error) {
      console.error('Erro ao marcar vídeo como assistido:', error);
    }
  };

  const markVideoAsUnwatched = async (videoId: string, courseSlug: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          video_id: videoId,
          curso_slug: courseSlug,
          watched: false,
          watched_at: null,
        });

      if (error) throw error;

      // Atualizar estado local
      await fetchProgress();
    } catch (error) {
      console.error('Erro ao desmarcar vídeo:', error);
    }
  };

  const getCourseProgress = (courseSlug: string): CourseProgress | undefined => {
    return courseProgress.find((cp) => cp.curso_slug === courseSlug);
  };

  const isVideoWatched = (videoId: string): boolean => {
    return userProgress.some((p) => p.video_id === videoId && p.watched);
  };

  const calculateUserPoints = () => {
    const totalVideos = courseProgress.reduce((sum, cp) => sum + cp.total_videos, 0);
    const watchedVideos = courseProgress.reduce((sum, cp) => sum + cp.watched_videos, 0);
    const completedCourses = courseProgress.filter((cp) => cp.completed).length;
    
    // Sistema de pontuação: 5 pontos por vídeo, 30 pontos por curso completo
    const videoPoints = watchedVideos * 5;
    const coursePoints = completedCourses * 30;
    const totalPoints = videoPoints + coursePoints;
    
    // Sistema de níveis baseado em pontos
    let level = 'Iniciante';
    let levelColor = 'slate';
    let nextLevelPoints = 50;
    
    if (totalPoints >= 501) {
      level = 'Mestre';
      levelColor = 'purple';
      nextLevelPoints = totalPoints; // Nível máximo
    } else if (totalPoints >= 301) {
      level = 'Especialista';
      levelColor = 'orange';
      nextLevelPoints = 501;
    } else if (totalPoints >= 151) {
      level = 'Estudante';
      levelColor = 'blue';
      nextLevelPoints = 301;
    } else if (totalPoints >= 51) {
      level = 'Explorador';
      levelColor = 'green';
      nextLevelPoints = 151;
    }
    
    const pointsToNextLevel = nextLevelPoints - totalPoints;
    const levelProgress = totalPoints >= 501 ? 100 : 
      Math.round(((totalPoints % 50) / 50) * 100);
    
    return {
      totalPoints,
      videoPoints,
      coursePoints,
      level,
      levelColor,
      nextLevelPoints,
      pointsToNextLevel: pointsToNextLevel > 0 ? pointsToNextLevel : 0,
      levelProgress,
    };
  };

  const getOverallProgress = () => {
    const totalVideos = courseProgress.reduce((sum, cp) => sum + cp.total_videos, 0);
    const watchedVideos = courseProgress.reduce((sum, cp) => sum + cp.watched_videos, 0);
    const completedCourses = courseProgress.filter((cp) => cp.completed).length;

    return {
      totalVideos,
      watchedVideos,
      completedCourses,
      totalCourses: courseProgress.length,
      overallPercentage: totalVideos > 0 ? Math.round((watchedVideos / totalVideos) * 100) : 0,
    };
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return {
    userProgress,
    courseProgress,
    loading,
    markVideoAsWatched,
    markVideoAsUnwatched,
    getCourseProgress,
    isVideoWatched,
    getOverallProgress,
    calculateUserPoints,
    refreshProgress: fetchProgress,
  };
};