import React from 'react';
import { createRoot } from 'react-dom/client';
import { frontpostTokens } from '@frontpost/ui';
import './styles/app.css';

const papers = [
  { source: 'ArXiv AI', title: 'A new scaling law for reasoning in large language models', tag: 'LLM' },
  { source: 'Nature', title: 'A safer gene switch for cell therapies', tag: 'Bio Medicine' },
  { source: 'Physical Review', title: 'A Langevin model-based magneto-optic response', tag: 'Physics' },
];

function App() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">FrontPost · 前沿邮报</p>
        <h1 id="hero-title">让前沿研究像每日邮报一样好读、可信、可行动。</h1>
        <p className="lead">AI 摘要、引用追踪、兴趣推荐与跨端阅读体验统一落地。</p>
        <div className="actions"><button>开始阅读</button><button className="ghost">查看规范</button></div>
      </section>
      <section className="feed" aria-label="Recommended papers">
        {papers.map((paper, index) => (
          <article className="paper-card" key={paper.title}>
            <span className="index">{String(index + 1).padStart(2, '0')}</span>
            <div><p>{paper.source}</p><h2>{paper.title}</h2><span>{paper.tag}</span></div>
          </article>
        ))}
      </section>
      <small>Brand color {frontpostTokens.color.brand}</small>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
