/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Cpu, 
  Calendar, 
  TrendingUp, 
  Target, 
  AlertCircle,
  ChevronRight,
  Plus,
  Settings,
  Users,
  DollarSign,
  Clock,
  Shield,
  FileText,
  Layers,
  Box,
  CheckCircle2,
  Circle,
  ChevronDown,
  UserPlus,
  HardDrive,
  FileCode,
  MessageSquare,
  AlertTriangle,
  Users2,
  BrainCircuit,
  History,
  Download,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { 
  INITIAL_STATS, 
  INITIAL_TASKS, 
  INITIAL_MILESTONES, 
  TECHNICAL_SPECS,
  STRATEGIC_OBJECTIVES,
  PROJECT_SCOPE,
  DELIVERABLES,
  WBS_DATA,
  SCOPE_CHANGES,
  PHASE_BUDGETS,
  QUALITY_CRITERIA,
  TECHNICAL_TESTS,
  DEFECTS,
  TEAM_MEMBERS,
  TECHNICAL_RESOURCES,
  PROJECT_DOCUMENTS,
  MEETINGS,
  PROJECT_RISKS,
  STAKEHOLDERS
} from './constants';
import { 
  Task, 
  Milestone, 
  TechnicalSpec, 
  ProjectStats, 
  StrategicObjective, 
  ProjectScope, 
  Deliverable, 
  WBSNode,
  ScopeChange,
  PhaseBudget,
  QualityCriterion,
  TechnicalTest,
  Defect,
  TeamMember,
  TechnicalResource,
  ProjectDocument,
  Meeting,
  ProjectRisk,
  Stakeholder,
  AIReport
} from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'overview' | 'strategy' | 'scope' | 'wbs' | 'tasks' | 'timeline' | 'financials' | 'quality' | 'technical' | 'milestones' | 'team' | 'resources' | 'documents' | 'communications' | 'risks' | 'stakeholders' | 'ai-analysis';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [stats] = useState<ProjectStats>(INITIAL_STATS);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection stats={stats} milestones={INITIAL_MILESTONES} />;
      case 'strategy':
        return <StrategySection objectives={STRATEGIC_OBJECTIVES} />;
      case 'scope':
        return <ScopeSection scope={PROJECT_SCOPE} deliverables={DELIVERABLES} scopeChanges={SCOPE_CHANGES} />;
      case 'wbs':
        return <WBSSection wbs={WBS_DATA} />;
      case 'tasks':
        return <TasksSection tasks={tasks} members={TEAM_MEMBERS} />;
      case 'timeline':
        return <TimelineSection tasks={tasks} />;
      case 'financials':
        return <FinancialSection budgets={PHASE_BUDGETS} stats={stats} />;
      case 'quality':
        return <QualitySection criteria={QUALITY_CRITERIA} tests={TECHNICAL_TESTS} defects={DEFECTS} />;
      case 'technical':
        return <TechnicalSection specs={TECHNICAL_SPECS} />;
      case 'milestones':
        return <MilestonesSection milestones={INITIAL_MILESTONES} />;
      case 'team':
        return <TeamSection members={TEAM_MEMBERS} tasks={tasks} />;
      case 'resources':
        return <ResourceSection resources={TECHNICAL_RESOURCES} budgets={PHASE_BUDGETS} />;
      case 'documents':
        return <DocumentSection documents={PROJECT_DOCUMENTS} />;
      case 'communications':
        return <CommunicationSection meetings={MEETINGS} />;
      case 'risks':
        return <RiskSection risks={PROJECT_RISKS} />;
      case 'stakeholders':
        return <StakeholderSection stakeholders={STAKEHOLDERS} />;
      case 'ai-analysis':
        return <AIAnalysisSection projectData={{ stats, tasks, risks: PROJECT_RISKS, budgets: PHASE_BUDGETS }} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="p-6 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white">
              <Cpu size={24} />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight">RoboTripod</h1>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Project Alpha</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Resumen General" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <NavItem 
            icon={<Target size={18} />} 
            label="Estrategia" 
            active={activeTab === 'strategy'} 
            onClick={() => setActiveTab('strategy')} 
          />
          <NavItem 
            icon={<FileText size={18} />} 
            label="Alcance" 
            active={activeTab === 'scope'} 
            onClick={() => setActiveTab('scope')} 
          />
          <NavItem 
            icon={<Layers size={18} />} 
            label="Estructura (WBS)" 
            active={activeTab === 'wbs'} 
            onClick={() => setActiveTab('wbs')} 
          />
          <NavItem 
            icon={<CheckSquare size={18} />} 
            label="Tareas y Kanban" 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')} 
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Equipo y Carga" 
            active={activeTab === 'team'} 
            onClick={() => setActiveTab('team')} 
          />
          <NavItem 
            icon={<Clock size={18} />} 
            label="Línea de Tiempo" 
            active={activeTab === 'timeline'} 
            onClick={() => setActiveTab('timeline')} 
          />
          <NavItem 
            icon={<HardDrive size={18} />} 
            label="Recursos Técnicos" 
            active={activeTab === 'resources'} 
            onClick={() => setActiveTab('resources')} 
          />
          <NavItem 
            icon={<DollarSign size={18} />} 
            label="Finanzas" 
            active={activeTab === 'financials'} 
            onClick={() => setActiveTab('financials')} 
          />
          <NavItem 
            icon={<Shield size={18} />} 
            label="Calidad y QA" 
            active={activeTab === 'quality'} 
            onClick={() => setActiveTab('quality')} 
          />
          <NavItem 
            icon={<FileCode size={18} />} 
            label="Gestión Documental" 
            active={activeTab === 'documents'} 
            onClick={() => setActiveTab('documents')} 
          />
          <NavItem 
            icon={<MessageSquare size={18} />} 
            label="Comunicaciones" 
            active={activeTab === 'communications'} 
            onClick={() => setActiveTab('communications')} 
          />
          <NavItem 
            icon={<AlertTriangle size={18} />} 
            label="Gestión de Riesgos" 
            active={activeTab === 'risks'} 
            onClick={() => setActiveTab('risks')} 
          />
          <NavItem 
            icon={<Users2 size={18} />} 
            label="Stakeholders" 
            active={activeTab === 'stakeholders'} 
            onClick={() => setActiveTab('stakeholders')} 
          />
          <NavItem 
            icon={<BrainCircuit size={18} />} 
            label="Análisis AI" 
            active={activeTab === 'ai-analysis'} 
            onClick={() => setActiveTab('ai-analysis')} 
          />
          <NavItem 
            icon={<Cpu size={18} />} 
            label="Especificaciones" 
            active={activeTab === 'technical'} 
            onClick={() => setActiveTab('technical')} 
          />
          <NavItem 
            icon={<Calendar size={18} />} 
            label="Cronograma" 
            active={activeTab === 'milestones'} 
            onClick={() => setActiveTab('milestones')} 
          />
        </nav>

        <div className="p-4 border-t border-zinc-200">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden">
              <Users size={16} className="text-zinc-600" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-medium truncate">Equipo de I+D</p>
              <p className="text-[10px] text-zinc-500">4 miembros activos</p>
            </div>
            <Settings size={14} className="text-zinc-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-10 px-8 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">
            {activeTab === 'overview' && 'Dashboard de Proyecto'}
            {activeTab === 'strategy' && 'Objetivos Estratégicos'}
            {activeTab === 'scope' && 'Alcance y Entregables'}
            {activeTab === 'wbs' && 'Estructura de Desglose (WBS)'}
            {activeTab === 'tasks' && 'Gestión de Tareas'}
            {activeTab === 'team' && 'Equipo y Carga de Trabajo'}
            {activeTab === 'timeline' && 'Línea de Tiempo (Gantt)'}
            {activeTab === 'resources' && 'Recursos Técnicos'}
            {activeTab === 'financials' && 'Control Financiero'}
            {activeTab === 'quality' && 'Gestión de Calidad'}
            {activeTab === 'documents' && 'Gestión Documental'}
            {activeTab === 'communications' && 'Comunicaciones y Reuniones'}
            {activeTab === 'risks' && 'Gestión de Riesgos'}
            {activeTab === 'stakeholders' && 'Gestión de Stakeholders'}
            {activeTab === 'ai-analysis' && 'Análisis Inteligente del Proyecto'}
            {activeTab === 'technical' && 'Especificaciones Técnicas'}
            {activeTab === 'milestones' && 'Hitos y Cronograma'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="text-xs font-medium bg-zinc-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors">
              <Plus size={14} />
              Nuevo Item
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        active 
          ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// --- Strategy Section ---
function StrategySection({ objectives }: { objectives: StrategicObjective[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {objectives.map(obj => (
          <div key={obj.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-zinc-900 text-white rounded-lg">
                <Shield size={20} />
              </div>
              <h3 className="font-bold text-zinc-900">{obj.title}</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">{obj.description}</p>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Métricas de Éxito</h4>
              {obj.metrics.map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-xs font-medium text-zinc-600">{metric.label}</span>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-400 uppercase font-bold">Actual</p>
                      <p className="text-sm font-bold text-zinc-900">{metric.current}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-400 uppercase font-bold">Meta</p>
                      <p className="text-sm font-bold text-emerald-600">{metric.target}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Scope Section ---
function ScopeSection({ scope, deliverables, scopeChanges }: { scope: ProjectScope, deliverables: Deliverable[], scopeChanges: ScopeChange[] }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
          <Box size={20} className="text-zinc-900" /> Descripción Detallada del Producto
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8">{scope.productDescription}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Inclusiones (Dentro del Alcance)
            </h4>
            <ul className="space-y-2">
              {scope.inclusions.map((item, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-zinc-400 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-500" /> Exclusiones (Fuera del Alcance)
            </h4>
            <ul className="space-y-2">
              {scope.exclusions.map((item, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-zinc-400 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-bold text-zinc-900">Entregables del Proyecto</h3>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{deliverables.length} Items</span>
          </div>
          <div className="divide-y divide-zinc-100">
            {deliverables.map(del => (
              <div key={del.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    del.status === 'approved' ? "bg-emerald-50 text-emerald-600" : 
                    del.status === 'in-review' ? "bg-blue-50 text-blue-600" : "bg-zinc-50 text-zinc-400"
                  )}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{del.title}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Responsable: {del.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    del.status === 'approved' ? "bg-emerald-100 text-emerald-700" : 
                    del.status === 'in-review' ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-600"
                  )}>
                    {del.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-bold text-zinc-900">Control de Cambios</h3>
            <button className="text-[10px] font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md hover:bg-zinc-200 transition-colors">
              Solicitar Cambio
            </button>
          </div>
          <div className="divide-y divide-zinc-100">
            {scopeChanges.map(change => (
              <div key={change.id} className="p-4 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      change.status === 'approved' ? "bg-emerald-500" : 
                      change.status === 'pending' ? "bg-amber-500" : "bg-rose-500"
                    )} />
                    <p className="text-sm font-semibold text-zinc-900">{change.description}</p>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{change.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Por: {change.requestedBy}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Impacto:</span>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      change.impact === 'high' ? "text-rose-600" : 
                      change.impact === 'medium' ? "text-amber-600" : "text-zinc-400"
                    )}>
                      {change.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- WBS Section ---
function WBSSection({ wbs }: { wbs: WBSNode[] }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">Estructura de Desglose del Trabajo (WBS)</h3>
          <p className="text-xs text-zinc-500 mt-1">Jerarquía de fases, entregables y tareas del proyecto.</p>
        </div>
        <button className="text-xs font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
          <ChevronDown size={14} /> Expandir Todo
        </button>
      </div>
      
      <div className="space-y-4">
        {wbs.map(node => (
          <WBSItem key={node.id} node={node} level={0} />
        ))}
      </div>
    </div>
  );
}

interface WBSItemProps {
  node: WBSNode;
  level: number;
  key?: string | number;
}

function WBSItem({ node, level }: WBSItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const typeColors = {
    phase: 'bg-zinc-900 text-white',
    deliverable: 'bg-zinc-100 text-zinc-900 border border-zinc-200',
    task: 'bg-white text-zinc-500 border border-zinc-100'
  };

  return (
    <div className="space-y-2">
      <div 
        className={cn(
          "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer",
          typeColors[node.type],
          level > 0 && "ml-8"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 flex-1">
          {hasChildren && (
            <motion.div animate={{ rotate: isOpen ? 0 : -90 }}>
              <ChevronDown size={14} />
            </motion.div>
          )}
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest opacity-60",
            node.type === 'phase' ? "text-zinc-400" : "text-zinc-500"
          )}>
            {node.type}
          </span>
          <span className="text-sm font-semibold">{node.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] opacity-40 font-mono">ID: {node.id}</span>
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div className="space-y-2">
          {node.children!.map(child => (
            <WBSItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function OverviewSection({ stats, milestones }: { stats: ProjectStats, milestones: Milestone[] }) {
  const chartData = [
    { name: 'Sem 1', progress: 20 },
    { name: 'Sem 2', progress: 35 },
    { name: 'Sem 3', progress: 45 },
    { name: 'Sem 4', progress: 65 },
  ];

  const pieData = [
    { name: 'Hardware', value: 40 },
    { name: 'Software', value: 35 },
    { name: 'Diseño', value: 25 },
  ];

  const COLORS = ['#18181b', '#3f3f46', '#71717a'];

  return (
    <div className="space-y-8">
      {/* Project Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          icon={<TrendingUp className="text-zinc-900" size={20} />} 
          label="Progreso Total" 
          value={`${stats.progress}%`} 
          subtext="En camino al Hito 2"
        />
        <StatCard 
          icon={<CheckSquare className="text-zinc-900" size={20} />} 
          label="Tareas" 
          value={`${stats.tasksCompleted}/${stats.totalTasks}`} 
          subtext={`${stats.totalTasks - stats.tasksCompleted} pendientes`}
        />
        <StatCard 
          icon={<DollarSign className="text-zinc-900" size={20} />} 
          label="Presupuesto" 
          value={`$${stats.budgetUsed}`} 
          subtext={`de $${stats.totalBudget}`}
        />
        <StatCard 
          icon={<AlertCircle className={cn(stats.costVariance < 0 ? "text-rose-600" : "text-emerald-600")} size={20} />} 
          label="Variación Costos" 
          value={`$${Math.abs(stats.costVariance)}`} 
          subtext={stats.costVariance < 0 ? "Sobre presupuesto" : "Bajo presupuesto"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Progress Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-zinc-900">Progreso del Desarrollo</h3>
            <select className="text-xs border-zinc-200 rounded-md bg-zinc-50 px-2 py-1 outline-none">
              <option>Último mes</option>
              <option>Último trimestre</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717a' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717a' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#18181b" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#18181b' }} 
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution & Next Milestones */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-4">Distribución de Recursos</h3>
            <div className="h-[200px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Target size={18} className="text-emerald-400" />
              <h3 className="font-bold">Próximo Hito</h3>
            </div>
            <p className="text-sm font-medium mb-1">Integración de IA (Hito 2)</p>
            <p className="text-xs text-zinc-400 mb-4">Fecha objetivo: 15 de Marzo, 2026</p>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[45%]" />
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">45% de las tareas críticas completadas</p>
          </div>
        </div>
      </div>

      {/* Objectives & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-4">Objetivos del Proyecto</h3>
          <ul className="space-y-4">
            <ObjectiveItem 
              title="Seguimiento Autónomo" 
              desc="Implementar tracking de personas con latencia menor a 50ms." 
              status="in-progress" 
            />
            <ObjectiveItem 
              title="Estabilización Mecánica" 
              desc="Garantizar tomas fluidas incluso en movimientos rápidos." 
              status="done" 
            />
            <ObjectiveItem 
              title="App de Control" 
              desc="Interfaz intuitiva para configurar modos de seguimiento." 
              status="todo" 
            />
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-4">Estado Actual</h3>
          <div className="flex items-start gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <div className="mt-1">
              <AlertCircle size={20} className="text-zinc-900" />
            </div>
            <div>
              <p className="text-sm font-semibold">Fase de Integración de Software</p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                El hardware está validado al 90%. Actualmente nos enfocamos en optimizar el modelo de visión artificial para que corra eficientemente en el microcontrolador ESP32-S3. Se han detectado cuellos de botella en la comunicación I2C que están siendo resueltos.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Salud del Proyecto</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Estable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string, subtext: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-zinc-50 rounded-lg">{icon}</div>
        <ChevronRight size={14} className="text-zinc-300" />
      </div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-bold text-zinc-900 mt-1">{value}</p>
      <p className="text-[10px] text-zinc-500 mt-1">{subtext}</p>
    </div>
  );
}

function ObjectiveItem({ title, desc, status }: { title: string, desc: string, status: 'todo' | 'in-progress' | 'done' }) {
  const statusColors = {
    todo: 'bg-zinc-100 text-zinc-500',
    'in-progress': 'bg-blue-100 text-blue-600',
    done: 'bg-emerald-100 text-emerald-600'
  };

  return (
    <li className="flex items-start gap-3">
      <div className={cn("mt-1 w-2 h-2 rounded-full shrink-0", 
        status === 'done' ? 'bg-emerald-500' : status === 'in-progress' ? 'bg-blue-500' : 'bg-zinc-300')} 
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{title}</p>
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter", statusColors[status])}>
            {status}
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
      </div>
    </li>
  );
}

function TasksSection({ tasks, members }: { tasks: Task[], members: TeamMember[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['Todo', 'Hardware', 'Software', 'Design'].map(filter => (
            <button key={filter} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50">
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Ordenar por:</span>
          <select className="bg-transparent font-semibold text-zinc-900 outline-none">
            <option>Prioridad</option>
            <option>Fecha</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <div className="col-span-4">Tarea</div>
          <div className="col-span-2">Responsable</div>
          <div className="col-span-2">Progreso</div>
          <div className="col-span-2">Estado</div>
          <div className="col-span-2">Prioridad</div>
        </div>
        <div className="divide-y divide-zinc-100">
          {tasks.map(task => {
            const assignee = members.find(m => m.id === task.assigneeId);
            return (
              <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-zinc-50 transition-colors">
                <div className="col-span-4">
                  <p className="text-sm font-medium text-zinc-900">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                      {task.category}
                    </span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-600">
                      {assignee?.name.charAt(0)}
                    </div>
                    <span className="text-xs text-zinc-600">{assignee?.name || 'Sin asignar'}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-zinc-900 h-full" style={{ width: `${task.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500">{task.progress}%</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={cn("status-pill", 
                    task.status === 'done' ? 'bg-emerald-100 text-emerald-700' : 
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 
                    'bg-zinc-100 text-zinc-600'
                  )}>
                    {task.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className={cn("text-[10px] font-bold", 
                    task.priority === 'high' ? 'text-rose-600' : 
                    task.priority === 'medium' ? 'text-amber-600' : 
                    'text-zinc-400'
                  )}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeamSection({ members, tasks }: { members: TeamMember[], tasks: Task[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900">Miembros del Equipo</h3>
        <button className="text-xs font-medium bg-zinc-900 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <UserPlus size={14} /> Invitar Miembro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map(member => {
          const memberTasks = tasks.filter(t => t.assigneeId === member.id);
          const completedTasks = memberTasks.filter(t => t.status === 'done').length;
          
          return (
            <div key={member.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-lg font-bold text-zinc-900">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">{member.name}</h4>
                  <p className="text-xs text-zinc-500">{member.role}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Carga de Trabajo</span>
                    <span className="text-[10px] font-bold text-zinc-900">{member.workload}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full", member.workload > 80 ? "bg-rose-500" : "bg-zinc-900")} 
                      style={{ width: `${member.workload}%` }} 
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-zinc-400 uppercase tracking-widest">Tareas Asignadas</span>
                  <span className="text-zinc-900">{memberTasks.length}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-zinc-400 uppercase tracking-widest">Completadas</span>
                  <span className="text-emerald-600">{completedTasks}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="font-bold text-zinc-900 mb-6">Distribución de Carga de Trabajo</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={members}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
              <Tooltip />
              <Bar dataKey="workload" fill="#18181b" radius={[4, 4, 0, 0]} name="Carga (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ResourceSection({ resources, budgets }: { resources: TechnicalResource[], budgets: PhaseBudget[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-bold text-zinc-900">Inventario de Recursos Técnicos</h3>
            <button className="text-xs font-medium bg-zinc-900 text-white px-3 py-1.5 rounded-lg">
              Agregar Recurso
            </button>
          </div>
          <div className="divide-y divide-zinc-100">
            {resources.map(res => {
              const phase = budgets.find(b => b.id === res.phaseId);
              return (
                <div key={res.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                      {res.type === 'component' ? <Cpu size={20} /> : res.type === 'tool' ? <Settings size={20} /> : <Box size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{res.name}</p>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Fase: {phase?.phaseName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-zinc-900">{res.quantity} {res.unit}</p>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">{res.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-6">Uso de Recursos por Fase</h3>
          <div className="space-y-6">
            {budgets.map(phase => {
              const phaseResources = resources.filter(r => r.phaseId === phase.id);
              return (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-900">{phase.phaseName}</span>
                    <span className="text-[10px] font-bold text-zinc-400">{phaseResources.length} recursos</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phaseResources.map(r => (
                      <span key={r.id} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md border border-zinc-200">
                        {r.name}
                      </span>
                    ))}
                    {phaseResources.length === 0 && <span className="text-[10px] text-zinc-400 italic">Sin recursos asignados</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentSection({ documents }: { documents: ProjectDocument[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['Todos', 'Técnicos', 'Planos', 'Reportes', 'Especificaciones'].map(cat => (
            <button key={cat} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50">
              {cat}
            </button>
          ))}
        </div>
        <button className="text-xs font-medium bg-zinc-900 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Upload size={14} /> Subir Documento
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          <div className="col-span-5">Documento</div>
          <div className="col-span-2">Categoría</div>
          <div className="col-span-2">Versión</div>
          <div className="col-span-2">Última Modificación</div>
          <div className="col-span-1"></div>
        </div>
        <div className="divide-y divide-zinc-100">
          {documents.map(doc => (
            <div key={doc.id} className="group">
              <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-zinc-50 transition-colors">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <FileCode size={18} />
                  </div>
                  <p className="text-sm font-medium text-zinc-900">{doc.title}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md">
                    {doc.category}
                  </span>
                </div>
                <div className="col-span-2 text-xs font-bold text-zinc-900">v{doc.version}</div>
                <div className="col-span-2 text-xs text-zinc-500">{doc.lastModified}</div>
                <div className="col-span-1 flex justify-end gap-2">
                  <button className="p-1 hover:bg-zinc-200 rounded text-zinc-400"><Download size={16} /></button>
                  <button className="p-1 hover:bg-zinc-200 rounded text-zinc-400"><History size={16} /></button>
                </div>
              </div>
              <div className="hidden group-hover:block bg-zinc-50 px-16 py-4 border-t border-zinc-100">
                <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Historial de Versiones</h5>
                <div className="space-y-3">
                  {doc.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-zinc-900 w-8">v{h.version}</span>
                        <span className="text-zinc-500">{h.change}</span>
                      </div>
                      <span className="text-zinc-400">{h.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunicationSection({ meetings }: { meetings: Meeting[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-bold text-zinc-900">Registro de Reuniones</h3>
            <button className="text-xs font-medium bg-zinc-900 text-white px-3 py-1.5 rounded-lg">
              Nueva Reunión
            </button>
          </div>
          <div className="divide-y divide-zinc-100">
            {meetings.map(meeting => (
              <div key={meeting.id} className="p-6 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-zinc-900">{meeting.title}</h4>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{meeting.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {meeting.attendees.map(a => (
                    <span key={a} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full border border-zinc-200">
                      {a}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Acuerdos</h5>
                    <ul className="space-y-1">
                      {meeting.agreements.map((a, i) => (
                        <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                          <div className="w-1 h-1 bg-zinc-400 rounded-full mt-1.5" /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Decisiones</h5>
                    <ul className="space-y-1">
                      {meeting.decisions.map((d, i) => (
                        <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                          <div className="w-1 h-1 bg-zinc-900 rounded-full mt-1.5" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-400" /> Notificaciones Internas
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
                <p className="text-xs font-bold text-emerald-400 mb-1">Cambio de Alcance Aprobado</p>
                <p className="text-[10px] text-zinc-300">Se ha aprobado la integración con Google Photos Cloud. Revisar entregables.</p>
                <p className="text-[8px] text-zinc-500 mt-2">Hace 2 horas</p>
              </div>
              <div className="p-3 bg-zinc-800 rounded-xl border border-zinc-700">
                <p className="text-xs font-bold text-amber-400 mb-1">Alerta de Riesgo</p>
                <p className="text-[10px] text-zinc-300">Escasez crítica de microcontroladores detectada. Se activa plan de mitigación.</p>
                <p className="text-[8px] text-zinc-500 mt-2">Hace 5 horas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-zinc-900 mb-4">Histórico de Comunicaciones</h3>
            <div className="space-y-4">
              {[
                { type: 'Email', subject: 'Actualización de Presupuesto Q1', date: '2026-02-28' },
                { type: 'Slack', subject: 'Canal #hardware-dev creado', date: '2026-02-25' },
                { type: 'Report', subject: 'Reporte Mensual de Avance - Febrero', date: '2026-02-28' }
              ].map((comm, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-zinc-100 rounded-xl hover:bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase w-12">{comm.type}</span>
                    <p className="text-xs font-medium text-zinc-900">{comm.subject}</p>
                  </div>
                  <span className="text-[10px] text-zinc-400">{comm.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancialSection({ budgets, stats }: { budgets: PhaseBudget[], stats: ProjectStats }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<DollarSign className="text-zinc-900" size={20} />} 
          label="Presupuesto Total" 
          value={`$${stats.totalBudget}`} 
          subtext="Fondo asignado"
        />
        <StatCard 
          icon={<TrendingUp className="text-zinc-900" size={20} />} 
          label="Gasto Acumulado" 
          value={`$${stats.budgetUsed}`} 
          subtext={`${((stats.budgetUsed / stats.totalBudget) * 100).toFixed(1)}% del total`}
        />
        <StatCard 
          icon={<AlertCircle className={cn(stats.costVariance < 0 ? "text-rose-600" : "text-emerald-600")} size={20} />} 
          label="Variación de Costos" 
          value={`$${Math.abs(stats.costVariance)}`} 
          subtext={stats.costVariance < 0 ? "Sobre el presupuesto" : "Bajo el presupuesto"}
        />
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200">
          <h3 className="font-bold text-zinc-900">Costos Estimados vs Reales por Fase</h3>
        </div>
        <div className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={budgets}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="phaseName" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                <Tooltip />
                <Line type="monotone" dataKey="estimatedCost" stroke="#71717a" strokeWidth={2} strokeDasharray="5 5" name="Estimado" />
                <Line type="monotone" dataKey="actualCost" stroke="#18181b" strokeWidth={3} name="Real" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="divide-y divide-zinc-100 border-t border-zinc-200">
          {budgets.map(phase => (
            <div key={phase.id} className="grid grid-cols-4 gap-4 p-4 items-center">
              <span className="text-sm font-semibold text-zinc-900">{phase.phaseName}</span>
              <div className="text-right">
                <p className="text-[10px] text-zinc-400 uppercase font-bold">Estimado</p>
                <p className="text-sm font-medium">${phase.estimatedCost}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-400 uppercase font-bold">Real</p>
                <p className="text-sm font-bold text-zinc-900">${phase.actualCost}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-400 uppercase font-bold">Variación</p>
                <p className={cn("text-sm font-bold", phase.actualCost > phase.estimatedCost ? "text-rose-600" : "text-emerald-600")}>
                  ${Math.abs(phase.estimatedCost - phase.actualCost)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QualitySection({ criteria, tests, defects }: { criteria: QualityCriterion[], tests: TechnicalTest[], defects: Defect[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500" /> Criterios de Calidad
          </h3>
          <div className="space-y-4">
            {criteria.map(qc => (
              <div key={qc.id} className="flex items-start gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="mt-1">
                  {qc.status === 'passed' ? <CheckCircle2 size={18} className="text-emerald-500" /> : 
                   qc.status === 'failed' ? <AlertCircle size={18} className="text-rose-500" /> : 
                   <Circle size={18} className="text-zinc-300" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-zinc-900">{qc.criterion}</p>
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", 
                      qc.status === 'passed' ? "text-emerald-600" : 
                      qc.status === 'failed' ? "text-rose-600" : "text-zinc-400"
                    )}>
                      {qc.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{qc.requirement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <Cpu size={18} className="text-blue-500" /> Pruebas Técnicas
          </h3>
          <div className="space-y-4">
            {tests.map(test => (
              <div key={test.id} className="p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-zinc-900">{test.testName}</p>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded uppercase", 
                    test.result === 'pass' ? "bg-emerald-100 text-emerald-700" : 
                    test.result === 'fail' ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {test.result}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mb-2">{test.notes}</p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{test.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
          <h3 className="font-bold text-zinc-900">Gestión de Defectos y Fallas</h3>
          <button className="text-[10px] font-bold text-white bg-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-colors">
            Reportar Defecto
          </button>
        </div>
        <div className="divide-y divide-zinc-100">
          {defects.map(defect => (
            <div key={defect.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  defect.severity === 'critical' ? "bg-rose-50 text-rose-600" : 
                  defect.severity === 'medium' ? "bg-amber-50 text-amber-600" : "bg-zinc-50 text-zinc-400"
                )}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{defect.description}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Reportado: {defect.reportedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Severidad</p>
                  <p className={cn("text-xs font-bold", 
                    defect.severity === 'critical' ? "text-rose-600" : 
                    defect.severity === 'medium' ? "text-amber-600" : "text-zinc-400"
                  )}>
                    {defect.severity.toUpperCase()}
                  </p>
                </div>
                <div className="w-32">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Estado</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div className={cn("h-full", 
                        defect.status === 'resolved' ? "bg-emerald-500 w-full" : 
                        defect.status === 'in-fix' ? "bg-blue-500 w-1/2" : "bg-rose-500 w-1/4"
                      )} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500">{defect.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnicalSection({ specs }: { specs: TechnicalSpec[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
          <Cpu size={18} /> Stack Tecnológico
        </h3>
        <div className="space-y-4">
          {specs.map(spec => (
            <div key={spec.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 bg-zinc-50">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{spec.category}</p>
                <p className="text-sm font-semibold text-zinc-900">{spec.item}</p>
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", 
                spec.status === 'validated' ? 'bg-emerald-100 text-emerald-700' : 
                spec.status === 'in-development' ? 'bg-blue-100 text-blue-700' : 
                'bg-zinc-200 text-zinc-600'
              )}>
                {spec.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl">
          <h3 className="font-bold mb-4">Requerimientos Críticos</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 font-bold text-xs">01</div>
              <p className="text-xs">Procesamiento de imagen local (Edge AI)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 font-bold text-xs">02</div>
              <p className="text-xs">Batería de larga duración (mín. 4 horas)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-emerald-400 font-bold text-xs">03</div>
              <p className="text-xs">Compatibilidad universal con smartphones</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-4">Diagrama de Conectividad</h3>
          <div className="aspect-video bg-zinc-100 rounded-xl flex items-center justify-center border border-dashed border-zinc-300">
            <p className="text-xs text-zinc-400 font-mono italic">[Diagrama de Arquitectura]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MilestonesSection({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200" />
        <div className="space-y-12">
          {milestones.map((m, i) => (
            <div key={m.id} className="relative pl-12">
              <div className={cn(
                "absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white z-10",
                m.completed ? "bg-zinc-900" : "bg-zinc-200"
              )} />
              <div className={cn(
                "p-6 rounded-2xl border transition-all",
                m.completed 
                  ? "bg-white border-zinc-200 shadow-sm" 
                  : "bg-zinc-50 border-zinc-100 opacity-70"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-zinc-900">{m.title}</h4>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{m.date}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{m.description}</p>
                {m.completed && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    <CheckSquare size={12} /> Completado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineSection({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-zinc-900">Cronograma del Proyecto (Gantt)</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">En Progreso</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3">
                <p className="text-xs font-semibold text-zinc-900 truncate">{task.title}</p>
                <p className="text-[10px] text-zinc-400">{task.startDate} - {task.endDate}</p>
              </div>
              <div className="col-span-9 relative h-8 bg-zinc-50 rounded-lg border border-zinc-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  className={cn(
                    "absolute top-1 bottom-1 left-0 rounded-md shadow-sm flex items-center justify-end px-2",
                    task.status === 'done' ? "bg-emerald-500" : 
                    task.status === 'in-progress' ? "bg-blue-500" : "bg-zinc-300"
                  )}
                  style={{ left: `${(new Date(task.startDate).getTime() - new Date('2026-01-01').getTime()) / (1000 * 60 * 60 * 24 * 1.5)}%` }}
                >
                  <span className="text-[8px] font-bold text-white">{task.progress}%</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskSection({ risks }: { risks: ProjectRisk[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-bold text-zinc-900">Registro de Riesgos</h3>
            <button className="text-xs font-medium bg-zinc-900 text-white px-3 py-1.5 rounded-lg">
              Identificar Riesgo
            </button>
          </div>
          <div className="divide-y divide-zinc-100">
            {risks.map(risk => (
              <div key={risk.id} className="p-6 hover:bg-zinc-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 w-2 h-2 rounded-full",
                      risk.probability * risk.impact >= 15 ? "bg-rose-500" : 
                      risk.probability * risk.impact >= 8 ? "bg-amber-500" : "bg-emerald-500"
                    )} />
                    <div>
                      <h4 className="font-bold text-zinc-900">{risk.description}</h4>
                      <p className="text-xs text-zinc-500 mt-1">Estrategia: {risk.mitigation}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    risk.status === 'mitigated' ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"
                  )}>
                    {risk.status}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Probabilidad:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={cn("w-2 h-2 rounded-sm", i <= risk.probability ? "bg-zinc-900" : "bg-zinc-100")} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Impacto:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={cn("w-2 h-2 rounded-sm", i <= risk.impact ? "bg-zinc-900" : "bg-zinc-100")} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-6">Matriz de Riesgos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis type="number" dataKey="probability" name="Probabilidad" domain={[0, 6]} tick={{ fontSize: 10 }} />
                <YAxis type="number" dataKey="impact" name="Impacto" domain={[0, 6]} tick={{ fontSize: 10 }} />
                <ZAxis range={[100, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Riesgos" data={risks} fill="#18181b" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-zinc-400 mt-4 text-center uppercase font-bold tracking-widest">Eje X: Probabilidad | Eje Y: Impacto</p>
        </div>
      </div>
    </div>
  );
}

function StakeholderSection({ stakeholders }: { stakeholders: Stakeholder[] }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <h3 className="font-bold text-zinc-900">Registro de Stakeholders</h3>
            <button className="text-xs font-medium bg-zinc-900 text-white px-3 py-1.5 rounded-lg">
              Nuevo Stakeholder
            </button>
          </div>
          <div className="divide-y divide-zinc-100">
            {stakeholders.map(sh => (
              <div key={sh.id} className="p-6 hover:bg-zinc-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-zinc-900">{sh.name}</h4>
                    <p className="text-xs text-zinc-500">{sh.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Última Interacción: {sh.lastInteraction}</span>
                </div>
                <p className="text-xs text-zinc-600 mb-4 italic">Expectativas: "{sh.expectations}"</p>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Interés:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={cn("w-2 h-2 rounded-sm", i <= sh.interest ? "bg-zinc-900" : "bg-zinc-100")} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Influencia:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={cn("w-2 h-2 rounded-sm", i <= sh.influence ? "bg-zinc-900" : "bg-zinc-100")} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-zinc-900 mb-6">Matriz Poder / Interés</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis type="number" dataKey="interest" name="Interés" domain={[0, 6]} tick={{ fontSize: 10 }} />
                <YAxis type="number" dataKey="influence" name="Influencia" domain={[0, 6]} tick={{ fontSize: 10 }} />
                <ZAxis range={[100, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Stakeholders" data={stakeholders} fill="#18181b" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-zinc-400 mt-4 text-center uppercase font-bold tracking-widest">Eje X: Interés | Eje Y: Poder/Influencia</p>
        </div>
      </div>
    </div>
  );
}

function AIAnalysisSection({ projectData }: { projectData: any }) {
  const [report, setReport] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analiza los siguientes datos del proyecto "RoboTripod Manager" y genera un reporte estructurado en JSON con los campos: statusSummary (string), potentialDelays (array of strings), emergingRisks (array of strings), recommendations (array of strings).
        
        Datos:
        - Estadísticas: ${JSON.stringify(projectData.stats)}
        - Tareas: ${JSON.stringify(projectData.tasks)}
        - Riesgos: ${JSON.stringify(projectData.risks)}
        - Presupuestos: ${JSON.stringify(projectData.budgets)}`,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const result = JSON.parse(response.text || '{}');
      setReport(result);
    } catch (error) {
      console.error("Error generating AI report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit size={32} className="text-emerald-400" />
            <h3 className="text-2xl font-bold">Análisis Inteligente</h3>
          </div>
          <p className="text-zinc-400 max-w-2xl mb-8">
            Nuestro motor de IA analiza en tiempo real el progreso de las tareas, la salud financiera y la matriz de riesgos para ofrecerte una visión estratégica del proyecto.
          </p>
          <button 
            onClick={generateReport}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 text-zinc-900 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Analizando..." : "Generar Reporte Estratégico"}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
      </div>

      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" /> Resumen de Estado
            </h4>
            <p className="text-sm text-zinc-600 leading-relaxed">{report.statusSummary}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" /> Posibles Retrasos
            </h4>
            <ul className="space-y-2">
              {report.potentialDelays.map((delay, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5" /> {delay}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-500" /> Riesgos Emergentes
            </h4>
            <ul className="space-y-2">
              {report.emergingRisks.map((risk, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                  <div className="w-1 h-1 bg-rose-500 rounded-full mt-1.5" /> {risk}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-500" /> Recomendaciones
            </h4>
            <ul className="space-y-2">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-zinc-600 flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5" /> {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
