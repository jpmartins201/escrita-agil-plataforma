import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, BookOpen, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const { toast } = useToast();
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      await signUpWithEmail(formData.email, formData.password);
      
      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta.",
      });
    } catch (error: any) {
      console.error('Error during sign up:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error during Google sign up:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar se cadastrar com Google. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/07b51537-f063-4706-ba65-451ead001a5f.png" 
              alt="Escrita com Ciência" 
              className="h-16"
            />
          </Link>
          <p className="mt-2 text-blue-100">
            Crie sua conta e comece a aprender
          </p>
        </div>

        {/* Register Form */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">
              Criar Conta
            </CardTitle>
            <p className="text-center text-gray-600">
              Preencha os dados para se cadastrar na plataforma
            </p>
          </CardHeader>
          <CardContent>
            
            {/* Google Sign Up Button */}
            <div className="mb-6">
              <Button 
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                    <span>Conectando...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar com Google
                  </>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou cadastre-se com email</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800" 
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  'Criar Conta'
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Faça login aqui
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Link */}
        <div className="text-center">
          <p className="text-blue-100 text-sm">
            Problemas para criar conta?{' '}
            <Link to="/contato" className="text-white hover:text-blue-200 underline">
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;