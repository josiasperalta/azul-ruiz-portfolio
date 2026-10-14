// ===========================================
// js/data.js - Datos centralizados para el portafolio de Azul Ruiz
// ===========================================
// Este archivo contiene toda la información del perfil, experiencia,
// educación, habilidades y el arreglo de elementos del catálogo.
// Para agregar nuevos elementos al catálogo, solo necesitas agregar un objeto
// al arreglo PORTFOLIO_ITEMS con las propiedades definidas a continuación.
// Formato en 5 líneas:
// {
//   id: 'único',
//   titulo: 'Título',
//   categoria: 'categoría',
//   descripcion: 'Descripción',
//   preview: 'Vista previa',
// }

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
  sobreMi: 'Estudiante con orientación en Economía y Gestión de las Organizaciones, próxima a comenzar Contador Público en la UNC. Buena con los números y con muchas ganas de aprender. Con experiencia práctica en el control de cobros de obras sociales y prepagas. Busco mi primer empleo o pasantía en tareas administrativas o contables, presencial o remoto en Córdoba, con horarios compatibles con el cursado.',
};

// ===========================================
// EXPERIENCE PROFESSIONAL
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
      'Verifico que los pagos informados por cada obra social y prepaga (liquidación en PDF) sean correctos, considerando que cada una paga distinto.',
      'Hago este control de forma continua desde un año.',
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
        descripcion: 'Conteo y organización en Excel de pacientes atendidos por día y por mes según obra social y prepaga (APROSS, Nobis y otras).',
      },
      {
        id: 3,
        titulo: 'Recepción de Liquidación en PDF',
        descripcion: 'Lectura de los reportes de pago enviados por cada entidad.',
      },
      {
        id: 4,
        titulo: 'Verificación de Cobros y Aranceles',
        descripcion: 'Control de que los importes informados en el PDF sean correctos, considerando que cada obra social y prepaga paga un valor distinto.',
      },
    ],
  },
];

// ===========================================
// SIMULADOR EXCEL / PLANILLA DE CONTROL
// ===========================================
export const simuladorExcel = {
  titulo: 'Vista Previa Interactiva de Planilla de Control (Demo)',
  descripcion:
    'Demostración interactiva con valores simulados (ej. APROSS, Nobis Medical, Obra Social Sindical, Prepaga Nacional) que replica la lógica de verificación de cobros entre la planilla de turnos y las liquidaciones en PDF.',
  estados: ['Todos', '✅ Pago Correcto', '⚠️ Diferencia en PDF', '𔁋 En Verificación'],
  columnas: [
    { field: 'entidad', header: 'Obra Social / Prepaga', width: '200px' },
    { field: 'periodo', header: 'Período (Mes / Día)', width: '140px' },
    { field: 'pacientes', header: 'Pacientes Atendidos (Turnos)', width: '130px' },
    { field: 'arancel', header: 'Arancel Unitario (según entidad)', width: '130px' },
    { field: 'total_esperado', header: 'Total Esperado (Excel)', width: '130px' },
    { field: 'total_pdf', header: 'Total Informado (Liquidación PDF)', width: '140px' },
    { field: 'estado', header: 'Estado de Control', width: '130px' },
  ],
  datos: [
    {
      codigo: 'PRAC-001',
      entidad: 'APROSS',
      periodo: 'Enero 2024',
      pacientes: 45,
      arancel: 1250,
      total_esperado: 56250,
      total_pdf: 56000,
      estado: '⚠️ Diferencia en PDF',
    },
    {
      codigo: 'PRAC-002',
      entidad: 'Nobis Medical',
      periodo: 'Enero 2024',
      pacientes: 32,
      arancel: 980,
      total_esperado: 31360,
      total_pdf: 31360,
      estado: '✅ Pago Correcto',
    },
    {
      codigo: 'PRAC-003',
      entidad: 'Obra Social Sindical',
      periodo: 'Enero 2024',
      pacientes: 67,
      arancel: 850,
      total_esperado: 56950,
      total_pdf: 57500,
      estado: '𔁋 En Verificación',
    },
    {
      codigo: 'PRAC-004',
      entidad: 'Prepaga Nacional',
      periodo: 'Enero 2024',
      pacientes: 53,
      arancel: 1250,
      total_esperado: 66250,
      total_pdf: 66500,
      estado: '𔁋 En Verificación',
    },
    {
      codigo: 'PRAC-005',
      entidad: 'APROSS',
      periodo: 'Febrero 2024',
      pacientes: 28,
      arancel: 1250,
      total_esperado: 35000,
      total_pdf: 35000,
      estado: '✅ Pago Correcto',
    },
  ],
  resumenes: {
    totalCalculado: 240660,
    prestacionesAuditadas: 225,
    porcentajeControl: 80,
  },
};

