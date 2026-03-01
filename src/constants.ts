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
  Stakeholder
} from './types';

export const INITIAL_STATS: ProjectStats = {
  progress: 65,
  tasksCompleted: 12,
  totalTasks: 18,
  budgetUsed: 4850,
  totalBudget: 7500,
  costVariance: -350, // Actual - Estimated
};

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'tm1', name: 'Ana García', role: 'Hardware Lead', workload: 85 },
  { id: 'tm2', name: 'Carlos Ruiz', role: 'Software Engineer', workload: 60 },
  { id: 'tm3', name: 'Elena Beltrán', role: 'Product Designer', workload: 40 },
  { id: 'tm4', name: 'David Sanz', role: 'QA Tester', workload: 30 },
];

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Diseño de base rotativa 360°', status: 'done', priority: 'high', category: 'hardware', startDate: '2026-01-05', endDate: '2026-02-15', progress: 100, assigneeId: 'tm1' },
  { id: '2', title: 'Implementación de algoritmo YOLOv8-lite', status: 'in-progress', priority: 'high', category: 'software', startDate: '2026-02-10', endDate: '2026-03-10', progress: 75, dependencies: ['1'], assigneeId: 'tm2' },
  { id: '3', title: 'Pruebas de latencia en motores paso a paso', status: 'todo', priority: 'medium', category: 'hardware', startDate: '2026-03-11', endDate: '2026-03-20', progress: 0, dependencies: ['2'], assigneeId: 'tm1' },
  { id: '4', title: 'Interfaz de usuario para App móvil', status: 'in-progress', priority: 'medium', category: 'software', startDate: '2026-02-20', endDate: '2026-03-25', progress: 40, assigneeId: 'tm3' },
  { id: '5', title: 'Carcasa protectora (Impresión 3D)', status: 'done', priority: 'low', category: 'design', startDate: '2026-02-01', endDate: '2026-02-28', progress: 100, dependencies: ['1'], assigneeId: 'tm3' },
];

export const TECHNICAL_RESOURCES: TechnicalResource[] = [
  { id: 'r1', name: 'ESP32-S3 DevKit', type: 'component', quantity: 5, unit: 'pcs', phaseId: 'p2' },
  { id: 'r2', name: 'Motores NEMA 17', type: 'component', quantity: 10, unit: 'pcs', phaseId: 'p2' },
  { id: 'r3', name: 'Impresora 3D Prusa', type: 'tool', quantity: 1, unit: 'unit', phaseId: 'p1' },
  { id: 'r4', name: 'Filamento PETG', type: 'material', quantity: 2, unit: 'kg', phaseId: 'p1' },
];

export const PROJECT_DOCUMENTS: ProjectDocument[] = [
  { 
    id: 'd1', title: 'Especificaciones Técnicas V1', category: 'spec', version: '1.2', lastModified: '2026-02-20',
    history: [
      { version: '1.0', date: '2026-01-10', change: 'Versión inicial' },
      { version: '1.1', date: '2026-01-25', change: 'Ajuste de torque motores' },
      { version: '1.2', date: '2026-02-20', change: 'Actualización de pines ESP32' }
    ]
  },
  { 
    id: 'd2', title: 'Planos de Carcasa 3D', category: 'technical', version: '2.0', lastModified: '2026-02-15',
    history: [
      { version: '1.0', date: '2026-02-01', change: 'Diseño preliminar' },
      { version: '2.0', date: '2026-02-15', change: 'Optimización de ventilación' }
    ]
  }
];

export const MEETINGS: Meeting[] = [
  { 
    id: 'm1', title: 'Sincronización Semanal Hardware', date: '2026-02-24', attendees: ['Ana García', 'Carlos Ruiz'],
    agreements: ['Finalizar PCB para el viernes'], decisions: ['Usar regulador de voltaje de 5V 3A']
  },
  { 
    id: 'm2', title: 'Revisión de Diseño UX', date: '2026-02-26', attendees: ['Elena Beltrán', 'Carlos Ruiz'],
    agreements: ['Simplificar flujo de emparejamiento BT'], decisions: ['Eliminar pantalla de carga innecesaria']
  }
];

