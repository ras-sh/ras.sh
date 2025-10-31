import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RepositoryCard } from "~/components/repository-card";
import { api } from "~/convex/_generated/api";
import { REPOSITORIES } from "~/lib/constants";

export function RepositorySection() {
  const { data: allStats } = useSuspenseQuery(
    convexQuery(api.ossStats.getAllStats, {})
  );

  // Create a map for O(1) stats lookup instead of O(n) find operations
  const statsMap = new Map(allStats.map((stat) => [stat.repository, stat]));

  return (
    <section className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
      {REPOSITORIES.map((repository) => {
        const stats = statsMap.get(repository.id);
        return (
          <div className="break-inside-avoid" key={repository.id}>
            <RepositoryCard repository={repository} stats={stats} />
          </div>
        );
      })}
    </section>
  );
}
