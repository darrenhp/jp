/* ============================================================
   日本語の世界 — 交互逻辑
   ============================================================ */
(function () {
  "use strict";
  const D = window.JP_DATA;
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  /* ---------- 语音合成 ---------- */
  const synth = window.speechSynthesis || null;
  function speak(text, node) {
    if (!synth || !text) {
      if (node) flash(node, true);
      return;
    }
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      u.rate = 0.92;
      u.pitch = 1.0;
      const voices = synth.getVoices();
      const ja = voices.find((v) => /ja[-_]JP/i.test(v.lang) || /^ja/i.test(v.lang));
      if (ja) u.voice = ja;
      if (node) {
        node.classList.add("playing");
        u.onend = u.onerror = () => node.classList.remove("playing");
      }
      synth.speak(u);
    } catch (e) {
      if (node) flash(node, true);
    }
  }
  function flash(node) {
    node.classList.add("playing");
    setTimeout(() => node.classList.remove("playing"), 450);
  }

  /* ---------- 1. 历史时间线 ---------- */
  function renderHistory() {
    const wrap = $("#historyTimeline");
    D.history.forEach((h) => {
      const item = el("div", "tl-item");
      item.innerHTML = `
        <span class="tl-dot"></span>
        <div class="tl-era">${h.era}<span class="tl-year">${h.year}</span></div>
        <div class="tl-card"><h4>${h.title}</h4><p>${h.desc}</p></div>`;
      wrap.appendChild(item);
    });
  }

  /* ---------- 2. 假名网格（平/片） ---------- */
  function kanaMap(kanaRows, romajiRows) {
    const m = {};
    kanaRows.forEach((r, i) =>
      r.cells.forEach((c, j) => {
        if (c && !c.startsWith("(")) m[c] = romajiRows[i].cells[j];
      })
    );
    return m;
  }
  function renderKanaGrid(container, kanaRows, romajiRows) {
    const map = kanaMap(kanaRows, romajiRows);
    Object.keys(map).forEach((k) => {
      const r = map[k];
      const stroke = D.kanaStroke[k] ? `<span class="stroke">${D.kanaStroke[k]}画</span>` : "";
      const cell = el("div", "kana-cell");
      cell.innerHTML = `<span class="play">🔊</span><div class="k">${k}</div><div class="r">${r}</div>${stroke}`;
      cell.addEventListener("click", () => speak(k, cell));
      container.appendChild(cell);
    });
  }
  function renderKanji() {
    const g = $("#kanjiGrid");
    D.kanji.forEach((k) => {
      const c = el("div", "kanji-cell");
      c.innerHTML = `<div class="ch">${k.ch}</div>
        <div class="on">音読み：<b>${k.on}</b></div>
        <div class="kun">訓読み：<b>${k.kun}</b></div>
        <div class="ex">${k.ex}</div>`;
      g.appendChild(c);
    });
  }
  function renderRomaji() {
    const t = $("#romajiTable");
    let rows = D.romaji
      .map((r) => `<tr><td>${r.col}</td><td>${r.hepb}</td><td>${r.kun}</td><td>${r.ex}</td></tr>`)
      .join("");
    t.innerHTML = `<table><thead><tr><th>音节</th><th>平文式(Hepburn)</th><th>训令式</th><th>对应假名</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  /* ---------- 3. 语法 ---------- */
  function renderGrammar() {
    const g = $("#grammarCards");
    D.grammar.forEach((c) => {
      const card = el("div", "flip-card");
      card.innerHTML = `
        <div class="flip-inner">
          <div class="flip-front">
            <div class="gf-ico">${c.ico}</div>
            <h4>${c.title}</h4><div class="gf-jp">${c.jp}</div>
            <div class="gf-hint">${c.front} · 悬停翻转 ↻</div>
          </div>
          <div class="flip-back">
            <p>${c.back}</p>
            <div class="ex">例：${c.ex}</div>
          </div>
        </div>`;
      g.appendChild(card);
    });
    const t = $("#conjugationTable");
    let rows = D.conjugation
      .map((c) => `<tr><td>${c.form}</td><td>${c.ex}</td><td>${c.use}</td></tr>`)
      .join("");
    t.innerHTML = `<table><thead><tr><th>活用形</th><th>例（書く）</th><th>用途</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  /* ---------- 4. 发音表 ---------- */
  const rowLabel = {
    a: "あ行", ka: "か行", sa: "さ行", ta: "た行", na: "な行", ha: "は行",
    ma: "ま行", ya: "や行", ra: "ら行", wa: "わ行", n: "ん"
  };
  function buildGojuon(kanaRows, romajiRows) {
    const grid = el("div");
    grid.style.display = "contents";
    // header
      grid.appendChild(el("div", "gh", "段"));
      ["a", "i", "u", "e", "o"].forEach((v) => grid.appendChild(el("div", "gh", v)));
      kanaRows.forEach((r, ri) => {
        const lbl = rowLabel[r.row] || (r.cells[0] ? r.cells[0] + "行" : r.row);
        grid.appendChild(el("div", "gh", lbl));
      r.cells.forEach((c, ci) => {
        const rom = romajiRows[ri].cells[ci];
        if (!c) {
          grid.appendChild(el("div", "")); // spacer
        } else if (c.startsWith("(")) {
          const ph = el("div", "kana-sound");
          ph.style.opacity = ".35";
          ph.innerHTML = `<div class="ks" style="font-size:20px">${c.slice(1, -1)}</div>`;
          grid.appendChild(ph);
        } else {
          const cell = el("div", "kana-sound");
          cell.innerHTML = `<div class="ks">${c}</div><div class="kr">${rom}</div><div class="kplay">▶ 播放</div>`;
          cell.addEventListener("click", () => speak(c, cell));
          grid.appendChild(cell);
        }
      });
    });
    return grid;
  }
  function renderPronunciation() {
    $("#gojuonSeion").appendChild(buildGojuon(D.gojuonRows, D.gojuonRomaji));
    $("#gojuonDakuon").appendChild(buildGojuon(D.dakuon, D.dakuon));
    // 拗音
    const y = $("#gojuonYoon");
    D.yoon.forEach((item) => {
      item.cells.forEach((c, i) => {
        const cell = el("div", "kana-sound");
        const jp = c.split(" ")[0];
        cell.innerHTML = `<div class="ks" style="font-size:22px">${c}</div><div class="kr">${item.romaji[i]}</div><div class="kplay">▶ 播放</div>`;
        cell.addEventListener("click", () => speak(jp, cell));
        y.appendChild(cell);
      });
    });
    // 特殊发音
    const sp = $("#specialPron");
    const samples = { sokuon: "がっこう", chōon: "とうきょう", hatsuon: "せんせい", yōon: "きょうと" };
    D.specialPron.forEach((s) => {
      const card = el("div", "sp-card");
      card.innerHTML = `<h4>${s.title}<span class="sp-jp">${s.jp}</span></h4><p>${s.desc}</p>`;
      card.addEventListener("click", () => speak(samples[s.romaji] || s.jp, card));
      sp.appendChild(card);
    });
    // 声调
    const ac = $("#accentBox");
    D.accent.forEach((a) => {
      const card = el("div", "accent-card");
      card.innerHTML = `<h4>${a.h}</h4><div class="accent-pitch">${a.p}</div><p>${a.d}</p>`;
      card.style.cursor = "pointer";
      card.addEventListener("click", () => speak("はし", card));
      ac.appendChild(card);
    });
  }

  /* ---------- 5. 日常用语 ---------- */
  function renderPhrases() {
    const filter = $("#phraseFilter");
    const grid = $("#phraseGrid");
    const all = { scene: "全部", icon: "🌟", items: [] };
    D.phrases.forEach((p) => all.items.push(...p.items.map((it) => ({ ...it, _scene: p.scene }))));
    const list = [all, ...D.phrases];
    list.forEach((p, idx) => {
      const b = el("button", "pf-btn" + (idx === 0 ? " active" : ""), `${p.icon} ${p.scene}`);
      b.addEventListener("click", () => {
        $$(".pf-btn", filter).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        draw(p.items);
      });
      filter.appendChild(b);
    });
    function draw(items) {
      grid.innerHTML = "";
      items.forEach((it) => {
        const card = el("div", "phrase-card");
        card.innerHTML = `
          <div class="pc-jp">${it.jp}<span class="pc-play">🔊</span></div>
          <div class="pc-kana">${it.kana}</div>
          <div class="pc-cn">${it.cn}</div>`;
        card.querySelector(".pc-play").addEventListener("click", () => speak(it.jp, card.querySelector(".pc-play")));
        grid.appendChild(card);
      });
    }
    draw(all.items);
  }

  /* ---------- 6. 输入法 ---------- */
  function renderInput() {
    const c = $("#inputCols");
    D.input.forEach((it) => {
      const col = el("div", "in-col");
      col.innerHTML = `<div class="ic-ico">${it.ico}</div><h4>${it.h}</h4><p>${it.p}</p><ul>${it.ul.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      c.appendChild(col);
    });
  }

  /* ---------- 7. JLPT ---------- */
  function renderJlpt() {
    const c = $("#jlptCards");
    D.jlpt.forEach((j) => {
      const card = el("div", "jlpt-card");
      card.style.setProperty("--lvl", j.color);
      card.innerHTML = `
        <div class="jl-badge">${j.lv}</div>
        <h4>${j.title}</h4>
        <div class="jl-vocab">${j.vocab}</div>
        <p>${j.desc}</p>
        <div class="jl-tags">${j.tags.map((t) => `<span>${t}</span>`).join("")}</div>`;
      c.appendChild(card);
    });
  }

  /* ---------- 8. 音乐 ---------- */
  function renderMusic() {
    const c = $("#musicCards");
    D.music.forEach((m) => {
      const card = el("div", "music-card");
      card.innerHTML = `
        <div class="mc-bar"></div>
        <div class="mc-emoji">${m.emoji}</div>
        <h4>${m.h}</h4><div class="mc-jp">${m.jp}</div>
        <p>${m.p}</p><div class="mc-artists">${m.artists}</div>`;
      c.appendChild(card);
    });
  }

  /* ---------- 9. 文化 ---------- */
  function renderCulture() {
    const c = $("#cultureGrid");
    D.culture.forEach((cu) => {
      const card = el("div", "culture-card");
      card.innerHTML = `
        <div class="cc-ico">${cu.ico}</div>
        <h4>${cu.h}</h4><div class="cc-jp">${cu.jp}</div>
        <p>${cu.p}</p>
        <div class="cc-words">${cu.words.map((w) => `<span>${w}</span>`).join("")}</div>`;
      c.appendChild(card);
    });
  }

  /* ---------- 10. 资源 ---------- */
  function renderResources() {
    const c = $("#resCols");
    D.resources.forEach((r) => {
      const col = el("div", "res-col");
      col.innerHTML = `<h4>${r.ico} ${r.h}</h4><ul>${r.ul.map((x) => `<li>${x}</li>`).join("")}</ul>`;
      c.appendChild(col);
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs(rootId) {
    const root = $("#" + rootId);
    $$(".tab-btn", root).forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        $$(".tab-btn", root).forEach((b) => b.classList.remove("active"));
        $$(".tab-panel", root).forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        $(`.tab-panel[data-panel="${tab}"]`, root).classList.add("active");
      });
    });
  }

  /* ---------- 思维导图 ---------- */
  function initMindmap() {
    const canvas = $("#mindmapCanvas");
    const wrap = $("#mindmapWrap");
    const listEl = $("#mindmapList");
    const root = D.mindmap;

    function prep(node, depth) {
      node._depth = depth;
      node._expanded = depth === 0;
      (node.children || []).forEach((c) => prep(c, depth + 1));
    }
    prep(root, 0);

    const H_GAP = 178, V_GAP = 120, PAD = 48;
    let allNodes = [];
    let panX = 0, panY = 0, scale = 1;
    let view = "graph";

    function layout() {
      allNodes = [];
      let leaf = 0;
      (function walk(node) {
        allNodes.push(node);
        const vis = node._expanded ? node.children || [] : [];
        if (!vis.length) {
          node._x = leaf * H_GAP;
          leaf++;
        } else {
          vis.forEach(walk);
          node._x = (vis[0]._x + vis[vis.length - 1]._x) / 2;
        }
      })(root);
      (function setParent(node, parent) {
        node.parent = parent;
        (node.children || []).forEach((c) => setParent(c, node));
      })(root, null);
      const maxDepth = Math.max(...allNodes.map((n) => n._depth));
      const width = Math.max(leaf * H_GAP, 220) + PAD * 2;
      const height = maxDepth * V_GAP + PAD * 2;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      return { width, height };
    }

    function applyTransform() {
      canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    }

    function render() {
      const { width, height } = layout();
      canvas.innerHTML = "";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      Object.assign(svg.style, { position: "absolute", left: "0", top: "0", pointerEvents: "none" });
      canvas.appendChild(svg);

      allNodes.forEach((node) => {
        node._cx = node._x + PAD;
        node._cy = node._depth * V_GAP + PAD;
        if (node._depth > 0) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const px = node.parent._cx, py = node.parent._cy, cx = node._cx, cy = node._cy;
          const midY = (py + cy) / 2;
          line.setAttribute("d", `M ${px} ${py} C ${px} ${midY}, ${cx} ${midY}, ${cx} ${cy}`);
          line.setAttribute("stroke", "#cdb88f");
          line.setAttribute("stroke-width", "2");
          line.setAttribute("fill", "none");
          svg.appendChild(line);
        }
      });

      allNodes.forEach((node) => {
        const hasKids = node.children && node.children.length;
        const n = el("div", "mm-node " + node.level);
        if (hasKids && !node._expanded) n.classList.add("collapsed");
        const jp = node.jp ? `<span class="jp">${node.jp}</span>` : "";
        n.innerHTML = `<span>${node.label}</span>${jp}`;
        n.style.left = node._cx + "px";
        n.style.top = node._cy + "px";
        n.style.transform = "translate(-50%,-50%)";
        n.addEventListener("click", () => {
          if (node.target) {
            const sec = document.getElementById(node.target);
            if (sec) sec.scrollIntoView({ behavior: "smooth" });
          } else if (hasKids) {
            node._expanded = !node._expanded;
            render();
            fit();
          }
        });
        if (hasKids) {
          const tog = el("div", "branch-toggle", node._expanded ? "–" : "+");
          tog.style.left = node._cx + 62 + "px";
          tog.style.top = node._cy + "px";
          tog.style.transform = "translate(-50%,-50%)";
          tog.addEventListener("click", (e) => {
            e.stopPropagation();
            node._expanded = !node._expanded;
            render();
            fit();
          });
          canvas.appendChild(tog);
        }
        canvas.appendChild(n);
      });
    }

    /* 列表（树状手风琴）视图 */
    function buildLeaf(node) {
      const b = el("button", "mml-leaf",
        `${node.label}${node.jp ? ` <span style="color:var(--gold);font-size:12px">${node.jp}</span>` : ""}`);
      b.addEventListener("click", () => {
        if (node.target) {
          const s = document.getElementById(node.target);
          if (s) s.scrollIntoView({ behavior: "smooth" });
        }
      });
      return b;
    }
    function buildListItem(node) {
      const hasKids = node.children && node.children.length;
      const item = el("div", "mml-item" + (node._expanded ? " open" : ""));
      const head = el("button", "mml-head");
      head.innerHTML = `<span>${node.label}${node.jp ? `<span class="jp">${node.jp}</span>` : ""}</span><span class="chev">▶</span>`;
      const body = el("div", "mml-body");
      if (hasKids) {
        head.addEventListener("click", () => item.classList.toggle("open"));
        (node.children || []).forEach((ch) => body.appendChild(buildLeaf(ch)));
      } else {
        head.addEventListener("click", () => {
          if (node.target) {
            const s = document.getElementById(node.target);
            if (s) s.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
      item.appendChild(head);
      item.appendChild(body);
      return item;
    }
    function renderList() {
      listEl.innerHTML = "";
      listEl.appendChild(el("div", "mml-root", root.label));
      (root.children || []).forEach((c) => listEl.appendChild(buildListItem(c)));
    }

    /* 自适应：缩放并居中到可视区 */
    function fit() {
      if (view !== "graph") return;
      const cw = parseFloat(canvas.style.width) || 1;
      const ch = parseFloat(canvas.style.height) || 1;
      const vw = wrap.clientWidth - 16, vh = wrap.clientHeight - 16;
      const s = Math.min(vw / cw, vh / ch, 1.4);
      scale = s > 0 ? s : 1;
      panX = Math.max(0, (wrap.clientWidth - cw * scale) / 2);
      panY = Math.max(0, (wrap.clientHeight - ch * scale) / 2);
      applyTransform();
    }

    /* 平移 */
    let dragging = false, sx = 0, sy = 0;
    function down(x, y) { dragging = true; sx = x - panX; sy = y - panY; }
    function move(x, y) { if (!dragging) return; panX = x - sx; panY = y - sy; applyTransform(); }
    function up() { dragging = false; }
    wrap.addEventListener("mousedown", (e) => {
      if (view !== "graph") return;
      if (e.target === canvas || e.target === wrap || e.target.tagName === "svg") down(e.clientX, e.clientY);
    });
    window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    window.addEventListener("mouseup", up);
    wrap.addEventListener("touchstart", (e) => {
      if (view !== "graph") return;
      const t = e.touches[0]; if (e.target === canvas || e.target === wrap || e.target.tagName === "svg") down(t.clientX, t.clientY);
    }, { passive: true });
    wrap.addEventListener("touchmove", (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
    wrap.addEventListener("touchend", up);
    // 滚轮缩放（仅当内容溢出视图时拦截，避免影响页面滚动）
    wrap.addEventListener("wheel", (e) => {
      if (view !== "graph") return;
      const cw = parseFloat(canvas.style.width) * scale, ch = parseFloat(canvas.style.height) * scale;
      if (cw <= wrap.clientWidth - 10 && ch <= wrap.clientHeight - 10) return;
      e.preventDefault();
      scale = Math.min(Math.max(scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12), 0.25), 2.6);
      applyTransform();
    }, { passive: false });

    /* 视图切换 */
    function setView(v) {
      view = v;
      $("#mmViewGraph").classList.toggle("active", v === "graph");
      $("#mmViewList").classList.toggle("active", v === "list");
      wrap.classList.toggle("list-mode", v === "list");
      if (v === "graph") { render(); fit(); }
      else { renderList(); }
    }
    $("#mmViewGraph").addEventListener("click", () => setView("graph"));
    $("#mmViewList").addEventListener("click", () => setView("list"));

    $("#mmExpandAll").addEventListener("click", () => {
      (function set(n, v) { n._expanded = v; (n.children || []).forEach((c) => set(c, v)); })(root, true);
      if (view === "graph") { render(); fit(); } else renderList();
    });
    $("#mmCollapseAll").addEventListener("click", () => {
      (function set(n, v) { if (n._depth > 0) n._expanded = v; (n.children || []).forEach((c) => set(c, v)); })(root, false);
      root._expanded = true;
      if (view === "graph") { render(); fit(); } else renderList();
    });
    $("#mmFit").addEventListener("click", () => { if (view === "graph") fit(); });

    /* 全屏 */
    const fsBtn = $("#mmFull");
    if (fsBtn && wrap.requestFullscreen) {
      fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) wrap.requestFullscreen();
        else document.exitFullscreen();
      });
      document.addEventListener("fullscreenchange", () => {
        const on = !!document.fullscreenElement;
        fsBtn.textContent = on ? "⛶ 退出全屏" : "⛶ 全屏";
        if (view === "graph") { on ? fit() : fit(); }
      });
    } else if (fsBtn) {
      fsBtn.style.display = "none";
    }

    // 初始化
    render();
    fit();
  }

  /* ---------- 文字的本质 对比表 ---------- */
  function renderWritingNature() {
    const t = $("#wnTable");
    if (!t) return;
    const rows = [
      ["表意文字（语素文字）", "汉字", "语素 / 词义", "是", "兼（音读近表音）", "承载实词与意义核心"],
      ["表音·音节文字", "平假名 / 片假名", "音节（モーラ）", "否", "是", "助词、活用变形、注音"],
      ["表音·音素文字", "罗马字", "音素", "否", "是", "输入法、对外标示（辅助）"],
      ["临时记法", "振假名（标注用）", "读音", "否", "是（临时）", "辅助标注，不进入正式书写"]
    ];
    let html = `<table><thead><tr><th>文字类型</th><th>代表</th><th>挂钩单位</th><th>是否表意</th><th>是否表音</th><th>在日语中的角色</th></tr></thead><tbody>`;
    rows.forEach((r) => {
      html += `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`;
    });
    html += `</tbody></table>`;
    t.innerHTML = html;
  }

  /* ---------- 导航 / 滚动 ---------- */
  function initNav() {
    const topnav = $("#topnav");
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
    $$("#navLinks a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
      })
    );
    window.addEventListener("scroll", () => {
      topnav.classList.toggle("scrolled", window.scrollY > 10);
      $("#toTop").classList.toggle("show", window.scrollY > 400);
    });
    $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    // scroll spy
    const navAnchors = $$("#navLinks a");
    const map = {};
    navAnchors.forEach((a) => (map[a.getAttribute("href").slice(1)] = a));
    if (typeof IntersectionObserver === "undefined") return; // 不支持则跳过高亮
    const obs = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting && map[en.target.id]) {
            navAnchors.forEach((x) => x.classList.remove("active"));
            map[en.target.id].classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["mindmap", "history", "writing", "grammar", "pronunciation", "phrases", "input", "jlpt", "music", "culture", "resources"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  /* ---------- 樱花 ---------- */
  function sakura() {
    const layer = $("#sakuraLayer");
    const chars = ["🌸", "❀", "✿"];
    for (let i = 0; i < 14; i++) {
      const s = el("span", "sakura", chars[i % chars.length]);
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 10 + Math.random() * 14 + "px";
      const dur = 9 + Math.random() * 10;
      s.style.animationDuration = dur + "s";
      s.style.animationDelay = -Math.random() * dur + "s";
      s.style.opacity = 0.4 + Math.random() * 0.4;
      layer.appendChild(s);
    }
  }

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHistory();
    renderKanaGrid($("#kanaHiragana"), D.gojuonRows, D.gojuonRomaji);
    renderKanaGrid($("#kanaKatakana"), D.katakana, D.gojuonRomaji);
    renderKanji();
    renderRomaji();
    renderGrammar();
    renderPronunciation();
    renderPhrases();
    renderInput();
    renderJlpt();
    renderMusic();
    renderCulture();
    renderResources();
    renderWritingNature();
    initTabs("writingTabs");
    initTabs("pronTabs");
    initMindmap();
    initNav();
    sakura();
    if (synth && synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {};
    }
  });
})();
