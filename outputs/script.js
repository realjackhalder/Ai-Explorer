// AI Explorer - National Design Studio 2026 Edition Engine

const directoryItems = [
  {
    id: "claude-3-7-sonnet",
    rank: "01",
    type: "frontier",
    title: "Claude 3.7 Sonnet",
    provider: "Anthropic · Hybrid Frontier",
    avatarClass: "anthropic",
    description: "The first hybrid reasoning model allowing instant response or dynamically budgeted extended thinking up to 64K tokens.",
    badge: "200K Context · SOTA 70.3% SWE-bench",
    metric: "$3.00 / $15.00",
    benchmark: "70.3% SWE-bench Verified",
    context: "200K Input · 64K Max Thinking",
    inputRate: "$3.00 / 1M tokens",
    outputRate: "$15.00 / 1M tokens",
    code: `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{"model": "claude-3-7-sonnet-20250219", "max_tokens": 16000, "thinking": {"type": "enabled", "budget_tokens": 4096}}'`,
    link: "https://www.anthropic.com/news/claude-3-7-sonnet",
  },
  {
    id: "deepseek-r1",
    rank: "02",
    type: "open-weights",
    title: "DeepSeek R1",
    provider: "DeepSeek · Open Weights MIT",
    avatarClass: "deepseek",
    description: "Open-weights reasoning model trained via large-scale reinforcement learning, demonstrating emergent self-verification and self-correction.",
    badge: "128K Context · 97.3% Math 500",
    metric: "$0.55 / $2.19 (or $0 Self-Hosted)",
    benchmark: "97.3% Math 500 · 79.8% AIME",
    context: "128K Native Context",
    inputRate: "$0.55 / 1M tokens ($0.14 cached)",
    outputRate: "$2.19 / 1M tokens",
    code: `ollama run deepseek-r1:70b
# or via vLLM high-throughput server:
vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-32B --tensor-parallel-size 2`,
    link: "https://github.com/deepseek-ai/DeepSeek-R1",
  },
  {
    id: "openai-o3-mini",
    rank: "03",
    type: "frontier",
    title: "OpenAI o3-mini",
    provider: "OpenAI · Reasoning Specialist",
    avatarClass: "openai",
    description: "Cost-efficient reasoning model optimized for STEM, competitive coding, and multi-step tool calling with configurable reasoning effort.",
    badge: "200K Context · Low Latency",
    metric: "$1.10 / $4.40",
    benchmark: "79.7% AIME 2024 · 86.9% Codeforces",
    context: "200K Input · 100K Output",
    inputRate: "$1.10 / 1M tokens ($0.55 cached)",
    outputRate: "$4.40 / 1M tokens",
    code: `from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="o3-mini",
    reasoning_effort="high",
    messages=[{"role": "user", "content": "Prove that the sum of angles in a triangle is 180 in Euclidean geometry."}]
)`,
    link: "https://openai.com/index/openai-o3-mini/",
  },
  {
    id: "gemini-2-0-flash",
    rank: "04",
    type: "frontier",
    title: "Gemini 2.0 Flash Thinking",
    provider: "Google DeepMind · Native Multimodal",
    avatarClass: "google",
    description: "Native multimodal streaming model with visible real-time thinking process and sub-150ms time-to-first-token.",
    badge: "2M Context · Multimodal Live",
    metric: "$0.10 / $0.40",
    benchmark: "92.4% HumanEval · Realtime Audio/Video",
    context: "2,097,152 Tokens Context",
    inputRate: "$0.10 / 1M tokens ($0.025 cached)",
    outputRate: "$0.40 / 1M tokens",
    code: `from google import genai
client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.0-flash-thinking-exp-01-21",
    contents="Analyze the 500-page federal budget memo and extract all software line items."
)`,
    link: "https://deepmind.google/technologies/gemini/",
  },
  {
    id: "llama-3-3-70b",
    rank: "05",
    type: "open-weights",
    title: "Llama 3.3 70B Instruct",
    provider: "Meta AI · Open Weights Standard",
    avatarClass: "meta",
    description: "The industry standard open-weights workhorse delivering 405B-class benchmark performance in an efficient 70B parameter footprint.",
    badge: "128K Context · Permissive License",
    metric: "$0.30 / $0.80 (or $0 Local)",
    benchmark: "88.6% MMLU · 81.1% HumanEval",
    context: "128K Context · 42GB VRAM FP8",
    inputRate: "$0.30 / 1M tokens",
    outputRate: "$0.80 / 1M tokens",
    code: `vllm serve meta-llama/Llama-3.3-70B-Instruct --gpu-memory-utilization 0.95 --max-model-len 32768`,
    link: "https://llama.meta.com",
  },
  {
    id: "qwen-2-5-coder-32b",
    rank: "06",
    type: "open-weights",
    title: "Qwen 2.5-Coder 32B",
    provider: "Alibaba Cloud · Open Weights",
    avatarClass: "qwen",
    description: "Specialized open-source coding foundation model matching GPT-4o on code generation, repo refactoring, and bug localization.",
    badge: "128K Context · 24GB VRAM Fits 1 GPU",
    metric: "$0.20 / $0.60 (or $0 Local)",
    benchmark: "92.7% EvalPlus · 55.4% Aider Polyglot",
    context: "128K Context · Fits on single RTX 4090/A5000",
    inputRate: "$0.20 / 1M tokens",
    outputRate: "$0.60 / 1M tokens",
    code: `ollama run qwen2.5-coder:32b`,
    link: "https://github.com/QwenLM/Qwen2.5-Coder",
  },
  {
    id: "mcp-protocol",
    rank: "07",
    type: "agents",
    title: "Model Context Protocol (MCP)",
    provider: "Open Source Standard · Linux Foundation",
    avatarClass: "oss",
    description: "The universal USB-C standard for AI models to safely connect to local filesystems, Postgres databases, GitHub, and browser tools.",
    badge: "Open Protocol Specification v1.4",
    metric: "Free Open Standard",
    benchmark: "Universal Agent Protocol Adopted by 200+ Tools",
    context: "Client-Server JSON-RPC over stdio / SSE",
    inputRate: "$0.00 / Open Source",
    outputRate: "$0.00 / Open Source",
    code: `// claude_desktop_config.json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./federal_data.db"]
    }
  }
}`,
    link: "https://modelcontextprotocol.io",
  },
  {
    id: "browser-use",
    rank: "08",
    type: "agents",
    title: "browser-use",
    provider: "Open Source · Core Library",
    avatarClass: "oss",
    description: "Make websites accessible for AI agents through structured accessibility trees, vision verification, and multi-tab automation.",
    badge: "★ 62.4k · Python · Playwright",
    metric: "MIT License",
    benchmark: "SOTA Web Arena Autonomous Task Completion",
    context: "Vision + DOM Tree Representation",
    inputRate: "Open Source",
    outputRate: "Open Source",
    code: `from browser_use import Agent
from langchain_anthropic import ChatAnthropic

agent = Agent(
    task="Go to TrumpRx.gov, search for Wegovy, and compare prices.",
    llm=ChatAnthropic(model="claude-3-7-sonnet-20250219")
)
await agent.run()`,
    link: "https://github.com/browser-use/browser-use",
  },
  {
    id: "vllm-engine",
    rank: "09",
    type: "infrastructure",
    title: "vLLM High-Throughput Engine",
    provider: "UC Berkeley & Community · System",
    avatarClass: "oss",
    description: "The industry standard inference engine utilizing PagedAttention to achieve 24x higher throughput and near-zero memory waste.",
    badge: "★ 39.1k · C++ / CUDA",
    metric: "Apache 2.0",
    benchmark: "24x Higher Serving Concurrency",
    context: "Supports FP8, INT4, AWQ, GPTQ",
    inputRate: "Open Infrastructure",
    outputRate: "Open Infrastructure",
    code: `pip install vllm
python3 -m vllm.entrypoints.openai.api_server \\
  --model deepseek-ai/DeepSeek-R1-Distill-Qwen-32B \\
  --port 8000`,
    link: "https://github.com/vllm-project/vllm",
  },
  {
    id: "ollama-runtime",
    rank: "10",
    type: "infrastructure",
    title: "Ollama Local Runtime",
    provider: "Ollama Inc · Developer Tooling",
    avatarClass: "oss",
    description: "Get up and running with Llama 3.3, DeepSeek R1, and Qwen locally with a single terminal command on macOS, Linux, and Windows.",
    badge: "★ 120k · Zero Cloud Telemetry",
    metric: "MIT License",
    benchmark: "Zero Latency Local Inference",
    context: "Metal / CUDA / ROCm Hardware Support",
    inputRate: "Free Local Run",
    outputRate: "Free Local Run",
    code: `curl -fsSL https://ollama.com/install.sh | sh
ollama run deepseek-r1:32b`,
    link: "https://ollama.com",
  },
  {
    id: "phi-4-edge",
    rank: "11",
    type: "open-weights",
    title: "Microsoft Phi-4 (14B)",
    provider: "Microsoft Research · Small Language Model",
    avatarClass: "oss",
    description: "State-of-the-art 14B parameter small model outperforming models twice its size on complex math, reasoning, and instruction following.",
    badge: "16K Context · Runs on Laptop CPU",
    metric: "$0.10 / $0.30 (or $0 Local)",
    benchmark: "84.8% Math 500 · 80.4% MMLU",
    context: "16K Context · 8GB RAM requirement",
    inputRate: "Open Weights",
    outputRate: "Open Weights",
    code: `ollama run phi4`,
    link: "https://huggingface.co/microsoft/phi-4",
  },
  {
    id: "cursor-agent",
    rank: "12",
    type: "agents",
    title: "Cursor & Windsurf Agent Primitives",
    provider: "Agentic IDE Standard · Workflows",
    avatarClass: "oss",
    description: "Autonomous software development workflows that inspect file graphs, execute terminal commands, and perform test-driven self-correction.",
    badge: "Agentic Developer Workflows",
    metric: "Developer Standard",
    benchmark: "Multi-file Autonomous Diff Synthesis",
    context: "Repository-level Context Indexing",
    inputRate: "Production Tooling",
    outputRate: "Production Tooling",
    code: `// .cursorrules / agent prompt configuration
You are an autonomous staff engineer. 
Always verify codebase conventions, run local tests, and provide minimal reversible diffs.`,
    link: "https://cursor.com",
  },
];

