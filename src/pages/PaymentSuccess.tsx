import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [courseSlug, setCourseSlug] = useState<string>('');

  const sessionId = searchParams.get('session_id');
  const course = searchParams.get('course');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !user) {
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });

        if (error) {
          console.error('Payment verification error:', error);
          setVerified(false);
        } else {
          setVerified(true);
          setCourseSlug(data.courseSlug);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600">Você precisa estar logado para ver esta página.</p>
            <Button onClick={() => navigate('/login')} className="mt-4">
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verifying) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando seu pagamento...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <CheckCircle className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Erro na Verificação
            </h2>
            <p className="text-gray-600 mb-4">
              Não foi possível verificar seu pagamento. Entre em contato com o suporte.
            </p>
            <Button onClick={() => navigate('/')}>
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="text-green-500 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Pagamento Realizado com Sucesso!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">
              Parabéns! Seu pagamento foi processado e você já tem acesso ao curso.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">
                O que acontece agora?
              </h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>✅ Seu acesso ao curso foi liberado automaticamente</li>
                <li>✅ Você pode começar a assistir as aulas imediatamente</li>
                <li>✅ Acesso vitalício ao conteúdo</li>
                <li>✅ Certificado de conclusão disponível</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/curso/${courseSlug || course}`}>
                <Button size="lg" className="w-full sm:w-auto">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Acessar Curso
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Ir para Dashboard
                </Button>
              </Link>
            </div>

            <div className="text-sm text-gray-500 border-t pt-4">
              <p>
                Dúvidas? Entre em contato pelo nosso{' '}
                <Link to="/contact" className="text-blue-600 hover:underline">
                  suporte
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;