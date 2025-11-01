import { convexQuery } from "@convex-dev/react-query";
import { cn } from "@ras-sh/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { RepositoryCard } from "~/components/repository-card";
import { api } from "~/convex/_generated/api";
import { APPS, PACKAGES, type Repository, TEMPLATES } from "~/lib/constants";

const HEADING_BASE_CLASS =
  "font-medium text-neutral-600 text-sm dark:text-neutral-400";
const HEADING_WITH_PADDING = `${HEADING_BASE_CLASS} pt-6`;

export function RepositorySection() {
  const { data: allStats } = useSuspenseQuery(
    convexQuery(api.ossStats.getAllStats, {})
  );

  // Create a map for O(1) stats lookup instead of O(n) find operations
  const statsMap = useMemo(
    () => new Map(allStats.map((stat) => [stat.repository, stat])),
    [allStats]
  );

  const renderSection = (
    title: string,
    repositories: readonly Repository[],
    showTopPadding: boolean
  ) => (
    <>
      <div className="col-span-1 sm:col-span-2">
        <h2
          className={cn(
            showTopPadding ? HEADING_WITH_PADDING : HEADING_BASE_CLASS
          )}
        >
          {title}
        </h2>
      </div>
      {repositories.map((repository) => {
        const stats = statsMap.get(repository.id);
        return (
          <div className="break-inside-avoid" key={repository.id}>
            <RepositoryCard repository={repository} stats={stats} />
          </div>
        );
      })}
    </>
  );

  return (
    <section className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2">
      {renderSection("Apps", APPS, false)}
      {renderSection("Packages", PACKAGES, true)}
      {renderSection("Templates", TEMPLATES, true)}
    </section>
  );
}
