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
  "index.md": {
    title: "index.md",
    content: `# ATS Scanner — Overview

## What Is the ATS Scanner?
The ATS Scanner analyzes your resume against a target job description and returns a compatibility score. It highlights missing keywords, formatting issues, and section-level feedback so you can optimize before submitting.

## How It Works
1. Upload your resume (.docx or .pdf)
2. Paste the job description
3. The scanner parses both documents and runs a keyword + structure analysis
4. You get a score (0–100) with actionable recommendations

## Related Notes
- [[ats-keyword-optimization.md]] — Deep dive into keyword matching strategy
- [[ats-parsing-pitfalls.md]] — Common formatting issues that break ATS parsing

## Core Modules
- **Keyword Extractor** — Pulls hard skills, tools, certifications from the JD
- **Resume Parser** — Extracts sections, bullet points, and metadata from your resume
- **Matcher Engine** — Compares extracted keywords against resume content
- **Score Calculator** — Weights matches by section importance and frequency
- **Report Generator** — Produces the final score card with per-section breakdown

## Score Breakdown
| Section | Weight |
|---------|--------|
| Technical Skills | 30% |
| Work Experience | 30% |
| Summary / Objective | 15% |
| Education & Certs | 15% |
| Projects | 10% |

## Roadmap
- [ ] Bulk scan — upload multiple resumes at once
- [ ] JD auto-fetch — paste a job URL instead of the description
- [ ] Historical tracking — see how your score improves over time
- [ ] AI rewrite suggestions — one-click keyword injection
`,
  },
  "ats-keyword-optimization.md": {
    title: "ats-keyword-optimization.md",
    content: `# ATS Keyword Optimization Guide

## How ATS Keyword Matching Works
- Most ATS systems use keyword-frequency matching against the job description
- Exact matches score higher than semantic/synonym matches
- Section headings (Experience, Skills, Education) help the parser categorize content
- Avoid tables, columns, and images — ATS parsers often can't read them

## Keyword Strategy
1. **Extract keywords** from the job description — focus on hard skills, tools, and certifications
2. **Mirror exact phrasing** — if the JD says "CI/CD pipelines", don't write "continuous deployment"
3. **Use both acronyms and full forms** — write "Amazon Web Services (AWS)" at least once
4. **Distribute keywords naturally** — place them in the summary, experience bullets, and skills section

## Common ATS-Friendly Sections
- Professional Summary
- Work Experience
- Technical Skills
- Education & Certifications
- Projects (optional but helpful)

## Formatting Rules
- Use standard fonts: Arial, Calibri, Times New Roman
- Stick to .docx or .pdf (check which the portal accepts)
- No headers/footers — many parsers skip them entirely
- Use simple bullet points (•, -, or *)
- Avoid special characters in section headings

## Red Flags That Lower ATS Score
- Keyword stuffing (repeating the same term 20 times)
- White text / hidden keywords — modern ATS systems detect this
- Missing contact info or malformed email
- Non-standard section names like "My Journey" instead of "Work Experience"

## Score Thresholds (Typical)
- **90%+** — Strong match, very likely to pass to recruiter
- **70-89%** — Moderate match, depends on applicant volume
- **Below 70%** — Likely filtered out automatically
`,
  },
  "ats-parsing-pitfalls.md": {
    title: "ats-parsing-pitfalls.md",
    content: `# ATS Parsing Pitfalls & Edge Cases

## Why Resumes Get Rejected by ATS
Most rejections aren't about qualifications — they're about formatting and parsing failures.
The scanner can't score what it can't read.

## Common Parsing Failures

### 1. Multi-Column Layouts
- ATS reads left-to-right, top-to-bottom
- Two-column resumes often merge text from both columns into gibberish
- **Fix:** Use a single-column layout for the main content

### 2. Graphics & Icons
- Skill bars, star ratings, and icons are completely invisible to ATS
- Contact info embedded in a header graphic gets lost
- **Fix:** Use plain text for all critical information

### 3. Custom Fonts & Ligatures
- Some fonts render characters the parser doesn't recognize
- Ligatures (fi, fl, ff) can cause word-matching failures
- **Fix:** Stick to system fonts, test by copy-pasting text from your PDF

### 4. Tables for Layout
- ATS may read table cells in wrong order or skip them
- Skills listed in a table might not get indexed
- **Fix:** Use simple lists instead of tables

## File Format Comparison
| Format | Parsing Reliability | Notes |
|--------|-------------------|-------|
| .docx  | High | Best for most ATS systems |
| .pdf (text-based) | High | Good if exported from Word/Docs |
| .pdf (scanned/image) | Very Low | Needs OCR, often fails |
| .txt   | Perfect parsing | But no formatting at all |
| .pages | Low | Many ATS can't read Apple formats |

## Testing Your Resume
1. Copy-paste your PDF into a plain text editor — if it's garbled, ATS will struggle too
2. Run it through a free ATS simulator before submitting
3. Check that your name, email, and phone parse correctly
4. Verify job titles and company names aren't merged with dates

## Pro Tips
- Always tailor per application — generic resumes score lower
- Put the most important keywords in the first half of the resume
- Use the exact job title from the posting in your experience section
- Include a "Technical Skills" section as a keyword-rich summary
`,
  },
};

const noteKeys = Object.keys(mockNotes);

const skillSets = [
  { id: "ats-scanner", name: "ATS Scanner", notes: 3 },
];

export default function SkillsPage() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(noteKeys[0]);

  function openSkill() {
    setPickerOpen(false);
    setEditorOpen(true);
    setActiveNote(noteKeys[0]);
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Skills
          </h2>
          <p className="mt-1 text-sm text-muted">
            Build and manage the knowledge your agents use to reason.
          </p>
        </div>
        <button
          onClick={() => setPickerOpen(true)}
          className="rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-purple/80"
        >
          Open Skills
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

      {/* Skill picker dialog */}
      {pickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="flex w-[480px] overflow-hidden rounded-xl border border-border bg-[#0e0e0e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left column — existing */}
            <div className="flex-1 border-r border-border p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Open</h3>
              <div className="space-y-2">
                {skillSets.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={openSkill}
                    className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-card-hover"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent-purple">
                      <path d="M2 4c0-.6.4-1 1-1h4l2 2h4c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-[10px] text-muted">{skill.notes} notes</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Right column — create */}
            <div className="flex w-44 flex-col items-center justify-center p-5">
              <button className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-accent-purple">
                <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-medium">Create new</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Obsidian-style editor dialog overlay */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex h-[80%] w-[80%] overflow-hidden rounded-xl border border-border bg-[#0e0e0e] shadow-2xl">
          {/* Sidebar */}
          <div className="flex w-60 flex-col border-r border-border bg-[#141414] rounded-l-xl">
            <div className="flex h-11 items-center border-b border-border px-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                Notes
              </span>
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
            <div className="flex h-11 items-center justify-between border-b border-border px-6">
              <span className="text-sm text-muted">
                {mockNotes[activeNote].title}
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
