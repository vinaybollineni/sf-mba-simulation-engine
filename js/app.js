/* =============================================
   Stanford MBA Simulation Engine — App Logic
   ============================================= */

// ---- Mobile Nav ----
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Quarter accordion
  document.querySelectorAll('.quarter-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('open');

      document.querySelectorAll('.quarter-header').forEach(h => {
        h.classList.remove('open');
        if (h.nextElementSibling) h.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        header.classList.add('open');
        if (body) body.classList.add('open');
      }
    });
  });

  // Open first quarter by default
  const firstHeader = document.querySelector('.quarter-header');
  if (firstHeader) {
    firstHeader.classList.add('open');
    const firstBody = firstHeader.nextElementSibling;
    if (firstBody) firstBody.classList.add('open');
  }

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs').dataset.group;
      const target = btn.dataset.tab;

      document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.tab-content[data-group="${group}"]`).forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = document.querySelector(`.tab-content[data-group="${group}"][data-tab="${target}"]`);
      if (content) content.classList.add('active');
    });
  });

  // Task checkboxes
  document.querySelectorAll('.task-check').forEach(check => {
    check.addEventListener('click', () => {
      check.classList.toggle('done');
      if (check.classList.contains('done')) {
        check.textContent = '✓';
      } else {
        check.textContent = '';
      }
      updateProgress();
    });
  });

  // Progress bars animation
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const width = bar.dataset.width || '0';
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 300);
  });

  // Course filter
  const filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.course-card').forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Initialize progress
  updateProgress();
  animateNumbers();
});

function updateProgress() {
  const total = document.querySelectorAll('.task-check').length;
  const done = document.querySelectorAll('.task-check.done').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const indicator = document.getElementById('week-progress');
  if (indicator) {
    indicator.textContent = `${done}/${total} tasks (${pct}%)`;
  }

  const weekBar = document.getElementById('week-progress-bar');
  if (weekBar) {
    weekBar.style.width = pct + '%';
  }
}

function animateNumbers() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ---- Local Storage Progress Tracking ----
const STORAGE_KEY = 'mba_progress_v1';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function markCourseComplete(courseId) {
  const progress = loadProgress();
  progress[courseId] = { completed: true, date: new Date().toISOString() };
  saveProgress(progress);
}

function getCourseProgress(courseId) {
  const progress = loadProgress();
  return progress[courseId] || {};
}

// ---- Week counter ----
function getCurrentWeek() {
  const startDate = new Date('2026-05-04');
  const today = new Date();
  const diff = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, diff + 1);
}

document.querySelectorAll('.current-week').forEach(el => {
  el.textContent = getCurrentWeek();
});

// ---- Days until deadline ----
document.querySelectorAll('[data-deadline]').forEach(el => {
  const deadline = new Date(el.dataset.deadline);
  const today = new Date();
  const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  el.textContent = days > 0 ? `${days} days left` : 'Overdue';
  if (days <= 3) el.style.color = '#C62828';
  else if (days <= 7) el.style.color = '#E65100';
});

// ---- Auto-wire "Open Course →" buttons on curriculum page ----
document.querySelectorAll('.course-card').forEach(card => {
  const codeEl = card.querySelector('.course-code');
  const metaEl = card.querySelector('.course-meta');
  if (!codeEl || !metaEl) return;

  // Skip cards that already have a button (e.g. ACCT 101 has its own dedicated page)
  if (metaEl.querySelector('.btn')) return;

  const rawCode = codeEl.textContent.trim();           // "STAT 102"
  const urlCode = rawCode.replace(/\s+/g, '');         // "STAT102"

  // Remove the placeholder badge (Quarter 2, Year 2, etc.)
  const badge = metaEl.querySelector('.badge');
  if (badge) badge.remove();

  const btn = document.createElement('a');
  btn.href = `courses/${urlCode.toLowerCase()}.html`;
  btn.className = 'btn btn-primary';
  btn.style.cssText = 'font-size:12px; padding:6px 12px;';
  btn.textContent = 'Open Course →';
  metaEl.appendChild(btn);
});