let activeFilter = "all";
let currentQuery = "";
let currentVolumeMillions = 50;
let currentCostMode = "reasoning";
let activeEngine = "claude-3-7";

// Render Directory Table
function renderDirectory() {
  const container = document.getElementById("directory-list-container");
  if (!container) return;

  const filtered = directoryItems.filter((item) => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(currentQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(currentQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(currentQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(currentQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const countLine = document.getElementById("directory-count-line");
  if (countLine) {
    countLine.textContent = `${filtered.length} Models & Assets Cataloged`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 60px 0; text-align: center; color: var(--ink-muted);">
        No assets matched your search query. Try typing &ldquo;Claude 3.7&rdquo; or &ldquo;DeepSeek&rdquo;.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map(
      (item) => `
      <div class="directory-row" onclick="openSpecModal('${item.id}')">
        <span class="row-index">${item.rank}</span>
        <div class="row-brand">
          <div class="row-avatar ${item.avatarClass}">
            ${item.title.charAt(0)}
          </div>
          <div class="row-name">
            <h4>${item.title}</h4>
            <p>${item.provider}</p>
          </div>
        </div>
        <div class="row-desc">${item.description}</div>
        <div class="row-spec">
          <span class="row-spec-badge">${item.badge}</span>
        </div>
        <div class="row-metric">${item.metric}</div>
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn-inspect-spec" onclick="event.stopPropagation(); openSpecModal('${item.id}')">
            Specs ↗
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

// 3D Card Tilt (TrumpCard.gov Style)
function handleCardTilt(e) {
  const card = document.getElementById("compute-pass-card");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -14;
  const rotateY = ((x - centerX) / centerX) * 14;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetCardTilt() {
  const card = document.getElementById("compute-pass-card");
  if (!card) return;
  card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
}

// Pyramid Tier Selector (RealFood.gov Style)
const pyramidTierData = {
  1: {
    title: "Autonomous Agents & Model Context Protocol (MCP)",
    desc: "The highest leverage layer in modern software. Agents dynamically inspect file trees, query databases via standardized MCP connectors, and self-lint code before proposing pull requests.",
    models: ["Model Context Protocol (MCP)", "browser-use", "LangGraph", "Smolagents", "Cursor Agents"],
  },
  2: {
    title: "Hybrid Reasoning & Thought-Budget Engines",
    desc: "Frontier cognitive foundations that can scale compute at test-time. They explore reasoning paths, self-correct bugs, and produce verifiable proofs.",
    models: ["Claude 3.7 Sonnet (Hybrid)", "DeepSeek R1 (RL Verification)", "OpenAI o3-mini", "Gemini 2.0 Flash Thinking"],
  },
  3: {
    title: "Specialized Task Distillations & Open Code Models",
    desc: "High-throughput execution engines fine-tuned for specific modalities. Sub-second streaming speeds at less than $0.50 per million tokens.",
    models: ["Qwen 2.5-Coder 32B", "Gemini 2.0 Flash", "Phi-4 (14B)", "DeepSeek V3"],
  },
  4: {
    title: "Local Hardware Acceleration & Sovereign Runtimes",
    desc: "The infrastructure bedrock. PagedAttention engines that maximize GPU memory utilization and allow air-gapped sovereign deployment.",
    models: ["vLLM (PagedAttention)", "Ollama (One-Click)", "SGLang", "TensorRT-LLM"],
  },
};

function selectTier(tierNum) {
  document.querySelectorAll(".pyramid-tier").forEach((t) => t.classList.remove("active"));
  const targetTier = document.querySelector(`.pyramid-tier.tier-${tierNum}`);
  if (targetTier) targetTier.classList.add("active");

  const data = pyramidTierData[tierNum];
  if (!data) return;

  const titleEl = document.getElementById("tier-display-title");
  const descEl = document.getElementById("tier-display-desc");
  const modelsEl = document.getElementById("tier-display-models");

  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (modelsEl) {
    modelsEl.innerHTML = data.models
      .map((m) => `<span class="tier-model-tag">${m}</span>`)
      .join("");
  }
}

// TrumpRx Style Dynamic Token Economics Simulator
function handleVolumeChange(val) {
  currentVolumeMillions = parseInt(val, 10);
  const display = document.getElementById("volume-display");
  if (display) display.textContent = currentVolumeMillions;
  updateCostChart();
}

function setCostMode(mode) {
  currentCostMode = mode;
  ["reasoning", "vision", "agents"].forEach((m) => {
    const btn = document.getElementById(`tab-cost-${m}`);
    if (btn) {
      if (m === mode) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });

  const subtitle = document.getElementById("cost-subtitle");
  if (subtitle) {
    if (mode === "reasoning") subtitle.textContent = "Complex Multi-Step Reasoning & Chain-of-Thought Workloads";
    else if (mode === "vision") subtitle.textContent = "High-Resolution Multimodal OCR & Spatial Analysis";
    else if (mode === "agents") subtitle.textContent = "Continuous Autonomous Code Refactoring & Browser Action Loops";
  }

  updateCostChart();
}

function updateCostChart() {
  const legacyRate = currentCostMode === "reasoning" ? 15.0 : currentCostMode === "vision" ? 12.5 : 24.0;
  const optRate = currentCostMode === "reasoning" ? 0.45 : currentCostMode === "vision" ? 0.60 : 0.85;

  const legacyTotal = (currentVolumeMillions * legacyRate).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const optTotal = (currentVolumeMillions * optRate).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  const savings = (currentVolumeMillions * (legacyRate - optRate)).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const pct = Math.round(((legacyRate - optRate) / legacyRate) * 100);

  const legacyPrice = document.getElementById("legacy-price");
  const optPrice = document.getElementById("opt-price");
  const savingsBadge = document.getElementById("savings-badge");
  const legacyBar = document.getElementById("legacy-bar");
  const optBar = document.getElementById("opt-bar");

  if (legacyPrice) legacyPrice.innerHTML = `${legacyTotal} <span class="unit">/ month</span>`;
  if (optPrice) optPrice.innerHTML = `${optTotal} <span class="unit">/ month</span>`;
  if (savingsBadge) savingsBadge.textContent = `Save ${savings} / mo (${pct}% Reduction)`;

  if (legacyBar) legacyBar.style.height = `${Math.min(300, Math.max(120, currentVolumeMillions * 0.6 + 100))}px`;
  if (optBar) optBar.style.height = `${Math.min(90, Math.max(40, (currentVolumeMillions * 0.6 + 100) * 0.18))}px`;
}

// America.gov Style Conversational AI Prompt Engine
const presetAnswers = {
  "best-code-ratio": {
    title: "Best Code Reasoning per Dollar: Qwen 2.5-Coder 32B & DeepSeek R1",
    text: "For production environments with strict unit economics, Qwen 2.5-Coder 32B hosted on vLLM provides the highest SWE-bench score per dollar ($0.20/1M tokens). When pure mathematical proof and autonomous self-reflection are required, DeepSeek R1 ($0.55/1M tokens) matches o1/o3-mini performance at an 85% price discount.",
    specs: ["Cost: $0.20–$0.55 / 1M", "VRAM: 24GB (Fits single GPU)", "SWE-bench Score: 55.4%–70.3%"],
  },
  "deepseek-vs-o3": {
    title: "DeepSeek R1 vs OpenAI o3-mini: Architectural Comparison",
    text: "DeepSeek R1 is an open-weights model trained with pure RL self-reflection, giving complete data sovereignty and zero rate-limits when self-hosted on vLLM. OpenAI o3-mini is a managed cloud API with configurable thinking effort levels, optimal for low-latency interactive applications that lack on-premise GPU clusters.",
    specs: ["R1: Open Weights (MIT)", "o3-mini: Cloud Managed API", "Latency: o3-mini faster TTFT"],
  },
  "mcp-setup": {
    title: "Model Context Protocol (MCP) Architecture",
    text: "MCP is the open standard open-sourced by Anthropic that standardizes how LLM clients (Claude, Cursor, custom agents) communicate with data sources and tools. Instead of custom API integrations for each database, you run an MCP server (e.g. SQLite, GitHub, Slack) that any MCP-compliant agent can immediately discover and call.",
    specs: ["Protocol: JSON-RPC 2.0", "Transports: stdio / SSE", "Ecosystem: 200+ Verified Servers"],
  },
  "local-vram": {
    title: "Hardware Sizing for Local 32B Models (Qwen & DeepSeek Distills)",
    text: "A 32B model in FP16 requires ~64GB of VRAM. However, quantized to FP8 (which retains 99.5% accuracy), it consumes only 28GB VRAM (running smoothly on a single RTX 4090 or Apple M-series Mac with 36GB+ Unified Memory). Using 4-bit AWQ, it fits into 18GB VRAM.",
    specs: ["FP16: 64GB VRAM", "FP8 / Q8: 28GB VRAM (Recommended)", "INT4: 18GB VRAM"],
  },
};

function setConsoleEngine(engine, btn) {
  activeEngine = engine;
  document.querySelectorAll(".engine-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function askPresetQuery(key) {
  const data = presetAnswers[key];
  if (!data) return;
  const input = document.getElementById("console-prompt-input");
  if (input) {
    if (key === "best-code-ratio") input.value = "Best code reasoning per dollar?";
    else if (key === "deepseek-vs-o3") input.value = "DeepSeek R1 vs o3-mini?";
    else if (key === "mcp-setup") input.value = "What is Model Context Protocol (MCP)?";
    else if (key === "local-vram") input.value = "Local 32B model VRAM requirements?";
  }
  displayConsoleResponse(data.title, data.text, data.specs);
}

function executeConsoleQuery() {
  const input = document.getElementById("console-prompt-input");
  const query = input ? input.value.trim() : "";
  if (!query) return;

  displayConsoleResponse(
    `Analysis from Engine: ${activeEngine.toUpperCase()}`,
    `Synthesizing evaluation for query: "${query}". Based on verified telemetry across 1,420+ indexed benchmarks, we recommend evaluating Claude 3.7 Sonnet for multi-step reasoning and deploying DeepSeek R1 via vLLM for high-throughput batch execution. Data sovereignty and unit cost are optimized through hybrid routing.`,
    ["Latency: 142ms", "Verified SOTA: 2026 Index", "Confidence: 99.4%"]
  );
}

function displayConsoleResponse(title, text, specs) {
  const drawer = document.getElementById("console-response-drawer");
  const card = document.getElementById("console-response-card");
  if (!drawer || !card) return;

  card.innerHTML = `
    <h4>${title}</h4>
    <p>${text}</p>
    <div class="response-specs-grid">
      ${specs.map((s) => `<div><strong>${s.split(":")[0]}:</strong> ${s.split(":")[1] || ""}</div>`).join("")}
    </div>
  `;
  drawer.classList.add("active");
}

// Modal Spec Drawer
function openSpecModal(modelId) {
  const model = directoryItems.find((m) => m.id === modelId) || directoryItems[0];
  const modal = document.getElementById("spec-modal");
  if (!modal) return;

  document.getElementById("modal-title").textContent = model.title;
  document.getElementById("modal-provider").textContent = model.provider;
  document.getElementById("modal-benchmark").textContent = model.benchmark;
  document.getElementById("modal-context").textContent = model.context;
  document.getElementById("modal-input-rate").textContent = model.inputRate;
  document.getElementById("modal-output-rate").textContent = model.outputRate;
  document.getElementById("modal-description").textContent = model.description;
  document.getElementById("modal-code").textContent = model.code;
  const link = document.getElementById("modal-link");
  if (link) link.href = model.link;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSpecModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains("btn-close-drawer")) return;
  const modal = document.getElementById("spec-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function copyModalCode() {
  const code = document.getElementById("modal-code");
  if (code) {
    navigator.clipboard.writeText(code.textContent || "");
    alert("Code snippet copied to clipboard.");
  }
}

// Copy prompt blueprint handler
const promptBlueprints = {
  "thinking-controller": `You are an elite reasoning model. Calibrate your extended thinking tokens proportionally to problem complexity:
- For simple factual retrieval or syntax corrections: bypass deep reasoning; output the answer directly.
- For architectural design, mathematical proofs, or refactoring with multiple dependencies: initiate chain-of-thought verification, state all edge cases, and evaluate alternatives before presenting the final code.`,
  "self-reflection": `Before generating the final implementation:
1. Write 3 targeted unit test assertions covering edge cases.
2. Outline the exact reversible diff.
3. Mentally execute the code against the tests.
4. If a regression occurs, self-correct in thinking before outputting.`,
  "mcp-coordinator": `You are an autonomous orchestrator connected to Model Context Protocol (MCP) servers.
When fulfilling tasks:
1. Always list available tools via MCP discovery.
2. Never hallucinate tool parameters; adhere strictly to tool schemas.
3. Validate tool outputs before proceeding to subsequent action steps.`,
};

function copyPrompt(key, btn) {
  const text = promptBlueprints[key] || key;
  navigator.clipboard.writeText(text);

  const original = btn.textContent;
  btn.textContent = "✓ Copied Blueprint";
  setTimeout(() => {
    btn.textContent = original;
  }, 2400);
}

// FAQ Accordion Toggle
function toggleFaq(btn) {
  const item = btn.closest(".accordion-item");
  if (!item) return;
  const wasOpen = item.classList.contains("open");

  document.querySelectorAll(".accordion-item").forEach((el) => el.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
}

// Newsletter subscription handler
function handleSubscribe(e) {
  e.preventDefault();
  const input = document.getElementById("footer-email-input");
  const form = document.getElementById("footer-subscribe-form");
  const status = document.getElementById("subscribe-status");

  if (input && input.value.trim()) {
    if (form) form.style.display = "none";
    if (status) status.style.display = "block";
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderDirectory();
  updateCostChart();

  // Category filter listeners
  document.querySelectorAll(".search-filter-pills .filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".search-filter-pills .filter-pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter") || "all";
      renderDirectory();
    });
  });

  // Search input listener
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentQuery = e.target.value;
      renderDirectory();
    });
  }

  // Keyboard shortcut ⌘K
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const input = document.getElementById("console-prompt-input") || searchInput;
      input?.focus();
    }
    if (e.key === "Escape") {
      closeSpecModal();
    }
  });

  const navSearchBtn = document.getElementById("nav-search-btn");
  if (navSearchBtn) {
    navSearchBtn.addEventListener("click", () => {
      document.getElementById("console-prompt-input")?.focus();
    });
  }
});
