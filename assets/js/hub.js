/* ============================================================
   日本語の世界 — 首页 hub 脚本
   职责：樱花飘落、模块卡片、交互式知识导图（导图/列表/全屏/展开折叠/平移缩放）
   ============================================================ */
(function () {
  "use strict";
  var D = window.JP_DATA;

  /* ---------- 樱花 ---------- */
  (function sakura() {
    var layer = document.getElementById("sakuraLayer");
    if (!layer) return;
    var chars = ["🌸", "❀", "✿"];
    for (var i = 0; i < 20; i++) {
      var s = document.createElement("div");
      s.className = "sakura";
      s.textContent = chars[i % chars.length];
      s.style.left = Math.random() * 100 + "%";
      s.style.fontSize = 10 + Math.random() * 13 + "px";
      s.style.animationDuration = 8 + Math.random() * 10 + "s";
      s.style.animationDelay = -Math.random() * 14 + "s";
      layer.appendChild(s);
    }
  })();

  /* ---------- 模块卡片 ---------- */
  var MODULES = [
    { id: "history",       title: "起源与历史", en: "History",     icon: "📜", desc: "从上古日语到现代共通语的完整演变脉络。" },
    { id: "writing",       title: "文字系统",   en: "Writing",     icon: "あ",  desc: "汉字表意、假名表音、罗马字辅助——为何混写。" },
    { id: "grammar",       title: "语法体系",   en: "Grammar",     icon: "文",  desc: "SOV 语序、助词、活用、敬语与使役被动全解。" },
    { id: "pronunciation", title: "读法与发音", en: "Phonetics",   icon: "ん",  desc: "五十音、浊拗音、声调，点击即朗读。" },
    { id: "phrases",       title: "日常用语",   en: "Phrases",     icon: "💬", desc: "问候、购物、餐饮、交通等场景分类。" },
    { id: "input",         title: "输入法",     en: "Input",       icon: "⌨",  desc: "罗马字输入、IME 转换与手机端输入。" },
    { id: "jlpt",          title: "JLPT 等级",  en: "JLPT",        icon: "🎯", desc: "N5–N1 词汇量、要点与适用场景。" },
    { id: "music",         title: "音乐文化",   en: "Music",       icon: "♪",  desc: "J-POP、演歌、动画歌、Vocaloid、视觉系。" },
    { id: "culture",       title: "文化关联",   en: "Culture",     icon: "🌸", desc: "敬语、俳句、祭典、动漫与传统艺术。" },
    { id: "resources",     title: "学习资源",   en: "Resources",   icon: "📚", desc: "教材、APP、影视沉浸与辞典语料库。" }
  ];
  /* ---------- 顶部横幅：模块列表（与子页面一致，靠右对齐） ---------- */
  (function topnav() {
    var tn = document.getElementById("topnav");
    if (!tn) return;
    tn.innerHTML = "";
    var brand = document.createElement("a");
    brand.className = "tn-brand";
    brand.href = "index.html";
    brand.innerHTML = '<span class="brand-mark">日</span><span>日本語の世界</span>';
    tn.appendChild(brand);
    var nav = document.createElement("nav");
    nav.className = "tn-nav";
    MODULES.forEach(function (m) {
      var a = document.createElement("a");
      a.className = "tn-mod";
      a.href = "pages/" + m.id + ".html";
      a.innerHTML = '<span class="mc-ic">' + m.icon + "</span><span>" + m.title + "</span>";
      nav.appendChild(a);
    });
    tn.appendChild(nav);
  })();

  (function cards() {
    var grid = document.getElementById("modGrid");
    if (!grid) return;
    MODULES.forEach(function (m) {
      var a = document.createElement("a");
      a.className = "mod-card";
      a.href = "pages/" + m.id + ".html";
      a.innerHTML =
        '<div class="mc-icon">' + m.icon + "</div>" +
        "<h3>" + m.title + "</h3>" +
        '<div class="mc-en">' + m.en + "</div>" +
        "<p>" + m.desc + "</p>" +
        '<div class="mc-go">进入模块 →</div>';
      grid.appendChild(a);
    });
  })();
})();
