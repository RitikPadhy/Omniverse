const creators = [
  {
    name: "Priya M.",
    domain: "Product Management",
    notes: 312,
    outcome: "88%",
    users: 420,
  },
  {
    name: "Rahul S.",
    domain: "Backend Engineering",
    notes: 189,
    outcome: "93%",
    users: 215,
  },
  {
    name: "Sneha T.",
    domain: "Data Science",
    notes: 274,
    outcome: "79%",
    users: 380,
  },
];

export default function ExplorePage() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Explore</h2>
        <p className="mt-1 text-sm text-muted">
          Browse verified knowledge bases from the community.
        </p>
      </div>

      <div className="space-y-3">
        {creators.map((creator) => (
          <div
            key={creator.name}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border text-xs font-medium text-muted">
                {creator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {creator.name}
                </p>
                <p className="text-xs text-muted">{creator.domain}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted">
              <span>{creator.notes} notes</span>
              <span>{creator.outcome} outcome</span>
              <span>{creator.users} users</span>
              <button className="rounded-md border border-border px-3 py-1 text-foreground transition-colors hover:bg-card-hover">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