// ===========================================
// CATÁLOGO DE GESTIÓN, RECURSOS Y PROYECTOS
// ===========================================
// Filtros disponibles: 'todos', 'gestion-excel', 'academico-economico', 'oratoria-liderazgo'
export const PORTFOLIO_ITEMS = [
  {
    id: 'sistema-control',
    titulo: 'Registro de Pacientes y Control de Liquidaciones (APROSS, Nobis y otras)',
    categoria: 'gestion-excel',
    etiqueta: 'Gestión y Excel',
    preview:
      'Estructura de hojas de cálculo para cruzar importes y preparar la facturación mensual sin errores. Incluye validación de datos, fórmulas automáticas y reportes resumidos por entidad.',
    detalles: [
      'Organización por entidad y período mensual',
      'Fórmulas automáticas de cálculo de importes totales',
      'Validación de datos para evitar errores de facturación',
      'Reportes resumidos listos para presentación al profesional',
    ],
    modal: {
      titulo: 'Registro de Pacientes y Control de Liquidaciones',
      categoria: 'Gestión y Excel',
      vistaPrevia:
        'Sistema estructurado para el control de liquidaciones mensuales de obras sociales y prepagas, con validación automática y reportes consolidados.',
      descripcion:
        'Desarrollé un sistema de hojas de cálculo estructurado para gestionar y controlar los cobros mensuales de obras sociales y prepagas. Cada hoja está diseñada para cruzar automáticamente los importes consultados, aplicar los aranceles correspondientes y generar reportes consolidados listos para la facturación. El sistema incluye validación de datos para prevenir errores comunes en la liquidación, permitiendo una entrega oportuna y precisa de comprobantes al profesional médico. La estructura es modular y puede adaptarse a diferentes tipos de obras sociales con valores de arancel variables.',
      tecnologias: ['Microsoft Excel', 'Validación de datos', 'Fórmulas avanzadas', 'Control de cobros'],
    },
  },
  {
    id: 'onu',
    titulo: 'Participación y Documento de Posición – Modelo de Naciones Unidas (ONU)',
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
      vistaPrevia:
        'Participación como delegada en modelo de Naciones Unidas, con investigación de posturas oficiales y redacción formal de documentos de posición.',
      descripcion:
        'Fui delegada en un modelo de Naciones Unidas donde realicé una investigación exhaustiva de la postura oficial de un país miembro respecto al tema en discusión. Redacté un documento de posición formal argumentando las posiciones y intereses de mi país, el cual fue presentado en el recinto multilateral. Participé en sesiones de negociación con otras delegaciones para encontrar puntos de consenso y redactar proyectos de resolución. Desarrollé habilidades de oratoria, diplomacia y negociación internacional, aprendiendo a articular argumentos convincentes dentro de los procedimientos formales de la ONU. Esta experiencia fortaleció mi capacidad de investigación, redacción formal y trabajo en equipo bajo presión.',
      tecnologias: ['Investigación diplomática', 'Redacción formal', 'Oratoria', 'Negociación'],
    },
  },
  {
    id: 'formacion-economicas',
    titulo: 'Formación en Economía y Gestión de las Organizaciones',
    categoria: 'academico-economico',
    etiqueta: 'Académico y Economía',
    preview:
      'Base contable, administrativa y organizacional desarrollada durante la orientación del nivel secundario y el ingreso a Ciencias Económicas.',
    detalles: [
      'Formación contable y administrativa del nivel secundario',
      'Base en economía y gestión organizacional',
      'Conocimientos en manejo de recursos y análisis organizacional',
    ],
    modal: {
      titulo: 'Formación en Economía y Gestión',
      categoria: 'Académico y Economía',
      vistaPrevia:
        'Base contable, administrativa y organizacional desarrollada durante la orientación del nivel secundario y el ingreso a Ciencias Económicas.',
      descripcion:
        'Durante la orientación en Economía y Gestión de las Organizaciones del nivel secundario, y con el ingreso a la carrera de Ciencias Económicas en la UNC, adquirí una base sólida en contabilidad administrativa, análisis económico y gestión organizacional. Esta formación me permitió entender cómo funcionan las estructuras organizacionales, desde el manejo de recursos básicos hasta el análisis de indicadores de desempeño. La base contable me brinda herramientas para la organización financiera y el registro de transacciones, mientras que el enfoque en economía me permite analizar factores macro y microeconomicos que impactan en la gestión administrativa. Esta formación complementa mi experiencia práctica en control de cobros y me prepara para asumir responsabilidades contables en entornos profesionales.',
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
      'Certificados y documentos de la UNC disponibles para descarga',
    ],
    modal: {
      titulo: 'Próximos Proyectos & Recursos',
      categoria: 'UNC',
      vistaPrevia:
        'Espacio en constante actualización con nuevas plantillas de Excel, trabajos prácticos de Ciencias Económicas y certificaciones.',
      descripcion:
        'Este espacio se irá actualizando gradualmente con nuevos recursos: plantillas de hojas de cálculo para control financiero, trabajos prácticos y ejercicios de la carrera de Contador Público en la UNC, certificados y documentos académicos relevantes para el desarrollo profesional en contabilidad y administración.',
      tecnologias: ['Microsoft Excel', 'Recursos UNC', 'Certificación', 'Aprendizaje continuo'],
    },
  },
];
// Comentario para desarrolladores sobre cómo agregar nuevos ítems
// Agrega un nuevo objeto PORTFOLIO_ITEMS siguiendo el mismo formato.
// Asegúrate de incluir: id, titulo, categoria, etiqueta, preview, detalles (opcional), modal (opcional)

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
// HABILidades Y COMPETENCIAS
// ===========================================
export const habilidades = {
  herramientas: [
    { nombre: 'Excel (registro y control de cobros)', nivel: 'Avanzado', descripcion: 'Cálculos, fórmulas, organización de planillas y control de cobros' },
    { nombre: 'Microsoft Word', nivel: 'Intermedio', descripcion: 'Redacción formal e informes' },
  ],
  competencias: [
    'Manejo de números',
    'Organización de información',
    'Trabajo autónomo',
    'Investigación y redacción',
    'Oratoria y negociación',
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
  modoPredeterminado: 'light', // 'light' o 'dark'
  claveStorage: 'azul-ruiz-tema',
};

// ===========================================
// ETIQUETAS DE CATEGORÍA PARA FILTROS
// ===========================================
export const ETIQUETAS_CATEGORIA = {
  'gestion-excel': 'Gestión y Excel',
  'academico-economico': 'Académico y Economía',
  'oratoria-liderazgo': 'Oratoria y Liderazgo',
  todos: 'Todos',
};

// ===========================================
// MENSAJE DE BIENVENIDA PARA EL CONSOLA (Desarrollo)
// ===========================================
// console.log('🟡 Portafolio Azul Ruiz - Datos cargados exitosamente');