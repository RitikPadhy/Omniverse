"use client";

import { useState } from "react";

const topics = [
  { name: "Fintech", notes: 84 },
  { name: "System Design", notes: 61 },
  { name: "Behavioral", notes: 47 },
  { name: "Resume Versions", notes: 32 },
  { name: "Company Research", notes: 23 },
];

const mockNotes: Record<string, { title: string; content: string }> = {
  "razorpay-interview-prep.md": {
    title: "razorpay-interview-prep.md",
    content: `# Razorpay Interview Prep

## Company Overview
- Founded 2014 by Harshil Mathur & Shashank Kumar
- Full-stack payments solution for Indian businesses
- Processes billions in transactions annually
- Key products: Payment Gateway, RazorpayX, Razorpay Capital

## Technical Architecture
- Microservices-based architecture on AWS
- Event-driven processing with Kafka
- MySQL + Redis for primary data stores
- Real-time fraud detection pipeline

## Key Topics to Prepare
1. **Payment Gateway Internals** — how a transaction flows from checkout to settlement
2. **Idempotency** — critical for payment systems, every API call must be safely retryable
3. **Reconciliation** — matching bank statements with internal ledger entries
4. **PCI DSS Compliance** — tokenization, encryption at rest, network segmentation

## Common Interview Questions
- Design a payment gateway that handles 10k TPS
- How would you ensure exactly-once processing for payments?
- Walk through what happens when a user clicks "Pay Now"
- How do you handle partial failures in a distributed payment flow?

## Behavioral Notes
- They value ownership and bias for action
- Be ready to talk about a time you shipped something under pressure
- Culture is very engineering-driven, emphasize technical depth
`,
  },
  "system-design-notes.md": {
    title: "system-design-notes.md",
    content: `# System Design Notes

## Framework for Any Design Question
1. **Clarify requirements** — functional vs non-functional, scale estimates
2. **API design** — define the core endpoints/interfaces
3. **High-level design** — draw the main components and data flow
4. **Deep dive** — pick 1-2 components to detail, discuss trade-offs
5. **Bottlenecks & scaling** — identify limits, propose solutions

## Key Numbers to Remember
- QPS from DAU: \`DAU × queries/user / 86400\`
- Storage: estimate per-record size × records/day × retention
- 1 server ≈ 10k-50k concurrent connections (with async I/O)
- SSD read: ~100μs, HDD seek: ~10ms, network round-trip same DC: ~0.5ms

## Common Patterns
### Rate Limiter
- Token bucket or sliding window counter
- Redis INCR + EXPIRE for distributed rate limiting
- Return 429 with Retry-After header

### URL Shortener
- Base62 encode an auto-increment ID or hash
- Read-heavy: cache popular URLs in Redis
- 301 (permanent) vs 302 (temporary) redirect trade-off

### Chat System
- WebSocket for real-time delivery
- Fan-out on write for small group chats
- Fan-out on read for celebrity/large group scenarios
- Message queue (Kafka) for reliability

### News Feed
- Pull model: query on request (simpler, slower reads)
- Push model: pre-compute feed on write (faster reads, more storage)
- Hybrid: push for normal users, pull for high-follower accounts

## Database Selection Cheat Sheet
| Need | Use |
|------|-----|
| ACID transactions | PostgreSQL / MySQL |
| High write throughput | Cassandra / ScyllaDB |
| Document flexibility | MongoDB |
| Caching / leaderboards | Redis |
| Full-text search | Elasticsearch |
| Time-series data | InfluxDB / TimescaleDB |
| Graph relationships | Neo4j |

## CAP Theorem Reminder
- **CP**: consistency + partition tolerance (e.g., ZooKeeper)
- **AP**: availability + partition tolerance (e.g., Cassandra)
- In practice, choose based on business need: payments → CP, social feed → AP
`,
  },
};

const noteKeys = Object.keys(mockNotes);

export default function KnowledgeBasePage() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(noteKeys[0]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Knowledge base
        </h2>
        <button
          onClick={() => setEditorOpen(true)}
          className="rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-purple/80"
        >
          Open Knowledge Base
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">247</p>
          <p className="text-xs text-muted">Total notes</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-xs text-muted">Topics</p>
        </div>
        <div className="rounded-lg bg-card p-4">
          <p className="text-2xl font-bold text-foreground">91%</p>
          <p className="text-xs text-muted">Outcome rate</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted">
          By Topic
        </h3>
        <div className="space-y-2">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="flex items-center justify-between rounded-lg bg-card px-5 py-3 transition-colors hover:bg-card-hover"
            >
              <span className="text-sm text-foreground">{topic.name}</span>
              <span className="text-xs text-muted">{topic.notes} notes</span>
            </div>
          ))}
        </div>
      </div>

      {/* Obsidian-style editor dialog overlay */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex h-[80%] w-[80%] overflow-hidden rounded-xl border border-border bg-[#0e0e0e] shadow-2xl">
          {/* Sidebar */}
          <div className="flex w-60 flex-col border-r border-border bg-[#141414] rounded-l-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                Notes
              </span>
              <button
                onClick={() => setEditorOpen(false)}
                className="text-muted transition-colors hover:text-foreground"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {noteKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveNote(key)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeNote === key
                      ? "bg-card text-foreground"
                      : "text-muted hover:bg-card/50 hover:text-foreground"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 1v4h4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="truncate">{key}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor area */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center border-b border-border px-6 py-3">
              <span className="text-sm text-muted">
                {mockNotes[activeNote].title}
              </span>
            </div>
            <div className="flex-1 overflow-hidden p-6">
              <textarea
                className="h-full w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-foreground outline-none"
                value={mockNotes[activeNote].content}
                readOnly
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}
