const categories = [
  { id: "data", label: "데이터" },
  { id: "process", label: "처리" },
  { id: "hardware", label: "하드웨어" },
  { id: "output", label: "출력" },
  { id: "tools", label: "도구" },
];

const colors = {
  raw: "#dce9ff",
  data: "#23d7c0",
  process: "#a985ff",
  hardware: "#65a7ff",
  output: "#e59b36",
  tools: "#f2d06b",
  blue: "#65a7ff",
  orange: "#e59b36",
  error: "#ed5f74",
  ok: "#6ee18e",
};

const SORT_KEYS = new Set(["BubbleSort", "SelectionSort", "InsertionSort", "MergeSort", "QuickSort", "HeapSort"]);

const nodeDefs = {
  RawInput: {
    key: "RawInput",
    category: "data",
    label: "원본 입력",
    kind: "system",
    glyph: "RI",
    color: colors.raw,
    cost: 0,
    input: false,
    output: "raw",
    accepts: [],
    rows: ["패킷 스트림", "n = 500", "고정 시드"],
    baseRate: 1.8,
  },
  IntegerArray: {
    key: "IntegerArray",
    category: "data",
    label: "정수 배열",
    kind: "downloader",
    glyph: "IA",
    color: colors.data,
    cost: 20,
    input: true,
    output: "int[]",
    accepts: ["raw", "ANY"],
    rows: ["수집", "배열 파일", "안정"],
    baseRate: 2.6,
  },
  Graph: {
    key: "Graph",
    category: "data",
    label: "그래프",
    kind: "downloader",
    glyph: "GR",
    color: "#7cd5ff",
    cost: 24,
    input: true,
    output: "graph",
    accepts: ["raw", "ANY"],
    rows: ["수집", "노드+간선", "희소"],
    baseRate: 2.2,
  },
  Tree: {
    key: "Tree",
    category: "data",
    label: "트리",
    kind: "downloader",
    glyph: "TR",
    color: "#61df9a",
    cost: 22,
    input: true,
    output: "tree",
    accepts: ["raw", "ANY"],
    rows: ["수집", "균형 트리", "색인"],
    baseRate: 2.1,
  },
  String: {
    key: "String",
    category: "data",
    label: "문자열",
    kind: "downloader",
    glyph: "ST",
    color: "#e0b75b",
    cost: 18,
    input: true,
    output: "string",
    accepts: ["raw", "ANY"],
    rows: ["수집", "텍스트 파일", "인코딩"],
    baseRate: 2.4,
  },
  Split: {
    key: "Split",
    category: "tools",
    label: "분배기",
    kind: "router",
    glyph: "SP",
    color: colors.tools,
    cost: 35,
    input: true,
    output: "same",
    accepts: ["ANY"],
    rows: ["분기", "2개 라인", "무손실"],
    baseRate: 1.3,
  },
  Duplicate: {
    key: "Duplicate",
    category: "tools",
    label: "복제기",
    kind: "router",
    glyph: "DU",
    color: colors.tools,
    cost: 42,
    input: true,
    output: "same",
    accepts: ["ANY"],
    rows: ["복사", "2개 출력", "버퍼"],
    baseRate: 1.15,
  },
  Merge: {
    key: "Merge",
    category: "tools",
    label: "병합기",
    kind: "router",
    glyph: "FO",
    color: "#b9c7dd",
    cost: 30,
    input: true,
    output: "same",
    accepts: ["ANY"],
    rows: ["병합", "순서 유지", "압축"],
    baseRate: 1,
  },
  Filter: {
    key: "Filter",
    category: "tools",
    label: "필터",
    kind: "router",
    glyph: "FI",
    color: "#f0ce75",
    cost: 32,
    input: true,
    output: "same",
    accepts: ["ANY"],
    rows: ["선별", "규칙 세트", "정리"],
    baseRate: 1.2,
  },
  BubbleSort: {
    key: "BubbleSort",
    category: "process",
    label: "버블 정렬",
    kind: "algorithm",
    glyph: "BS",
    color: colors.process,
    cost: 55,
    input: true,
    output: "int[]",
    accepts: ["int[]"],
    hwInput: true,
    rows: ["O(n^2)", "비교 교환", "CPU 가속"],
    baseRate: 1,
  },
  SelectionSort: {
    key: "SelectionSort",
    category: "process",
    label: "선택 정렬",
    kind: "algorithm",
    glyph: "SS",
    color: "#b797ff",
    cost: 58,
    input: true,
    output: "int[]",
    accepts: ["int[]"],
    hwInput: true,
    rows: ["O(n^2)", "최솟값 선택", "안정적"],
    baseRate: 1.1,
  },
  InsertionSort: {
    key: "InsertionSort",
    category: "process",
    label: "삽입 정렬",
    kind: "algorithm",
    glyph: "IS",
    color: "#c0a3ff",
    cost: 60,
    input: true,
    output: "int[]",
    accepts: ["int[]"],
    hwInput: true,
    rows: ["O(n^2)", "부분 정렬", "작은 입력"],
    baseRate: 1.25,
  },
  MergeSort: {
    key: "MergeSort",
    category: "process",
    label: "병합 정렬",
    kind: "algorithm",
    glyph: "MS",
    color: "#b69dff",
    cost: 70,
    input: true,
    output: "int[]",
    accepts: ["int[]"],
    hwInput: true,
    rows: ["O(n log n)", "분할 병합", "메모리"],
    baseRate: 2.8,
  },
  QuickSort: {
    key: "QuickSort",
    category: "process",
    label: "퀵 정렬",
    kind: "algorithm",
    glyph: "QS",
    color: "#c98cff",
    cost: 72,
    input: true,
    output: "int[]",
    accepts: ["int[]"],
    hwInput: true,
    rows: ["O(n log n)", "피벗", "빠름"],
    baseRate: 3,
  },
  HeapSort: {
    key: "HeapSort",
    category: "process",
    label: "힙 정렬",
    kind: "algorithm",
    glyph: "HS",
    color: "#ab8dff",
    cost: 68,
    input: true,
    output: "int[]",
    accepts: ["int[]"],
    hwInput: true,
    rows: ["O(n log n)", "힙 구성", "제자리"],
    baseRate: 2.4,
  },
  BFS: {
    key: "BFS",
    category: "process",
    label: "BFS 탐색",
    kind: "algorithm",
    glyph: "BF",
    color: "#ff8a63",
    cost: 64,
    input: true,
    output: "graph",
    accepts: ["graph", "tree"],
    hwInput: true,
    rows: ["O(V+E)", "큐", "넓게 탐색"],
    baseRate: 2.2,
  },
  DFS: {
    key: "DFS",
    category: "process",
    label: "DFS 탐색",
    kind: "algorithm",
    glyph: "DF",
    color: "#ff9a78",
    cost: 62,
    input: true,
    output: "graph",
    accepts: ["graph", "tree"],
    hwInput: true,
    rows: ["O(V+E)", "스택", "깊게 탐색"],
    baseRate: 2,
  },
  CPU: {
    key: "CPU",
    category: "hardware",
    label: "프로세서 셀",
    kind: "hardware",
    glyph: "CP",
    color: colors.hardware,
    cost: 80,
    input: false,
    output: "cpu",
    outputKind: "hardware",
    accepts: [],
    rows: ["클럭 속도", "x1.8", "직렬"],
    baseRate: 1.8,
  },
  GPU: {
    key: "GPU",
    category: "hardware",
    label: "GPU 클러스터",
    kind: "hardware",
    glyph: "GP",
    color: "#72b6ff",
    cost: 120,
    input: false,
    output: "gpu",
    outputKind: "hardware",
    accepts: [],
    rows: ["병렬", "x2.4", "배치"],
    baseRate: 2.4,
  },
  RAM: {
    key: "RAM",
    category: "hardware",
    label: "메모리 뱅크",
    kind: "hardware",
    glyph: "RM",
    color: "#83caff",
    cost: 94,
    input: false,
    output: "ram",
    outputKind: "hardware",
    accepts: [],
    rows: ["캐시", "x1.5", "버퍼"],
    baseRate: 1.5,
  },
  Uploader: {
    key: "Uploader",
    category: "output",
    label: "업로더",
    kind: "output",
    glyph: "UP",
    color: colors.output,
    cost: 54,
    input: true,
    output: false,
    accepts: ["ANY"],
    rows: ["업로드", "자금 생성", "자동"],
    baseRate: 2,
  },
};

