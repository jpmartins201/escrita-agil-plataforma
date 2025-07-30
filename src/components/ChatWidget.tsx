import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Trash2, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useDarcyChat } from '@/hooks/useDarcyChat';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import darcyLogo from '@/assets/darcy-logo.png';

const ChatWidget: React.FC = () => {
  const { user, loading } = useAuth();
  const { isOpen, messages, isTyping, toggleChat, sendMessage, clearChat } = useDarcyChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Não mostrar nada se ainda está carregando
  if (loading) {
    return null;
  }

  return (
    <>
      {/* Botão flutuante do chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg transition-all duration-300 hover:scale-105"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
          )}
        </Button>
      </div>

      {/* Widget do chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] md:w-[480px] md:h-[700px]">
          <Card className="h-full flex flex-col bg-background border shadow-xl rounded-xl overflow-hidden">
            {/* Header do chat */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={darcyLogo} 
                    alt="Darcy Logo" 
                    className="w-10 h-10 rounded-full bg-white/10 p-1"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Darcy</h3>
                  <p className="text-xs opacity-90">Assistente de IA Virtual</p>
                </div>
              </div>
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Conteúdo baseado no status de login */}
            {!user ? (
              // Usuário não logado - mostrar mensagem de login
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <Lock className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Acesso Restrito</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Olá! Sou a Darcy, sua assistente virtual. 👋
                  <br /><br />
                  Para conversar comigo e tirar suas dúvidas sobre a plataforma e cursos, você precisa estar logado.
                </p>
                <Link to="/login">
                  <Button className="w-full">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            ) : (
              // Usuário logado - mostrar chat normal
              <>
                {/* Área de mensagens */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-6">
                      <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="font-semibold mb-3">Olá! Sou a Darcy 👋</p>
                      <p className="mb-4">Como posso te ajudar hoje?</p>
                      
                      {/* Tags de funcionalidades */}
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Encontrar aulas
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Dúvidas de aulas
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Dúvidas da plataforma
                        </span>
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {!message.isUser && (
                          <div className="flex items-center space-x-2 mb-1">
                            <img 
                              src={darcyLogo} 
                              alt="Darcy" 
                              className="w-5 h-5 rounded-full"
                            />
                            <span className="text-xs font-medium text-primary">Darcy</span>
                          </div>
                        )}
                        <p className="leading-relaxed">{message.texto}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Indicador de digitação */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg text-sm max-w-[80%]">
                        <div className="flex items-center space-x-2 mb-1">
                          <img 
                            src={darcyLogo} 
                            alt="Darcy" 
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs font-medium text-primary">Darcy</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input de mensagem */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatWidget;