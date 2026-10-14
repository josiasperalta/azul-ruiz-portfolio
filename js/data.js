// ===========================================
// js/data.js - Datos centralizados para el portafolio de Azul Ruiz
// ===========================================

// ===========================================
// DATOS DEL PERFIL
// ===========================================
export const perfil = {
  nombre: 'Azul Ruiz',
  titulo: 'Estudiante de Contador Público (UNC) | Excel · Control de cobros · Administración',
  estado: '#OpenToWork',
  subtitulo: 'Disponible para primer empleo o pasantía (Administrativo / Contable / Recepción / Auxiliar)',
  ubicacion: 'Córdoba Capital, Argentina',
  modalidad: 'Presencial o Remoto',
  disponibilidad: 'Disponibilidad inmediata y horario adaptable al cursado',
  email: 'azulmartinaruizf@gmail.com',
  telefono: '+54 9 351 206-2487',
  linkedin: 'https://www.linkedin.com/in/azul-ruiz',
  sobreMi:
    'Estudiante con orientación en Economía y Gestión de las Organizaciones, próxima a comenzar Contador Público en la UNC. Buena con los números y con muchas ganas de aprender. Con experiencia práctica en el control de cobros de obras sociales y prepagas. Busco mi primer empleo o pasantía en tareas administrativas o contables, presencial o remoto en Córdoba, con horarios compatibles con el cursado.',
};

// ===========================================
// EXPERIENCIA PROFESIONAL
// ===========================================
export const experiencia = [
  {
    id: 'actual',
    cargo: 'Asistente Administrativa',
    empresa: 'Consultorio Médico (Familiar)',
    fecha: 'Octubre 2025 - Actualidad',
    region: 'Córdoba, Argentina',
    responsabilidades: [
      'Reviso la planilla de turnos del consultorio e identifico los pacientes efectivamente atendidos.',
      'Registro cuántos pacientes se atendieron de cada obra social y prepaga (APROSS, Nobis y otras), por día y por mes.',
      'Verifico que los pagos informados por cada obra social y prepaga (liquidación en PDF) sean correctos, considerando que cada una paga un arancel distinto.',
      'Realizo este control de forma continua desde hace un año (desde octubre de 2025).',
    ],
    proceso: [
      {
        id: 1,
        titulo: 'Planilla de Turnos',
        descripcion: 'Revisión de turnos e identificación de los pacientes efectivamente atendidos.',
      },
      {
        id: 2,
        titulo: 'Registro Diario y Mensual (Excel)',
        descripcion:
          'Conteo y organización en Excel de pacientes atendidos por día y por mes según obra social y prepaga (APROSS, Nobis y otras).',
      },
      {
        id: 3,
        titulo: 'Recepción de Liquidación en PDF',
        descripcion: 'Lectura de los reportes de pago enviados por cada entidad.',
      },
      {
        id: 4,
        titulo: 'Verificación de Cobros y Aranceles',
        descripcion:
          'Control de que los importes informados en el PDF sean correctos, considerando que cada obra social y prepaga paga un arancel distinto.',
      },
    ],
  },
];

// ===========================================
// SIMULADOR EXCEL / PLANILLA DE CONTROL
// ===========================================
// Filtros: 'all', 'correcto', 'diferencia', 'verificacion'
// Estados posibles en datos: 'correcto' | 'diferencia' | 'verificacion'
export const simuladorExcel = {
  titulo: 'Vista Previa Interactiva de Planilla de Control (Demo)',
  descripcion:
    'Demostración interactiva con valores simulados. Replica la lógica de verificación de cobros entre la planilla de turnos y las liquidaciones en PDF de obras sociales y prepagas.',
  nota: 'Demostración con valores simulados. No son datos reales.',
  columnas: [
    { field: 'entidad',        header: 'Obra Social / Prepaga',           },
    { field: 'periodo',        header: 'Período',                         },
    { field: 'pacientes',      header: 'Pacientes atendidos (turnos)',    },
    { field: 'arancel',        header: 'Arancel unitario',                },
    { field: 'total_esperado', header: 'Total esperado (Excel)',          },
    { field: 'total_pdf',      header: 'Total informado (liquidación PDF)'},
    { field: 'estado',         header: 'Estado',                          },
  ],
  datos: [
    {
      codigo: 'PRAC-001',
      entidad: 'APROSS',
      periodo: 'Octubre 2025',
      pacientes: 45,
      arancel: 1250,
      total_esperado: 56250,
      total_pdf: 56000,
      estado: 'diferencia',
    },
    {
      codigo: 'PRAC-002',
      entidad: 'Nobis Medical',
      periodo: 'Octubre 2025',
      pacientes: 32,
      arancel: 980,
      total_esperado: 31360,
      total_pdf: 31360,
      estado: 'correcto',
    },
    {
      codigo: 'PRAC-003',
      entidad: 'Obra Social Sindical',
      periodo: 'Octubre 2025',
      pacientes: 67,
      arancel: 850,
      total_esperado: 56950,
      total_pdf: 57500,
      estado: 'verificacion',
    },
    {
      codigo: 'PRAC-004',
      entidad: 'Prepaga Nacional',
      periodo: 'Octubre 2025',
      pacientes: 53,
      arancel: 1250,
      total_esperado: 66250,
      total_pdf: 66500,
      estado: 'verificacion',
    },
    {
      codigo: 'PRAC-005',
      entidad: 'APROSS',
      periodo: 'Noviembre 2025',
      pacientes: 28,
      arancel: 1250,
      total_esperado: 35000,
      total_pdf: 35000,
      estado: 'correcto',
    },
    {
      codigo: 'PRAC-006',
      entidad: 'Nobis Medical',
      periodo: 'Noviembre 2025',
      pacientes: 38,
      arancel: 980,
      total_esperado: 37240,
      total_pdf: 37240,
      estado: 'correcto',
    },
    {
      codigo: 'PRAC-007',
      entidad: 'APROSS',
      periodo: 'Diciembre 2025',
      pacientes: 41,
      arancel: 1250,
      total_esperado: 51250,
      total_pdf: 50000,
      estado: 'diferencia',
    },
    {
      codigo: 'PRAC-008',
      entidad: 'Prepaga Nacional',
      periodo: 'Enero 2026',
      pacientes: 29,
      arancel: 1250,
      total_esperado: 36250,
      total_pdf: 36250,
      estado: 'correcto',
    },
  ],
};

// ===========================================
// CATÁLOGO DE GESTIÓN, RECURSOS Y PROYECTOS
// ===========================================
// Categorías: 'gestion-excel' | 'academico-economico' | 'oratoria-liderazgo'
export const PORTFOLIO_ITEMS = [
  {
    id: 'sistema-control',
    titulo: 'Registro de Pacientes y Control de Liquidaciones (APROSS, Nobis y otras)',
    categoria: 'gestion-excel',
    etiqueta: 'Gestión y Excel',
    preview:
      'Planillas de control para cruzar importes entre la planilla de turnos y las liquidaciones en PDF. Incluye validación de datos, fórmulas automáticas y reportes resumidos por entidad.',
    detalles: [
      'Organización por entidad y período mensual',
      'Fórmulas automáticas de cálculo de importes totales',
      'Validación de datos para control de cobros',
      'Reportes resumidos listos para presentación al profesional',
    ],
    modal: {
      titulo: 'Registro de Pacientes y Control de Liquidaciones',
      categoria: 'Gestión y Excel',
      descripcion:
        'Sistema de hojas de cálculo estructurado para gestionar y controlar los cobros mensuales de obras sociales y prepagas. Cada hoja está diseñada para cruzar automáticamente los importes consultados, aplicar los aranceles correspondientes y generar reportes consolidados. El sistema incluye validación de datos para prevenir errores comunes en el control, permitiendo una entrega oportuna y precisa al profesional médico.',
      tecnologias: ['Microsoft Excel', 'Validación de datos', 'Fórmulas avanzadas', 'Control de cobros'],
    },
  },
  {
    id: 'onu',
    titulo: 'Participación y Documento de Posición – Modelo de Naciones Unidas',
    categoria: 'oratoria-liderazgo',
    etiqueta: 'Oratoria y Liderazgo',
    preview:
      'Documento formal de posición investigando la postura oficial de un país, redacción diplomática y exposición de argumentos en recinto multilateral.',
    detalles: [
      'Investigación exhaustiva de la postura oficial de un país',
      'Redacción formal del documento de posición',
      'Exposición de discursos en recinto',
      'Negociación de proyectos de resolución con otras delegaciones',
    ],
    modal: {
      titulo: 'Participación – Modelo de Naciones Unidas',
      categoria: 'Oratoria y Liderazgo',
      descripcion:
        'Fui delegada en un Modelo de Naciones Unidas donde realicé una investigación exhaustiva de la postura oficial de un país miembro respecto al tema en discusión. Redacté un documento de posición formal argumentando las posiciones e intereses de mi país, el cual fue presentado en el recinto multilateral. Participé en sesiones de negociación con otras delegaciones para encontrar puntos de consenso y redactar proyectos de resolución. Desarrollé habilidades de oratoria, diplomacia y negociación internacional.',
      tecnologias: ['Investigación diplomática', 'Redacción formal', 'Oratoria', 'Negociación'],
    },
  },
  {
    id: 'formacion-economicas',
    titulo: 'Formación en Economía y Gestión de las Organizaciones',
    categoria: 'academico-economico',
    etiqueta: 'Académico y Economía',
    preview:
      'Base contable, administrativa y organizacional desarrollada durante la orientación del nivel secundario y el ingreso a Ciencias Económicas (UNC).',
    detalles: [
      'Formación contable y administrativa del nivel secundario',
      'Base en economía y gestión organizacional',
      'Conocimientos en manejo de recursos y análisis organizacional',
    ],
    modal: {
      titulo: 'Formación en Economía y Gestión',
      categoria: 'Académico y Economía',
      descripcion:
        'Durante la orientación en Economía y Gestión de las Organizaciones del nivel secundario, y con el ingreso a la carrera de Ciencias Económicas en la UNC, adquirí una base sólida en contabilidad administrativa, análisis económico y gestión organizacional. La base contable me brinda herramientas para la organización financiera y el registro de transacciones, mientras que el enfoque en economía me permite analizar factores que impactan en la gestión administrativa. Esta formación complementa mi experiencia práctica en control de cobros.',
      tecnologias: ['Contabilidad administrativa', 'Economía', 'Gestión organizacional', 'Análisis de datos'],
    },
  },
  {
    id: 'proyectos-futuro',
    titulo: 'Próximos Proyectos & Recursos UNC',
    categoria: 'academico-economico',
    etiqueta: 'Próximos Recursos',
    preview:
      'Espacio en constante actualización con nuevas plantillas de Excel, trabajos prácticos de Ciencias Económicas y certificaciones.',
    detalles: [
      'Plantillas de Excel avanzadas para control de cobros y liquidaciones',
      'Trabajos prácticos y casos de estudio de la carrera de Contador Público',
      'Certificados y documentos de la UNC disponibles próximamente',
    ],
    modal: {
      titulo: 'Próximos Proyectos & Recursos',
      categoria: 'Académico y Economía',
      descripcion:
        'Este espacio se irá actualizando gradualmente con nuevos recursos: plantillas de hojas de cálculo para control financiero, trabajos prácticos y ejercicios de la carrera de Contador Público en la UNC, certificados y documentos académicos relevantes para el desarrollo profesional en contabilidad y administración.',
      tecnologias: ['Microsoft Excel', 'Recursos UNC', 'Certificación', 'Aprendizaje continuo'],
    },
  },
];

// ===========================================
// EDUCACIÓN
// ===========================================
export const educacion = [
  {
    id: 'unc',
    institucion: 'Universidad Nacional de Córdoba (UNC)',
    facultad: 'Facultad de Ciencias Económicas',
    titulo: 'Carrera de Contador Público',
    fecha: 'Ingreso anticipado 2026 · Cursado desde 2027',
    descripcion:
      'Formación contable, financiera y administrativa con enfoque en la gestión de organizaciones. Ingreso anticipado aprobado, comienzo de cursado previsto para 2027.',
  },
  {
    id: 'secundario',
    institucion: 'Instituto Amparo de María',
    nivel: 'Nivel Secundario con Orientación en Economía y Gestión de las Organizaciones',
    titulo: 'Egreso 2026',
    descripcion:
      'Formación integral con énfasis en economía, contabilidad básica y gestión organizacional. Preparó para la educación superior en ciencias económicas y administrativas.',
  },
];

// ===========================================
// HABILIDADES Y COMPETENCIAS
// ===========================================
export const habilidades = {
  herramientas: [
    { nombre: 'Excel (registro y control de cobros)', nivel: 'Avanzado' },
    { nombre: 'Microsoft Word', nivel: 'Intermedio' },
  ],
  competencias: [
    'Manejo de números',
    'Organización de información',
    'Trabajo autónomo',
    'Investigación y redacción',
    'Oratoria y negociación (Modelo de Naciones Unidas)',
  ],
  idiomas: [
    { idioma: 'Español', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'Básico' },
  ],
};

// ===========================================
// CONFIGURACIÓN DE TEMA
// ===========================================
export const tema = {
  modoPredeterminado: 'light',
  claveStorage: 'azul-ruiz-tema',
};