const challenges = [
  { id: "first-pipeline", title: "첫 파이프라인", text: "원본 입력을 데이터 노드와 업로더까지 연결하세요.", done: false },
  { id: "parallel", title: "병렬 경로", text: "복제기를 사용해 알고리즘 노드 2개를 같은 네트워크에 연결하세요.", done: false },
  { id: "accelerated", title: "가속 연산", text: "알고리즘 노드에 하드웨어를 연결하세요.", done: false },
  { id: "busy-lab", title: "바쁜 연구소", text: "8개 이상의 노드가 연결된 네트워크를 구성하세요.", done: false },
];

const achievements = [
  { id: "hello", title: "플로우 시작", text: "첫 파이프라인이 자금을 벌기 시작했습니다.", unlocked: false },
  { id: "builder", title: "시스템 설계자", text: "노드 10개를 배치하세요.", unlocked: false },
  { id: "earner", title: "첫 수익", text: "자금 $25k를 달성하세요.", unlocked: false },
];

const els = {};

const state = {
  nodes: new Map(),
  connections: [],
  selected: null,
  activeCategory: "data",
  draggingNode: null,
  dragOffset: { x: 0, y: 0 },
  dragStart: { x: 0, y: 0 },
  dragMoved: false,
  connecting: null,
  pointer: { x: 0, y: 0 },
  funds: 12400,
  incomeRate: 0,
  dataRate: 0,
  running: true,
  tickTimer: null,
  animation: null,
  particles: [],
  nextId: 1,
  ctxNode: null,
};

function init() {
  cacheElements();
  renderCategories();
  renderPalette();
  renderChallenges();
  renderAchievements();
  bindGlobalEvents();
  addNode("RawInput", 110, 120, { fixedId: "n1" });
  selectNode("n1");
  updateAll();
  resizeParticleCanvas();
  startGameLoop();
  startAnimationLoop();
}

function cacheElements() {
  [
    "category-tabs",
    "node-palette",
    "library-count",
    "canvas-wrap",
    "canvas",
    "connections",
    "particle-canvas",
    "drag-ghost",
    "node-count",
    "conn-count",
    "status-msg",
    "funds-display",
    "funds-rate",
    "challenge-list",
    "objective-count",
    "achievement-list",
    "achievement-count",
    "node-info",
    "selected-type",
    "ctx-menu",
    "ctx-duplicate",
    "ctx-delete",
  ].forEach((id) => {
    els[toCamel(id)] = document.getElementById(id);
  });
}

