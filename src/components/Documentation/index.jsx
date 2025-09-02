import { useState } from "react";
import { Link } from "react-router-dom";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("comandos");

  const tabs = {
    comandos: {
      title: "Comandos Básicos",
      content: [
        {
          command: "/documento",
          description: "Criar documento base com texto personalizado.",
        },
        {
          command: "/relatorio",
          description: "Inserir texto e imagens em marcadores específicos.",
        },
        {
          command: "/noticias",
          description: "Receber as 5 principais notícias do G1.",
        },
        {
          command: "/help",
          description: "Exibir o menu de ajuda.",
        },
        {
          command: "Áudio",
          description: "Envie um áudio e ele fará a transcrição e te enviará.",
        },
        {
          command: "Mensagem comum",
          description:
            "Se você enviar uma mensagem que não seja um comando, ele responderá usando inteligência artificial.",
        },
      ],
    },
    faq: {
      title: "Perguntas Frequentes",
      content: [
        {
          command: "Como configurar o bot?",
          description:
            "Acesse o painel administrativo e siga o guia de configuração inicial.",
        },
        {
          command: "O bot funciona em qual idioma?",
          description: "Suporte completo em português, inglês e espanhol.",
        },
        {
          command: "Como integrar com meu sistema?",
          description: "Oferecemos APIs RESTful e webhooks para integração.",
        },
        {
          command: "Qual o limite de mensagens?",
          description: "Planos flexíveis a partir de 1.000 mensagens/mês.",
        },
      ],
    },
  };

  return (
    <section
      id="documentacao"
      className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Documentação e Guias
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para começar a usar o JupiterAI. Guias
            completos, exemplos práticos e suporte dedicado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex space-x-1 mb-6">
                {Object.keys(tabs).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {tabs[tab].title}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {tabs[activeTab].content.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-cyan-500 pl-4 py-2"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.command}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <svg
                className="h-12 w-12 text-cyan-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Comece em minutos
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa documentação completa irá guiá-lo através de cada passo,
                desde a configuração inicial até funcionalidades avançadas.
              </p>
              <Link
                to="/documentacao"
                className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Ler a Documentação Completa
                <svg
                  className="ml-2 h-4 w-4 rotate-[-90deg]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-3">Precisa de ajuda?</h3>
              <p className="mb-4 opacity-90">
                Nossa equipe de suporte está sempre pronta para ajudar você.
              </p>
              <a
                href="https://t.me/jacoryan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-cyan-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Falar com Suporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
