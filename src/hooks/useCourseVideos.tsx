
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CourseVideo {
  id: string;
  course_slug: string;
  title: string;
  description: string | null;
  video_url: string;
  duration_minutes: number | null;
  upload_date: string | null;
  order_index: number | null;
  created_at: string | null;
  preco: number | null;
}

export const useCourseVideos = (courseSlug?: string) => {
  return useQuery({
    queryKey: ['course-videos', courseSlug],
    queryFn: async () => {
      console.log('🎥 Fetching course videos for courseSlug:', courseSlug);
      
      if (!courseSlug) {
        console.log('❌ No courseSlug provided, returning empty array');
        return [];
      }
      
      const { data, error } = await supabase
        .from('course_videos')
        .select('*')
        .eq('course_slug', courseSlug)
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('❌ Error fetching course videos:', error);
        throw error;
      }
      
      console.log('✅ Fetched course videos:', data);
      console.log('📊 Videos count:', data?.length || 0);
      return data as CourseVideo[];
    },
    enabled: !!courseSlug
  });
};