function toCamel(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function bindGlobalEvents() {
  document.querySelectorAll(".dock-button").forEach((button) => {
    button.addEventListener("click", () => {
      setCategory(button.dataset.dock);
      document.querySelectorAll(".dock-button").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
    });
  });

  els.canvasWrap.addEventListener("dragover", (event) => event.preventDefault());
  els.canvasWrap.addEventListener("drop", handlePaletteDrop);
  els.canvasWrap.addEventListener("pointermove", (event) => {
    state.pointer = clientToCanvas(event.clientX, event.clientY);
    if (state.connecting) renderConnections();
  });
  els.canvasWrap.addEventListener("click", (event) => {
    if (event.target.closest(".lab-node")) return;
    if (state.connecting) cancelConnection();
    else selectNode(null);
    hideContextMenu();
  });

  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerup", handlePointerUp);
  document.addEventListener("keydown", (event) => {
    if ((event.key === "Delete" || event.key === "Backspace") && state.selected) deleteNode(state.selected);
    if (event.key === "Escape") cancelConnection();
  });
  document.addEventListener("click", (event) => {
    if (!els.ctxMenu.contains(event.target)) hideContextMenu();
  });

  els.ctxDuplicate.addEventListener("click", () => {
    if (state.ctxNode) duplicateNode(state.ctxNode);
    hideContextMenu();
  });
  els.ctxDelete.addEventListener("click", () => {
    if (state.ctxNode) deleteNode(state.ctxNode);
    hideContextMenu();
  });

  window.addEventListener("resize", () => {
    resizeParticleCanvas();
    renderConnections();
  });
}

function renderCategories() {
  els.categoryTabs.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-tab";
    button.dataset.category = category.id;
    button.textContent = category.label;
    button.addEventListener("click", () => setCategory(category.id));
    els.categoryTabs.appendChild(button);
  });
  setCategory(state.activeCategory);
}

function setCategory(categoryId) {
  state.activeCategory = categoryId;
  document.querySelectorAll(".category-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === categoryId);
  });
  document.querySelectorAll(".dock-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.dock === categoryId);
  });
  renderPalette();
}

function renderPalette() {
  const defs = Object.values(nodeDefs).filter((def) => def.category === state.activeCategory && def.key !== "RawInput");
  els.nodePalette.innerHTML = "";
  els.libraryCount.textContent = defs.length;

  defs.forEach((def) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "palette-item";
    item.draggable = true;
    item.dataset.key = def.key;
    item.style.color = def.color;
    item.innerHTML = `
      <span class="palette-dot"></span>
      <span class="palette-copy">
        <strong>${def.label}</strong>
        <span>${kindLabel(def.kind)} / ${describePort(def)}</span>
      </span>
      <span class="palette-cost">$${def.cost}</span>
    `;
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", def.key);
      event.dataTransfer.effectAllowed = "copy";
      showDragGhost(def.label, event.clientX, event.clientY);
    });
    item.addEventListener("dragend", hideDragGhost);
    item.addEventListener("pointermove", (event) => {
      if (event.buttons === 1) showDragGhost(def.label, event.clientX, event.clientY);
    });
    item.addEventListener("click", () => {
      const point = defaultDropPoint(def.key);
      addNode(def.key, point.x, point.y);
    });
    els.nodePalette.appendChild(item);
  });
}

function describePort(def) {
  if (def.outputKind === "hardware") return "하드웨어";
  if (!def.input) return `${typeLabel(def.output)} 출력`;
  if (!def.output) return "종착";
  return `${def.accepts.map(typeLabel).join("|")} -> ${typeLabel(def.output)}`;
}

function kindLabel(kind) {
  const labels = {
    system: "시스템",
    downloader: "수집기",
    router: "라우터",
    algorithm: "알고리즘",
    hardware: "하드웨어",
    output: "출력",
  };
  return labels[kind] || kind;
}

function typeLabel(type) {
  const labels = {
    raw: "원본",
    "int[]": "정수 배열",
    graph: "그래프",
    tree: "트리",
    string: "문자열",
    cpu: "CPU",
    gpu: "GPU",
    ram: "RAM",
    ANY: "전체",
    same: "동일",
  };
  return labels[type] || type || "종착";
}

function showDragGhost(label, x, y) {
  els.dragGhost.textContent = label;
  els.dragGhost.style.display = "block";
  els.dragGhost.style.left = `${x + 14}px`;
  els.dragGhost.style.top = `${y + 14}px`;
}

function hideDragGhost() {
  els.dragGhost.style.display = "none";
}

function defaultDropPoint(key) {
  const rect = els.canvasWrap.getBoundingClientRect();
  const index = Math.max(0, state.nodes.size - 1);
  const compact = rect.width < 780;
  const colWidth = 230;
  const rowHeight = 166;
  const nodeHeight = SORT_KEYS.has(key) ? 186 : 150;
  const maxY = Math.max(72, rect.height - nodeHeight - 70);
  const xs = compact
    ? [335, 105, 450].filter((x) => x <= rect.width - 210)
    : Array.from({ length: Math.max(1, Math.floor((rect.width - 320) / colWidth)) }, (_, i) => 330 + i * colWidth);
  const ys = [];
  for (let y = 92; y <= maxY; y += rowHeight) ys.push(y);

  for (const y of ys) {
    for (const x of xs) {
      if (isOpenSpot(x, y, nodeHeight)) return { x, y };
    }
  }

  const cols = compact ? 1 : Math.max(1, Math.floor((rect.width - 320) / colWidth));
  const fallbackX = compact ? Math.min(rect.width - 220, 335) : 330 + (index % cols) * colWidth;
  const fallbackY = 104 + Math.floor(index / cols) * rowHeight;
  return {
    x: clamp(fallbackX, 40, rect.width - 220),
    y: clamp(fallbackY, 56, maxY),
  };
}

