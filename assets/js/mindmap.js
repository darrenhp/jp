/* ============================================================
   日本語の世界 — 首页知识导图（基于开源库 jsMind 0.8.7）
   职责：用 jsMind 渲染思维导图，节点点击跳转子页面；
        保留「导图 / 列表」视图切换、展开折叠、全屏、回到中心。
   ============================================================ */
(function () {
  "use strict";

  var D = window.JP_DATA;
  if (!D || !D.mindmap) return;

  var root = D.mindmap;
  var canvas = document.getElementById("mindmapCanvas");
  var wrap = document.getElementById("mindmapWrap");
  var listEl = document.getElementById("mindmapList");
  if (!canvas || !wrap) return;

  // id -> target 映射（点击节点跳转子页面）
  var targetMap = {};
  (function buildMap(n) {
    if (n.id) targetMap[n.id] = n.target || null;
    (n.children || []).forEach(buildMap);
  })(root);

  // 递归把 data.js 的树转成 jsMind 的 node_tree 格式
  function toJM(n) {
    var topic = n.label + (n.jp ? "（" + n.jp + "）" : "");
    var node = { id: n.id, topic: topic, "background-color": n.target ? "" : "" };
    var kids = n.children || [];
    if (kids.length) {
      node.children = kids.map(toJM);
      // 默认仅 root 展开，其余折叠，保证首屏清爽
      if (n.id !== "root") node.expanded = false;
    }
    return node;
  }

  var jm = null;
  var viewMode = "graph";

  function showGraph() {
    var data = {
      meta: { name: "日本語の世界", author: "workbuddy" },
      format: "node_tree",
      data: toJM(root)
    };
    var options = {
      container: "mindmapCanvas",
      theme: "jphome",
      editable: false,
      mode: "full"
    };
    if (!jm) {
      jm = new jsMind(options);
      // 点击节点跳转对应模块
      canvas.addEventListener("click", function (e) {
        var el = e.target;
        while (el && el !== canvas && !(el.tagName && el.tagName.toLowerCase() === "jmnode")) {
          el = el.parentElement;
        }
        if (el && el.getAttribute && el.getAttribute("nodeid")) {
          var t = targetMap[el.getAttribute("nodeid")];
          if (t && t !== "#" && t !== "null") { window.location.href = "pages/" + t + ".html"; }
        }
      });
    }
    jm.show(data);
    // 渲染后回到中心
    setTimeout(centerRoot, 80);
  }

  function centerRoot() {
    var inner = canvas.querySelector(".jsmind-inner");
    var cv = canvas.querySelector("canvas.jsmind") || canvas.querySelector("svg.jsmind");
    if (!inner) return;
    var cw = inner.clientWidth, ch = inner.clientHeight;
    var w = cv ? cv.offsetWidth : inner.scrollWidth;
    var h = cv ? cv.offsetHeight : inner.scrollHeight;
    inner.scrollLeft = Math.max(0, (w - cw) / 2);
    inner.scrollTop = Math.max(0, (h - ch) / 2);
  }

  /* ---------- 列表视图（简单递归，复用同一数据） ---------- */
  function renderList() {
    listEl.innerHTML = "";
    var rootEl = document.createElement("div");
    rootEl.className = "mml-root";
    rootEl.textContent = root.label + (root.jp ? "（" + root.jp + "）" : "");
    listEl.appendChild(rootEl);
    (root.children || []).forEach(function (c) { listEl.appendChild(buildItem(c)); });
  }
  function buildItem(node) {
    var item = document.createElement("div");
    item.className = "mml-item";
    var head = document.createElement("button");
    head.className = "mml-head";
    head.innerHTML = "<span>" + node.label +
      (node.jp ? ' <span class="jp">' + node.jp + "</span>" : "") +
      '</span><span class="chev">▶</span>';
    var body = document.createElement("div");
    body.className = "mml-body";
    var hasKids = node.children && node.children.length;
    if (hasKids) {
      head.addEventListener("click", function () {
        item.classList.toggle("open");
        body.style.maxHeight = item.classList.contains("open") ? body.scrollHeight + "px" : "0px";
      });
      node.children.forEach(function (c) {
        if (c.children && c.children.length) body.appendChild(buildItem(c));
        else {
          var leaf = document.createElement("button");
          leaf.className = "mml-leaf";
          leaf.textContent = c.label + (c.jp ? " " + c.jp : "");
          leaf.addEventListener("click", function () {
            if (c.target) window.location.href = "pages/" + c.target + ".html";
          });
          body.appendChild(leaf);
        }
      });
    } else {
      head.classList.add("mml-leaf");
      head.style.borderTop = "none";
      head.addEventListener("click", function () {
        if (node.target) window.location.href = "pages/" + node.target + ".html";
      });
    }
    item.appendChild(head); item.appendChild(body);
    return item;
  }

  /* ---------- 工具栏 ---------- */
  function setView(mode) {
    viewMode = mode;
    wrap.classList.toggle("list-mode", mode === "list");
    document.getElementById("mmViewGraph").classList.toggle("active", mode === "graph");
    document.getElementById("mmViewList").classList.toggle("active", mode === "list");
    if (mode === "graph") { canvas.style.display = ""; listEl.style.display = "none"; if (jm) centerRoot(); }
    else { canvas.style.display = "none"; listEl.style.display = ""; renderList(); }
  }

  var bg = document.getElementById("mmViewGraph");
  var bl = document.getElementById("mmViewList");
  var ea = document.getElementById("mmExpandAll");
  var ca = document.getElementById("mmCollapseAll");
  var fit = document.getElementById("mmFit");
  var fs = document.getElementById("mmFull");

  if (bg) bg.addEventListener("click", function () { setView("graph"); });
  if (bl) bl.addEventListener("click", function () { setView("list"); });
  if (ea) ea.addEventListener("click", function () { if (jm) { jm.expand_all(); setTimeout(centerRoot, 60); } });
  if (ca) ca.addEventListener("click", function () { if (jm) { jm.collapse_all(); setTimeout(centerRoot, 60); } });
  if (fit) fit.addEventListener("click", centerRoot);
  if (fs) {
    if (!(document.documentElement.requestFullscreen || wrap.requestFullscreen)) { fs.style.display = "none"; }
    fs.addEventListener("click", function () {
      if (document.fullscreenElement) { document.exitFullscreen(); }
      else if (wrap.requestFullscreen) { wrap.requestFullscreen(); }
    });
  }

  // 初始渲染
  showGraph();
})();
