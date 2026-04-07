export default function AskPage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Ask anything</h2>
        <p className="mt-1 text-sm text-muted">
          Your agents are active. The system routes to the right agent based on your
          question.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-16">
        <p className="mb-6 text-sm text-muted">
          Ask a question grounded in your skills
        </p>
        <div className="w-full">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
            <input
              type="text"
              placeholder="e.g. How should I frame my payments experience for Stripe?"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
              disabled
            />
            <button
              className="rounded-md bg-accent-purple px-3 py-1.5 text-xs font-medium text-white"
              disabled
            >
              Ask
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted">
            Coming soon — connect your agents to start chatting
          </p>
        </div>
      </div>
    </>
  );
}
