import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  texto: string;
  isUser: boolean;
  timestamp: Date;
}

interface DarcyMessage {
  id: string;
  numero_mensagem: number;
  texto: string;
  created_at: string;
}

export const useDarcyChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [darcyMessages, setDarcyMessages] = useState<DarcyMessage[]>([]);

  // Carregar mensagens do Darcy do banco
  useEffect(() => {
    const loadDarcyMessages = async () => {
      const { data, error } = await supabase
        .from('darcy_bd')
        .select('*')
        .order('numero_mensagem');

      if (error) {
        console.error('Erro ao carregar mensagens do Darcy:', error);
        return;
      }

      setDarcyMessages(data || []);
    };

    loadDarcyMessages();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Adicionar mensagem do usuário
    const newUserMessage: Message = {
      id: Date.now().toString(),
      texto: userMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserMessageCount(prev => prev + 1);

    // Simular digitação do Darcy
    setIsTyping(true);

    setTimeout(() => {
      // Buscar resposta do Darcy baseada no número da mensagem
      const nextMessageNumber = userMessageCount + 1;
      const darcyResponse = darcyMessages.find(msg => msg.numero_mensagem === nextMessageNumber);

      if (darcyResponse) {
        const darcyMessage: Message = {
          id: darcyResponse.id,
          texto: darcyResponse.texto,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, darcyMessage]);
      }

      setIsTyping(false);
    }, 1500); // Simula tempo de digitação
  };

  const clearChat = () => {
    setMessages([]);
    setUserMessageCount(0);
  };

  return {
    isOpen,
    messages,
    isTyping,
    toggleChat,
    sendMessage,
    clearChat
  };
};