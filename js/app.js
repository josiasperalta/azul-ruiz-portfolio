// ===========================================
// js/app.js - Lógica interactiva del portafolio de Azul Ruiz
// ===========================================
// Gestiona: renderizado dinámico, filtros, simulador Excel,
// cambio de tema, toast notification, menú móvil y QR/vCard.

import { perfil, experiencia, simuladorExcel, PORTFOLIO_ITEMS, educacion, habilidades, tema } from './data.js';

// ===========================================
// INICIALIZACIÓN
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
  // Aplicar tema guardado o predeterminado
  aplicarTema(tema.modoPredeterminado);

  // Renderizar secciones
  renderizarHero();
  renderizarPortafolio();
  renderizarEducacion();
  renderizarHabilidades();

  // Configurar event listeners
  configurarEventListeners();
});

// ===========================================
// CONFIGURAR EVENT LISTENERS
// ===========================================
function configurarEventListeners() {
  // Toggle Dark/Light Mode
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const modoActual = document.documentElement.getAttribute('data-mode');
      const nuevoModo = modoActual === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevoModo);
      guardarPreferenciaTema(nuevoModo);
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu) {
        mobileMenu.style.right = '-100%';
      }
    });
  });

  // Filters del catálogo
  const filterChips = document.querySelectorAll('.cato-filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
      // Actualizar clase selected
      filterChips.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');

      // Filtrar items
      const categoria = this.getAttribute('data-category');
      filtrarPortafolio(categoria);
    });
  });

  // Filters del simulador Excel
  const excelFilterChips = document.querySelectorAll('.filter-chip');
  excelFilterChips.forEach(chip => {
    chip.addEventListener('click', function () {
      excelFilterChips.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');

      const filtro = this.getAttribute('data-filter');
      filtrarSimuladorExcel(filtro);
    });
  });

  // Buscador en simulador
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const termino = e.target.value.toLowerCase();
      filtrarPorBusqueda(termino);
    });
  }

  // Dropdown CV
  const cvDropdownBtn = document.getElementById('cv-dropdown-btn');
  const cvDropdown = document.getElementById('cv-dropdown');

  if (cvDropdownBtn && cvDropdown) {
    cvDropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      cvDropdown.classList.toggle('hidden');
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function (e) {
      if (!cvDropdownBtn.contains(e.target) && !cvDropdown.contains(e.target)) {
        cvDropdown.classList.add('hidden');
      }
    });
  }

  // Modal close click outside
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.className.includes('modal-close')) {
        cerrarModal(overlay);
      }
    });
  });

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const abierto = document.querySelector('.modal-overlay.open');
      if (abierto) {
        abierto.remove();
      }
    }
  });

  // Toast notification - copiar email
  const copyEmailBtn = document.querySelector('a[href="mailto:azulmartinaruizf@gmail.com"]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');

  if (copyEmailBtn && toast && toastMessage) {
    copyEmailBtn.addEventListener('click', function (e) {
      // El email ya está en el href, mostramos toast
      mostrarToast('Email copiado al portapapeles');
    });
  }

  if (toastClose) {
    toastClose.addEventListener('click', function () {
      toast.classList.remove('show');
    });
  }

  // Cerrar toast si el usuario hace clic fuera
  if (toast) {
    toast.addEventListener('click', function (e) {
      if (e.target === toast) {
        toast.classList.remove('show');
      }
    });
  }

  // QR Modal y vCard download
  const qrBtn = document.getElementById('qr-btn');
  const qrModal = document.getElementById('qr-modal');

  if (qrBtn && qrModal) {
    // Abrir modal QR
    qrBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      qrModal.classList.add('open');
      // Re-inicializar Lucide dentro del modal
      setTimeout(lucide.createIcons, 100);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function (e) {
      if (!qrBtn.contains(e.target) && !qrModal.contains(e.target)) {
        qrModal.classList.remove('open');
      }
    });

    // Descargar vCard
    const downloadVcfBtn = document.getElementById('download-vcf-btn');
    if (downloadVcfBtn) {
      downloadVcfBtn.addEventListener('click', function () {
        // Generar contenido vCard
        const vcardContent = 'BEGIN:VCARD' + '\n' + 'VERSION:3.0' + '\n' + 'FN:Azul Ruiz' + '\n' + 'TEL;type=cell:+54 9 351 206-2487' + '\n' + 'EMAIL;type=internet:azulmartinaruizf@gmail.com' + '\n' + 'URL;type=text:https://www.linkedin.com/in/azul-ruiz' + '\n' + 'END:VCARD';

        // Crear blob y desencadenar download
        const blob = new Blob([vcardContent], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_Azul_Ruiz_Contacto.vcf';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Mostrar toast
        mostrarToast('Contacto guardado en .vcf');
      });
    }
  }

  // Intersection Observer para animaciones
  configurarIntersectionObserver();

  // Navbar scroll
  configurarNavbarScroll();
}