export const PROJECT_RISKS: ProjectRisk[] = [
  { id: 'rk1', description: 'Escasez de chips ESP32-S3', probability: 4, impact: 5, mitigation: 'Comprar stock para 6 meses por adelantado', status: 'mitigated' },
  { id: 'rk2', description: 'Sobrecalentamiento de motores', probability: 2, impact: 4, mitigation: 'Añadir disipadores y ventilación activa', status: 'identified' },
  { id: 'rk3', description: 'Retraso en aprobación de App Store', probability: 3, impact: 3, mitigation: 'Iniciar proceso de revisión 2 semanas antes', status: 'identified' }
];

export const STAKEHOLDERS: Stakeholder[] = [
  { id: 's1', name: 'Inversionistas Angel', role: 'Financiamiento', interest: 5, influence: 4, expectations: 'Retorno de inversión en 18 meses', lastInteraction: '2026-02-15' },
  { id: 's2', name: 'Comunidad Beta Testers', role: 'Usuarios Finales', interest: 4, influence: 2, expectations: 'Producto fácil de usar y estable', lastInteraction: '2026-02-28' }
];

export const SCOPE_CHANGES: ScopeChange[] = [
  { id: 'ch1', description: 'Agregar soporte para carga inalámbrica', impact: 'medium', status: 'approved', date: '2026-02-15', requestedBy: 'Marketing' },
  { id: 'ch2', description: 'Integración con Google Photos Cloud', impact: 'high', status: 'pending', date: '2026-02-28', requestedBy: 'Product Owner' },
];

export const PHASE_BUDGETS: PhaseBudget[] = [
  { id: 'p1', phaseName: 'Investigación y Diseño', estimatedCost: 1500, actualCost: 1650 },
  { id: 'p2', phaseName: 'Desarrollo Hardware', estimatedCost: 3000, actualCost: 2800 },
  { id: 'p3', phaseName: 'Desarrollo Software', estimatedCost: 2000, actualCost: 400 },
  { id: 'p4', phaseName: 'Pruebas y QA', estimatedCost: 1000, actualCost: 0 },
];

export const QUALITY_CRITERIA: QualityCriterion[] = [
  { id: 'qc1', criterion: 'Latencia de Seguimiento', requirement: 'Menor a 50ms en condiciones de luz normal', status: 'passed' },
  { id: 'qc2', criterion: 'Estabilidad de Giro', requirement: 'Sin vibraciones perceptibles a máxima velocidad', status: 'failed' },
  { id: 'qc3', criterion: 'Duración de Batería', requirement: 'Mínimo 4 horas de uso continuo', status: 'pending' },
];

export const TECHNICAL_TESTS: TechnicalTest[] = [
  { id: 'tt1', testName: 'Prueba de Estrés de Motores', date: '2026-02-20', result: 'pass', notes: 'Motores operaron 8 horas seguidas sin sobrecalentamiento.' },
  { id: 'tt2', testName: 'Validación de Tracking YOLOv8', date: '2026-02-25', result: 'fail', notes: 'Pérdida de objetivo en fondos con mucho contraste.' },
];

export const DEFECTS: Defect[] = [
  { id: 'def1', description: 'Ruido excesivo en motor vertical', severity: 'medium', status: 'in-fix', reportedDate: '2026-02-26' },
  { id: 'def2', description: 'Crash de App al desconectar Bluetooth', severity: 'critical', status: 'open', reportedDate: '2026-02-28' },
];

export const INITIAL_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Prototipo Alfa', date: '2026-01-20', completed: true, description: 'Estructura básica funcional con motores.' },
  { id: 'm2', title: 'Integración de IA', date: '2026-03-15', completed: false, description: 'Seguimiento fluido de rostros y cuerpos.' },
  { id: 'm3', title: 'Beta Cerrada', date: '2026-04-10', completed: false, description: 'Pruebas con usuarios reales.' },
  { id: 'm4', title: 'Lanzamiento V1.0', date: '2026-05-01', completed: false, description: 'Producción final y distribución.' },
];