function isOpenSpot(x, y, height) {
  const candidate = { x, y, width: 204, height };
  return [...state.nodes.values()].every((node) => {
    const nodeHeight = node.sort ? 186 : 150;
    const existing = { x: node.x, y: node.y, width: 204, height: nodeHeight };
    return (
      candidate.x + candidate.width < existing.x ||
      existing.x + existing.width < candidate.x ||
      candidate.y + candidate.height < existing.y ||
      existing.y + existing.height < candidate.y
    );
  });
}

function handlePaletteDrop(event) {
  event.preventDefault();
  hideDragGhost();
  const key = event.dataTransfer.getData("text/plain");
  if (!nodeDefs[key]) return;
  const point = clientToCanvas(event.clientX, event.clientY);
  addNode(key, point.x - 94, point.y - 52);
}

function addNode(key, x, y, options = {}) {
  const def = nodeDefs[key];
  if (!def) return null;

  const id = options.fixedId || `n${++state.nextId}`;
  const node = {
    id,
    key,
    def,
    x,
    y,
    level: 1,
    progress: Math.round(18 + Math.random() * 34),
    status: "idle",
    stats: { rate: def.baseRate, operations: 0, memory: 0, time: 0 },
    sort: SORT_KEYS.has(key) ? createSortState() : null,
    el: null,
  };

  node.el = renderNode(node);
  state.nodes.set(id, node);
  els.canvas.appendChild(node.el);
  if (node.sort) refreshSortViz(node);
  selectNode(id);
  updateAll();
  unlockAchievementIfNeeded();
  return node;
}

function renderNode(node) {
  const { def } = node;
  const el = document.createElement("article");
  el.className = "lab-node";
  el.dataset.nodeId = node.id;
  el.style.left = `${node.x}px`;
  el.style.top = `${node.y}px`;
  el.style.setProperty("--node-color", def.color);

  const inputPort = def.input ? `<span class="node-port in" data-port="in" title="입력"></span>` : "";
  const outputPort = def.output ? `<span class="node-port out" data-port="out" title="출력"></span>` : "";
  const hwPort = def.hwInput ? `<span class="node-port hw" data-port="hw" title="하드웨어 입력"></span>` : "";
  const rows = def.rows.map((row, index) => {
    const value = index === 0 ? `${node.stats.rate.toFixed(1)}/s` : row;
    return `
      <div class="node-row">
        <span class="row-chip" style="--row-color:${rowColor(index, def)}"></span>
        <span>${row}</span>
        <strong>${value}</strong>
      </div>
    `;
  }).join("");
  const sortViz = node.sort ? `<div class="sort-viz" aria-label="정렬 시각화"></div>` : "";

  el.innerHTML = `
    ${inputPort}${outputPort}${hwPort}
    <header class="node-header">
      <span class="node-glyph">${def.glyph}</span>
      <span class="node-title">
        <strong>${def.label}</strong>
        <span>${kindLabel(def.kind)}</span>
      </span>
      <span class="node-level">L${node.level}</span>
    </header>
    <section class="node-body">
      ${rows}
      ${sortViz}
      <div class="progress"><span style="--progress:${node.progress}%"></span></div>
    </section>
  `;

  el.addEventListener("pointerdown", (event) => handleNodePointerDown(event, node.id));
  el.addEventListener("click", (event) => handleNodeClick(event, node.id));
  el.addEventListener("contextmenu", (event) => showContextMenu(event, node.id));
  el.querySelectorAll(".node-port").forEach((port) => {
    port.style.setProperty("--port-color", port.dataset.port === "hw" ? colors.hardware : def.color);
  });

  return el;
}

function rowColor(index, def) {
  if (index === 0) return def.color;
  if (index === 1) return colors.blue;
  return colors.orange;
}

function refreshNode(node) {
  const classNames = ["lab-node", node.status];
  if (state.selected === node.id) classNames.push("selected");
  if (state.connecting?.nodeId === node.id) classNames.push("connecting-source");
  node.el.className = classNames.filter(Boolean).join(" ");
  node.el.style.left = `${node.x}px`;
  node.el.style.top = `${node.y}px`;
  node.el.style.setProperty("--node-color", node.def.color);

  const rows = node.el.querySelectorAll(".node-row strong");
  if (rows[0]) rows[0].textContent = `${node.stats.rate.toFixed(1)}/s`;
  const bar = node.el.querySelector(".progress span");
  if (bar) bar.style.setProperty("--progress", `${node.progress}%`);
  const level = node.el.querySelector(".node-level");
  if (level) level.textContent = `L${node.level}`;
  if (node.sort) refreshSortViz(node);
}

function handleNodePointerDown(event, id) {
  if (event.button !== 0) return;
  const node = state.nodes.get(id);
  if (!node) return;

  state.draggingNode = id;
  state.dragMoved = false;
  const point = clientToCanvas(event.clientX, event.clientY);
  state.dragStart = point;
  state.dragOffset.x = point.x - node.x;
  state.dragOffset.y = point.y - node.y;
  node.el.classList.add("dragging");
  node.el.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
  state.pointer = clientToCanvas(event.clientX, event.clientY);
  if (!state.draggingNode) return;

  const node = state.nodes.get(state.draggingNode);
  if (!node) return;

  const moved = Math.hypot(state.pointer.x - state.dragStart.x, state.pointer.y - state.dragStart.y);
  if (moved > 4) state.dragMoved = true;
  if (!state.dragMoved) return;

  node.x = clamp(state.pointer.x - state.dragOffset.x, 12, els.canvasWrap.clientWidth - 210);
  node.y = clamp(state.pointer.y - state.dragOffset.y, 12, els.canvasWrap.clientHeight - 170);
  refreshNode(node);
  renderConnections();
}

