
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    {
      category: "Sobre Nossos Serviços",
      questions: [
        {
          question: "VOCÊS VÃO ESCREVER O TRABALHO FINAL PARA MIM?",
          answer: "Compreendo a sua solicitação, mas, infelizmente, não podemos escrever por você. Esse tipo de \"serviço\" é proibido por lei, de acordo com o Art. 299 do Código Penal. É compreensível que nem todas as pessoas tenham conhecimento sobre a ilegalidade desse ato. Estamos aqui para ajudar e orientar você da melhor maneira possível. Queremos incentivá-lo a ser o autor da sua própria história, pois acreditamos que você possui habilidades e potencial para expressar suas ideias e pensamentos de forma única.\n\nPor isso, temos diversos serviços e produtos que, com ética, te ajudam a melhorar sua produtividade acadêmica."
        },
        {
          question: "NÃO SEI NEM POR ONDE COMEÇAR, COMO VOCÊS PODEM ME AJUDAR?",
          answer: "Nós temos uma método próprio que associa as habilidades socioemocionais com a escrita ágil. Por isso, as nossas mentorias e os nossos infoprodutos envolvem o passo a passo para aprimorar seu processo de escrita tanto quanto seu desenvolvimento socioemocional. Nas mentorias, você terá o acompanhamento completo desde o planejamento até a revisão textual. O objetivo é seu, mas os resultados são nossos – isso é parceria até o fim!"
        },
        {
          question: "QUAL É O DIFERENCIAL DA ESCRITA COM CIÊNCIA?",
          answer: "É que diferentemente de nossos concorrentes que focam na formatação do texto e no detalhamento da metodologia científica. Temos um método próprio já validado com mais de 606 universitários e aplicado em mais de 1500 graduandos e pós-graduandos. O Método RAC associa habilidades socioemocionais à escrita ágil, o que potencializa seu processo de escrita acadêmica respeitando seu estilo de aprendizagem e sua competência emocional."
        }
      ]
    },
    {
      category: "Prazos e Organização",
      questions: [
        {
          question: "COMO FUNCIONA OS PRAZOS?",
          answer: "Dependendo do ritmo de aprendizagem do universitário e do tipo de produto/serviço contratado. O prazo para cursar os infoprodutos é de 12 meses. A Mentoria RAC possui uma duração de 5 sessões, que podem ser agendadas em um período de até 6 (seis) meses, sendo a média de 45 dias entre a primeira e a última mentoria. O Grupo SuperAção consiste em oito encontros síncronos semanais, os quais ocorrem, na média, em oito semanas. Esses encontros são gravados e ficam disponíveis por 12 meses. Já a duração da Consultoria pedagógica depende do projeto de educação corporativa em questão, uma vez que cada curso exige um período de planejamento, execução e avaliação."
        },
        {
          question: "ESTOU COM MUITA PRESSA, MESMO!!! É POSSÍVEL VOCÊS ME AJUDAREM?",
          answer: "O prazo mínimo para TCCs, artigos e relatórios é de 10 (dez) dias. Para dissertações e teses, o prazo mínimo, é de 30 (trinta) dias. Para serviços realizados aos finais de semana ou no prazo menor de 15 dias, é cobrada uma taxa de urgência de 50% sobre o valor inicial orçado para prazos normais."
        }
      ]
    },
    {
      category: "Pagamento",
      questions: [
        {
          question: "QUAIS SÃO AS FORMAS DE PAGAMENTO?",
          answer: "O pagamento pelo serviço contratado pode ser efetuado por PIX, Link de pagamento, depósito ou transferência bancária. O serviço solicitado só é iniciado após a comprovação da quitação de 50% do valor combinado no caso da Mentoria RAC e Consultoria Pedagógica. O restante deverá ser pago pelo link de pagamento. Para cartões de crédito, é possível o parcelamento."
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma e cursos
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <Card key={itemIndex} className="overflow-hidden">
                      <CardHeader className="pb-0">
                        <Button
                          variant="ghost"
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full justify-between text-left p-0 h-auto"
                        >
                          <CardTitle className="text-lg font-medium text-gray-900 pr-4">
                            {item.question}
                          </CardTitle>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </Button>
                      </CardHeader>
                      {isOpen && (
                        <CardContent className="pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Nenhuma pergunta encontrada para "{searchTerm}"
            </p>
            <Button onClick={() => setSearchTerm('')} variant="outline">
              Limpar busca
            </Button>
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Entrar em Contato
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
