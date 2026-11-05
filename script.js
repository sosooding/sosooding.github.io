// Live Sydney clock in the nav
(function () {
  var el = document.getElementById('clock');
  if (!el) return;
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  } catch (e) { return; }
  function tick() { el.textContent = fmt.format(new Date()); }
  tick();
  setInterval(tick, 1000);
})();

// Project rows: one open at a time
(function () {
  var rows = document.querySelectorAll('.project');
  rows.forEach(function (row) {
    var btn = row.querySelector('.prow');
    var body = row.querySelector('.pbody');
    var sign = row.querySelector('.sign');
    btn.addEventListener('click', function () {
      var isOpen = row.getAttribute('data-open') === 'true';
      rows.forEach(function (r) {
        r.setAttribute('data-open', 'false');
        r.querySelector('.prow').setAttribute('aria-expanded', 'false');
        r.querySelector('.pbody').hidden = true;
        r.querySelector('.sign').textContent = '+';
      });
      if (!isOpen) {
        row.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
        body.hidden = false;
        sign.textContent = '−';
      }
    });
  });
})();

// Stack filter
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  var tools = document.querySelectorAll('#tools span');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      tools.forEach(function (t) {
        var on = f === 'all' || t.getAttribute('data-group') === f;
        t.classList.toggle('off', !on);
      });
    });
  });
})();