function handlePointerUp() {
  if (state.draggingNode) {
    const node = state.nodes.get(state.draggingNode);
    if (node) node.el.classList.remove("dragging");
  }
  state.draggingNode = null;
}

function handleNodeClick(event, id) {
  event.stopPropagation();
  const node = state.nodes.get(id);
  if (!node) return;

  if (state.dragMoved) {
    state.dragMoved = false;
    return;
  }

  hideContextMenu();

  if (state.connecting) {
    if (state.connecting.nodeId === id) cancelConnection();
    else connectToNode(id);
    return;
  }

  selectNode(id);
  if (!node.def.output) {
    setStatus("이 노드는 출력이 없어서 연결을 시작할 수 없습니다.", "warn");
    return;
  }

  beginConnection(id);
}

function beginConnection(nodeId) {
  const node = state.nodes.get(nodeId);
  if (!node || !node.def.output) return;
  state.connecting = { nodeId, port: "out" };
  selectNode(nodeId);
  refreshNode(node);
  setStatus(`${node.def.label}에서 연결 중입니다. 대상 노드를 클릭하세요.`, "ok");
  renderConnections();
}

function connectToNode(toId) {
  const fromId = state.connecting?.nodeId;
  const fromNode = state.nodes.get(fromId);
  const toNode = state.nodes.get(toId);
  if (!fromNode || !toNode) {
    cancelConnection();
    return;
  }

  const toPort = fromNode.def.outputKind === "hardware" ? "hw" : "in";
  const connection = createConnection(fromId, "out", toId, toPort);
  if (!connection.valid) {
    setStatus("이 노드끼리는 연결할 수 없습니다.", "warn");
    pulseInvalidNodes([{ fromId, toId }]);
    cancelConnection(false);
    return;
  }

  const exists = state.connections.some((item) => (
    item.fromId === connection.fromId &&
    item.toId === connection.toId &&
    item.toPort === connection.toPort
  ));
  if (!exists) state.connections.push(connection);

  state.connecting = null;
  state.nodes.forEach(refreshNode);
  setStatus("연결되었습니다.", "ok");
  simTick();
  updateAll();
}

function cancelConnection(showMessage = true) {
  if (!state.connecting) return;
  const source = state.nodes.get(state.connecting.nodeId);
  state.connecting = null;
  if (source) refreshNode(source);
  renderConnections();
  if (showMessage) setStatus("연결이 취소되었습니다.", "warn");
}

