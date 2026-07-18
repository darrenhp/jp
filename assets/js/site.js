/* ============================================================
   日本語の世界 — 子页面共享脚本
   职责：构建左侧边栏（模块导航 + 页内目录）、移动端抽屉、
        页内锚点 scrollspy、点击朗读（日文）、发音页假名网格渲染
   ============================================================ */
(function () {
  "use strict";

  var SITE_MODULES = [
    { id: "history",       title: "起源与历史", en: "History",       icon: "📜", file: "history.html" },
    { id: "writing",       title: "文字系统",   en: "Writing",       icon: "あ",  file: "writing.html" },
    { id: "grammar",       title: "语法体系",   en: "Grammar",       icon: "文",  file: "grammar.html" },
    { id: "pronunciation", title: "读法与发音", en: "Phonetics",     icon: "ん",  file: "pronunciation.html" },
    { id: "phrases",       title: "日常用语",   en: "Phrases",       icon: "💬", file: "phrases.html" },
    { id: "input",         title: "输入法",     en: "Input",         icon: "⌨",  file: "input.html" },
    { id: "jlpt",          title: "JLPT 等级",  en: "JLPT",          icon: "🎯", file: "jlpt.html" },
    { id: "music",         title: "音乐文化",   en: "Music",         icon: "♪",  file: "music.html" },
    { id: "culture",       title: "文化关联",   en: "Culture",       icon: "🌸", file: "culture.html" },
    { id: "resources",     title: "学习资源",   en: "Resources",     icon: "📚", file: "resources.html" }
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- 顶部横幅：模块导航 ---------- */
  function buildTopnav() {
    var tn = document.getElementById("topnav");
    if (!tn) return;
    var cur = document.body.getAttribute("data-module");
    var brand = el("a", "tn-brand",
      '<span class="brand-mark">日</span><span>日本語の世界</span>');
    brand.href = "../index.html";
    tn.appendChild(brand);
    var nav = el("nav", "tn-nav");
    SITE_MODULES.forEach(function (m) {
      var a = el("a", "tn-mod" + (m.id === cur ? " active" : ""),
        '<span class="mc-ic">' + m.icon + "</span><span>" + m.title + "</span>");
      a.href = m.file;
      nav.appendChild(a);
    });
    tn.appendChild(nav);
    var home = el("a", "tn-home", "导图首页");
    home.href = "../index.html";
    tn.appendChild(home);
  }

  /* ---------- 标签切换（子模块） ---------- */
  function initTabs() {
    var roots = document.querySelectorAll(".tabs");
    Array.prototype.forEach.call(roots, function (root) {
      var btns = root.querySelectorAll(".tab-btn");
      var panels = root.querySelectorAll(".tab-panel");
      Array.prototype.forEach.call(btns, function (btn) {
        btn.addEventListener("click", function () {
          var tab = btn.getAttribute("data-tab");
          Array.prototype.forEach.call(btns, function (b) { b.classList.remove("active"); });
          Array.prototype.forEach.call(panels, function (p) { p.classList.remove("active"); });
          btn.classList.add("active");
          var panel = root.querySelector('.tab-panel[data-panel="' + tab + '"]');
          if (panel) panel.classList.add("active");
        });
      });
    });
  }
  // 若某元素位于被隐藏的 tab-panel 内，先切到对应标签再滚动
  function activateTabForTarget(target) {
    if (!target) return;
    var node = target, panel = null;
    while (node && node !== document.body) {
      if (node.classList && node.classList.contains("tab-panel")) { panel = node; break; }
      node = node.parentElement;
    }
    if (!panel) return;
    var root = panel.parentElement;
    if (!root) return;
    var name = panel.getAttribute("data-panel");
    var btn = null;
    var btns = root.querySelectorAll(".tab-btn");
    Array.prototype.forEach.call(btns, function (b) {
      if (b.getAttribute("data-tab") === name) btn = b;
    });
    if (btn && !btn.classList.contains("active")) btn.click();
  }
  function buildSidebar() {
    var sb = document.getElementById("sidebar");
    if (!sb) return;
    sb.innerHTML = "";
    var heads = document.querySelectorAll(".content h2, .content h3");
    if (heads.length) {
      var auto = 0;
      Array.prototype.forEach.call(heads, function (h) {
        if (!h.id) { h.id = "sec-" + (++auto); }
      });
      sb.appendChild(el("div", "sb-label", "本页目录"));
      var tocBox = el("div", "sb-toc");
      Array.prototype.forEach.call(heads, function (h) {
        var a = el("a", h.tagName === "H3" ? "lvl3" : "",
          h.getAttribute("data-toc") || h.textContent);
        a.href = "#" + h.id;
        a.dataset.target = h.id;
        a.addEventListener("click", function (e) {
          e.preventDefault();
          var target = document.getElementById(h.id);
          activateTabForTarget(target);
          if (target) setTimeout(function () {
            if (target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 40);
        });
        tocBox.appendChild(a);
      });
      sb.appendChild(tocBox);
    }
    sb.appendChild(el("div", "sb-foot",
      '和风日语综览 · 内容仅供学习参考<br><a href="../index.html">← 返回知识导图首页</a>'));
  }

  /* ---------- 页内锚点 scrollspy ---------- */
  function initScrollspy() {
    var heads = document.querySelectorAll(".content h2[id], .content h3[id]");
    var links = document.querySelectorAll(".sb-toc a");
    if (!heads.length || !links.length) return;
    function setActive(id) {
      links.forEach(function (a) {
        a.classList.toggle("active", a.dataset.target === id);
      });
    }
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---------- 移动端抽屉 ---------- */
  function initMobile() {
    var sb = document.getElementById("sidebar");
    var tog = document.getElementById("sidebarToggle");
    var ov = document.getElementById("sbOverlay");
    if (!sb || !tog) return;
    function close() { sb.classList.remove("open"); if (ov) ov.classList.remove("show"); }
    tog.addEventListener("click", function () {
      sb.classList.toggle("open");
      if (ov) ov.classList.toggle("show", sb.classList.contains("open"));
    });
    if (ov) ov.addEventListener("click", close);
    sb.addEventListener("click", function (e) {
      if (e.target.tagName === "A") close();
    });
  }

  /* ---------- 朗读 ---------- */
  var synth = window.speechSynthesis || null;
  function speak(text) {
    if (!synth || !text) return;
    try { synth.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP"; u.rate = 0.9; u.pitch = 1;
    var voices = synth.getVoices ? synth.getVoices() : [];
    for (var i = 0; i < voices.length; i++) {
      if (/ja/i.test(voices[i].lang)) { u.voice = voices[i]; break; }
    }
    synth.speak(u);
  }
  function initAudio() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-speak]");
      if (t) { e.preventDefault(); speak(t.getAttribute("data-speak") || t.textContent.trim()); }
    });
  }

  /* ---------- 发音页：假名网格 ---------- */
  function kanaCell(jp, romaji, cn) {
    var c = el("div", "kana-cell",
      '<div class="kc-jp">' + jp + "</div>" +
      (romaji ? '<div class="kc-ro">' + romaji + "</div>" : "") +
      (cn ? '<div class="kc-cn">' + cn + "</div>" : ""));
    c.setAttribute("data-speak", jp);
    return c;
  }
  function renderKana() {
    if (!window.JP_DATA) return;
    var D = window.JP_DATA;

    // 清音
    var seion = document.getElementById("kanaSeion");
    if (seion && D.gojuonRows && D.gojuonRomaji) {
      D.gojuonRows.forEach(function (row, ri) {
        var rom = D.gojuonRomaji[ri];
        seion.appendChild(el("div", "kana-row-label", rowLabel(row.row)));
        row.cells.forEach(function (k, ci) {
          if (!k) return;
          seion.appendChild(kanaCell(k, rom.cells[ci]));
        });
      });
    }

    // 浊音 / 半浊音
    var dak = document.getElementById("kanaDakuon");
    if (dak && D.dakuon) {
      D.dakuon.forEach(function (row) {
        dak.appendChild(el("div", "kana-row-label", rowLabel(row.row)));
        row.cells.forEach(function (k, ci) {
          if (!k) return;
          dak.appendChild(kanaCell(k, row.romaji[ci]));
        });
      });
    }

    // 拗音
    var yoon = document.getElementById("kanaYoon");
    if (yoon && D.yoon) {
      D.yoon.forEach(function (grp) {
        yoon.appendChild(el("div", "kana-row-label", grp.label));
        grp.cells.forEach(function (pair, ci) {
          var parts = pair.split(" ");
          var hi = parts[0], ka = parts[1] || "";
          var txt = hi + (ka ? " " + ka : "");
          var c = kanaCell(txt, grp.romaji[ci]);
          yoon.appendChild(c);
        });
      });
    }

    // 特殊发音卡片
    var sp = document.getElementById("kanaSpecial");
    if (sp && D.specialPron) {
      D.specialPron.forEach(function (s) {
        var card = el("div", "callout tip",
          '<span class="ct">' + s.title + ' <span class="jp">' + s.jp + "</span></span>" + s.desc);
        card.setAttribute("data-speak", s.jp.replace(/[ぁ-んァ-ヶ]/g, function (m) { return m; }).slice(0, 3));
        sp.appendChild(card);
      });
    }

    // 声调 / 语音现象
    var ac = document.getElementById("kanaAccent");
    if (ac && D.accent) {
      D.accent.forEach(function (a) {
        ac.appendChild(el("div", "callout note",
          '<span class="ct">' + a.h + " <small>" + a.p + "</small></span>" + a.d));
      });
    }
  }

  function rowLabel(r) {
    var map = {
      a: "あ段", ka: "か段", sa: "さ段", ta: "た段", na: "な段",
      ha: "は段", ma: "ま段", ya: "や段", ra: "ら段", wa: "わ段", n: "ん行",
      ga: "が行", za: "ざ行", da: "だ行", ba: "ば行", pa: "ぱ行"
    };
    return map[r] || r;
  }

  /* ---------- 数据驱动板块渲染 ---------- */
  function renderPhrases() {
    var box = document.getElementById("phraseScenes");
    if (!box || !window.JP_DATA || !D_phrases()) return;
    var list = window.JP_DATA.phrases;
    list.forEach(function (scene, i) {
      var sec = el("section"); sec.id = "scene-" + i;
      var h2 = el("h2", "", scene.scene + ' <span class="romaji">' + scene.icon + "</span>");
      h2.id = "scene-" + i; sec.appendChild(h2);
      var grid = el("div", "phrase-grid");
      scene.items.forEach(function (it) {
        grid.appendChild(el("div", "phrase-card",
          '<div class="pc-jp jp" data-speak="' + it.jp + '">' + it.jp + "</div>" +
          '<div class="pc-ro">' + it.kana + "</div>" +
          '<div class="pc-cn">' + it.cn + "</div>"));
      });
      sec.appendChild(grid); box.appendChild(sec);
    });
  }
  function D_phrases() { return window.JP_DATA && window.JP_DATA.phrases; }

  function renderInput() {
    var box = document.getElementById("inputList");
    if (!box || !window.JP_DATA || !window.JP_DATA.input) return;
    window.JP_DATA.input.forEach(function (c) {
      var html = '<h3>' + c.h + "</h3><p>" + c.p + "</p>";
      if (c.ul) html += "<ul>" + c.ul.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      box.appendChild(el("div", "input-card", html));
    });
  }

  /* ---------- 输入法：键盘图示（SVG） ---------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  function svgRoot(w, h) {
    var s = document.createElementNS(SVGNS, "svg");
    s.setAttribute("viewBox", "0 0 " + w + " " + h);
    s.setAttribute("width", "100%");
    s.setAttribute("preserveAspectRatio", "xMidYMid meet");
    s.style.maxWidth = w + "px";
    s.classList.add("kb-svg");
    return s;
  }
  function svgMake(tag, attrs, text) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function svgKeyboard(kb) {
    var UW = 50, UH = 50, GAP = 6, PAD = 12, RAD = 9;
    var rows = kb.rows;
    var totalW = 0;
    rows.forEach(function (r) {
      var w = PAD * 2 + GAP;
      r.forEach(function (k) { w += (k.w || 1) * UW + GAP; });
      totalW = Math.max(totalW, w);
    });
    var totalH = PAD * 2 + rows.length * (UH + GAP);
    var svg = svgRoot(totalW, totalH);
    // 背板
    svg.appendChild(svgMake("rect", { x:0, y:0, width:totalW, height:totalH, rx:16, class:"kb-board" }));
    var y = PAD;
    rows.forEach(function (r) {
      var rowW = GAP;
      r.forEach(function (k) { rowW += (k.w || 1) * UW + GAP; });
      var x = (totalW - rowW) / 2 + GAP;
      r.forEach(function (k) {
        var kw = (k.w || 1) * UW;
        svg.appendChild(svgKey(x, y, kw, UH, k, kb.type, RAD));
        x += kw + GAP;
      });
      y += UH + GAP;
    });
    return svg;
  }
  function svgKey(x, y, w, h, k, type, rad) {
    var g = document.createElementNS(SVGNS, "g");
    var isSpace = /space/i.test(k.t);
    var cls = isSpace ? "kb-rect kb-rect-space" : (type === "kana" ? "kb-rect kb-rect-kana" : "kb-rect kb-rect-qwerty");
    g.appendChild(svgMake("rect", { x:x, y:y, width:w, height:h, rx:rad, class:cls }));
    if (type === "kana") {
      // 假名大写 + 罗马字小注
      g.appendChild(svgMake("text", { x:x + w/2, y:y + h/2 + 7, "text-anchor":"middle", class:"kb-kana" }, k.t));
      if (k.s) g.appendChild(svgMake("text", { x:x + 7, y:y + 16, class:"kb-sub" }, k.s));
    } else {
      g.appendChild(svgMake("text", { x:x + w/2, y:y + h/2 + 6, "text-anchor":"middle", class:"kb-letter" }, isSpace ? "空格 (Space)" : k.t));
    }
    return g;
  }
  function svgMobile(kb) {
    var keys = kb.keys;
    var COLS = 3, UW = 150, UH = 150, GAP = 16, PAD = 16, R = 60;
    var rows = Math.ceil(keys.length / COLS);
    var totalW = PAD * 2 + COLS * UW + (COLS - 1) * GAP;
    var totalH = PAD * 2 + rows * UH + (rows - 1) * GAP;
    var svg = svgRoot(totalW, totalH);
    svg.appendChild(svgMake("rect", { x:0, y:0, width:totalW, height:totalH, rx:22, class:"kb-board kb-board-mobile" }));
    // 方向说明小标
    svg.appendChild(svgMake("text", { x:totalW/2, y:PAD + 4, "text-anchor":"middle", class:"kb-tip" }, "↑い  →う  ↓え  ←お（滑动选择元音）"));
    var startY = PAD + 18;
    keys.forEach(function (key, i) {
      var col = i % COLS, row = Math.floor(i / COLS);
      var cx = PAD + col * (UW + GAP) + UW / 2;
      var cy = startY + row * (UH + GAP) + UH / 2;
      var g = document.createElementNS(SVGNS, "g");
      var ccls = key.special ? "kb-circle kb-circle-special" : "kb-circle";
      g.appendChild(svgMake("circle", { cx:cx, cy:cy, r:R, class:ccls }));
      g.appendChild(svgMake("text", { x:cx, y:cy + 9, "text-anchor":"middle", class:"kb-kana" }, key.c));
      if (key.f) {
        var off = R + 18;
        if (key.f[0]) g.appendChild(svgMake("text", { x:cx, y:cy - off + 5, "text-anchor":"middle", class:"kb-flick" }, key.f[0]));
        if (key.f[1]) g.appendChild(svgMake("text", { x:cx + off, y:cy + 5, "text-anchor":"middle", class:"kb-flick" }, key.f[1]));
        if (key.f[2]) g.appendChild(svgMake("text", { x:cx, y:cy + off + 5, "text-anchor":"middle", class:"kb-flick" }, key.f[2]));
        if (key.f[3]) g.appendChild(svgMake("text", { x:cx - off, y:cy + 5, "text-anchor":"middle", class:"kb-flick" }, key.f[3]));
      }
      svg.appendChild(g);
    });
    return svg;
  }
  function renderKeyboards() {
    var box = document.getElementById("keyboardList");
    if (!box || !window.JP_DATA || !window.JP_DATA.inputKeyboards) return;
    window.JP_DATA.inputKeyboards.forEach(function (kb) {
      var card = el("div", "kb-card");
      card.appendChild(el("h3", "", kb.name));
      card.appendChild(el("p", "kb-desc", kb.desc));
      var wrap = el("div", "kb-svg-wrap");
      wrap.appendChild(kb.type === "mobile" ? svgMobile(kb) : svgKeyboard(kb));
      card.appendChild(wrap);
      if (kb.example) card.appendChild(el("p", "kb-example", kb.example));
      box.appendChild(card);
    });
  }

  function renderJLPT() {
    var box = document.getElementById("jlptList");
    if (!box || !window.JP_DATA || !window.JP_DATA.jlpt) return;
    window.JP_DATA.jlpt.forEach(function (c) {
      var tags = (c.tags || []).map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("");
      box.appendChild(el("div", "jlpt-card",
        '<div class="jc-lv" style="background:' + c.color + '">' + c.lv + "</div>" +
        '<h3>' + c.title + ' <small>' + c.vocab + "</small></h3>" +
        "<p>" + c.desc + "</p><div class='jc-tags'>" + tags + "</div>"));
    });
  }

  function renderMusic() {
    var box = document.getElementById("musicList");
    if (!box || !window.JP_DATA || !window.JP_DATA.music) return;
    window.JP_DATA.music.forEach(function (c) {
      box.appendChild(el("div", "music-card",
        '<div class="mc-emoji">' + c.emoji + "</div>" +
        "<h3>" + c.h + ' <span class="jp">' + c.jp + "</span></h3>" +
        "<p>" + c.p + "</p><div class='mc-artists'>" + c.artists + "</div>"));
    });
  }

  function renderCulture() {
    var box = document.getElementById("cultureList");
    if (!box || !window.JP_DATA || !window.JP_DATA.culture) return;
    window.JP_DATA.culture.forEach(function (c) {
      var words = (c.words || []).map(function (w) { return '<span class="tag">' + w + "</span>"; }).join("");
      box.appendChild(el("div", "culture-card",
        '<div class="cc-ico">' + c.ico + "</div>" +
        "<h3>" + c.h + ' <span class="jp">' + c.jp + "</span></h3>" +
        "<p>" + c.p + "</p><div class='cc-words'>" + words + "</div>"));
    });
  }

  function renderResources() {
    var box = document.getElementById("resList");
    if (!box || !window.JP_DATA || !window.JP_DATA.resources) return;
    window.JP_DATA.resources.forEach(function (c) {
      var html = "<h3>" + c.h + "</h3><ul>" + c.ul.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      box.appendChild(el("div", "res-col", html));
    });
  }

  /* ---------- 启动 ---------- */
  function init() {
    // 先渲染数据驱动板块（会生成 h2/h3），再据此构建侧边栏目录
    renderKana();
    renderPhrases();
    renderInput();
    renderKeyboards();
    renderJLPT();
    renderMusic();
    renderCulture();
    renderResources();
    buildTopnav();
    initTabs();
    buildSidebar();
    initScrollspy();
    initMobile();
    initAudio();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
