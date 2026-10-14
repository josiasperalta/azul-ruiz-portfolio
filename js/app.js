// ===========================================
// js/app.js - Lógica interactiva del portafolio de Azul Ruiz
// ===========================================
// type="module" — se carga como ES Module desde index.html

import { perfil, simuladorExcel, PORTFOLIO_ITEMS, educacion, habilidades, tema } from './data.js';

// ===========================================
// UTILIDADES GLOBALES
// ===========================================

/** Llama a lucide.createIcons() de forma segura */
function refreshIcons() {
  if (window.lucide) {
    try { window.lucide.createIcons(); } catch (e) { /* noop */ }
  }
}

/** Formatea número como moneda argentina */
function formatARS(n) {
  return '$ ' + Number(n).toLocaleString('es-AR');
}

// ===========================================
// INICIALIZACIÓN ÚNICA
// ===========================================
function init() {
  // Aplicar tema guardado o predeterminado
  try {
    const guardado = localStorage.getItem(tema.claveStorage);
    aplicarTema(guardado || tema.modoPredeterminado);
  } catch (_) {
    aplicarTema(tema.modoPredeterminado);
  }

  // Renderizar cada sección con su propio try/catch
  try { renderizarPortafolio(); }  catch (e) { console.error('[renderizarPortafolio]', e); }
  try { renderizarSimulador();   }  catch (e) { console.error('[renderizarSimulador]', e); }
  try { configurarFiltrosCatalogo(); } catch (e) { console.error('[filtrosCatalogo]', e); }
  try { configurarFiltrosSimulador(); } catch (e) { console.error('[filtrosSimulador]', e); }
  try { configurarEventListeners(); }   catch (e) { console.error('[eventListeners]', e); }
  try { configurarIntersectionObserver(); } catch (e) {
    console.error('[IntersectionObserver]', e);
    // Fallback: mostrar todos los .reveal inmediatamente
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
  try { configurarNavbarScroll(); } catch (e) { console.error('[navbarScroll]', e); }

  // Fallback de 2 s: elementos .reveal que sigan ocultos
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 2000);

  refreshIcons();
}

document.addEventListener('DOMContentLoaded', init);

// ===========================================
// TEMA CLARO / OSCURO
// Un único mecanismo: clase "dark" en <html>
// ===========================================
function aplicarTema(modo) {
  const html = document.documentElement;
  const sunIcon  = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  if (modo === 'dark') {
    html.classList.add('dark');
    document.body.classList.add('dark-mode');
    if (sunIcon)  sunIcon.classList.add('hidden');
    if (moonIcon) moonIcon.classList.remove('hidden');
  } else {
    html.classList.remove('dark');
    document.body.classList.remove('dark-mode');
    if (sunIcon)  sunIcon.classList.remove('hidden');
    if (moonIcon) moonIcon.classList.add('hidden');
  }

  try { localStorage.setItem(tema.claveStorage, modo === 'dark' ? 'dark' : 'light'); }
  catch (_) { /* noop */ }
}

// ===========================================
// CONFIGURAR EVENT LISTENERS
// ===========================================
function configurarEventListeners() {
  // Toggle Tema
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const esDark = document.documentElement.classList.contains('dark');
      aplicarTema(esDark ? 'light' : 'dark');
    });
  }

  // Botón hamburguesa menú móvil
  const hamburguer = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburguer && mobileMenu) {
    hamburguer.addEventListener('click', () => {
      const abierto = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', !abierto);
      hamburguer.setAttribute('aria-expanded', String(!abierto));
    });
    // Cerrar con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburguer.setAttribute('aria-expanded', 'false');
      }
    });
    // Cerrar al tocar un enlace
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburguer.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Dropdown CV
  const cvBtn      = document.getElementById('cv-dropdown-btn');
  const cvDropdown = document.getElementById('cv-dropdown');
  if (cvBtn && cvDropdown) {
    cvBtn.addEventListener('click', e => {
      e.stopPropagation();
      cvDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', e => {
      if (!cvBtn.contains(e.target) && !cvDropdown.contains(e.target)) {
        cvDropdown.classList.add('hidden');
      }
    });
  }

  // Modal QR
  configurarModalQR();

  // Toast close
  const toastClose = document.getElementById('toast-close');
  if (toastClose) {
    toastClose.addEventListener('click', () => ocultarToast());
  }

  // Cerrar modal estático con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const abierto = document.querySelector('.modal-overlay.open');
      if (abierto) abierto.classList.remove('open');
      // modales dinámicos
      document.querySelectorAll('.modal-dinamico').forEach(m => m.remove());
    }
  });

  // Buscador simulador
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      filtrarSimuladorPorBusqueda(e.target.value.toLowerCase());
    });
  }
}

