
import React, { useState, useRef } from 'react';
import { Play, Clock, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useCourseVideos, CourseVideo } from '@/hooks/useCourseVideos';
import { useCanAccessCourse } from '@/hooks/useUserAccess';
import { useUserProgress } from '@/hooks/useUserProgress';
import { CourseProgress } from './CourseProgress';
import { VideoProgressButton } from './VideoProgressButton';

interface CourseVideosProps {
  courseSlug: string;
  courseTitle: string;
}

// Hook para extrair ID do Vimeo de uma URL
const getVimeoVideoId = (url: string): string | null => {
  const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// Hook para extrair ID do YouTube de uma URL
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Componente do Player de Vídeo
interface VideoPlayerProps {
  videoUrl: string;
  videoTitle: string;
  onVideoEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, videoTitle, onVideoEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Detectar se é Vimeo ou YouTube e extrair o ID correto
  const vimeoId = getVimeoVideoId(videoUrl);
  const youtubeId = getYouTubeVideoId(videoUrl);
  
  const isVimeo = !!vimeoId;
  const isYoutube = !!youtubeId;
  
  let embedUrl = '';
  if (isVimeo) {
    embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  } else if (isYoutube) {
    embedUrl = `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1`;
  } else {
    // Fallback para URLs diretas ou outros formatos
    embedUrl = videoUrl;
  }
  
  console.log('🎥 Video URL:', videoUrl);
  console.log('🔗 Embed URL:', embedUrl);
  console.log('📱 Is Vimeo:', isVimeo);
  console.log('📺 Is YouTube:', isYoutube);
  
  // Simular o fim do vídeo após 10 segundos (para testes)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onVideoEnd();
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <div className="w-full">
      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={embedUrl}
          title={videoTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

const CourseVideos: React.FC<CourseVideosProps> = ({ courseSlug, courseTitle }) => {
  const { data: videos, isLoading, error } = useCourseVideos(courseSlug);
  const { canAccess } = useCanAccessCourse(courseSlug);
  const { getCourseProgress, isVideoWatched, markVideoAsWatched } = useUserProgress();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [videoEnded, setVideoEnded] = useState<Set<string>>(new Set());
  
  const courseProgress = getCourseProgress(courseSlug);

  console.log('🎥 CourseVideos - Curso:', courseSlug);
  console.log('🔐 CourseVideos - Pode acessar:', canAccess);
  console.log('📹 CourseVideos - Total de vídeos:', videos?.length || 0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Conteúdo do Curso</h3>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading course videos:', error);
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Erro ao carregar os vídeos do curso.</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum vídeo encontrado para este curso.</p>
      </div>
    );
  }

  const handleWatchClick = (videoId: string) => {
    if (!canAccess) {
      return; // Não permitir assistir se não tiver acesso
    }
    setActiveVideoId(activeVideoId === videoId ? null : videoId);
  };

  const handleVideoEnd = (videoId: string) => {
    setVideoEnded(prev => new Set([...prev, videoId]));
  };

  const handleMarkAsWatched = async (videoId: string) => {
    await markVideoAsWatched(videoId, courseSlug);
    console.log('Vídeo marcado como assistido:', videoId);
  };

  return (
    <div className="space-y-6">
      {/* Progresso do Curso */}
      {canAccess && courseProgress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-aristotelica">
              <Play className="h-5 w-5" />
              Seu Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CourseProgress courseProgress={courseProgress} />
          </CardContent>
        </Card>
      )}

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2 font-aristotelica">Conteúdo do Curso</h3>
        <p className="text-muted-foreground">{courseTitle}</p>
      </div>
      
      <div className="grid gap-4">
        {videos.map((video: CourseVideo, index: number) => {
          const isVideoActive = activeVideoId === video.id;
          const isCompleted = isVideoWatched(video.id);
          const hasVideoEnded = videoEnded.has(video.id);
          
          return (
            <Card key={video.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 font-aristotelica">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    {video.title}
                    {isCompleted && (
                      <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Concluído
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{video.duration_minutes}min</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {video.description && (
                  <p className="text-muted-foreground text-sm mb-4">{video.description}</p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Aula {index + 1} de {videos.length}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {canAccess ? (
                      <>
                        <Collapsible open={isVideoActive} onOpenChange={() => handleWatchClick(video.id)}>
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Play className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {isVideoActive ? 'Fechar' : 'Assistir'}
                              </span>
                              {isVideoActive ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </Collapsible>
                        <VideoProgressButton 
                          videoId={video.id} 
                          courseSlug={courseSlug}
                        />
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Play className="h-4 w-4" />
                        <span className="text-sm">🔒 Acesso restrito</span>
                      </div>
                    )}
                  </div>
                </div>

                {canAccess && (
                  <Collapsible open={isVideoActive}>
                    <CollapsibleContent className="space-y-4">
                      <VideoPlayer
                        videoUrl={video.video_url}
                        videoTitle={video.title}
                        onVideoEnd={() => handleVideoEnd(video.id)}
                      />
                      
                      {hasVideoEnded && !isCompleted && (
                        <div className="flex justify-center">
                          <Button
                            onClick={() => handleMarkAsWatched(video.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Marcar como assistido
                          </Button>
                        </div>
                      )}
                      
                      {isCompleted && (
                        <div className="flex justify-center">
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            <Check className="h-4 w-4 mr-2" />
                            Aula concluída
                          </Badge>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {!canAccess && (
                  <div className="bg-muted border border-border rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm mb-2">
                      🔒 Você precisa adquirir acesso a este curso para assistir os vídeos
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Adquirir curso
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseVideos;
