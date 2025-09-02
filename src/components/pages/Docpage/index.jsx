import React, { useState } from "react";
import { Link } from "react-router-dom";

const Bullet = () => <span className="w-2 h-2 bg-cyan-600 inline-block rounded-full mr-2" />;

const Code = ({ children }) => (
  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed">
    <pre className="whitespace-pre-wrap">{children}</pre>
  </div>
);

const Tag = ({ children }) => (
  <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs font-mono">{children}</span>
);

const DocPage = () => {
  const [activeSection, setActiveSection] = useState("introducao");

  const sections = {
    introducao: {
      title: "Introdução",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Jupiter AI Assistant</h3>
          <p className="text-gray-700">
            O Jupiter AI Assistant é um bot de Telegram desenvolvido na plataforma de automações{" "}
            <strong>n8n</strong> (v1.104.1), com foco em integrações via APIs, Google Workspace e
            OpenAI. O objetivo é demonstrar capacidade técnica em automações, back-end e IA aplicada a fluxos reais.
          </p>

          <h4 className="text-xl font-semibold text-gray-900">Tecnologias Utilizadas</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Bullet /> n8n (Self-Hosted) para orquestração dos workflows</li>
            <li><Bullet /> Telegram Bot API para comunicação</li>
            <li><Bullet /> Google Drive &amp; Docs API (OAuth2) para manipulação/geração de documentos</li>
            <li><Bullet /> OpenAI API para transcrição e respostas em linguagem natural</li>
            <li><Bullet /> RSS G1 para extração de notícias em tempo real</li>
            <li><Bullet /> DigitalOcean VPS + Nginx + SSL para infraestrutura</li>
            <li><Bullet /> Cloudflare Tunnel como alternativa segura para expor o webhook</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900">Principais Diferenciais</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Bullet /> Conversação natural com IA (fallback inteligente)</li>
            <li><Bullet /> Manipulação dinâmica de documentos (texto + imagens)</li>
            <li><Bullet /> Captura de notícias em tempo real</li>
            <li><Bullet /> Transcrição automática de áudios</li>
            <li><Bullet /> Hospedagem contínua com HTTPS e domínio próprio</li>
          </ul>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 rounded">
            <p className="text-cyan-800">
              <strong>Como acessar o bot:</strong>{" "}
              <a className="underline hover:no-underline" href="https://t.me/JupiTheBot" target="_blank" rel="noreferrer">
                https://t.me/JupiTheBot
              </a>{" "}
              ou pesquisando por <strong>@JupiTheBot</strong> no Telegram.
            </p>
          </div>
        </div>
      ),
    },

    estrutura: {
      title: "Estrutura de Alto Nível",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            O bot se organiza em <strong>4 casos de uso</strong> principais e um diferencial de{" "}
            <strong>IA conversacional</strong>. O fluxo geral é:
          </p>
          <Code>
{`Usuário → Telegram Trigger → Router (Switch/IF) → [Workflow específico] → Resposta`}
          </Code>
          <ul className="space-y-2 text-gray-700">
            <li><Bullet /> Caso 1: Criação de Documento Base com Texto</li>
            <li><Bullet /> Caso 2: Substituição de Texto e Inserção de Imagens</li>
            <li><Bullet /> Caso 3: Coleta de Notícias (G1)</li>
            <li><Bullet /> Caso 4: Transcrição de Áudio</li>
            <li><Bullet /> Fallback: IA Conversacional</li>
          </ul>
        </div>
      ),
    },

    caso1: {
      title: "Caso 1 — Documento com Texto",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            <Tag>/documento</Tag> — Cria um documento a partir de um modelo no Google Docs, substitui
            <Tag>{`<<texto_do_usuario>>`}</Tag> pelo texto enviado no Telegram e retorna o PDF + link público.
          </p>
          <h4 className="text-xl font-semibold text-gray-900">Fluxo Técnico</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Telegram Trigger captura o comando</li>
            <li>Google Drive — <em>Copy file</em> duplica o modelo “Papel Timbrado Base”</li>
            <li>Google Docs — <em>Update Document</em> substitui <Tag>{`<<texto_do_usuario>>`}</Tag></li>
            <li>HTTP Request — exporta como PDF</li>
            <li>Google Drive — Upload do PDF</li>
            <li>HTTP Request — Share (permissão pública)</li>
            <li>Telegram — Send Document + Send Message (PDF e link público)</li>
          </ol>
          <h4 className="text-xl font-semibold text-gray-900">Nós-chave (n8n)</h4>
          <p className="text-gray-700">
            Telegram Trigger · IF · Google Drive (Copy File, Export as PDF, Share File) · Google Docs (Update Document) ·
            Telegram (Send Document/Message)
          </p>
        </div>
      ),
    },

    caso2: {
      title: "Caso 2 — Texto + Imagem em Marcadores",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            <Tag>/relatorio</Tag> — Substitui placeholders em um documento base por textos e insere uma imagem enviada
            com legenda no ponto indicado.
          </p>
          <h4 className="text-xl font-semibold text-gray-900">Fluxo Técnico</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Telegram Trigger identifica o comando</li>
            <li>Telegram — Get File baixa a imagem</li>
            <li>Google Drive — Upload image</li>
            <li>Google Drive — Copy file do modelo “Relatório”</li>
            <li>Google Docs — Update Document substitui <Tag>{`<<texto_relatorio>>`}</Tag> pelo texto da legenda</li>
            <li>HTTP — Ler Doc e gerar índice para localizar <Tag>{`<<imagem_assinatura>>`}</Tag></li>
            <li>HTTP — BatchUpdate remove marcador e insere a imagem</li>
            <li>Converter em PDF → armazenar no Drive → compartilhar → enviar no Telegram</li>
          </ol>
          <h4 className="text-xl font-semibold text-gray-900">Nós-chave (n8n)</h4>
          <p className="text-gray-700">
            Telegram Trigger/IF · Telegram (Get File) · Google Drive (Upload, Share, Copy) · Google Docs (Update) ·
            HTTP (read/batchUpdate/export) · Code (índice da imagem) · Telegram (Send Document/Message)
          </p>
        </div>
      ),
    },

    caso3: {
      title: "Caso 3 — Notícias do G1",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            <Tag>/noticias</Tag> — Busca as últimas notícias da capa do G1 (RSS), formata os 5 primeiros títulos + links e envia ao usuário.
          </p>
          <h4 className="text-xl font-semibold text-gray-900">Fluxo Técnico</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Telegram Trigger captura o comando</li>
            <li>HTTP Request acessa o RSS do G1</li>
            <li>XML → JSON para estruturar dados</li>
            <li>Code node formata os 5 itens</li>
            <li>Telegram — Send Message envia a lista</li>
          </ol>
          <h4 className="text-xl font-semibold text-gray-900">Nós-chave (n8n)</h4>
          <p className="text-gray-700">Telegram Trigger/IF · HTTP (RSS) · Item Lists/XML parse · Code · Telegram (Send Message)</p>
        </div>
      ),
    },

    caso4: {
      title: "Caso 4 — Transcrição de Áudio",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            Envio de áudio/mensagem de voz → o bot retorna a transcrição usando OpenAI Whisper (ou alternativa compatível).
          </p>
          <h4 className="text-xl font-semibold text-gray-900">Fluxo Técnico</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Telegram Trigger identifica áudio</li>
            <li>Telegram — Get Voice File para obter o arquivo</li>
            <li>OpenAI Whisper — Transcrição</li>
            <li>Telegram — Send Message retorna o texto</li>
          </ol>
          <h4 className="text-xl font-semibold text-gray-900">Nós-chave (n8n)</h4>
          <p className="text-gray-700">Telegram Trigger · HTTP (download) · OpenAI Whisper · Telegram (Send Message)</p>
        </div>
      ),
    },

    ia: {
      title: "Diferencial — IA Conversacional (Fallback)",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            Mensagens sem correspondência a comandos são roteadas para um fluxo de IA conversacional (OpenAI Chat),
            transformando o Jupiter em um assistente completo.
          </p>
          <h4 className="text-xl font-semibold text-gray-900">Workflow</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Switch/IF não encontra comando → saída <em>Default</em></li>
            <li>Texto segue para o nó OpenAI Chat (ex.: gpt-4o-mini)</li>
            <li>Resposta natural é enviada via Telegram</li>
          </ol>
          <p className="text-gray-700">Nós-chave: Switch/IF · OpenAI Chat Node · Telegram (Send Message)</p>
        </div>
      ),
    },

    infraestrutura: {
      title: "Infraestrutura & Autenticações",
      content: (
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-900">Infraestrutura</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Bullet /> VPS DigitalOcean (Ubuntu 22.04)</li>
            <li><Bullet /> Nginx Reverse Proxy + SSL (PositiveSSL / Sectigo)</li>
            <li><Bullet /> Domínio Namecheap (<em>n8n.jupiterai.me</em>) apontado via DNS</li>
            <li><Bullet /> Alternativa: Cloudflare Tunnel para exposição local do n8n</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900">Autenticações</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Bullet /> Google Drive/Docs via OAuth2</li>
            <li><Bullet /> OpenAI via API Key</li>
            <li><Bullet /> Telegram via Bot API</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900">Boas Práticas</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Bullet /> Usar marcadores padronizados (<Tag>{`<<texto_do_usuario>>`}</Tag>, <Tag>{`<<imagem_assinatura>>`}</Tag>)</li>
            <li><Bullet /> Converter documentos para PDF antes do envio</li>
            <li><Bullet /> Compartilhar como público (somente leitura) quando necessário</li>
          </ul>
        </div>
      ),
    },

    exemplos: {
      title: "Exemplos de Interação",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Comandos</h4>
              <ul className="space-y-2 text-gray-700">
                <li><Tag>/documento</Tag> → Envia PDF com texto personalizado</li>
                <li><Tag>/relatorio</Tag> → Documento com texto + imagem inserida</li>
                <li><Tag>/noticias</Tag> → “🔹 Últimas do G1: [link]”</li>
                <li>Enviar áudio → Retorna transcrição</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Fallback de IA</h4>
              <p className="text-gray-700">
                Perguntas abertas (ex.: “Qual a capital da França?”) são respondidas pelo modelo de IA.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    conclusao: {
      title: "Conclusão",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            O Jupiter AI Assistant é modular, escalável e bem estruturado. Demonstra domínio em IA aplicada,
            integrações com APIs externas (Google, Telegram, RSS, OpenAI), orquestração de fluxos no n8n e
            infraestrutura segura (VPS + SSL + domínio próprio).
          </p>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-4 text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar para Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentação do JupiterAI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guia completo para configurar, usar e integrar o JupiterAI em seus projetos.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seções</h3>
              <nav className="space-y-2">
                {Object.entries(sections).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === key
                        ? "bg-cyan-100 text-cyan-700 border-l-4 border-cyan-500"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {sections[activeSection].title}
              </h2>
              {sections[activeSection].content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocPage;
