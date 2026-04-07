"use client";

import { useState } from "react";

const fields = [
  "AI / ML",
  "Web Dev",
  "DevOps",
  "Cybersecurity",
  "Mobile",
  "Databases",
] as const;

type Field = (typeof fields)[number];

interface Project {
  name: string;
  description: string;
  stars: string;
  language: string;
}

const projectsByField: Record<Field, Project[]> = {
  "AI / ML": [
    { name: "pytorch", description: "Tensors and dynamic neural networks in Python with strong GPU acceleration.", stars: "83.4k", language: "Python" },
    { name: "langchain", description: "Build context-aware reasoning applications with LLMs.", stars: "96.2k", language: "Python" },
    { name: "ollama", description: "Get up and running with large language models locally.", stars: "102k", language: "Go" },
    { name: "stable-diffusion-webui", description: "A browser interface for Stable Diffusion image generation.", stars: "142k", language: "Python" },
  ],
  "Web Dev": [
    { name: "next.js", description: "The React framework for the web with hybrid rendering.", stars: "127k", language: "TypeScript" },
    { name: "tailwindcss", description: "A utility-first CSS framework for rapid UI development.", stars: "83.6k", language: "TypeScript" },
    { name: "svelte", description: "Cybernetically enhanced web apps with a compiler-first approach.", stars: "80.1k", language: "TypeScript" },
    { name: "astro", description: "The web framework for content-driven websites.", stars: "47.3k", language: "TypeScript" },
  ],
  "DevOps": [
    { name: "terraform", description: "Infrastructure as code for building and managing cloud resources.", stars: "43.1k", language: "Go" },
    { name: "kubernetes", description: "Production-grade container scheduling and management.", stars: "112k", language: "Go" },
    { name: "grafana", description: "Open and composable observability and data visualization platform.", stars: "65.4k", language: "TypeScript" },
  ],
  "Cybersecurity": [
    { name: "nuclei", description: "Fast and customizable vulnerability scanner based on YAML templates.", stars: "21.2k", language: "Go" },
    { name: "metasploit-framework", description: "The world's most used penetration testing framework.", stars: "34.2k", language: "Ruby" },
    { name: "burpsuite-extensions", description: "Community-contributed extensions for Burp Suite.", stars: "8.3k", language: "Java" },
  ],
  "Mobile": [
    { name: "flutter", description: "Google's UI toolkit for building natively compiled applications.", stars: "166k", language: "Dart" },
    { name: "react-native", description: "Build mobile apps using React and native platform capabilities.", stars: "119k", language: "TypeScript" },
    { name: "expo", description: "An open-source platform for universal native apps with React.", stars: "35.4k", language: "TypeScript" },
  ],
  "Databases": [
    { name: "supabase", description: "The open source Firebase alternative with Postgres at its core.", stars: "74.6k", language: "TypeScript" },
    { name: "drizzle-orm", description: "Headless TypeScript ORM with a head for SQL lovers.", stars: "25.1k", language: "TypeScript" },
    { name: "redis", description: "In-memory data structure store used as database, cache, and broker.", stars: "67.2k", language: "C" },
    { name: "clickhouse", description: "Column-oriented database for real-time analytics at scale.", stars: "38.5k", language: "C++" },
  ],
};

export default function OpenSourcePage() {
  const [activeField, setActiveField] = useState<Field>("AI / ML");

  const projects = projectsByField[activeField];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">
          Open Source Projects
        </h2>
        <p className="mt-1 text-sm text-muted">
          Trending open source projects across different fields.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {fields.map((field) => (
          <button
            key={field}
            onClick={() => setActiveField(field)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors cursor-pointer ${
              activeField === field
                ? "border-accent-purple bg-accent-purple/10 text-foreground"
                : "border-border text-muted hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {field}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover"
          >
            <p className="text-sm font-medium text-foreground">
              {project.name}
            </p>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              {project.description}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {project.stars}
              </span>
              <span className="rounded-md border border-border px-2 py-0.5">
                {project.language}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
