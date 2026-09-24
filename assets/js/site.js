/* Product Starter: small helpers for the whole site.
   Progress and theme are stored in the reader's own browser (localStorage). */
(function () {
  var PS = window.PS || { lessons: [] };
  var lessons = (PS.lessons || []).filter(function (l) { return l.day > 0; }).sort(function (a, b) { return a.day - b.day; });
  var byDay = {}; lessons.forEach(function (l) { byDay[l.day] = l; });

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('ps.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('ps.' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var done = store.get('done', []);
  function isDone(d) { return done.indexOf(d) !== -1; }
  function todayDay() { for (var i = 0; i < lessons.length; i++) if (!isDone(lessons[i].day)) return lessons[i].day; return null; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ic(name) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  var CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- progress UI ---------- */
  function progressHTML() {
    var n = done.length;
    return '<div class="progress"><div class="progress-label"><span>Your progress · 100 Days of Product</span><b>' + n + ' / 100</b></div>' +
      '<div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + n + '" aria-label="Days completed"><div class="fill" style="width:' + n + '%"></div></div></div>';
  }
  function trackerHTML() {
    var t = todayDay(), cells = '';
    for (var i = 1; i <= 100; i++) {
      var l = byDay[i], st = isDone(i) ? 'done' : i === t ? 'today' : '';
      var label = 'Day ' + i + (l ? ': ' + l.title : ' (coming soon)') + (st ? ' · ' + st : '');
      cells += l ? '<a class="dot ' + st + '" href="' + l.url + '" title="' + esc(label) + '" aria-label="' + esc(label) + '">' + (st === 'done' ? CHECK : '') + '</a>'
                 : '<span class="dot locked" title="' + esc(label) + '"></span>';
    }
    return '<div class="tracker" role="group" aria-label="' + done.length + ' of 100 days done">' + cells + '</div>' +
      '<div class="legend"><span><i class="done"></i>Done</span><span><i class="today"></i>Today</span><span><i></i>Upcoming</span></div>';
  }
  function paintProgress() {
    document.querySelectorAll('[data-progress]').forEach(function (el) { el.innerHTML = progressHTML(); });
    document.querySelectorAll('[data-tracker]').forEach(function (el) { el.innerHTML = trackerHTML(); });
    var t = todayDay();
    document.querySelectorAll('[data-day]').forEach(function (card) {
      var slot = card.querySelector('[data-status]'); if (!slot) return;
      var d = parseInt(card.getAttribute('data-day'), 10);
      slot.innerHTML = isDone(d) ? '<span class="badge badge-done">' + ic('done') + 'Done</span>' : d === t ? '<span class="badge badge-today">Today</span>' : '';
    });
    var panel = document.querySelector('[data-today-panel]');
    if (panel) {
      var tl = t ? byDay[t] : null;
      panel.innerHTML = '<span class="eyebrow">Your 100 days</span>' + (tl
        ? '<h2>Today: <mark>Day ' + tl.day + '</mark></h2><p class="muted">' + esc(tl.title) + ' · ' + tl.minutes + ' min</p><div class="actions"><a class="btn btn-primary" href="' + tl.url + '">Open today\'s lesson</a><a class="btn btn-ghost" href="' + (PS.daysUrl || '#') + '">All lessons</a></div>'
        : '<h2>All available lessons done</h2><p class="muted">New days are on the way.</p>') + progressHTML();
    }
    var cont = document.querySelector('[data-continue]');
    if (cont && done.length && t) { cont.href = byDay[t].url; cont.innerHTML = 'Continue with Day ' + t + ic('arrow'); }
    document.querySelectorAll('[data-done-bar]').forEach(function (bar) {
      var d = parseInt(bar.getAttribute('data-day'), 10);
      bar.innerHTML = isDone(d)
        ? '<span class="badge badge-done">' + ic('done') + 'Done</span><span class="muted" style="flex:1">Nice work. Day ' + d + ' is on your tracker.</span><button class="btn btn-ghost btn-sm" type="button" data-toggle-done="' + d + '">Mark as not done</button>'
        : '<span style="flex:1">Finished reading?</span><button class="btn btn-primary" type="button" data-toggle-done="' + d + '">' + ic('done') + 'Mark Day ' + d + ' as done</button>';
    });
  }

  document.addEventListener('click', function (e) {
    var tg = e.target.closest('[data-toggle-done]');
    if (tg) {
      var d = parseInt(tg.getAttribute('data-toggle-done'), 10);
      done = isDone(d) ? done.filter(function (x) { return x !== d; }) : done.concat([d]);
      store.set('done', done); paintProgress();
      var again = document.querySelector('[data-toggle-done]'); if (again) again.focus();
      return;
    }
    var f = e.target.closest('[data-filter]');
    if (f) {
      var name = f.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === f)); });
      document.querySelectorAll('[data-module]').forEach(function (m) { m.hidden = name !== 'All' && m.getAttribute('data-module') !== name; });
      return;
    }
    var t = e.target.closest('[data-template]');
    if (t) openTemplate(t.getAttribute('data-template'), t);
  });

  /* ---------- newsletter (only when no newsletter_url is set) ---------- */
  var nl = document.getElementById('nlForm');
  if (nl) {
    var inp = document.getElementById('nlEmail'), msg = document.getElementById('nlMsg');
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim())) { inp.setAttribute('aria-invalid', 'true'); msg.className = 'help err'; msg.textContent = 'Enter an email address like name@example.com.'; inp.focus(); return; }
      inp.removeAttribute('aria-invalid'); msg.className = 'help';
      msg.textContent = 'Sign-ups are not connected yet. Add your newsletter link in _config.yml to start collecting emails.';
    });
    inp.addEventListener('input', function () { if (inp.getAttribute('aria-invalid')) { inp.removeAttribute('aria-invalid'); msg.textContent = ''; } });
  }

  /* ---------- template preview ---------- */
  var modalRoot = document.getElementById('modalRoot'), lastFocus = null;
  function openTemplate(id, from) {
    var tpl = document.getElementById('tpl-' + id); if (!tpl) return;
    lastFocus = from;
    modalRoot.innerHTML = '<div class="scrim" data-close><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">' +
      '<div class="modal-head"><div style="display:grid;gap:4px"><span class="eyebrow">' + esc(tpl.dataset.format) + ' template</span><h2 id="mTitle" style="font-size:24px">' + esc(tpl.dataset.title) + '</h2></div>' +
      '<button class="iconbtn" type="button" data-close aria-label="Close"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg></button></div>' +
      '<p class="muted">' + esc(tpl.dataset.desc) + ' Copy it into Google Docs, Notion or any editor.</p><pre id="tplText"></pre>' +
      '<div class="actions"><button class="btn btn-primary" type="button" id="copyBtn">' + ic('template') + 'Copy template</button><span class="help" id="copyMsg" role="status"></span></div></div></div>';
    document.getElementById('tplText').textContent = tpl.content ? tpl.content.textContent : tpl.textContent;
    document.getElementById('copyBtn').focus();
  }
  function closeModal() { modalRoot.innerHTML = ''; if (lastFocus) lastFocus.focus(); }
  modalRoot.addEventListener('click', function (e) {
    if (e.target.closest('#copyBtn')) {
      var pre = document.getElementById('tplText'), msg = document.getElementById('copyMsg');
      var fallback = function () { var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); msg.textContent = 'Text selected. Press Ctrl+C (or ⌘C) to copy.'; };
      try { navigator.clipboard.writeText(pre.textContent).then(function () { msg.textContent = 'Copied to your clipboard.'; }, fallback); } catch (err) { fallback(); }
      return;
    }
    if (e.target.hasAttribute('data-close') || e.target.closest('button[data-close]')) closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalRoot.innerHTML) closeModal(); });

  /* ---------- menu + theme ---------- */
  var menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', function () {
    var n = document.getElementById('nav'), open = !n.classList.contains('open');
    n.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  var root = document.documentElement, themeBtn = document.getElementById('themeBtn');
  function isDark() { var s = root.getAttribute('data-theme'); return s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function paintThemeBtn() { var d = isDark(); themeBtn.innerHTML = ic(d ? 'sun' : 'moon'); themeBtn.setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode'); }
  themeBtn.addEventListener('click', function () { var next = isDark() ? 'light' : 'dark'; root.setAttribute('data-theme', next); store.set('theme', next); paintThemeBtn(); });
  try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintThemeBtn); } catch (e) {}
  paintThemeBtn();
  paintProgress();
})();