function createConnection(fromId, fromPort, toId, toPort) {
  const fromNode = state.nodes.get(fromId);
  const toNode = state.nodes.get(toId);
  const isHardware = fromNode.def.outputKind === "hardware";
  const outputType = getOutputType(fromNode);
  const valid = isHardware
    ? toPort === "hw" && Boolean(toNode.def.hwInput)
    : toPort === "in" && acceptsType(toNode.def, outputType);

  return {
    id: `${fromId}-${toId}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    fromId,
    fromPort,
    toId,
    toPort,
    type: outputType,
    isHardware,
    valid,
    color: valid ? connectionColor(outputType, isHardware) : colors.error,
  };
}

function acceptsType(def, outputType) {
  if (!def.input) return false;
  return def.accepts.includes("ANY") || def.accepts.includes(outputType);
}

function getOutputType(node) {
  if (node.def.output === "same") {
    const upstream = state.connections.find((conn) => conn.toId === node.id && conn.valid && !conn.isHardware);
    return upstream ? upstream.type : "ANY";
  }
  return node.def.output;
}

function connectionColor(type, isHardware) {
  if (isHardware) return colors.hardware;
  if (type === "raw") return colors.orange;
  if (type === "int[]") return colors.data;
  if (type === "graph") return "#7cd5ff";
  if (type === "tree") return colors.ok;
  if (type === "string") return "#e0b75b";
  return colors.data;
}

function renderConnections() {
  const paths = [];
  state.connections.forEach((conn) => {
    const curve = getConnectionCurve(conn);
    if (!curve) return;
    paths.push(pathMarkup(conn, curve));
  });

  if (state.connecting) {
    const from = getPortPosition(state.connecting.nodeId, "out");
    if (from) {
      const tempCurve = makeCurve(from, state.pointer);
      paths.push(pathMarkup({ valid: true, isHardware: false, color: "#dce9ff" }, tempCurve, true));
    }
  }

  els.connections.innerHTML = paths.join("");
}

function pathMarkup(conn, curve, temp = false) {
  const d = curveToPath(curve);
  const classes = ["conn-path"];
  if (!conn.valid || temp) classes.push("invalid");
  if (conn.isHardware) classes.push("hardware");
  return `
    <path class="conn-shadow" d="${d}"></path>
    <path class="${classes.join(" ")}" d="${d}" style="stroke:${conn.color};color:${conn.color}"></path>
  `;
}

function getConnectionCurve(conn) {
  const from = getPortPosition(conn.fromId, conn.fromPort);
  const to = getPortPosition(conn.toId, conn.toPort);
  if (!from || !to) return null;
  return makeCurve(from, to);
}

function makeCurve(from, to) {
  const dx = to.x - from.x;
  const tension = clamp(Math.abs(dx) * 0.52, 82, 220);
  const c1 = { x: from.x + tension, y: from.y };
  const c2 = { x: to.x - tension, y: to.y };
  if (dx < 0) {
    c1.x = from.x + 96;
    c2.x = to.x - 96;
  }
  return { from, c1, c2, to };
}

function curveToPath(curve) {
  return `M ${curve.from.x} ${curve.from.y} C ${curve.c1.x} ${curve.c1.y}, ${curve.c2.x} ${curve.c2.y}, ${curve.to.x} ${curve.to.y}`;
}

function pointOnCurve(curve, t) {
  const mt = 1 - t;
  const x =
    mt ** 3 * curve.from.x +
    3 * mt ** 2 * t * curve.c1.x +
    3 * mt * t ** 2 * curve.c2.x +
    t ** 3 * curve.to.x;
  const y =
    mt ** 3 * curve.from.y +
    3 * mt ** 2 * t * curve.c1.y +
    3 * mt * t ** 2 * curve.c2.y +
    t ** 3 * curve.to.y;
  return { x, y };
}

function getPortPosition(nodeId, portName) {
  const node = state.nodes.get(nodeId);
  if (!node) return null;
  const port = node.el.querySelector(`.node-port[data-port="${portName}"]`);
  if (!port) return null;
  const wrapRect = els.canvasWrap.getBoundingClientRect();
  const portRect = port.getBoundingClientRect();
  return {
    x: portRect.left - wrapRect.left + portRect.width / 2,
    y: portRect.top - wrapRect.top + portRect.height / 2,
  };
}

function clientToCanvas(clientX, clientY) {
  const rect = els.canvasWrap.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function selectNode(id) {
  if (state.selected) {
    const previous = state.nodes.get(state.selected);
    if (previous) previous.el.classList.remove("selected");
  }
  state.selected = id;
  if (id) {
    const node = state.nodes.get(id);
    if (node) {
      node.el.classList.add("selected");
      renderInspector(node);
    }
  } else {
    els.selectedType.textContent = "없음";
    els.nodeInfo.className = "node-info empty";
    els.nodeInfo.textContent = "노드를 선택하면 처리율과 업그레이드를 볼 수 있습니다.";
  }
}

function renderInspector(node) {
  els.selectedType.textContent = kindLabel(node.def.kind);
  els.nodeInfo.className = "node-info";
  const inbound = state.connections.filter((conn) => conn.toId === node.id && conn.valid).length;
  const outbound = state.connections.filter((conn) => conn.fromId === node.id && conn.valid).length;
  const canUpgrade = node.level < 5;
  const upgradeCost = upgradePrice(node);
  els.nodeInfo.innerHTML = `
    <div class="node-info-grid">
      <div><span class="metric-label">처리율</span><b>${node.stats.rate.toFixed(1)}/s</b></div>
      <div><span class="metric-label">연결</span><b>입력 ${inbound} / 출력 ${outbound}</b></div>
      <div><span class="metric-label">타입</span><b>${typeLabel(getOutputType(node))}</b></div>
    </div>
    <div class="upgrade-list">
      <button class="upgrade-button" id="upgrade-selected" ${canUpgrade ? "" : "disabled"}>
        업그레이드 $${formatShort(upgradeCost)}
      </button>
    </div>
  `;
  const upgradeButton = document.getElementById("upgrade-selected");
  if (upgradeButton) {
    upgradeButton.disabled = !canUpgrade || state.funds < upgradeCost;
    upgradeButton.addEventListener("click", () => upgradeNode(node.id));
  }
}

function upgradePrice(node) {
  return Math.round((node.def.cost + 40) * Math.pow(1.75, node.level));
}

function upgradeNode(id) {
  const node = state.nodes.get(id);
  if (!node) return;
  const cost = upgradePrice(node);
  if (state.funds < cost || node.level >= 5) return;
  state.funds -= cost;
  node.level += 1;
  node.stats.rate = node.def.baseRate * (1 + (node.level - 1) * 0.32);
  node.progress = Math.min(96, node.progress + 12);
  refreshNode(node);
  renderInspector(node);
  updateAll();
  setStatus(`${node.def.label} 업그레이드 완료.`, "ok");
}

function duplicateNode(id) {
  const node = state.nodes.get(id);
  if (!node || node.key === "RawInput") return;
  addNode(node.key, node.x + 34, node.y + 34);
}

function deleteNode(id) {
  if (id === "n1") {
    setStatus("원본 입력은 삭제할 수 없습니다.", "warn");
    return;
  }
  const node = state.nodes.get(id);
  if (!node) return;
  node.el.remove();
  state.nodes.delete(id);
  state.connections = state.connections.filter((conn) => conn.fromId !== id && conn.toId !== id);
  if (state.selected === id) selectNode(null);
  if (state.connecting?.nodeId === id) state.connecting = null;
  simTick();
  updateAll();
}

function showContextMenu(event, id) {
  event.preventDefault();
  event.stopPropagation();
  state.ctxNode = id;
  els.ctxDelete.disabled = id === "n1";
  els.ctxDuplicate.disabled = id === "n1";
  els.ctxMenu.style.display = "block";
  els.ctxMenu.style.left = `${event.clientX}px`;
  els.ctxMenu.style.top = `${event.clientY}px`;
}

function hideContextMenu() {
  els.ctxMenu.style.display = "none";
}

function startGameLoop() {
  clearInterval(state.tickTimer);
  simTick();
  state.tickTimer = setInterval(simTick, 1000);
}

function simTick() {
  const invalid = state.connections.filter((conn) => !conn.valid);
  if (invalid.length) {
    setStatus("호환되지 않는 연결이 있습니다.", "warn");
  }

  const reachable = getReachableNodeIds();
  const active = reachable.size > 1;
  calculateNetworkStats(reachable);

  const outputNodes = [...reachable]
    .map((id) => state.nodes.get(id))
    .filter((node) => node?.def.kind === "output");
  const hasEarningOutput = outputNodes.length > 0;
  state.incomeRate = hasEarningOutput ? outputNodes.reduce((sum, node) => sum + node.stats.rate, 0) * 140 : 0;
  state.funds += state.incomeRate;

  state.nodes.forEach((node) => {
    if (reachable.has(node.id)) node.status = active ? "running" : "idle";
    else node.status = "idle";
    if (node.id === "n1") node.status = "running";
    if (active) node.progress = 24 + ((node.progress + Math.round(node.stats.rate * 9)) % 72);
    refreshNode(node);
  });

  if (!active) setStatus("노드를 클릭해 연결을 시작하세요.", "ok");
  else if (!hasEarningOutput) setStatus("업로더까지 연결하면 자금을 벌 수 있습니다.", "warn");
  else {
    unlockAchievement("hello");
    setStatus("업로더가 자금을 벌고 있습니다.", "ok");
  }

  checkChallenges();
  unlockAchievementIfNeeded();
  updateAll({ moneyRate: state.incomeRate });
}

function pulseInvalidNodes(connections) {
  const ids = new Set();
  connections.forEach((conn) => {
    ids.add(conn.fromId);
    ids.add(conn.toId);
  });
  ids.forEach((id) => {
    const node = state.nodes.get(id);
    if (!node) return;
    node.status = "error";
    refreshNode(node);
    setTimeout(() => {
      if (node.status === "error") node.status = "idle";
      refreshNode(node);
    }, 700);
  });
}

function getReachableNodeIds() {
  const reachable = new Set(["n1"]);
  let changed = true;
  while (changed) {
    changed = false;
    state.connections.forEach((conn) => {
      if (!conn.valid || conn.isHardware) return;
      if (reachable.has(conn.fromId) && !reachable.has(conn.toId)) {
        reachable.add(conn.toId);
        changed = true;
      }
    });
  }
  state.connections.forEach((conn) => {
    if (conn.valid && conn.isHardware && reachable.has(conn.toId)) reachable.add(conn.fromId);
  });
  return reachable;
}

function calculateNetworkStats(reachable) {
  let dataRate = 0;
  reachable.forEach((id) => {
    const node = state.nodes.get(id);
    if (!node) return;
    const boost = hardwareBoost(node.id);
    const levelBoost = 1 + (node.level - 1) * 0.32;
    const effective = node.def.baseRate * boost * levelBoost;
    node.stats.rate = effective;
    node.stats.operations = Math.round(effective * 420 * (node.def.kind === "algorithm" ? 2.4 : 0.7));
    node.stats.memory = Math.round(effective * 64);
    node.stats.time = Math.max(8, Math.round(220 / Math.max(effective, 0.4)));
    dataRate += effective;
  });
  state.dataRate = dataRate;
}

function hardwareBoost(nodeId) {
  const hwConnections = state.connections.filter((conn) => conn.valid && conn.isHardware && conn.toId === nodeId);
  if (!hwConnections.length) return 1;
  return hwConnections.reduce((boost, conn) => {
    const hw = state.nodes.get(conn.fromId);
    return boost + (hw ? hw.def.baseRate * 0.26 : 0);
  }, 1);
}

function checkChallenges() {
  const reachable = getReachableNodeIds();
  const hasOutput = [...reachable].some((id) => state.nodes.get(id)?.def.kind === "output");
  const hasData = [...reachable].some((id) => state.nodes.get(id)?.def.kind === "downloader");
  const algoNodes = [...reachable].filter((id) => state.nodes.get(id)?.def.kind === "algorithm");
  const hasDuplicator = [...reachable].some((id) => state.nodes.get(id)?.key === "Duplicate");
  const hasAccelerated = state.connections.some((conn) => conn.valid && conn.isHardware && reachable.has(conn.toId));

  completeChallenge("first-pipeline", hasOutput && hasData);
  completeChallenge("parallel", hasDuplicator && algoNodes.length >= 2);
  completeChallenge("accelerated", hasAccelerated);
  completeChallenge("busy-lab", reachable.size >= 8);
}

function completeChallenge(id, condition) {
  const challenge = challenges.find((item) => item.id === id);
  if (!challenge || challenge.done || !condition) return;
  challenge.done = true;
  state.funds += 500;
  renderChallenges();
  setStatus(`목표 완료: ${challenge.title}`, "ok");
}

function unlockAchievementIfNeeded() {
  if (state.nodes.size >= 10) unlockAchievement("builder");
  if (state.funds >= 25000) unlockAchievement("earner");
}

function unlockAchievement(id) {
  const achievement = achievements.find((item) => item.id === id);
  if (!achievement || achievement.unlocked) return;
  achievement.unlocked = true;
  renderAchievements();
}

function renderChallenges() {
  els.challengeList.innerHTML = "";
  const done = challenges.filter((challenge) => challenge.done).length;
  els.objectiveCount.textContent = `${done}/${challenges.length}`;
  challenges.forEach((challenge) => {
    const item = document.createElement("div");
    item.className = `objective ${challenge.done ? "done" : ""}`;
    item.innerHTML = `
      <strong>${challenge.done ? "완료" : "대기"} / ${challenge.title}</strong>
      <p>${challenge.text}</p>
    `;
    els.challengeList.appendChild(item);
  });
}

function renderAchievements() {
  els.achievementList.innerHTML = "";
  const unlocked = achievements.filter((achievement) => achievement.unlocked).length;
  els.achievementCount.textContent = `${unlocked}/${achievements.length}`;
  achievements.forEach((achievement) => {
    const item = document.createElement("div");
    item.className = `achievement ${achievement.unlocked ? "unlocked" : ""}`;
    item.innerHTML = `
      <strong>${achievement.unlocked ? "해금" : "잠김"} / ${achievement.title}</strong>
      <span>${achievement.text}</span>
    `;
    els.achievementList.appendChild(item);
  });
}

function createSortState() {
  const values = Array.from({ length: 22 }, (_, index) => index + 1);
  shuffle(values);
  return { values, i: 0, j: 0, elapsed: 0, hold: 0, done: false, highlight: [] };
}

function shuffle(values) {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
}

function advanceSortVisuals(dt) {
  const reachable = getReachableNodeIds();
  state.nodes.forEach((node) => {
    if (!node.sort || !reachable.has(node.id)) return;
    node.sort.elapsed += dt;
    const interval = Math.max(28, 120 / Math.max(0.8, node.stats.rate));
    while (node.sort.elapsed >= interval) {
      node.sort.elapsed -= interval;
      sortStep(node);
    }
    refreshSortViz(node);
  });
}

function sortStep(node) {
  const sort = node.sort;
  const values = sort.values;
  if (sort.done) {
    sort.hold += 1;
    if (sort.hold > 26) {
      shuffle(values);
      sort.i = 0;
      sort.j = 0;
      sort.hold = 0;
      sort.done = false;
      sort.highlight = [];
    }
    return;
  }

  const last = values.length - sort.i - 1;
  if (sort.j < last) {
    sort.highlight = [sort.j, sort.j + 1];
    if (values[sort.j] > values[sort.j + 1]) {
      [values[sort.j], values[sort.j + 1]] = [values[sort.j + 1], values[sort.j]];
    }
    sort.j += 1;
  } else {
    sort.j = 0;
    sort.i += 1;
    sort.highlight = [];
    if (sort.i >= values.length - 1) {
      sort.done = true;
      sort.hold = 0;
    }
  }
}

function refreshSortViz(node) {
  const container = node.el.querySelector(".sort-viz");
  if (!container || !node.sort) return;
  const max = node.sort.values.length;
  container.innerHTML = node.sort.values.map((value, index) => {
    const active = node.sort.highlight.includes(index);
    const sorted = node.sort.done || index >= max - node.sort.i;
    return `<span class="sort-bar ${active ? "active" : ""} ${sorted ? "sorted" : ""}" style="height:${10 + (value / max) * 30}px"></span>`;
  }).join("");
}

function startAnimationLoop() {
  const canvas = els.particleCanvas;
  const ctx = canvas.getContext("2d");
  let last = performance.now();

  function loop(now) {
    const dt = Math.min(48, now - last);
    last = now;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    advanceSortVisuals(dt);

    const validConnections = state.connections.filter((conn) => conn.valid);
    if (validConnections.length && Math.random() < 0.42) {
      const conn = validConnections[Math.floor(Math.random() * validConnections.length)];
      state.particles.push({
        connId: conn.id,
        t: 0,
        color: conn.color,
        size: 2 + Math.random() * 2,
      });
    }

    state.particles = state.particles.filter((particle) => {
      const conn = state.connections.find((item) => item.id === particle.connId);
      if (!conn) return false;
      const curve = getConnectionCurve(conn);
      if (!curve) return false;
      particle.t += dt * 0.0008;
      if (particle.t >= 1) return false;
      const point = pointOnCurve(curve, particle.t);
      ctx.globalAlpha = 0.9 - particle.t * 0.45;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      return true;
    });

    state.animation = requestAnimationFrame(loop);
  }

  state.animation = requestAnimationFrame(loop);
}

function resizeParticleCanvas() {
  const ratio = window.devicePixelRatio || 1;
  els.particleCanvas.width = Math.max(1, Math.floor(els.canvasWrap.clientWidth * ratio));
  els.particleCanvas.height = Math.max(1, Math.floor(els.canvasWrap.clientHeight * ratio));
  els.particleCanvas.style.width = `${els.canvasWrap.clientWidth}px`;
  els.particleCanvas.style.height = `${els.canvasWrap.clientHeight}px`;
  const ctx = els.particleCanvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function updateAll(rates = {}) {
  els.nodeCount.textContent = state.nodes.size;
  els.connCount.textContent = state.connections.length;
  els.fundsDisplay.textContent = `$${formatShort(state.funds)}`;
  els.fundsRate.textContent = rates.moneyRate ? `+${formatShort(rates.moneyRate)}/s` : "+0/s";
  renderConnections();
  if (state.selected) {
    const node = state.nodes.get(state.selected);
    if (node) renderInspector(node);
  }
}

function setStatus(message, type) {
  els.statusMsg.textContent = message;
  els.statusMsg.style.color = type === "ok" ? colors.ok : type === "warn" ? colors.tools : "";
}

function formatShort(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}b`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}m`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  if (Number.isInteger(value)) return `${value}`;
  return value.toFixed(1);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

init();
