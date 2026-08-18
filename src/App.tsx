/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Target,
  Cpu,
  Zap,
  Award,
  ArrowRight,
  ArrowLeft,
  Clock,
  Settings,
  Layers,
  Users,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  Sparkles,
  Database,
  BarChart2,
  ShieldCheck,
  Check,
  MessageSquare,
  RefreshCw,
  Gauge,
  Lightbulb
} from 'lucide-react';

// Sophisticated custom logo for Catalyize
const LogoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="catalyize-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="catalyize-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    {/* Geometric Outer Shield */}
    <path 
      d="M50 12 L88 34 L88 76 L50 98 L12 76 L12 34 Z" 
      stroke="url(#catalyize-grad-1)" 
      strokeWidth="5" 
      strokeLinejoin="round" 
      opacity="0.35" 
    />
    <path 
      d="M50 12 L88 34 L50 56 L12 34 Z" 
      fill="url(#catalyize-grad-2)" 
      stroke="url(#catalyize-grad-1)" 
      strokeWidth="3.5" 
      strokeLinejoin="round" 
    />
    <path 
      d="M12 34 L12 76 L50 98 L50 56 Z" 
      stroke="url(#catalyize-grad-1)" 
      strokeWidth="3.5" 
      strokeLinejoin="round" 
      opacity="0.8" 
    />
    {/* Inner Catalyize dynamic shape */}
    <path 
      d="M65 38 C58 30, 35 30, 35 50 C35 70, 58 70, 65 62" 
      stroke="url(#catalyize-grad-1)" 
      strokeWidth="7" 
      strokeLinecap="round" 
      fill="none" 
    />
    <circle cx="68" cy="50" r="4.5" fill="#38BDF8" />
  </svg>
);

