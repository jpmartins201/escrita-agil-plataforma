-- Criar tabela para mensagens do Darcy
CREATE TABLE public.darcy_bd (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_mensagem INTEGER NOT NULL UNIQUE,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.darcy_bd ENABLE ROW LEVEL SECURITY;

-- Create policy para qualquer um ler as mensagens do Darcy
CREATE POLICY "Anyone can view Darcy messages" 
ON public.darcy_bd 
FOR SELECT 
USING (true);

-- Inserir mensagens padrão do Darcy
INSERT INTO public.darcy_bd (numero_mensagem, texto) VALUES
(1, 'Olá! 👋 Sou a Darcy, sua assistente virtual da Escrita com Ciência! Estou aqui para te ajudar com qualquer dúvida sobre nossa plataforma e cursos. Como posso te ajudar hoje?'),
(2, 'Que ótimo que você quer saber mais! 😊 Nossa plataforma oferece cursos especializados para acadêmicos que querem se destacar na escrita científica e na transição para o mercado profissional. Temos desde técnicas de escrita ágil para TCC até preparação para mestrado!'),
(3, 'Perfeita escolha! 📚 Nossos cursos incluem: "Escrita Ágil para TCC" (ideal para finalizar sua monografia com qualidade), "Preparação para Mestrado" (te prepara para seleções) e muito mais. Todos com metodologia comprovada e suporte personalizado!'),
(4, 'Claro! 💡 Nossa metodologia RAC (Revisar, Aperfeiçoar, Concluir) é exclusiva e já ajudou centenas de alunos. Você terá acesso vitalício aos conteúdos, suporte direto com especialistas e uma comunidade incrível de acadêmicos!'),
(5, 'Sim! 🎯 Oferecemos suporte completo durante todo seu percurso. Você pode tirar dúvidas diretamente com nossos especialistas, participar de mentorias ao vivo e fazer parte de nossa comunidade exclusiva no WhatsApp!'),
(6, 'É muito simples! 🚀 Basta escolher o curso que mais se adequa ao seu perfil, fazer sua inscrição e pronto! Você receberá acesso imediato à plataforma. Alguns cursos oferecem parcelamento sem juros para facilitar ainda mais!'),
(7, 'Adoraria te ajudar com mais detalhes! 📞 Se quiser um atendimento mais personalizado, recomendo falar diretamente com nossa equipe através do WhatsApp. Eles podem te dar informações específicas sobre descontos e condições especiais!'),
(8, 'Estou sempre aqui para te ajudar! 💪 Se tiver mais dúvidas, é só continuar nossa conversa. Lembre-se: investir em sua capacitação acadêmica é investir no seu futuro profissional. Vamos juntos nessa jornada rumo ao sucesso! 🌟');