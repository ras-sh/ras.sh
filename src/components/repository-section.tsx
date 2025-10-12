import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookDashed, Hash, Package } from "lucide-react";
import { RepositoryCard } from "~/components/repository-card";
import { api } from "~/convex/_generated/api";
import { REPOSITORIES } from "~/lib/constants";

export function RepositorySection() {
  const { data: allStats } = useSuspenseQuery(
    convexQuery(api.ossStats.getAllStats, {})
  );

  // Group repositories by type
  const templates = REPOSITORIES.filter((repo) => repo.isTemplate);
  const packages = REPOSITORIES.filter((repo) => repo.hasNpmPackage);
  const apps = REPOSITORIES.filter((repo) => {
    const isNotTemplate = !templates.includes(repo);
    const isNotPackage = !packages.includes(repo);
    return isNotTemplate && isNotPackage;
  });

  const renderRepositoryGrid = (repositories: typeof REPOSITORIES) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {repositories.map((repository) => {
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
  );

  return (
    <section className="space-y-12 sm:space-y-16">
      {/* Apps Section */}
      {apps.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="flex items-center gap-3 font-bold text-2xl text-zinc-100 sm:text-3xl">
            <Hash className="text-muted-foreground" />
            <span>Apps</span>
          </h2>
          {renderRepositoryGrid(apps)}
        </div>
      )}

      {/* Packages Section */}
      {packages.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="flex items-center gap-3 font-bold text-2xl text-zinc-100 sm:text-3xl">
            <Package className="text-muted-foreground" />
            <span>Packages</span>
          </h2>
          {renderRepositoryGrid(packages)}
        </div>
      )}

      {/* Templates Section */}
      {templates.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="flex items-center gap-3 font-bold text-2xl text-zinc-100 sm:text-3xl">
            <BookDashed className="text-muted-foreground" />
            <span>Templates</span>
          </h2>
          {renderRepositoryGrid(templates)}
        </div>
      )}
    </section>
  );
}
