"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "all" | "frontier" | "open-weights" | "agents" | "infrastructure";

interface DirectoryItem {
  id: string;
  rank: string;
  type: Exclude<Category, "all">;
  title: string;
  provider: string;
  avatarClass: string;
  description: string;
  badge: string;
  metric: string;
  benchmark: string;
  context: string;
  inputRate: string;
  outputRate: string;
  code: string;
  link: string;
}

const directoryItems: DirectoryItem[] = [
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
    metric: "$0.55 / $2.19 (or $0 Local)",
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

const presetAnswers: Record<string, { title: string; text: string; specs: string[] }> = {
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

const promptBlueprints: Record<string, string> = {
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

const missionTracks = [
  {
    title: "Track 01: Federal Health AI (TrumpRx & FDA Price Verification)",
    body: "Deploying specialized mathematical reasoning models to cross-reference global prescription pricing, automate manufacturer coupons, and ensure Most-Favored-Nation prices for every American family.",
  },
  {
    title: "Track 02: Scientific Supercomputing (Genesis Mission Across 17 Labs)",
    body: "Building high-performance compute fabrics integrating Frontier, Aurora, and El Capitan supercomputers with scientific AI models to double national research velocity within a decade.",
  },
  {
    title: "Track 03: Radical Friction Reduction (90 Clicks to 9)",
    body: "Retiring antiquated paper mines and Byzantine bureaucratic websites. Using autonomous browser-use and verified form synthesis to give Americans back their 10 billion lost hours.",
  },
  {
    title: "Track 04: Sovereign Edge Computing & Zero Foreign Telemetry",
    body: "Hardening federal agencies with locally hosted open-weights runtimes (vLLM and Ollama), ensuring zero citizen data leaves sovereign boundaries.",
  },
];

export default function Explorer() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [activeCostTab, setActiveCostTab] = useState<"reasoning" | "vision" | "agents">("reasoning");
  const [volumeMillions, setVolumeMillions] = useState(50);
  const [activeTier, setActiveTier] = useState<1 | 2 | 3 | 4>(1);
  const [openTrack, setOpenTrack] = useState<number | null>(0);
  const [selectedSpecModel, setSelectedSpecModel] = useState<DirectoryItem | null>(null);
  const [consoleQuery, setConsoleQuery] = useState("");
  const [activeEngine, setActiveEngine] = useState("Claude 3.7");
  const [consoleResponse, setConsoleResponse] = useState<{ title: string; text: string; specs: string[] } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filtered directory items
  const filteredItems = useMemo(() => {
    return directoryItems.filter((item) => {
      const matchesFilter = activeFilter === "all" || item.type === activeFilter;
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.provider.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.badge.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  // Keyboard shortcut ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.getElementById("console-prompt-input") || document.getElementById("search-input");
        input?.focus();
      }
      if (e.key === "Escape") {
        setSelectedSpecModel(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Card 3D tilt calculation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  // Cost calculations
  const legacyRate = activeCostTab === "reasoning" ? 15.0 : activeCostTab === "vision" ? 12.5 : 24.0;
  const optRate = activeCostTab === "reasoning" ? 0.45 : activeCostTab === "vision" ? 0.60 : 0.85;
  const legacyTotal = (volumeMillions * legacyRate).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const optTotal = (volumeMillions * optRate).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  const savings = (volumeMillions * (legacyRate - optRate)).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const pct = Math.round(((legacyRate - optRate) / legacyRate) * 100);

  // Console query trigger
  const handleConsoleSubmit = () => {
    if (!consoleQuery.trim()) return;
    setConsoleResponse({
      title: `Analysis from Engine: ${activeEngine.toUpperCase()}`,
      text: `Synthesizing evaluation for query: "${consoleQuery}". Based on verified telemetry across 1,420+ indexed benchmarks, we recommend evaluating Claude 3.7 Sonnet for multi-step reasoning and deploying DeepSeek R1 via vLLM for high-throughput batch execution. Data sovereignty and unit cost are optimized through hybrid routing.`,
      specs: ["Latency: 142ms", "Verified SOTA: 2026 Index", "Confidence: 99.4%"],
    });
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2400);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <>
      <div className="film-grain" />

      {/* 1. Official Government Top Ribbon */}
      <div className="gov-ribbon">
        <div className="gov-ribbon-left">
          <div className="usa-flag" aria-hidden="true" />
          <span>An Official Index of Applied Intelligence · AI.Explorer.gov</span>
        </div>
        <div className="gov-ribbon-right">
          <span className="live-indicator">
            <span className="live-dot" /> Live Telemetry Active
          </span>
          <span>Updated September 2026</span>
        </div>
      </div>

      {/* 2. Precision Top Navigation Bar */}
      <header className="header-nav">
        <a href="#top" className="brand-pill" aria-label="AI Explorer Home">
          <span>AI</span>
          <span className="divider" />
          <span className="brand-italic">Explorer</span>
        </a>

        <nav className="nav-links" aria-label="Primary Navigation">
          <a href="#console" className="nav-link">AI Console</a>
          <a href="#pass" className="nav-link">Compute Pass</a>
          <a href="#hierarchy" className="nav-link">AI Stack</a>
          <a href="#economics" className="nav-link">Cost Reset</a>
          <a href="#directory" className="nav-link">Directory</a>
          <a href="#prompts" className="nav-link">Blueprints</a>
          <a href="#tracks" className="nav-link">Missions</a>
        </nav>

        <div className="nav-actions">
          <button
            className="btn-search-trigger"
            onClick={() => document.getElementById("console-prompt-input")?.focus()}
            aria-label="Search directory"
          >
            <span>Search</span>
            <span className="kbd-badge">⌘ K</span>
          </button>
          <a
            href="mailto:submit@aiexplorer.gov?subject=Model%20Submission"
            className="btn-primary-pill"
          >
            Submit Model <span>↗</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* 3. Monumental Hero Section */}
        <section className="hero-section">
          <div className="hero-meta-row">
            <div className="hero-badge-pill">
              <span>●</span> 2026 Frontier Intelligence &amp; Autonomous Systems
            </div>
            <div className="font-mono text-nds-caption" style={{ color: "var(--ink-muted)" }}>
              Section 508 Compliant · Zero Commercial Telemetry Policy
            </div>
          </div>

          <h1 className="hero-title">
            Find the next<br />
            <em>thing to build.</em>
          </h1>

          <p className="hero-sub">
            A national index of frontier intelligence, hybrid reasoning models, Model Context Protocol (MCP) agents, and open-weights sovereign infrastructure.
          </p>

          {/* America.gov Style Conversational AI Prompt Console */}
          <div className="prompt-console" id="console">
            <div className="prompt-console-header">
              <span>Ask the AI Explorer Intelligence Engine</span>
              <div className="engine-badges">
                {["Claude 3.7", "DeepSeek R1", "Gemini 2.0", "o3-mini"].map((eng) => (
                  <button
                    key={eng}
                    className={`engine-btn ${activeEngine === eng ? "active" : ""}`}
                    onClick={() => setActiveEngine(eng)}
                  >
                    {eng}
                  </button>
                ))}
              </div>
            </div>

            <div className="prompt-input-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="console-prompt-input"
                className="console-input"
                type="text"
                placeholder="Ask anything (e.g., 'Compare Claude 3.7 vs DeepSeek R1 for code' or 'Best open-weights model for local vLLM')..."
                value={consoleQuery}
                onChange={(e) => setConsoleQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConsoleSubmit()}
              />
              <button className="btn-console-submit" onClick={handleConsoleSubmit}>Query Engine →</button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="prompt-chips-row">
              <span style={{ color: "var(--ink-subtle)" }}>Suggested:</span>
              <button
                className="prompt-chip"
                onClick={() => {
                  setConsoleQuery("Best code reasoning per dollar?");
                  setConsoleResponse(presetAnswers["best-code-ratio"]);
                }}
              >
                Best code reasoning per dollar?
              </button>
              <button
                className="prompt-chip"
                onClick={() => {
                  setConsoleQuery("DeepSeek R1 vs o3-mini?");
                  setConsoleResponse(presetAnswers["deepseek-vs-o3"]);
                }}
              >
                DeepSeek R1 vs o3-mini?
              </button>
              <button
                className="prompt-chip"
                onClick={() => {
                  setConsoleQuery("What is Model Context Protocol (MCP)?");
                  setConsoleResponse(presetAnswers["mcp-setup"]);
                }}
              >
                What is Model Context Protocol (MCP)?
              </button>
              <button
                className="prompt-chip"
                onClick={() => {
                  setConsoleQuery("Local 32B model VRAM requirements?");
                  setConsoleResponse(presetAnswers["local-vram"]);
                }}
              >
                Local 32B model VRAM requirements?
              </button>
            </div>

            {/* Response Drawer */}
            {consoleResponse && (
              <div className="console-response-drawer active">
                <div className="response-card">
                  <h4>{consoleResponse.title}</h4>
                  <p>{consoleResponse.text}</p>
                  <div className="response-specs-grid">
                    {consoleResponse.specs.map((s, idx) => (
                      <div key={idx}>
                        <strong>{s.split(":")[0]}:</strong> {s.split(":")[1] || ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="search-filter-pills" role="tablist" aria-label="Filter directory categories">
            {[
              { id: "all", label: "All Ecosystem", count: directoryItems.length },
              { id: "frontier", label: "Frontier Reasoning", count: directoryItems.filter((i) => i.type === "frontier").length },
              { id: "open-weights", label: "Open Weights & SLMs", count: directoryItems.filter((i) => i.type === "open-weights").length },
              { id: "agents", label: "Agents & Protocols", count: directoryItems.filter((i) => i.type === "agents").length },
              { id: "infrastructure", label: "Inference Engines", count: directoryItems.filter((i) => i.type === "infrastructure").length },
            ].map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                className={`filter-pill ${activeFilter === f.id ? "active" : ""}`}
                onClick={() => setActiveFilter(f.id as Category)}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </section>

        {/* 4. Live Statistics Matrix Banner */}
        <section className="stats-banner" aria-label="Ecosystem metrics">
          <div className="stats-grid">
            <div className="stat-cell">
              <div className="stat-mono-label">SWE-bench Verified</div>
              <div className="stat-value">70.3%</div>
              <div className="stat-detail">Claude 3.7 Sonnet SOTA</div>
            </div>
            <div className="stat-cell">
              <div className="stat-mono-label">Math 500 Benchmark</div>
              <div className="stat-value">97.3%</div>
              <div className="stat-detail">DeepSeek R1 Open Weights</div>
            </div>
            <div className="stat-cell">
              <div className="stat-mono-label">Context Horizon</div>
              <div className="stat-value">2.0M</div>
              <div className="stat-detail">Gemini 2.0 native multimodal</div>
            </div>
            <div className="stat-cell">
              <div className="stat-mono-label">Median API Reset</div>
              <div className="stat-value">-97.2%</div>
              <div className="stat-detail">Distilled open weights vs legacy</div>
            </div>
          </div>
        </section>

        {/* 5. Section I: TrumpCard.gov 3D Perspective National Compute Pass */}
        <section className="section-wrapper" id="pass">
          <div className="section-numeral-head">
            <span className="roman-numeral">I · Credentials</span>
            <span className="section-title-line">The National AI Compute Pass</span>
          </div>

          <div className="compute-card-section">
            <div className="compute-card-copy">
              <h2>Dignity &amp; Sovereignty<br /><em>for American Builders.</em></h2>
              <p>
                Modeled after the executive standards of <strong>America by Design</strong>, the National Compute Pass provides authenticated developers, researchers, and engineers with direct access to non-commercial sovereign AI mirrors, certified zero-retention API endpoints, and subsidized national laboratory clusters.
              </p>
              <ul className="card-privileges">
                <li>Direct routing to high-throughput vLLM clusters at the 17 DOE National Labs</li>
                <li>Priority token queues for certified non-retention reasoning endpoints</li>
                <li>Zero foreign telemetry and full Section 508 accessibility compliance</li>
                <li>Pre-configured Model Context Protocol (MCP) server endpoints</li>
              </ul>
            </div>

            {/* 3D Perspective Card */}
            <div className="card-3d-wrapper">
              <div
                className="card-3d"
                id="compute-pass-card"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="card-top-row">
                  <div className="card-chip" />
                  <div className="card-seal-text">
                    Executive Office<br />
                    National Design Studio<br />
                    EO 14338
                  </div>
                </div>

                <div className="card-number">
                  4700 · 2026 · 8891 · 0042
                </div>

                <div className="card-bottom-row">
                  <div>
                    <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cardholder</div>
                    <div className="card-holder">FRONTIER BUILDER</div>
                  </div>
                  <div className="card-tier-badge">
                    Tier 1 Citizen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Section II: RealFood.gov Inverted AI Stack Pyramid */}
        <section className="section-wrapper" id="hierarchy">
          <div className="section-numeral-head">
            <span className="roman-numeral">II · Architecture</span>
            <span className="section-title-line">The Modern AI Stack Hierarchy</span>
          </div>

          <div className="pyramid-section">
            <div className="pyramid-container">
              {[1, 2, 3, 4].map((tierNum) => {
                const data = pyramidTierData[tierNum as 1 | 2 | 3 | 4];
                return (
                  <div
                    key={tierNum}
                    className={`pyramid-tier tier-${tierNum} ${activeTier === tierNum ? "active" : ""}`}
                    onClick={() => setActiveTier(tierNum as 1 | 2 | 3 | 4)}
                  >
                    <div className="tier-header">
                      <span className="tier-title">{data.title}</span>
                      <span className="tier-level">
                        {tierNum === 1 ? "Apex Level" : tierNum === 2 ? "Cognitive Core" : tierNum === 3 ? "Task Execution" : "Foundation"}
                      </span>
                    </div>
                    <p className="tier-desc">{data.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="tier-detail-card">
              <small className="font-mono text-nds-caption" style={{ color: "var(--accent-blue)", textTransform: "uppercase" }}>
                Architecture Prescription
              </small>
              <h3>{pyramidTierData[activeTier].title}</h3>
              <p>{pyramidTierData[activeTier].desc}</p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-subtle)", marginBottom: "8px" }}>
                Key Technologies at This Layer:
              </div>
              <div className="tier-models-list">
                {pyramidTierData[activeTier].models.map((m, idx) => (
                  <span key={idx} className="tier-model-tag">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Section III: TrumpRx Style Live Cost & Latency Benchmark */}
        <section className="section-wrapper" id="economics">
          <div className="section-numeral-head">
            <span className="roman-numeral">III · Economics</span>
            <span className="section-title-line">Interactive Token Volume &amp; Price Reset Simulator</span>
          </div>

          <div className="cost-comparison-card">
            <div className="cost-chart-header">
              <div>
                <h3 className="cost-chart-title">The Frontier Price Reset</h3>
                <p className="cost-chart-subtitle">
                  {activeCostTab === "reasoning" && "Complex Multi-Step Reasoning & Chain-of-Thought Workloads"}
                  {activeCostTab === "vision" && "High-Resolution Multimodal OCR & Spatial Analysis"}
                  {activeCostTab === "agents" && "Continuous Autonomous Code Refactoring & Browser Action Loops"}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                {(["reasoning", "vision", "agents"] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`filter-pill ${activeCostTab === tab ? "active" : ""}`}
                    onClick={() => setActiveCostTab(tab)}
                    style={{ textTransform: "capitalize" }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Monthly Volume Slider */}
            <div className="volume-slider-box">
              <div className="slider-label-row">
                <span style={{ color: "var(--ink-muted)", textTransform: "uppercase" }}>Simulated Monthly Token Consumption</span>
                <span className="slider-val-highlight">{volumeMillions} Million Tokens / mo</span>
              </div>
              <input
                type="range"
                className="volume-range-input"
                min="5"
                max="500"
                step="5"
                value={volumeMillions}
                onChange={(e) => setVolumeMillions(parseInt(e.target.value, 10))}
              />
            </div>

            <div className="comparison-columns-grid">
              {/* Legacy Column */}
              <div className="comp-col">
                <div className="comp-price-tag danger">
                  {legacyTotal} <span className="unit">/ month</span>
                </div>
                <div
                  className="comp-bar high"
                  style={{ height: `${Math.min(300, Math.max(120, volumeMillions * 0.6 + 100))}px` }}
                />
              </div>

              {/* Optimized Open Weights Column */}
              <div className="comp-col">
                <div className="comp-price-tag success">
                  {optTotal} <span className="unit">/ month</span>
                </div>
                <div
                  className="comp-bar low"
                  style={{ height: `${Math.min(90, Math.max(40, (volumeMillions * 0.6 + 100) * 0.18))}px` }}
                >
                  <span className="comp-savings-badge">
                    Save {savings} / mo ({pct}% Reduction)
                  </span>
                </div>
              </div>
            </div>

            <div className="comp-footer-meta">
              <div>
                <div className="comp-meta-label">Legacy Closed API Pricing</div>
                <div className="comp-meta-sub">Standard Proprietary Pay-per-Token Cloud</div>
              </div>
              <div>
                <div className="comp-meta-label">Distilled Open Weights / vLLM</div>
                <div className="comp-meta-sub">DeepSeek R1 / Llama 3.3 Sovereign Compute</div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Section IV: The Master Directory with Detailed Spec Drawer */}
        <section className="section-wrapper" id="directory">
          <div className="section-numeral-head">
            <span className="roman-numeral">IV · Master Index</span>
            <span className="section-title-line">
              {filteredItems.length} Models &amp; Assets Cataloged
            </span>
          </div>

          <div className="directory-table-head">
            <span>Rank</span>
            <span>Entity &amp; Lab</span>
            <span>Functional Scope</span>
            <span>Context / Quant</span>
            <span>Unit Rate</span>
            <span style={{ textAlign: "right" }}>Inspect</span>
          </div>

          <div className="directory-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="directory-row"
                  onClick={() => setSelectedSpecModel(item)}
                >
                  <span className="row-index">{item.rank}</span>
                  <div className="row-brand">
                    <div className={`row-avatar ${item.avatarClass}`}>
                      {item.title.charAt(0)}
                    </div>
                    <div className="row-name">
                      <h4>{item.title}</h4>
                      <p>{item.provider}</p>
                    </div>
                  </div>
                  <div className="row-desc">{item.description}</div>
                  <div className="row-spec">
                    <span className="row-spec-badge">{item.badge}</span>
                  </div>
                  <div className="row-metric">{item.metric}</div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn-inspect-spec"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpecModel(item);
                      }}
                    >
                      Specs ↗
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-muted)" }}>
                No assets matched your search query. Try typing &ldquo;Claude 3.7&rdquo; or &ldquo;DeepSeek&rdquo;.
              </div>
            )}
          </div>
        </section>

        {/* 9. Section V: Collaborators Infinite Marquee (Genesis Style) */}
        <section className="marquee-wrapper" aria-label="Collaborating ecosystem labs">
          <div className="marquee-track">
            <span>Anthropic</span><b>✦</b>
            <span>DeepSeek</span><b>✦</b>
            <span>OpenAI</span><b>✦</b>
            <span>Google DeepMind</span><b>✦</b>
            <span>Meta AI</span><b>✦</b>
            <span>Alibaba Qwen</span><b>✦</b>
            <span>xAI</span><b>✦</b>
            <span>Hugging Face</span><b>✦</b>
            <span>vLLM Project</span><b>✦</b>
            <span>Ollama</span><b>✦</b>
            <span>Model Context Protocol</span><b>✦</b>
            <span>Anthropic</span><b>✦</b>
            <span>DeepSeek</span><b>✦</b>
            <span>OpenAI</span><b>✦</b>
            <span>Google DeepMind</span><b>✦</b>
            <span>Meta AI</span><b>✦</b>
            <span>Alibaba Qwen</span><b>✦</b>
            <span>xAI</span><b>✦</b>
          </div>
        </section>

        {/* 10. Section VI: Battle-Tested Prompt Library */}
        <section className="section-wrapper" id="prompts">
          <div className="section-numeral-head">
            <span className="roman-numeral">V · Blueprints</span>
            <span className="section-title-line">2026 Production System Prompts</span>
          </div>

          <div className="prompt-grid">
            <article className="prompt-card">
              <div>
                <div className="prompt-card-top">
                  <span className="prompt-tag">Hybrid Reasoning</span>
                  <span className="prompt-reading-time">Claude 3.7 Calibrated</span>
                </div>
                <h3>Extended Thinking Budget Controller</h3>
                <p>Directs Claude 3.7 or DeepSeek R1 to calibrate reasoning tokens proportionally to problem complexity without overthinking simple tasks.</p>
              </div>
              <div className="prompt-card-footer">
                <button
                  className="btn-copy-prompt"
                  onClick={() => handleCopy("thinking", promptBlueprints["thinking-controller"])}
                >
                  {copiedKey === "thinking" ? "✓ Copied Blueprint" : "Copy Blueprint →"}
                </button>
                <span className="font-mono text-nds-micro" style={{ color: "var(--ink-subtle)" }}>
                  Verified System
                </span>
              </div>
            </article>

            <article className="prompt-card">
              <div>
                <div className="prompt-card-top">
                  <span className="prompt-tag">Self-Verification</span>
                  <span className="prompt-reading-time">DeepSeek R1 Optimized</span>
                </div>
                <h3>Structured Self-Reflection Loop</h3>
                <p>Forces autonomous code agents to generate test cases first, evaluate diffs against edge cases, and execute verification before outputting.</p>
              </div>
              <div className="prompt-card-footer">
                <button
                  className="btn-copy-prompt"
                  onClick={() => handleCopy("reflection", promptBlueprints["self-reflection"])}
                >
                  {copiedKey === "reflection" ? "✓ Copied Blueprint" : "Copy Blueprint →"}
                </button>
                <span className="font-mono text-nds-micro" style={{ color: "var(--ink-subtle)" }}>
                  Zero Regression
                </span>
              </div>
            </article>

            <article className="prompt-card">
              <div>
                <div className="prompt-card-top">
                  <span className="prompt-tag">Tool Calling</span>
                  <span className="prompt-reading-time">Model Context Protocol</span>
                </div>
                <h3>MCP Universal Tool Coordinator</h3>
                <p>The standard system instruction for coordinating multiple remote MCP servers (filesystem, Postgres, GitHub, browser) in zero-shot workflows.</p>
              </div>
              <div className="prompt-card-footer">
                <button
                  className="btn-copy-prompt"
                  onClick={() => handleCopy("mcp", promptBlueprints["mcp-coordinator"])}
                >
                  {copiedKey === "mcp" ? "✓ Copied Blueprint" : "Copy Blueprint →"}
                </button>
                <span className="font-mono text-nds-micro" style={{ color: "var(--ink-subtle)" }}>
                  Open Protocol
                </span>
              </div>
            </article>
          </div>
        </section>

        {/* 11. Section VII: TechForce AI Corps Tracks Accordion */}
        <section className="section-wrapper" id="tracks">
          <div className="section-numeral-head">
            <span className="roman-numeral">VI · Missions</span>
            <span className="section-title-line">National Civic Technology Challenges</span>
          </div>

          <div className="faq-container">
            <div className="faq-title-area">
              <h2>High-Stakes Missions</h2>
              <p>
                Under the White House's <em>America by Design</em> executive standard, elite technical corps are deploying frontier models to overhaul federal infrastructure.
              </p>
            </div>

            <div className="accordion-list">
              {missionTracks.map((track, idx) => (
                <div
                  key={idx}
                  className={`accordion-item ${openTrack === idx ? "open" : ""}`}
                >
                  <button
                    className="accordion-trigger"
                    onClick={() => setOpenTrack(openTrack === idx ? null : idx)}
                    aria-expanded={openTrack === idx}
                  >
                    <span>{track.title}</span>
                    <span className="accordion-icon">+</span>
                  </button>
                  <div className="accordion-body">
                    <p>{track.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Section VIII: Dark Mode CTA & Monumental Footer */}
        <section className="dark-cta-section">
          <div className="dark-cta-inner">
            <span
              className="font-mono text-nds-caption"
              style={{ color: "var(--dark-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}
            >
              The Next 250 Years of American Technology
            </span>
            <h2>Ready to build?</h2>
            <p>
              Explore verified models, benchmark your stack, and deploy sovereign intelligence with zero friction.
            </p>
            <div className="dark-cta-buttons">
              <a href="#directory" className="btn-white-pill">
                Explore Master Index <span>↗</span>
              </a>
              <a href="mailto:submit@aiexplorer.gov" className="btn-dark-outline">
                Submit Model or Tool
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 13. Monumental Footer */}
      <footer className="monumental-footer">
        <div className="footer-inner">
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <h3>AI Explorer</h3>
              <p>
                The authoritative national index documenting applied artificial intelligence, frontier hybrid reasoning, and sovereign open-source computing.
              </p>
            </div>

            <div className="footer-nav-col">
              <h4>Directory</h4>
              <div className="footer-nav-links">
                <a href="#console">Prompt Engine</a>
                <a href="#pass">Compute Pass</a>
                <a href="#hierarchy">AI Hierarchy</a>
                <a href="#economics">Cost Reset</a>
                <a href="#directory">Frontier Models</a>
              </div>
            </div>

            <div className="footer-nav-col">
              <h4>Standards</h4>
              <div className="footer-nav-links">
                <a href="#tracks">National Missions</a>
                <a href="#prompts">System Blueprints</a>
                <a href="#tracks">Section 508 Access</a>
                <a href="#tracks">Zero Telemetry</a>
              </div>
            </div>

            <div className="footer-subscribe-col">
              <h4>Dispatch Briefing</h4>
              <p>Weekly intelligence updates on verified frontier models and open-weights breakthroughs.</p>
              {subscribed ? (
                <div className="font-mono text-nds-caption" style={{ color: "var(--accent-green)", padding: "8px 0" }}>
                  ✓ Subscription confirmed. Welcome to the dispatch.
                </div>
              ) : (
                <form className="subscribe-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="subscribe-input"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <button type="submit" className="subscribe-btn">
                    Subscribe →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Giant Wordmark Display */}
          <div className="giant-wordmark-container">
            <div className="giant-wordmark">AI EXPLORER</div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-colophon">
              Designed &amp; Engineered to the <strong>National Design Studio</strong> standard.
            </div>
            <div>
              <span>Washington, D.C. · Eisenhower Executive Office Building</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-Over Spec Drawer Modal */}
      {selectedSpecModel && (
        <div
          className="modal-overlay active"
          onClick={() => setSelectedSpecModel(null)}
        >
          <div className="spec-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="spec-drawer-header">
              <div>
                <h3>{selectedSpecModel.title}</h3>
                <p>{selectedSpecModel.provider}</p>
              </div>
              <button
                className="btn-close-drawer"
                onClick={() => setSelectedSpecModel(null)}
              >
                ✕
              </button>
            </div>

            <div className="spec-metrics-grid">
              <div className="spec-metric-box">
                <small>Benchmark SOTA</small>
                <div>{selectedSpecModel.benchmark}</div>
              </div>
              <div className="spec-metric-box">
                <small>Context Length</small>
                <div>{selectedSpecModel.context}</div>
              </div>
              <div className="spec-metric-box">
                <small>Input Rate</small>
                <div>{selectedSpecModel.inputRate}</div>
              </div>
              <div className="spec-metric-box">
                <small>Output Rate</small>
                <div>{selectedSpecModel.outputRate}</div>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--ink-subtle)", marginBottom: "6px" }}>
              Technical Overview
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--ink-muted)", marginBottom: "20px" }}>
              {selectedSpecModel.description}
            </p>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", color: "var(--ink-subtle)", marginBottom: "6px" }}>
              Quickstart Terminal Execution
            </div>
            <pre className="code-snippet-box">{selectedSpecModel.code}</pre>

            <div style={{ marginTop: "auto", display: "flex", gap: "12px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
              <a
                href={selectedSpecModel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-pill"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Official Documentation <span>↗</span>
              </a>
              <button
                className="btn-search-trigger"
                onClick={() => handleCopy("modal-code", selectedSpecModel.code)}
              >
                {copiedKey === "modal-code" ? "✓ Copied" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
