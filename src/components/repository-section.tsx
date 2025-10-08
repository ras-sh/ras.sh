import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RepositoryCard } from "~/components/repository-card";
import { api } from "~/convex/_generated/api";
import { REPOSITORIES } from "~/lib/constants";

export function RepositorySection() {
  const { data: allStats } = useSuspenseQuery(
    convexQuery(api.ossStats.getAllStats, {})
  );

  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {REPOSITORIES.map((repository) => {
          const stats = allStats.find(
            (stat) => stat.repository === repository.id
          );
          return (
            <RepositoryCard
              key={repository.id}
              repository={repository}
              stats={stats}
            />
          );
        })}
      </div>
    </section>
  );
}