// ===========================================
// APLICAR TEMA
// ===========================================
function aplicarTema(modo) {
  const html = document.documentElement;
  const body = document.body;

  if (modo === 'dark') {
    html.setAttribute('data-mode', 'dark');
    body.classList.add('dark-mode');
    // Guardar en localStorage
    localStorage.setItem(tema.claveStorage, 'dark');
    // Actualizar iconos
    if (sunIcon) sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
  } else {
    html.removeAttribute('data-mode');
    body.classList.remove('dark-mode');
    // Guardar en localStorage
    localStorage.setItem(tema.claveStorage, 'light');
    // Actualizar iconos
    if (sunIcon) sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
  }
}

function guardarPreferenciaTema(modo) {
  localStorage.setItem(tema.claveStorage, modo);
  // Verificar si ya hay preferencia guardada
  const temaGuardado = localStorage.getItem(tema.claveStorage);
  if (temaGuardado) {
    aplicarTema(temaGuardado);
  }
}

// Cargar tema guardado al iniciar
document.addEventListener('DOMContentLoaded', function () {
  const temaGuardado = localStorage.getItem(tema.claveStorage);
  if (temaGuardado) {
    aplicarTema(temaGuardado);
  } else {
    aplicarTema(tema.modoPredeterminado);
  }
});

// ===========================================
// RENDERIZAR HERO SECTION
// ===========================================
function renderizarHero() {
  const heroBadge = document.querySelector('.animate-pulse-badge');
  const heroTitulo = document.querySelector('.hero-title');
  const heroSubtitulo = document.querySelector('.hero-subtitle');
  const cargoChips = document.querySelector('.cargo-chips');
  const actionButtons = document.querySelector('.action-buttons');
  const locationOverlay = document.querySelector('.location-overlay');

  if (perfil) {
    // Badge OpenToWork
    if (heroBadge) {
      heroBadge.innerHTML = `
        <span class="flex items-center gap-1">
          <i data-lucide="alert-circle" class="w-3 h-3" />
          ${perfil.estado}
        </span>
      `;
      lucide.createIcons();
    }

    // Título
    if (heroTitulo) {
      heroTitulo.textContent = perfil.nombre;
    }

    // Subtítulo
    if (heroSubtitulo) {
      heroSubtitulo.textContent = perfil.subtitulo;
    }

    // Chips de cargos
    if (cargoChips) {
      const chipsHTML = perfil.subtitulo.includes('Administrativo') ? `
        <span class="chip-tag px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">
          Administrativo
        </span>
        <span class="chip-tag px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">
          Asistente Contable
        </span>
        <span class="chip-tag px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">
          Auxiliar Administrativo
        </span>
        <span class="chip-tag px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">
          Pasante
        </span>
        <span class="chip-tag px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">
          Recepcionista
        </span>
      ` : '';
      cargoChips.innerHTML = chipsHTML;
    }

    // Botones de acción (ya están en HTML, solo nos aseguramos de que funcionen)
  }
}