export default function App() {
  // Initialization state
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeFase1Tab, setActiveFase1Tab] = useState(0);

  // Fase 3 Interactive ROI Simulator State
  const [adSpend, setAdSpend] = useState(8000);
  const [ticketMedio, setTicketMedio] = useState(3000);
  const [taxaConversao, setTaxaConversao] = useState(3); // in %

  // Calendar Modal State
  const [showCalendar, setShowCalendar] = useState(false);
  const [submittingMeeting, setSubmittingMeeting] = useState(false);
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);
  const [meetingForm, setMeetingForm] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    horario: 'Amanhã às 14:00',
    plano: 'Proposta de Parceria (R$ 2.500/mês)'
  });

  // Helper to open booking modal with preselected plan
  const openBookingModal = (planoSelecionado?: string) => {
    if (planoSelecionado) {
      setMeetingForm((prev) => ({ ...prev, plano: planoSelecionado }));
    }
    setShowCalendar(true);
  };

  // Comparison State (Sua Empresa Hoje vs Com Estrutura)
  const [comparisonState, setComparisonState] = useState<'hoje' | 'amanha'>('hoje');

  // Ref for snap-scrolling
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSections = 7;

  // Simulate premium bootloader
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showCalendar) return; // Disable slide keys when modal is open
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigatePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, showCalendar]);

  // Handle slide changing smooth scroll
  const scrollToSection = (index: number) => {
    if (index < 0 || index >= totalSections) return;
    setIsScrolling(true);
    setActiveSection(index);
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setIsScrolling(false);
      }, 650);
    }
  };

  const navigateNext = () => {
    if (activeSection < totalSections - 1) {
      scrollToSection(activeSection + 1);
    }
  };

  const navigatePrev = () => {
    if (activeSection > 0) {
      scrollToSection(activeSection - 1);
    }
  };

  // Manage natural mouse scrolling synchronization
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isScrolling) return;
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const windowHeight = window.innerHeight || 800;
    const index = Math.round(scrollPosition / windowHeight);
    if (index !== activeSection && index >= 0 && index < totalSections) {
      setActiveSection(index);
    }
  };

  // Sections navigation descriptors
  const sectionsMenu = [
    { label: 'Apresentação', index: 0 },
    { label: 'Fase 1 — Inicial', index: 1 },
    { label: 'Fase 2 — Escala', index: 2 },
    { label: 'Por que funciona?', index: 3 },
    { label: 'Custo de Equipe', index: 4 },
    { label: 'Proposta Parceria', index: 5 },
    { label: 'Proposta Protagonista', index: 6 }
  ];

  // Fase 1 Tab definition
  const fase1Tabs = [
    {
      id: 0,
      title: '1. Alinhamento Comercial',
      category: 'Sinergia e CRM',
      mainDesc: 'Mapeamento comercial completo para garantir que cada lead seja tratado com máxima eficiência.',
      subitems: [
        { label: 'Abordagem Comercial', desc: 'Análise e ajuste de scripts, pitches de vendas e estratégias de contatos comerciais.' },
        { label: 'Canal de Atendimento', desc: 'Mapeamento do SLA de respostas, reduzindo o tempo de primeiro contato com o lead.' },
        { label: 'Estrutura de SDR/Closer', desc: 'Divisão clara de funções para otimizar a passagem de bastão no funil de vendas.' },
        { label: 'Pipeline no CRM', desc: 'Organização do fluxo de negócios para clareza das etapas de negociação e gargalos.' },
        { label: 'Alinhamento de Feedback', desc: 'Criação de rotina de feedback ágil do time comercial para calibração das campanhas de anúncios.' },
        { label: 'Metas de Conversão', desc: 'Definição realista de taxas de agendamento e fechamento de contratos para o time.' }
      ]
    },
    {
      id: 1,
      title: '2. Gestão de Anúncios',
      category: 'Tráfego de Alta Performance',
      mainDesc: 'Criação de anúncios focados em atrair leads realmente interessados, gerando intenção de compra.',
      subitems: [
        { label: 'Estruturação de campanhas', desc: 'Configuração técnica avançada nas plataformas Meta Ads e Google Ads.' },
        { label: 'Orçamento inteligente', desc: 'Planejamento e distribuição de verba nos criativos e públicos com maior retorno potencial.' },
        { label: 'Estratégia de anúncios', desc: 'Anúncios desenhados sob medida para as maiores dores de seu público comprador.' },
        { label: 'Captação estratégica', desc: 'Foco total em trazer leads com alta intenção de compra para seu WhatsApp.' }
      ]
    },
    {
      id: 2,
      title: '3. Landing Pages',
      category: 'Conversão de Alta Performance',
      mainDesc: 'Páginas autorais, rápidas e persuasivas que convencem e guiam o lead até a ação desejada.',
      subitems: [
        { label: 'Estrutura persuasiva', desc: 'Arquitetura estratégica focada em reter atenção e estimular o clique.' },
        { label: 'Copy comercial', desc: 'Gatilhos mentais e argumentos sólidos para aumentar o valor percebido de seu serviço.' },
        { label: 'Mobile-First & Veloz', desc: 'Carregamento extremamente rápido otimizado para celulares e desktops.' },
        { label: 'Otimização de páginas', desc: 'Monitoramento de conversão e testes contínuos para manter rendimento máximo.' }
      ]
    },
    {
      id: 3,
      title: '4. Automações',
      category: 'Tecnologia e Velocidade',
      mainDesc: 'Estruturação tecnológica para que nenhum lead seja perdido por falta de rapidez no atendimento.',
      subitems: [
        { label: 'Primeiro contato automático', desc: 'WhatsApp de boas-vindas disparado imediatamente ao receber o lead.' },
        { label: 'Alertas internos', desc: 'Disparo instantâneo de alertas no celular do vendedor com dados primários do lead.' },
        { label: 'Nutrição e aquecimento', desc: 'Envio automático de depoimentos, provas sociais e portfólio para o lead.' },
        { label: 'Follow-up inteligente', desc: 'Cobranças e lembretes automáticos para ajudar o time a fechar as vendas.' },
        { label: 'Integrações completas', desc: 'Sincronização instantânea entre landing pages, formulários, WhatsApp e CRM.' }
      ]
    },
    {
      id: 4,
      title: '5. Processos Operacionais',
      category: 'Rotina de Vendas',
      mainDesc: 'Consolidação de processos claros para que a escala de anúncios resulte em previsibilidade comercial.',
      subitems: [
        { label: 'Trajeto do Lead', desc: 'Definição exata do percurso do lead desde o clique até a assinatura e onboarding.' },
        { label: 'Etapas de Passagem', desc: 'Alinhamento exato de critérios comerciais para mover o negócio no pipeline.' },
        { label: 'Relatórios de Performance', desc: 'Sua empresa pronta para analisar taxas, volume de leads e ROI real de forma simplificada.' }
      ]
    }
  ];

  // Calculations for ROI Calculator
  const custoPorLeadEstimado = 12; // CPL fixo estimado de R$ 12,00
  const leadsGerados = Math.round(adSpend / custoPorLeadEstimado);
  const totalVendas = Math.round(leadsGerados * (taxaConversao / 100));
  const faturamentoEstimado = totalVendas * ticketMedio;
  const roiMultiplicador = adSpend > 0 ? (faturamentoEstimado / adSpend).toFixed(1) : '0.0';
  const cpaEstimado = totalVendas > 0 ? Math.round(adSpend / totalVendas) : 0;
  const lucroLiquidoEstimado = faturamentoEstimado - adSpend;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingMeeting(true);
    setTimeout(() => {
      setSubmittingMeeting(false);
      setMeetingSubmitted(true);
    }, 1200);
  };

  const getWhatsAppLink = (customPlan?: string) => {
    const planoParaMsg = customPlan || meetingForm.plano || 'Proposta de Parceria (R$ 2.500/mês)';
    const baseText = `Olá! Vi a apresentação comercial interativa da Catalyize e gostaria de avançar na proposta de crescimento comercial.\n\n*Dados Cadastrados:*\n- Nome: ${meetingForm.nome || 'Interessado'}\n- Empresa: ${meetingForm.empresa || 'Não informada'}\n- Horário Sugerido: ${meetingForm.horario}\n- Plano de interesse: ${planoParaMsg}\n\nPor favor, gostaria de confirmar os próximos passos com o time comercial!`;
    return `https://api.whatsapp.com/send?phone=5511999999999&text=${encodeURIComponent(baseText)}`;
  };

  return (
    <div id="applet-root" className="min-h-screen bg-[#0B0B0B] text-[#F3F4F6] relative overflow-hidden font-sans select-none selection:bg-blue-600 selection:text-white">
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-950/20 rounded-full filter blur-[130px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/15 rounded-full filter blur-[160px] pointer-events-none z-0"></div>
      
      {/* Top Professional Header */}
      <header className="fixed top-0 left-0 right-0 h-20 z-40 border-b border-white/5 bg-[#0B0B0B]/80 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <LogoIcon className="w-9 h-9 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
          <div>
            <span className="font-semibold text-lg tracking-tight text-white block">CATALYIZE</span>
            <span className="text-[10px] text-blue-400 uppercase tracking-widest font-mono font-semibold">GROWTH FRAMEWORK</span>
          </div>
        </div>

        {/* Elegant top navigation links showing desktop slide progress */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {sectionsMenu.map((item) => (
            <button
              id={`nav-link-${item.index}`}
              key={item.index}
              onClick={() => scrollToSection(item.index)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 font-medium ${
                activeSection === item.index
                  ? 'text-blue-400 bg-white/5 border border-blue-500/30 shadow-sm shadow-blue-500/20'
                  : 'text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Discrete Progress Sidebar Indicators */}
      <div className="fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-center">
        <span className="text-[10px] font-mono text-zinc-600 rotate-270 mb-4 tracking-widest uppercase origin-center">APRESENTAÇÃO</span>
        <div className="flex flex-col gap-3">
          {sectionsMenu.map((item) => (
            <button
              id={`sidebar-dot-${item.index}`}
              key={item.index}
              onClick={() => scrollToSection(item.index)}
              className="group relative flex items-center justify-center p-1"
              aria-label={`Slide ${item.index + 1}`}
            >
              <div 
                className={`rounded-full transition-all duration-300 ${
                  activeSection === item.index 
                    ? 'w-3 h-3 bg-blue-400 shadow-md shadow-blue-500/60 scale-110' 
                    : 'w-2 h-2 bg-zinc-700 group-hover:bg-zinc-400 scale-100'
                }`}
              />
              
              {/* Tooltip */}
              <div className="absolute left-8 px-3 py-1 bg-zinc-950/95 border border-white/5 rounded text-[10px] uppercase font-mono tracking-wider font-semibold text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-xl">
                {item.label}
              </div>
            </button>
          ))}
        </div>
        <span className="text-xs font-mono font-bold text-blue-400 mt-4">
          0{activeSection + 1}/0{totalSections}
        </span>
      </div>

      {/* Booting Initial Loading Screen */}
      {loading && (
        <div id="initial-loading-portal" className="fixed inset-0 bg-[#0B0B0B] z-50 flex flex-col items-center justify-center p-6 bg-noise">
          <div className="text-center max-w-md w-full">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-blue-500/20 filter blur-xl rounded-full"></div>
              <LogoIcon className="w-14 h-14 relative z-10 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
            </div>
            
            <h2 className="text-xl font-bold tracking-widest text-white mb-2 font-display">CATALYIZE</h2>
            <div className="text-[10px] text-blue-400/80 uppercase tracking-widest font-mono mb-8">
              PREMIUM ACQUISITION SYSTEM
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden relative mb-4">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 transition-all duration-150 ease-out shadow-[0_0_10px_#3B82F6]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>ESTRUTURA DE ALTO IMPACTO</span>
              <span className="text-blue-400 font-bold">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Main 100vh Slides Container with Snap Scroll */}
      <div 
        id="presentation-viewport-container"
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory select-none no-scrollbar scroll-smooth relative z-10"
      >
        
        {/* ==============================================
            SECTION 1 — HERO
            ============================================== */}
        <section id="section-hero-0" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-24 pb-12 md:pb-16 lg:pb-24 lg:pt-28 bg-[#0B0B0B] grid-lines">
          {/* Subtle decoration elements */}
          <div className="absolute top-[35%] right-[10%] w-[450px] h-[450px] bg-blue-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
          
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-display tracking-tight">
                GESTÃO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">ANÚNCIOS</span> E PROCESSOS COMERCIAIS
              </h1>
              
              <p className="text-zinc-400 text-sm sm:text-md lg:text-lg leading-relaxed max-w-xl">
                Implementamos uma estrutura moderna de aquisição, automação e conversão para transformar sua operação comercial em uma máquina previsível de crescimento.
              </p>
            </div>

            {/* Right graphic column showing structured glow connections */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="glass-premium p-8 rounded-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/15 rounded-full filter blur-xl"></div>
                
                <span className="text-[10px] font-mono tracking-widest text-blue-400 block mb-6">MÁQUINA DE AQUISIÇÃO ATIVA</span>
                
                {/* Simulated connection nodes */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400 border border-blue-500/30">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tráfego Pago Segmentado</h4>
                      <p className="text-[10px] text-zinc-500">MQLs Aquecidos & Conversão</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300 pl-8">
                    <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400 border border-blue-500/30">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Landing Pages Premium</h4>
                      <p className="text-[10px] text-zinc-500">Conversão & Qualificação Ativa</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300 pl-16">
                    <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400 border border-blue-500/30">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automação de CRM</h4>
                      <p className="text-[10px] text-zinc-500">Nutrição de Leads Instantânea</p>
                    </div>
                  </div>
                </div>

                {/* Growth indicator badge */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Otimização Operacional</span>
                  <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +240% Previsibilidade
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick instructions to proceed */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Role para baixo ou clique no botão</span>
            <button 
              id="hero-arrow-next"
              onClick={() => scrollToSection(1)} 
              className="p-1 rounded-full text-blue-400 hover:text-white transition-colors"
              aria-label="Ir para próxima seção"
            >
              <ArrowRight className="w-4 h-4 rotate-90 animate-bounce" />
            </button>
          </div>
        </section>

        {/* ==============================================
            SECTION 2 — FASE 1: ESTRUTURAÇÃO INICIAL
            ============================================== */}
        <section id="section-fase1-1" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-24 pb-12 md:pb-16 lg:pb-24 lg:pt-28 bg-[#0B0B0B] overflow-hidden">
          <div className="max-w-6xl w-full flex flex-col justify-between h-full">
            
            {/* Section Heading info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-1">PROGRAMA DE CRESCIMENTO</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  FASE 1 — ESTRUTURAÇÃO INICIAL
                </h2>
              </div>
              <div className="max-w-md">
                <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1 font-mono">Objetivo da fase:</span>
                <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed">
                  “Criar uma base sólida para geração de leads, automação e conversão comercial.”
                </p>
              </div>
            </div>

            {/* Main Interactive Grid for Phase 1 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto items-stretch flex-1 min-h-0 pt-4">
              
              {/* Left Column Tabs (5 items) */}
              <div className="lg:col-span-5 flex flex-col justify-start gap-1.5 sm:gap-2 overflow-y-auto no-scrollbar py-1">
                {fase1Tabs.map((tab) => {
                  const isActive = activeFase1Tab === tab.id;
                  return (
                    <button
                      id={`fase1-tab-btn-${tab.id}`}
                      key={tab.id}
                      onClick={() => setActiveFase1Tab(tab.id)}
                      className={`text-left p-2.5 xl:p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                        isActive 
                          ? 'bg-blue-950/30 border-blue-500/40 shadow-md shadow-blue-950/40' 
                          : 'bg-zinc-950/40 border-white/5 hover:border-white/10 hover:bg-zinc-950/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                          isActive ? 'bg-blue-500 text-white' : 'bg-zinc-900 text-zinc-400'
                        }`}>
                          0{tab.id + 1}
                        </div>
                        <div>
                          <span className={`text-xs block font-semibold ${isActive ? 'text-blue-400' : 'text-zinc-400'}`}>
                            {tab.title.replace(/^\d\s-\s/, '')}
                          </span>
                          <span className="text-[10px] text-zinc-500 block">{tab.category}</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'text-blue-400 translate-x-1' : 'text-zinc-600'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Column Dynamic Detail Panel */}
              <div className="lg:col-span-7 glass-premium rounded-2xl p-4 sm:p-5 xl:p-6 relative overflow-hidden flex flex-col justify-between border border-white/5">
                {/* Glowing subtle trace */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full filter blur-2xl"></div>
                
                {/* Active Tab Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                      Pilar 0{fase1Tabs[activeFase1Tab].id + 1} // Mapeamento Completo
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {fase1Tabs[activeFase1Tab].category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {fase1Tabs[activeFase1Tab].title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {fase1Tabs[activeFase1Tab].mainDesc}
                    </p>
                  </div>

                  {/* Subitems lists generated dynamically */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-[160px] lg:max-h-[190px] xl:max-h-none overflow-y-auto no-scrollbar">
                    {fase1Tabs[activeFase1Tab].subitems.map((sub, idx) => (
                      <div key={idx} className="p-2 sm:p-2.5 xl:p-3 rounded-lg bg-white/[0.01] border border-white/5 hover:border-blue-500/30 transition-colors duration-350">
                        <span className="text-[11px] sm:text-xs font-bold text-white block mb-0.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 block" />
                          {sub.label}
                        </span>
                        <p className="text-[9px] sm:text-[10px] text-zinc-500 leading-normal">{sub.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of the panel */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span>SISTEMA DE ENTREGA INTEGRADO</span>
                  <span className="text-sky-400">ESTRUTURADORES DE SUCESSO</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 3 — FASE 2: ESCALA E CONSOLIDAÇÃO
            ============================================== */}
        <section id="section-fase3-3" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-16 pb-8 md:pb-12 lg:pb-16 lg:pt-20 bg-[#0B0B0B] overflow-hidden">
          <div className="max-w-6xl w-full flex flex-col justify-between h-full">
            
            {/* Header section Phase 2 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-1">MÁXIMA PERFORMANCE</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  FASE 2 — ESCALA E CONSOLIDAÇÃO
                </h2>
              </div>
              <div className="max-w-md">
                <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-1 font-mono">Objetivo da fase:</span>
                <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed">
                  “Consolidar uma operação previsível, escalável e sustentável.”
                </p>
              </div>
            </div>

            {/* Core Interactive Projection & ROI simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 my-auto items-stretch flex-1 min-h-0 pt-2">
              
              {/* Left side checklist of Phase 2 elements */}
              <div className="lg:col-span-5 flex flex-col justify-between glass-premium rounded-xl p-4 border border-white/5">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block mb-1">Passos de Consolidação</span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Diretrizes da Escala Comercial</h3>
                  
                  <div className="grid grid-cols-1 gap-1.5 overflow-y-auto max-h-[170px] xl:max-h-[220px] no-scrollbar">
                    {[
                      { title: 'Escala de campanhas', desc: 'Aumento gradual e seguro dos investimentos em tráfego pago.' },
                      { title: 'Otimização avançada', desc: 'Refinamento de anúncios, lances e públicos qualificados para vendas.' },
                      { title: 'Refinamento comercial', desc: 'Melhoria contínua de pitches, objeções e scripts das equipes.' },
                      { title: 'Crescimento estruturado', desc: 'Contratação de maior plantel de SDRs apenas quando o CAC estiver saudável.' },
                      { title: 'Acompanhamento estratégico', desc: 'Revisão quinzenal dos números de conversão global.' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-2.5 p-2 bg-white/[0.01] rounded border border-white/5">
                        <div className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 text-[10px] font-mono font-bold font-display leading-none">
                          0{idx+1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">{step.title}</p>
                          <p className="text-[10px] text-zinc-400">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 p-2 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                    <Award className="w-5 h-5 text-blue-400 shrink-0" />
                    <p className="text-[10px] text-zinc-300 leading-tight">
                      Garantia de atendimento e processos sem gargalo, transformando vendas em pura matemática.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side interactive simulator (Interactive Calculator for ROI - VERY high ticket) */}
              <div className="lg:col-span-7 glass-premium rounded-2xl p-4 xl:p-5 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-sky-400">SIMULADOR DE RETORNO (ROAS)</span>
                    <span className="text-xs text-white font-bold flex items-center gap-1">
                      <Gauge className="text-blue-400 w-3.5 h-3.5" /> Metodologia Catalyize
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 mb-2.5">
                    Ajuste os parâmetros abaixo para simular de forma realista a previsibilidade do seu funil e entender a matemática comercial do seu negócio:
                  </p>

                  <div className="space-y-3">
                    {/* Control 1: AdSpend slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-zinc-400 font-medium font-sans">Verba de Tráfego Mensal em Anúncios:</label>
                        <span className="text-white font-bold font-mono">
                          R$ {adSpend.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <input
                        id="roi-range-adspend"
                        type="range"
                        min="2000"
                        max="50000"
                        step="1000"
                        value={adSpend}
                        onChange={(e) => setAdSpend(Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                        <span>Min: R$ 2.000</span>
                        <span>Média Saudável</span>
                        <span>Max: R$ 50.000</span>
                      </div>
                    </div>

                    {/* Control 2: Ticket Medio slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-zinc-400 font-medium font-sans">Ticket Médio do seu Produto/Serviço:</label>
                        <span className="text-white font-bold font-mono">
                          R$ {ticketMedio.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <input
                        id="roi-range-ticketmedio"
                        type="range"
                        min="500"
                        max="200000"
                        step="500"
                        value={ticketMedio}
                        onChange={(e) => setTicketMedio(Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                        <span>R$ 500</span>
                        <span>High Ticket</span>
                        <span>R$ 200.000</span>
                      </div>
                    </div>

                    {/* Control 3: Closing conversion rate slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <label className="text-zinc-400 font-medium font-sans">Taxa de Conversão do Comercial:</label>
                        <span className="text-white font-bold font-mono">
                          {taxaConversao}% de leads convertidos
                        </span>
                      </div>
                      <input
                        id="roi-range-taxaconv"
                        type="range"
                        min="0.5"
                        max="15"
                        step="0.5"
                        value={taxaConversao}
                        onChange={(e) => setTaxaConversao(Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
                        <span>Conversiva (0.5%)</span>
                        <span>Gargalo Resolvido (3% - 5%)</span>
                        <span>Alta Performance (15%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Educational Math Explanation block */}
                <div className="my-2.5 p-3 bg-zinc-950/60 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                    💡 COMO A PREVISÃO DO FUNIL DE VENDAS É CALCULADA:
                  </span>
                  <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed font-sans">
                    Como uma <strong className="text-white">previsão realista</strong>, com <strong className="text-white">R$ {adSpend.toLocaleString('pt-BR')}</strong> estimados em anúncios, a estimativa do modelo é gerar cerca de <strong className="text-blue-400">{leadsGerados} Leads</strong> baseados em um custo por lead projetado de <strong className="text-white font-mono">R$ {custoPorLeadEstimado},00 (CPL)</strong>. 
                    Considerando a taxa de conversão final estimada do seu comercial de <strong className="text-white">{taxaConversao}%</strong>, a projeção simula cerca de <strong className="text-blue-400">{totalVendas} vendas</strong>. 
                    Assim, o seu Custo por Aquisição de Cliente <span className="underline decoration-blue-500 font-semibold text-white">(CPA - Custo por Cliente)</span> estimado ficaria em torno de <strong className="text-sky-400">R$ {cpaEstimado.toLocaleString('pt-BR')}</strong>.
                  </p>
                </div>

                {/* Expanded Results Grid of the projector tool */}
                <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded bg-[#0b0b0b]/60 border border-white/5 flex flex-col justify-center text-center">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono block">Custo p/ Lead (CPL)</span>
                    <span className="text-xs font-bold text-zinc-300 font-mono">R$ {custoPorLeadEstimado},00</span>
                    <span className="text-[8px] text-zinc-600 block leading-tight mt-0.5">Previsão Média</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#0b0b0b]/60 border border-blue-500/30 flex flex-col justify-center text-center border-l-2 border-l-blue-500">
                    <span className="text-[9px] text-blue-400 uppercase font-mono block font-semibold">CPA de Aquisição</span>
                    <span className="text-xs font-extrabold text-sky-400 font-mono">R$ {cpaEstimado.toLocaleString('pt-BR')}</span>
                    <span className="text-[8px] text-blue-400/60 block leading-tight mt-0.5">Estimativa por Cliente</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#0b0b0b]/60 border border-white/5 flex flex-col justify-center text-center">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono block">Leads Projetados</span>
                    <span className="text-xs font-bold text-white font-mono">{leadsGerados} leads</span>
                    <span className="text-[8px] text-zinc-600 block leading-tight mt-0.5">Previsão de Entrada</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#0b0b0b]/60 border border-white/5 flex flex-col justify-center text-center">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono block">Vendas Planejadas</span>
                    <span className="text-xs font-bold text-white font-mono">{totalVendas} fechamentos</span>
                    <span className="text-[8px] text-zinc-600 block leading-tight mt-0.5">Projeção com {taxaConversao}%</span>
                  </div>

                  <div className="p-2.5 rounded bg-[#0b0b0b]/60 border border-white/5 flex flex-col justify-center text-center">
                    <span className="text-[9px] text-zinc-500 uppercase font-mono block">Retorno Líquido</span>
                    <span className="text-xs font-bold text-blue-400 font-mono">R$ {lucroLiquidoEstimado.toLocaleString('pt-BR')}</span>
                    <span className="text-[8px] text-zinc-600 block leading-tight mt-0.5">Previsão de Lucro Real</span>
                  </div>

                  <div className="p-2.5 rounded bg-blue-500/10 border border-blue-500/30 flex flex-col justify-center text-center">
                    <span className="text-[9px] text-blue-400 uppercase font-mono font-bold block">Fator ROAS</span>
                    <span className="text-xs font-bold text-sky-400 font-mono">{roiMultiplicador}x retorno</span>
                    <span className="text-[8px] text-blue-400/60 block leading-tight mt-0.5">Projeção multiplicadora</span>
                  </div>
                </div>

                {/* Safety Disclaimer added at the bottom */}
                <p className="text-[8.5px] text-zinc-600 italic text-center mt-3 leading-snug">
                  *Observação: As métricas acima são simulações matemáticas baseadas em estimativas de mercado. Os resultados reais podem variar de acordo com a qualidade de atendimento, sazonalidade e outros fatores comerciais. Não constituem garantia contratual de performance.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 4 — DIFFERENTIAL
            ============================================== */}
        <section id="section-differential-4" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-24 pb-12 md:pb-16 lg:pb-24 lg:pt-28 bg-[#0B0B0B] overflow-hidden">
          <div className="max-w-6xl w-full flex flex-col justify-between h-full">
            
            {/* Header info */}
            <div>
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-1">MÉTODO COMPROVADO</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Por que nossa estrutura funciona?
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                Diferente de agências tradicionais brasileiras que entregam somente &quot;posts&quot;, unimos tecnologia de vendas com performance absoluta.
              </p>
            </div>

            {/* Bento Grid Presentation of Differentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 my-auto flex-1 min-h-0 overflow-y-auto no-scrollbar py-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
                  title: 'Estratégias de Performance',
                  desc: 'Absolutamente nada é baseado em achismo. Cada centavo investido é rastreado para garantir menor CAC.'
                },
                {
                  icon: <Cpu className="w-5 h-5 text-blue-400" />,
                  title: 'Estrutura de Aquisição',
                  desc: 'Unimos tráfego pago, processos de Inside Sales e metodologias como SPIN Selling para criar operações comerciais mais eficientes e escaláveis.'
                },
                {
                  icon: <Zap className="w-5 h-5 text-blue-400" />,
                  title: 'Processos Automatizados',
                  desc: 'Envios automáticos para reduzir tempo de resposta do vendedor de horas para apenas 60 segundos.'
                },
                {
                  icon: <Target className="w-5 h-5 text-blue-400" />,
                  title: 'Foco em Conversão Real',
                  desc: 'Landing pages de conversão de alto impacto emocional focada na dor imediata que seu cliente enfrenta.'
                },
                {
                  icon: <Users className="w-5 h-5 text-blue-400" />,
                  title: 'Operação Enxuta e Eficiente',
                  desc: 'Sua equipe comercial e gestores focando exclusivamente no fechamento de contratos, não em alimentar planilhas.'
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
                  title: 'Acompanhamento Contínuo',
                  desc: 'Suporte diário, discussões de objeções de vendas em equipe e relatórios claros de ROI comercial.'
                }
              ].map((item, idx) => (
                <div key={idx} className="glass-premium p-5 rounded-2xl border border-white/5 glass-premium-hover relative flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wide">{item.title}</h3>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-600">
                    <span>MÉTODO EXCLUSIVO</span>
                    <span className="text-blue-400/80">PREV_OK // 0{idx+1}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 5 — CUSTO DE EQUIPE (MENSALIDADE COMPARATIVA)
            ============================================== */}
        <section id="section-team-5" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-24 pb-12 md:pb-16 lg:pb-24 lg:pt-28 bg-[#0B0B0B] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/5 rounded-full filter blur-[120px] pointer-events-none"></div>

          <div className="max-w-6xl w-full flex flex-col justify-between h-full">
            
            {/* Header section with styling in lines with attachment */}
            <div>
              <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest block mb-1">CUSTO VS BENEFÍCIO</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                Quanto seria para ter os mesmos... <br className="hidden sm:inline" />
                <span className="text-blue-400 font-extrabold text-3xl sm:text-4xl md:text-5xl block mt-1 tracking-tight">Profissionais envolvidos no projeto</span>
              </h2>
            </div>

            {/* Core 2-column comparative layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 my-auto items-center">
              
              {/* Left Column: Salaries list */}
              <div className="col-span-1 md:col-span-7 space-y-6">
                <div className="glass-premium rounded-2xl p-6 md:p-8 border border-white/5 bg-zinc-950/20 relative overflow-hidden shadow-xl shadow-black/40">
                  <div className="space-y-5">
                    {[
                      { role: 'Gestor de Tráfego Pleno', salary: 'R$ 5.000' },
                      { role: 'Estrategista digital', salary: 'R$ 4.500' },
                      { role: 'Programador de Automações', salary: 'R$ 3.000' },
                      { role: 'Desenvolvedor de Landing Page', salary: 'R$ 2.500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between font-mono">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-red-500">0{index + 1}.</span>
                          <span className="text-sm text-zinc-100 font-sans font-medium">{item.role}</span>
                        </div>
                        {/* Dotted connector */}
                        <div className="flex-1 mx-4 border-b border-dashed border-zinc-800 self-end mb-1"></div>
                        <span className="text-sm font-semibold text-zinc-300">{item.salary}</span>
                      </div>
                    ))}
                  </div>

                  {/* Red Slash Crossing of Total Cost */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold tracking-wider text-zinc-400 uppercase">Total de Custos Mensais:</span>
                    <div className="relative inline-block px-4 py-2 bg-red-950/25 rounded-xl border border-red-500/20 shadow-md">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">R$ 15.000/mês</span>
                      {/* Premium Red Diagonal Cross Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                        <line 
                          x1="0" 
                          y1="90%" 
                          x2="100%" 
                          y2="10%" 
                          stroke="#ef4444" 
                          strokeWidth="3.5" 
                          strokeLinecap="round" 
                          className="drop-shadow-[0_2px_8px_rgba(239,68,68,0.7)]" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Strategic highlights */}
              <div className="col-span-1 md:col-span-5 space-y-6">
                <div className="glass-premium rounded-2xl p-6 border-l-4 border-l-blue-500 border border-white/5 bg-zinc-950/30">
                  <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight leading-snug">
                    Você quer um comercial faixa preta, ou comercial dor de cabeça?
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                        Somos profissionais ambientados, já &quot;rampados&quot; com formações em vendas e contratação comercial, preparados para implantar o seu projeto.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                        Reduzimos custos através de eficiência de processos validados e replicáveis e compartilhamento de profissionais experientes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="h-2"></div>

          </div>
        </section>

        {/* ==============================================
            SECTION 6 — PROPOSTA DE PARCERIA (R$ 2.500)
            ============================================== */}
        <section id="section-parceria-5" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-24 pb-12 md:pb-16 lg:pb-24 lg:pt-28 bg-[#0B0B0B] overflow-hidden">
          <div className="max-w-6xl w-full flex flex-col justify-between h-full">
            
            {/* Title section with pricing header */}
            <div className="text-center">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-1">PROPOSTA DE PARCERIA</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                VALOR
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Uma solução pautada no seu crescimento comercial previsível.
              </p>
            </div>

            {/* Centered Pricing Card */}
            <div className="flex justify-center my-auto items-stretch max-w-md mx-auto w-full">
              {/* CARD: PROPOSTA DE PARCERIA */}
              <div className="glass-premium rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 z-20 w-full shadow-xl shadow-black/40">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider block">VALOR</h3>
                    <p className="text-xs text-zinc-400 mb-4">Estruturação padrão de canais de captação e automação.</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono text-white">R$ 2.500</span>
                      <span className="text-xs text-zinc-400">/ mês</span>
                    </div>
                  </div>

                  {/* Benefit Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {[
                      'Gestão de Tráfego Pago Profissional',
                      'Desenvolvimento de Landing Pages',
                      'Automações Comerciais Integradas',
                      'Estruturação Estratégica Completa',
                      'Otimizações e Testes Contínuos',
                      'Suporte Direto com Especialistas'
                    ].map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6">
                  <p className="text-[10px] text-zinc-500 italic">
                    *Pagamento realizado integralmente na assinatura do contrato.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 7 — PROPOSTA PROTAGONISTA (R$ 1.500)
            ============================================== */}
        <section id="section-protagonista-6" className="h-screen w-full snap-start flex flex-col justify-center items-center relative px-6 md:px-12 lg:pl-32 lg:pr-20 pt-24 pb-12 md:pb-16 lg:pb-24 lg:pt-28 bg-[#0B0B0B] overflow-hidden">
          <div className="max-w-6xl w-full flex flex-col justify-between h-full">
            
            {/* Title section with pricing header */}
            <div className="text-center">
              <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-1">PROPOSTA PROTAGONISTA</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                VALOR
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Uma solução pautada no seu crescimento comercial previsível.
              </p>
            </div>

            {/* Centered Pricing Card */}
            <div className="flex justify-center my-auto items-stretch max-w-md mx-auto w-full">
              {/* CARD: PROPOSTA PROTAGONISTA */}
              <div className="glass-premium rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 z-20 w-full shadow-xl shadow-black/40">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider block">VALOR</h3>
                    <p className="text-xs text-zinc-400 mb-4">Estruturação padrão de canais de captação e automação.</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono text-white">R$ 1.500</span>
                      <span className="text-xs text-zinc-400">/ mês</span>
                    </div>
                  </div>

                  {/* Benefit Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {[
                      'Gestão de Tráfego Pago Profissional',
                      'Desenvolvimento de Landing Pages',
                      'Automações Comerciais Integradas',
                      'Estruturação Estratégica Completa',
                      'Otimizações e Testes Contínuos',
                      'Suporte Direto com Especialistas'
                    ].map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6">
                  <p className="text-[10px] text-zinc-500 italic">
                    *Pagamento realizado integralmente na assinatura do contrato.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* ==============================================
          INTERACTIVE MODAL: MEETING SCHEDULER & DETAILS
          ============================================== */}
      {showCalendar && (
        <div id="booking-modal-overlay" className="fixed inset-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-premium rounded-2xl max-w-lg w-full overflow-hidden border border-white/10 shadow-2xl relative block animate-fade-up">
            
            {/* Close button top right */}
            <button
              id="booking-modal-close"
              onClick={() => {
                setShowCalendar(false);
                setMeetingSubmitted(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
              aria-label="Modal close"
            >
              &times;
            </button>

            {/* Modal content body */}
            <div className="p-6 md:p-8 space-y-6">
              
              {!meetingSubmitted ? (
                <>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block">GARANTIA DE SUCESSO COMERCIAL</span>
                    <h3 className="text-xl font-bold text-white">Solicitar Diagnóstico Estratégico</h3>
                    <p className="text-xs text-zinc-400">
                      Configure dados rápidos para preenchermos sua pasta operacional e agendar seu bate-papo de 15 min.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Input 1: Nome */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Seu Nome Comercial:</label>
                      <input
                        id="form-nome"
                        type="text"
                        required
                        placeholder="Ex: João da Silva"
                        value={meetingForm.nome}
                        onChange={(e) => setMeetingForm({ ...meetingForm, nome: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Input 2: Empresa */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Sua Empresa:</label>
                      <input
                        id="form-empresa"
                        type="text"
                        required
                        placeholder="Ex: Minha Startup SA"
                        value={meetingForm.empresa}
                        onChange={(e) => setMeetingForm({ ...meetingForm, empresa: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Input 3: WhatsApp */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">WhatsApp para Contato:</label>
                      <input
                        id="form-whatsapp"
                        type="tel"
                        required
                        placeholder="Ex: (11) 99999-9999"
                        value={meetingForm.whatsapp}
                        onChange={(e) => setMeetingForm({ ...meetingForm, whatsapp: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Row Selects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Horario Preference */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Melhor Horário:</label>
                        <select
                          id="form-horario"
                          value={meetingForm.horario}
                          onChange={(e) => setMeetingForm({ ...meetingForm, horario: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <option value="Amanhã às 10:00">Amanhã às 10:00</option>
                          <option value="Amanhã às 14:00">Amanhã às 14:00</option>
                          <option value="Quinta-feira às 11:00">Quinta-feira às 11:00</option>
                          <option value="Quinta-feira às 15:00">Quinta-feira às 15:00</option>
                        </select>
                      </div>

                      {/* Plano Preference */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Plano Preferencial:</label>
                        <select
                          id="form-plano"
                          value={meetingForm.plano}
                          onChange={(e) => setMeetingForm({ ...meetingForm, plano: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <option value="Proposta de Parceria (R$ 2.500/mês)">Proposta de Parceria (R$ 2.500/mês)</option>
                          <option value="Proposta Protagonista (R$ 1.500/mês)">Proposta Protagonista (R$ 1.500/mês)</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit action */}
                    <button
                      id="form-submit-btn"
                      type="submit"
                      disabled={submittingMeeting}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                    >
                      {submittingMeeting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Processando agendamento...
                        </>
                      ) : (
                        <>
                          Reservar Vaga Comercial Gratuitamente
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-6 animate-fade-up">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border-2 border-blue-500/40">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Agendamento Pré-Confirmado!</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                      Perfeito <span className="text-white font-bold">{meetingForm.nome}</span>! Reservamos sua chamada de diagnóstico para a empresa <span className="text-white font-bold">{meetingForm.empresa}</span>.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-950/30 border border-blue-500/30 rounded-xl space-y-3">
                    <p className="text-xs text-zinc-300">
                      Para garantir seu atendimento e receber o link exclusivo do Google Meet, clique no botão e fale conosco imediatamente via WhatsApp de Vendas:
                    </p>
                    
                    <a
                      id="modal-whatsapp-external-link"
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <MessageSquare className="w-4 h-4" /> Chamar Comercial no WhatsApp
                    </a>
                  </div>

                  <button
                    id="modal-post-close"
                    onClick={() => {
                      setShowCalendar(false);
                      setMeetingSubmitted(false);
                    }}
                    className="text-zinc-500 hover:text-white text-[11px] font-mono tracking-widest uppercase transition-colors"
                  >
                    Voltar ao Slide Deck
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
