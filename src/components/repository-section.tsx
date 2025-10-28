import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RepositoryCard } from "~/components/repository-card";
import { api } from "~/convex/_generated/api";
import { REPOSITORIES } from "~/lib/constants";

export function RepositorySection() {
  const { data: allStats } = useSuspenseQuery(
    convexQuery(api.ossStats.getAllStats, {})
  );

  // Sorting weights and constants
  // Type weights: Apps prioritized first, then packages, then templates
  const TYPE_WEIGHTS = {
    app: 1000, // Apps (with external URLs) always appear first
    package: 50, // Packages ranked second (also benefit from NPM download scores)
    template: 10, // Templates ranked last
  };

  // NPM downloads are scaled logarithmically to prevent dominance
  // Multiplier adjusts the relative importance of downloads vs stars
  const NPM_LOG_MULTIPLIER = 50;

  const getTypeWeight = (repo: (typeof REPOSITORIES)[number]) => {
    if (repo.externalUrl) {
      return TYPE_WEIGHTS.app;
    }
    if (repo.hasNpmPackage) {
      return TYPE_WEIGHTS.package;
    }
    if (repo.isTemplate) {
      return TYPE_WEIGHTS.template;
    }
    return 0;
  };

  const getNpmScore = (downloads: number) => {
    // Use logarithmic scaling to normalize download counts
    // log10(1000) ≈ 3, log10(1M) ≈ 6, log10(10M) ≈ 7
    return downloads > 0 ? Math.log10(downloads) * NPM_LOG_MULTIPLIER : 0;
  };

  // Create a map for O(1) stats lookup instead of O(n) find operations
  const statsMap = new Map(allStats.map((stat) => [stat.repository, stat]));

  const sortedRepositories = [...REPOSITORIES].sort((a, b) => {
    const aStats = statsMap.get(a.id);
    const bStats = statsMap.get(b.id);

    const aStars = aStats?.github?.starCount ?? 0;
    const bStars = bStats?.github?.starCount ?? 0;

    const aNpmDownloads = aStats?.npm?.downloadCount ?? 0;
    const bNpmDownloads = bStats?.npm?.downloadCount ?? 0;

    // Calculate composite score: stars + npm (log scaled) + type weight + recency bonus
    const aScore = aStars + getNpmScore(aNpmDownloads) + getTypeWeight(a);
    const bScore = bStars + getNpmScore(bNpmDownloads) + getTypeWeight(b);

    return bScore - aScore;
  });

  return (
    <section className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
      {sortedRepositories.map((repository) => {
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