// ===========================================
// RENDERIZAR PORTAFOLIO
// ===========================================
function renderizarPortafolio() {
  const catalogoGrid = document.getElementById('catalogo-grid');

  if (!catalogoGrid || !PORTFOLIO_ITEMS) return;

  // Guardar referencia global para filtros
  window.PORTFOLIO_ITEMS = PORTFOLIO_ITEMS;

  // Renderizar todos los items
  const itemsHTML = PORTFOLIO_ITEMS.map((item, index) => {
    const categoriaEtiqueta = item.etiqueta || 'Gestión y Excel';

    // Determinar color de categoría
    let categoriaBg, categoriaColor;
    switch (item.categoria) {
      case 'gestion-excel':
        categoriaBg = 'rgba(39, 99, 235, 0.1)';
        categoriaColor = '#2563EB';
        break;
      case 'academico-economico':
        categoriaBg = 'rgba(16, 185, 129, 0.1)';
        categoriaColor = '#10B981';
        break;
      case 'oratoria-liderazgo':
        categoriaBg = 'rgba(139, 92, 246, 0.1)';
        categoriaColor = '#8B5CF6';
        break;
      default:
        categoriaBg = 'rgba(147, 197, 253, 0.1)';
        categoriaColor = '#60A5FA';
    }

    return `
      <article class="catalogo-card group hover:border-emerald-500 hover:bg-emerald-50/20" tabindex="0" role="button" 
               onclick="abrirModalPortafolio('${item.id}')"
               style="border-color: var(--border-light); transition: all 0.3s ease;">
        <div class="relative group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-[var(--accent-royal)] group-hover:after:transition-transform group-hover:after:duration-300">
        </div>
        <div class="flex flex-col h-full">
          <span class="categoria ${item.categoria}" style="background: ${categoriaBg}; color: ${categoriaColor};">
            ${item.etiqueta}
          </span>
          <h3 class="font-semibold text-[var(--text-primary)] mt-2 line-clamp-2">${item.titulo}</h3>
          <p class="text-[var(--text-secondary)] text-sm line-clamp-3 flex-grow mt-2">${item.preview}</p>
        </div>
      </article>
    `;
  }).join('');

  catalogoGrid.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${itemsHTML}</div>`;
}

function abrirModalPortafolio(itemId) {
  const item = PORTFOLIO_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  // Usar los datos del modal si existen, sino usar los principales
  const modalTitulo = item.modal?.titulo || item.titulo;
  const modalCategoria = item.modal?.categoria || item.categoria;
  const modalVistaPrevia = item.modal?.vistaPrevia || item.preview;
  const modalDescripcion = item.modal?.descripcion || '';
  const modalTecnologias = item.modal?.tecnologias || [];

  // Crear contenido del modal
  const tecnologiasHTML = modalTecnologias.map(tech => `
    <span class="modal-tag px-2 py-0.5 rounded text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">
      ${tech}
    </span>
  `).join('');

  const modalHTML = `
    <div class="modal-overlay open" role="dialog" aria-modal="true">
      <div class="modal-content">
        <button class="modal-close" aria-label="Cerrar modal" role="button">
          <i data-lucide="x" class="w-4 h-4" />
        </button>
        <div class="modal-detail">
          <h3>${modalTitulo}</h3>
          <p class="text-[var(--text-secondary)] mb-4">${modalDescripcion}</p>
          <div class="modal-tags mt-4">
            ${tecnologiasHTML}
          </div>
        </div>
      </div>
    </div>
  `;

  // Insertar y crear overlay
  const existingOverlay = document.querySelector('.modal-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const overlayDOM = document.createElement('div');
  overlayDOM.innerHTML = modalHTML;
  document.body.appendChild(overlayDOM);

  // Re-inicializar Lucide
  lucide.createIcons();

  // Cerrar al hacer clic en overlay
  const nuevoOverlay = document.querySelector('.modal-overlay');
  if (nuevoOverlay) {
    nuevoOverlay.addEventListener('click', function (e) {
      if (e.target === nuevoOverlay || e.target.className.includes('modal-close')) {
        nuevoOverlay.remove();
      }
    });
  }
}

// ===========================================
// RENDERIZAR CATálogo CON FILTROS
// ===========================================
function filtrarPortafolio(categoria) {
  const items = document.querySelectorAll('.catalogo-card');

  items.forEach(item => {
    const itemCategoria = item.querySelector('.categoria')?.getAttribute('data-cat') || '';

    if (categoria === 'todos' || itemCategoria === categoria || categoria === item.dataset.categoria) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });

  // Re-inicializar Lucide después de filtrar
  lucide.createIcons();
}

// ===========================================
// RENDERIZAR SIMULADOR EXCEL
// ===========================================
function renderizarSimuladorExcel() {
  const tablaBody = document.querySelector('#simulator tbody');
  const totalElement = document.getElementById('total-calculado');
  const auditadasElement = document.getElementById('prestaciones-auditadas');
  const porcentajeElement = document.getElementById('porcentaje-control');

  if (!tablaBody || !simuladorExcel) return;

  // Renderizar datos
  const datos = simuladorExcel.datos;
  const columnas = simuladorExcel.columnas;

  // Limpiar y renderizar filas
  let filasHTML = '';
  let total = 0;
  let auditadas = 0;

  datos.forEach(fila => {
    const subtotal = parseInt(fila.subtotal.replace('$', '').replace('.', '')) || 0;
    total += subtotal;

    let estadoTexto = 'Pendiente';
    let estadoClase = '';

    switch (fila.estado) {
      case 'listo':
        estadoTexto = 'Listo para Facturar';
        estadoClase = 'state-listo';
        auditadas++;
        break;
      case 'en-control':
        estadoTexto = 'En Control';
        estadoClase = 'state-en-control';
        break;
      case 'liquidado':
        estadoTexto = 'Liquidado';
        estadoClase = 'state-liquidado';
        break;
    }

    filasHTML += `
      <tr>
        <td class="p-4 font-mono text-sm">${fila.codigo}</td>
        <td class="p-4">${fila.entidad}</td>
        <td class="p-4 font-mono text-sm">${fila.cantidad}</td>
        <td class="p-4 font-mono text-sm">$ ${fila.arancel.toLocaleString()}</td>
        <td class="p-4 font-mono text-sm">$ ${subtotal.toLocaleString()}</td>
        <td class="p-4 ${estadoClase} rounded text-sm">${estadoTexto}</td>
      </tr>
    `;
  });

  tablaBody.innerHTML = filasHTML;

  // Actualizar resúmenes
  if (totalElement) totalElement.textContent = `$ ${total.toLocaleString()}`;
  if (auditadasElement) auditadasElement.textContent = auditadas;
  if (porcentajeElement) {
    const totalRegistros = datos.length;
    const porcentaje = totalRegistros > 0 ? Math.round((auditadas / totalRegistros) * 100) : 0;
    porcentajeElement.textContent = `${porcentaje}%`;
  }
}

// Filtrar simulador por estado
function filtrarSimuladorExcel(filtro) {
  const filas = document.querySelectorAll('#simulator tbody tr');

  filas.forEach(fila => {
    const estadoCelda = fila.querySelector('td:last-child')?.textContent.toLowerCase() || '';

    if (filtro === 'all' || filtro === estadoCelda) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });

  // Actualizar chips seleccionados
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => chip.classList.remove('selected'));
  // Re-encontrar el chip correcto (necesitaríamos referenciarlo, simplificamos)
}

// Filtrar por búsqueda
function filtrarPorBusqueda(termino) {
  const filas = document.querySelectorAll('#simulator tbody tr');

  filas.forEach(fila => {
    const textoFila = fila.textContent.toLowerCase();
    if (textoFila.includes(termino.toLowerCase())) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });

  // Re-inicializar íconsos después de filtrar
  lucide.createIcons();
}

// ===========================================
// RENDERIZAR EDUCACIÓN
// ===========================================
function renderizarEducacion() {
  const lineaTiempo = document.querySelector('.linea-tiempo');

  if (!lineaTiempo || !educacion) return;

  educacion.forEach((item, index) => {
    const puntoHTML = `
      <div class="linea-tiempo" style="left: ${index * 33}%;">
        <div class="absolute -top-1/2 -left-1/2 w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border-light)] flex items-center justify-center">
          <i data-lucide="graduation-cap" class="w-5 h-5 text-[var(--accent-royal)]" />
        </div>
        ${index === 0 ? `
          <div class="relative pt-8">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-semibold text-[var(--text-primary)]">${item.institucion}</h3>
              <span class="text-sm text-[var(--accent-royal)]">${item.titulo}</span>
            </div>
            <p class="text-[var(--text-secondary)] text-sm">
              ${item.fecha}
            </p>
            <p class="text-[var(--text-secondary)] text-xs">
              ${item.descripcion}
            </p>
          </div>
        ` : ''}
        ${index === educacion.length - 1 ? `
          <div class="relative pt-8">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-semibold text-[var(--text-primary)]">${item.institucion}</h3>
              <span class="text-sm">${item.nivel}</span>
            </div>
            <p class="text-[var(--text-secondary)] text-sm">
              ${item.fecha}
            </p>
            <p class="text-[var(--text-secondary)] text-xs">
              ${item.descripcion}
            </p>
          </div>
        ` : ''}
      </div>
    `;

    lineaTiempo.insertAdjacentHTML('beforeend', puntoHTML);
  });

  // Re-inicializar Lucide
  lucide.createIcons();
}

// ===========================================
// RENDERIZAR HABILidades
// ===========================================
function renderizarHabilidades() {
  const habilidadGrid = document.querySelector('.habilidades-grid');

  if (!habilidadGrid || !habilidades) return;

  // Herramientas
  const herramientasHTML = habilidades.herramientas.map((herramienta, index) => `
    <span class="habilidad-chip" style="background: var(--bg-card); border-color: var(--border-light); color: var(--text-primary);">
      ${herramienta.nombre}
    </span>
  `).join('');

  // Competencias
  const competenciasHTML = habilidades.competencias.map(competencia => `
    <span class="habilidad-chip" style="background: var(--bg-card); border-color: var(--border-light); color: var(--text-primary);">
      ${competencia}
    </span>
  `).join('');

  // Idiomas
  const idiomasHTML = habilidades.idiomas.map(idioma => `
    <div class="mb-3">
      <span class="font-medium text-[var(--text-primary)]">${idioma.idioma}</span>
      <span class="text-[var(--accent-emerald)] font-medium">${idioma.nivel}</span>
    </div>
  `).join('');

  habilidadGrid.innerHTML = `
    <div>
      <div>${herramientasHTML}</div>
      <div>${competenciasHTML}</div>
    </div>
    <div>
      ${idiomasHTML}
    </div>
  `;

  // Re-inicializar Lucide
  lucide.createIcons();
}

// ===========================================
// CONFIGURAR INTERSECTION OBSERVER
// ===========================================
function configurarIntersectionObserver() {
  const elementosReveal = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elementosReveal.forEach(elemento => {
    observer.observe(elemento);
  });
}

// ===========================================
// CONFIGURAR NAVBAR SCROLL
// ===========================================
function configurarNavbarScroll() {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scroll hacia abajo - ocultar navbar
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scroll hacia arriba - mostrar navbar
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });
}

// ===========================================
// TOAST NOTIFICATION
// ===========================================
function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (toast && toastMessage) {
    toastMessage.textContent = mensaje;
    toast.classList.add('show');

    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Cerrar modal
function cerrarModal(overlay) {
  if (overlay) {
    overlay.remove();
  }
}