// ===========================================
// MODAL QR + vCARD
// ===========================================
let qrGenerado = false;

function configurarModalQR() {
  const qrBtn   = document.getElementById('qr-btn');
  const qrModal = document.getElementById('qr-modal');
  if (!qrBtn || !qrModal) return;

  qrBtn.addEventListener('click', e => {
    e.stopPropagation();
    qrModal.classList.add('open');
    generarQR();
    refreshIcons();
  });

  // Cerrar al hacer clic fuera del contenido
  qrModal.addEventListener('click', e => {
    if (e.target === qrModal) qrModal.classList.remove('open');
  });

  // Botón cerrar dentro del modal
  qrModal.querySelector('.modal-close')?.addEventListener('click', () => {
    qrModal.classList.remove('open');
  });

  // Descargar vCard
  const vcfBtn = document.getElementById('download-vcf-btn');
  if (vcfBtn) {
    vcfBtn.addEventListener('click', () => {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Azul Ruiz',
        'TEL;TYPE=CELL:+54 9 351 206-2487',
        'EMAIL;TYPE=INTERNET:azulmartinaruizf@gmail.com',
        'URL:https://www.linkedin.com/in/azul-ruiz',
        'END:VCARD',
      ].join('\r\n');
      const blob = new Blob([vcard], { type: 'text/vcard' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'Azul_Ruiz.vcf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      mostrarToast('Contacto guardado en .vcf');
    });
  }
}

function generarQR() {
  if (qrGenerado) return;
  const contenedor = document.getElementById('qr-code');
  if (!contenedor) return;
  if (!window.QRCode) {
    contenedor.innerHTML = '<p class="text-xs text-gray-400">No se pudo cargar el generador QR.</p>';
    return;
  }
  contenedor.innerHTML = '';
  try {
    new window.QRCode(contenedor, {
      text: 'https://www.linkedin.com/in/azul-ruiz',
      width: 160,
      height: 160,
      colorDark: '#1E3A8A',
      colorLight: '#FFFFFF',
      correctLevel: window.QRCode.CorrectLevel.M,
    });
    qrGenerado = true;
  } catch (e) {
    console.error('[QR]', e);
  }
}

// ===========================================
// RENDERIZAR CATÁLOGO
// ===========================================
function renderizarPortafolio() {
  const grid = document.getElementById('catalogo-grid');
  if (!grid || !PORTFOLIO_ITEMS) return;

  const categoriaColores = {
    'gestion-excel':      { bg: 'rgba(37,99,235,0.1)',   color: '#2563EB' },
    'academico-economico':{ bg: 'rgba(16,185,129,0.1)',  color: '#10B981' },
    'oratoria-liderazgo': { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6' },
  };

  const html = PORTFOLIO_ITEMS.map(item => {
    const col = categoriaColores[item.categoria] || { bg: 'rgba(148,163,184,0.1)', color: '#64748B' };
    return `
      <article
        class="catalogo-card flex flex-col h-full p-6 rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-royal)]"
        tabindex="0"
        role="button"
        aria-label="Ver detalles: ${item.titulo}"
        data-id="${item.id}"
        data-categoria="${item.categoria}"
      >
        <span
          class="categoria ${item.categoria} inline-block text-xs font-medium px-2 py-0.5 rounded mb-3"
          style="background:${col.bg};color:${col.color};"
        >${item.etiqueta}</span>
        <h3 class="font-semibold text-[var(--text-primary)] text-base leading-snug line-clamp-2 mb-2">${item.titulo}</h3>
        <p class="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 flex-grow">${item.preview}</p>
      </article>`;
  }).join('');

  grid.innerHTML = html;

  // Eventos de apertura de modal en tarjetas
  grid.querySelectorAll('.catalogo-card').forEach(card => {
    const abrir = () => abrirModalPortafolio(card.dataset.id);
    card.addEventListener('click', abrir);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); } });
  });
}

