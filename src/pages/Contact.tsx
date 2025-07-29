
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em até 24 horas.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contato@escritacomciencia.com.br',
      description: 'Respondemos em até 24 horas'
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(61) 99298-0561 / (61) 98315-1509',
      description: 'Atendimento de 08:00 às 18:00'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Brasília, DF - Impact Hub',
      description: 'Edifício Íon, ala amarela - SGAN Q 601 BL H'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Chat Online',
      description: 'Tire dúvidas rápidas sobre nossos cursos',
      action: 'Iniciar Chat'
    },
    {
      icon: Users,
      title: 'Consultoria Gratuita',
      description: 'Agende uma conversa com nossos especialistas',
      action: 'Agendar Conversa'
    },
    {
      icon: Clock,
      title: 'FAQ',
      description: 'Encontre respostas para perguntas frequentes',
      action: 'Ver FAQ'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Entre em Contato
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Estamos aqui para ajudar você a alcançar seus objetivos acadêmicos e profissionais. 
            Fale conosco e descubra como podemos transformar sua escrita.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Envie sua Mensagem
                </CardTitle>
                <p className="text-gray-600">
                  Preencha o formulário abaixo e retornaremos em breve
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Qual o assunto?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-nos como podemos ajudar você..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-700 hover:bg-blue-800">
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Support */}
          <div className="space-y-8">
            
            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <info.icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-blue-700 font-medium">{info.value}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support Options */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Outras Formas de Suporte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <option.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {option.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {option.description}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          {option.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="shadow-lg bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-700 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábado: 9h às 13h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                  <p className="text-xs text-blue-700 mt-3 font-medium">
                    Respostas por email em até 2 horas úteis
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Como funciona o Método RAC?
              </h3>
              <p className="text-gray-600 text-sm">
                É nossa metodologia exclusiva que acelera o processo de escrita através de técnicas comprovadas de produtividade e estruturação.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso cancelar minha assinatura a qualquer momento?
              </h3>
              <p className="text-gray-600 text-sm">
                Sim, você pode cancelar sua assinatura a qualquer momento sem taxas ou multas adicionais.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                As mentorias são individuais ou em grupo?
              </h3>
              <p className="text-gray-600 text-sm">
                Oferecemos mentorias em grupo quinzenais e mensais, além de atendimento individualizado quando necessário.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Vocês oferecem certificado de conclusão?
              </h3>
              <p className="text-gray-600 text-sm">
                Sim, todos os nossos cursos oferecem certificado de conclusão reconhecido após finalizar todas as atividades.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