export const TECHNICAL_SPECS: TechnicalSpec[] = [
  { id: 's1', category: 'Hardware', item: 'ESP32-S3 con cámara', status: 'validated' },
  { id: 's2', category: 'Hardware', item: 'Motores NEMA 17', status: 'validated' },
  { id: 's3', category: 'Software', item: 'TensorFlow Lite Micro', status: 'in-development' },
  { id: 's4', category: 'Software', item: 'Protocolo WebSocket para control', status: 'defined' },
];

export const STRATEGIC_OBJECTIVES: StrategicObjective[] = [
  {
    id: 'obj1',
    title: 'Liderazgo en Seguimiento Autónomo',
    description: 'Convertirse en la solución de seguimiento más fluida y económica para creadores de contenido.',
    metrics: [
      { label: 'Latencia de Tracking', target: '< 40ms', current: '55ms' },
      { label: 'Precisión de Detección', target: '> 98%', current: '94%' }
    ]
  },
  {
    id: 'obj2',
    title: 'Eficiencia Energética',
    description: 'Maximizar la autonomía del dispositivo para sesiones de grabación prolongadas.',
    metrics: [
      { label: 'Duración Batería', target: '6 horas', current: '4.5 horas' },
      { label: 'Consumo en Reposo', target: '< 10mA', current: '15mA' }
    ]
  }
];

export const PROJECT_SCOPE: ProjectScope = {
  productDescription: 'Un tripié robótico inteligente capaz de rotar 360 grados horizontalmente y 90 grados verticalmente. Utiliza visión artificial integrada para seguir a un sujeto en movimiento sin necesidad de intervención manual o sensores externos en la persona. Se controla mediante una aplicación móvil dedicada vía Bluetooth/WiFi.',
  inclusions: [
    'Mecanismo de rotación de 2 ejes (Pan/Tilt).',
    'Algoritmo de seguimiento basado en IA (Person Tracking).',
    'App móvil para Android e iOS.',
    'Batería recargable integrada.',
    'Soporte universal para smartphones.'
  ],
  exclusions: [
    'Resistencia al agua (IP67).',
    'Seguimiento de múltiples personas simultáneamente (V1).',
    'Integración con cámaras profesionales (DSLR).'
  ]
};

export const DELIVERABLES: Deliverable[] = [
  { id: 'd1', title: 'Plan de Proyecto Detallado', status: 'approved', dueDate: '2026-01-10', owner: 'Project Manager' },
  { id: 'd2', title: 'Prototipo Funcional V1', status: 'approved', dueDate: '2026-02-01', owner: 'Hardware Lead' },
  { id: 'd3', title: 'Código Fuente del Algoritmo', status: 'in-review', dueDate: '2026-03-15', owner: 'Software Lead' },
  { id: 'd4', title: 'Manual de Usuario', status: 'pending', dueDate: '2026-04-20', owner: 'Technical Writer' }
];

export const WBS_DATA: WBSNode[] = [
  {
    id: 'w1',
    label: 'Fase 1: Investigación y Diseño',
    type: 'phase',
    children: [
      {
        id: 'w1.1',
        label: 'Diseño Industrial',
        type: 'deliverable',
        children: [
          { id: 'w1.1.1', label: 'Modelado 3D de Carcasa', type: 'task' },
          { id: 'w1.1.2', label: 'Selección de Materiales', type: 'task' }
        ]
      },
      {
        id: 'w2',
        label: 'Arquitectura Electrónica',
        type: 'deliverable',
        children: [
          { id: 'w1.2.1', label: 'Esquemático de PCB', type: 'task' },
          { id: 'w1.2.2', label: 'Lista de Componentes (BOM)', type: 'task' }
        ]
      }
    ]
  },
  {
    id: 'w2',
    label: 'Fase 2: Desarrollo de Software',
    type: 'phase',
    children: [
      {
        id: 'w2.1',
        label: 'Motor de IA',
        type: 'deliverable',
        children: [
          { id: 'w2.1.1', label: 'Entrenamiento de Modelo', type: 'task' },
          { id: 'w2.1.2', label: 'Optimización para ESP32', type: 'task' }
        ]
      }
    ]
  }
];