// ===========================================
// FILTROS DEL CATÁLOGO
// ===========================================
function configurarFiltrosCatalogo() {
  const chips = document.querySelectorAll('[data-category]');
  chips.forEach(chip => {
    chip.addEventListener('click', function () {
      chips.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      filtrarPortafolio(this.dataset.category);
    });
  });
}

function filtrarPortafolio(categoria) {
  const cards = document.querySelectorAll('#catalogo-grid .catalogo-card');
  cards.forEach(card => {
    const visible = categoria === 'todos' || card.dataset.categoria === categoria;
    card.style.display = visible ? '' : 'none';
  });
}

// ===========================================
// MODAL DE PORTAFOLIO DINÁMICO
// ===========================================
function abrirModalPortafolio(itemId) {
  const item = PORTFOLIO_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const m = item.modal || {};
  const titulo      = m.titulo      || item.titulo;
  const descripcion = m.descripcion || item.preview;
  const techs       = (m.tecnologias || []).map(t =>
    `<span class="modal-tag px-2 py-0.5 rounded text-xs font-medium bg-[var(--border-light)] text-[var(--text-primary)]">${t}</span>`
  ).join('');

  // Eliminar modal previo si existe
  document.querySelectorAll('.modal-dinamico').forEach(m => m.remove());

  const wrapper = document.createElement('div');
  wrapper.className = 'modal-dinamico modal-overlay open';
  wrapper.setAttribute('role', 'dialog');
  wrapper.setAttribute('aria-modal', 'true');
  wrapper.setAttribute('aria-labelledby', 'modal-dyn-title');
  wrapper.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Cerrar modal">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
      <div class="modal-detail">
        <h3 id="modal-dyn-title" class="text-xl font-bold text-[var(--text-primary)] mb-3">${titulo}</h3>
        <p class="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">${descripcion}</p>
        <div class="modal-tags flex flex-wrap gap-2 mt-3">${techs}</div>
      </div>
    </div>`;

  document.body.appendChild(wrapper);
  refreshIcons();

  wrapper.querySelector('.modal-close').addEventListener('click', () => wrapper.remove());
  wrapper.addEventListener('click', e => { if (e.target === wrapper) wrapper.remove(); });
}

// ===========================================
// RENDERIZAR SIMULADOR EXCEL
// ===========================================
const ESTADO_META = {
  correcto:     { label: '✅ Pago correcto',     cls: 'text-emerald-600', filtro: 'correcto'     },
  diferencia:   { label: '⚠️ Diferencia en PDF', cls: 'text-amber-600',   filtro: 'diferencia'   },
  verificacion: { label: '🔍 En verificación',   cls: 'text-blue-600',    filtro: 'verificacion' },
};

function renderizarSimulador() {
  const tbody = document.querySelector('#simulator tbody');
  if (!tbody || !simuladorExcel) return;

  const filas = simuladorExcel.datos.map(fila => {
    const meta = ESTADO_META[fila.estado] || { label: fila.estado, cls: '', filtro: fila.estado };
    return `
      <tr class="border-b border-[var(--border-light)] hover:bg-[var(--border-light)]/30 transition-colors" data-estado="${fila.estado}">
        <td class="p-3 text-sm font-medium text-[var(--text-primary)]">${fila.entidad}</td>
        <td class="p-3 text-sm text-[var(--text-secondary)]">${fila.periodo}</td>
        <td class="p-3 text-sm font-mono text-right">${fila.pacientes}</td>
        <td class="p-3 text-sm font-mono text-right">${formatARS(fila.arancel)}</td>
        <td class="p-3 text-sm font-mono text-right">${formatARS(fila.total_esperado)}</td>
        <td class="p-3 text-sm font-mono text-right">${formatARS(fila.total_pdf)}</td>
        <td class="p-3 text-sm font-medium ${meta.cls}">${meta.label}</td>
      </tr>`;
  }).join('');

  tbody.innerHTML = filas;
  actualizarResumenSimulador();
}

function actualizarResumenSimulador(filtroActivo) {
  const filas = document.querySelectorAll('#simulator tbody tr');
  let totalEsperado = 0;
  let totalPDF      = 0;
  let totalFilas    = 0;
  let filasCorrecto = 0;

  filas.forEach(fila => {
    if (fila.style.display === 'none') return;
    totalFilas++;
    const celdas = fila.querySelectorAll('td');
    if (celdas.length < 6) return;

    const parseCell = (td) => {
      const raw = td.textContent.replace(/[^0-9,]/g, '').replace(',', '.');
      return parseFloat(raw) || 0;
    };

    totalEsperado += parseCell(celdas[4]);
    totalPDF      += parseCell(celdas[5]);

    if (fila.dataset.estado === 'correcto') filasCorrecto++;
  });

  const diferencia = totalPDF - totalEsperado;
  const pctCorrecto = totalFilas > 0 ? Math.round((filasCorrecto / totalFilas) * 100) : 0;

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('total-esperado',   formatARS(totalEsperado));
  setEl('total-informado',  formatARS(totalPDF));
  setEl('total-diferencia', formatARS(diferencia));
  setEl('pct-correcto',     pctCorrecto + '%');
}

// ===========================================
// FILTROS DEL SIMULADOR
// ===========================================
function configurarFiltrosSimulador() {
  const chips = document.querySelectorAll('[data-filter]');
  chips.forEach(chip => {
    chip.addEventListener('click', function () {
      chips.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      filtrarSimulador(this.dataset.filter);
    });
  });
}

function filtrarSimulador(filtro) {
  const filas = document.querySelectorAll('#simulator tbody tr');
  filas.forEach(fila => {
    const visible = filtro === 'all' || fila.dataset.estado === filtro;
    fila.style.display = visible ? '' : 'none';
  });
  actualizarResumenSimulador(filtro);
}

function filtrarSimuladorPorBusqueda(termino) {
  const filas = document.querySelectorAll('#simulator tbody tr');
  filas.forEach(fila => {
    const match = fila.textContent.toLowerCase().includes(termino);
    fila.style.display = match ? '' : 'none';
  });
  actualizarResumenSimulador();
}

// ===========================================
// INTERSECTION OBSERVER (con fallbacks)
// ===========================================
function configurarIntersectionObserver() {
  const elementos = document.querySelectorAll('.reveal');
  if (!elementos.length) return;

  // Si no hay soporte, mostrar todo
  if (!('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }

  // Respetar prefers-reduced-motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elementos.forEach(el => observer.observe(el));
}

// ===========================================
// NAVBAR SCROLL
// ===========================================
function configurarNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const cur = window.pageYOffset;
    navbar.style.transform = (cur > lastScroll && cur > 80) ? 'translateY(-100%)' : 'translateY(0)';
    lastScroll = cur;
  }, { passive: true });
}

// ===========================================
// TOAST NOTIFICATION
// ===========================================
function mostrarToast(msg) {
  const toast        = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;
  toastMessage.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => ocultarToast(), 3500);
}

function ocultarToast() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('show');
}