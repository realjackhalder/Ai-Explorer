"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "all" | "models" | "prompts" | "templates" | "repos";
type Item = { type: Exclude<Category, "all">; title: string; label: string; description: string; badge: string };

const filters: { id: Category; label: string }[] = [
  { id: "all", label: "All picks" }, { id: "models", label: "AI models" },
  { id: "prompts", label: "Prompt kits" }, { id: "templates", label: "Templates" }, { id: "repos", label: "Open source" },
];

const items: Item[] = [
  { type: "models", title: "Claude Fable 5.1", label: "Anthropic · Frontier", description: "Frontier coding, knowledge work, research, and long-running tasks.", badge: "Reasoning · Agents" },
  { type: "models", title: "GPT-6 Astra", label: "OpenAI · Agentic", description: "Flagship computer use, professional work, research, and coding.", badge: "1M context · API" },
  { type: "models", title: "Grok 4.6", label: "xAI · Frontier", description: "Coding, agentic tasks, and knowledge work with vision input.", badge: "500K context · Vision" },
  { type: "models", title: "Kimi K3", label: "Moonshot AI · Open weights", description: "Open frontier intelligence with a 1M-token context and native vision.", badge: "Open source · Vision" },
  { type: "models", title: "Gemini 3.8 Flash", label: "Google · Fast multimodal", description: "Production-ready speed for browser, mobile, and desktop agents.", badge: "Multimodal · API" },
  { type: "prompts", title: "The startup operator pack", label: "Prompt kit", description: "18 prompts for sharper decisions and faster shipping.", badge: "Strategy · Ops" },
  { type: "templates", title: "The one-page strategy memo", label: "Writing", description: "A thinking template for when the stakes are high.", badge: "8 min read" },
  { type: "repos", title: "LangChain", label: "Open source", description: "Frameworks for applications powered by language models.", badge: "★ 91.3k" },
  { type: "repos", title: "browser-use", label: "Open source", description: "Make websites accessible for AI agents.", badge: "★ 61.8k" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Explorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Category>("all");
  const visible = useMemo(() => items.filter((item) => (filter === "all" || item.type === filter) && `${item.title} ${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.getElementById("model-search")?.focus(); } };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <>
    <div className="grain" />
    <header className="topbar"><a className="brand" href="#top"><b>✦</b> AI EXPLORER</a><nav><a href="#explore">Explore</a><a href="#prompts">Prompts</a><a href="#projects">Projects</a><a href="#open-source">Open source</a></nav><a className="nav-cta" href="mailto:hello@aiexplorer.dev">Submit a project <Arrow /></a></header>
    <main id="top">
      <section className="hero"><p className="eyebrow"><i />The field guide to applied intelligence</p><h1>Find the next<br /><em>thing to build.</em></h1><p className="hero-copy">A carefully indexed universe of AI models, useful prompts, thoughtful templates, and open-source projects worth knowing.</p><label className="search-wrap"><span>⌕</span><input id="model-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search models, prompts, repos, projects…" /><kbd>⌘ K</kbd></label><div className="trending"><small>Trending now</small><button onClick={() => { setFilter("models"); setQuery("reasoning"); }}>Reasoning models</button><button onClick={() => { setFilter("models"); setQuery("agentic"); }}>Agentic workflows</button><button onClick={() => { setFilter("models"); setQuery("vision"); }}>Vision models</button></div><div className="orb orb-one" /><div className="orb orb-two" /></section>
      <section className="ticker"><div>THE AI FIELD IS MOVING FAST <b>✦</b> KEEP YOUR BEARINGS <b>✦</b> THE AI FIELD IS MOVING FAST <b>✦</b> KEEP YOUR BEARINGS <b>✦</b></div></section>
      <section className="section" id="explore"><div className="section-head"><div><p className="eyebrow"><i />Explore the landscape</p><h2>One place. <em>Every signal.</em></h2></div><a className="text-link" href="#model-directory">See the full index →</a></div><div className="filters" role="tablist">{filters.map((option) => <button key={option.id} onClick={() => setFilter(option.id)} className={filter === option.id ? "active" : ""}>{option.label} <b>{option.id === "all" ? items.length : items.filter((item) => item.type === option.id).length}</b></button>)}</div><div className="feature-grid"><article className="feature-card violet"><div className="card-meta"><span>FEATURED MODEL</span><span>● CURRENT</span></div><div className="model-glyph">✳</div><h3>Claude<br />Fable 5.1</h3><p>Frontier coding, knowledge work, and long-horizon reasoning.</p><footer>Anthropic · September 2026 <a href="https://www.anthropic.com/claude-fable-and-mythos-5-1" target="_blank" rel="noreferrer"><Arrow /></a></footer></article><article className="feature-card lime"><div className="card-meta"><span>PROMPT KIT</span><span>01 / 06</span></div><div className="quote">“</div><h3>The startup<br />operator pack</h3><p>18 prompts for sharper decisions and faster shipping.</p><footer>Strategy · Ops <button onClick={() => setFilter("prompts")}><Arrow /></button></footer></article><article className="feature-card black"><div className="card-meta"><span>OPEN SOURCE</span><span>★ 91.3k</span></div><div className="repo-glyph">◈</div><h3>LangChain</h3><p>Frameworks for developing applications powered by language models.</p><footer>Python · TypeScript <a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noreferrer"><Arrow /></a></footer></article></div></section>
      <section className="section models" id="model-directory"><div className="section-head"><div><p className="eyebrow"><i />Models worth your time</p><h2>Start with the <em>right brain.</em></h2></div><span className="text-link">{visible.length} matches</span></div><div className="model-list">{visible.length ? visible.map((item, index) => <article className="model-row" key={item.title}><span className="rank">{String(index + 1).padStart(2, "0")}</span><span className={`logo ${item.type}`}>{item.title[0]}</span><div><h3>{item.title}</h3><p>{item.label}</p></div><p className="description">{item.description}</p><span className="tags">{item.badge}</span><button aria-label={`View ${item.title}`}><Arrow /></button></article>) : <p className="empty">No picks found. Try a broader search.</p>}</div></section>
      <section className="section prompt-section" id="prompts"><div><p className="eyebrow"><i />Prompt library</p><h2>Prompts that turn<br />blank pages into<br /><em>momentum.</em></h2><p>Less prompt engineering theatre. More practical starting points from people doing the work.</p><button className="button-light" onClick={() => { setFilter("prompts"); document.getElementById("model-directory")?.scrollIntoView(); }}>Browse all prompt kits →</button></div><div className="paper-stack"><article className="paper"><span>PRODUCT</span><h3>Turn user interviews into a product brief</h3><p>Extract decisions, tensions, and a focused next experiment.</p><footer>12 min read <b>→</b></footer></article><article className="paper purple"><span>WRITING</span><h3>The one-page strategy memo</h3><p>A thinking template for when the stakes are high.</p><footer>8 min read <b>→</b></footer></article></div></section>
      <section className="section projects" id="projects"><div className="section-head"><div><p className="eyebrow"><i />Built in public</p><h2>Projects with <em>traction.</em></h2></div><a className="text-link" href="#open-source">Explore projects →</a></div><div className="project-grid">{[["V","Visualize","Turn any idea into a living visual narrative.","violet-art"],["◒","Continue","The open-source AI code assistant.","lime-art"],["◉","v0","Generative UI from a simple text prompt.","line-art"]].map(([symbol, name, copy, art]) => <article className="project-card" key={name}><div className={`project-art ${art}`}><span>{symbol}</span></div><small>DESIGN · AI</small><h3>{name}</h3><p>{copy}</p></article>)}</div></section>
      <section className="section open-source" id="open-source"><div><p className="eyebrow"><i />Open-source radar</p><h2>What builders are<br /><em>actually starring.</em></h2></div><div className="repo-list">{["browser-use", "Open WebUI", "ComfyUI"].map((repo, index) => <article key={repo}><span>0{index + 1}</span><div><h3>{repo}</h3><p>{index === 0 ? "Make websites accessible for AI agents." : index === 1 ? "User-friendly self-hosted AI interface." : "A powerful node-based image workflow."}</p></div><b>★ {index === 0 ? "61.8k" : index === 1 ? "78.2k" : "63.3k"}</b><button><Arrow /></button></article>)}</div></section>
    </main><footer className="site-footer"><a className="brand" href="#top"><b>✦</b> AI EXPLORER</a><p>Signal over noise, every day.</p><div><a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div></footer>
  </>;
}
