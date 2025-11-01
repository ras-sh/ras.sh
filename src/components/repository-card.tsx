import { SiNpm } from "@icons-pack/react-simple-icons";
import { Button, cn } from "@ras-sh/ui";
import { ExternalLink } from "lucide-react";
import { RepositoryStats } from "~/components/repository-stats";
import type { RepositoryStats as RepositoryStatsType } from "~/convex/ossStats";
import type { Repository } from "~/lib/constants";

type RepositoryCardProps = {
  repository: Repository;
  stats?: RepositoryStatsType;
};

const getBorderColor = (repository: Repository) => {
  if (repository.externalUrl) {
    return "border-solid border-indigo-400/50! hover:border-indigo-400/70!";
  }
  if (repository.hasNpmPackage) {
    return "border-dotted border-red-500/50! hover:border-red-500/70!";
  }
  if (repository.isTemplate) {
    return "border-dashed border-zinc-200/50! hover:border-zinc-200/70!";
  }
  return "";
};

export function RepositoryCard({ repository, stats }: RepositoryCardProps) {
  return (
    <div className="relative h-full">
      <Button
        asChild
        className={cn(
          "block h-full whitespace-normal bg-transparent! p-4 transition-all duration-200",
          "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[16px_16px]",
          getBorderColor(repository)
        )}
        variant="outline"
      >
        <a
          data-umami-event="github_link_clicked"
          data-umami-event-repository={repository.id}
          href={`https://github.com/ras-sh/${repository.id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex h-full flex-col gap-3 sm:gap-2">
            <div className="flex-1 space-y-3 sm:space-y-2">
              <h3 className="font-bold text-base text-zinc-100 transition-all duration-200 sm:text-lg">
                {repository.id}
              </h3>

              <p className="font-sans text-sm text-zinc-300 leading-relaxed transition-all duration-200 sm:text-base">
                {repository.description}
              </p>
            </div>

            <RepositoryStats stats={stats} />
          </div>
        </a>
      </Button>

      <div className="absolute top-2.5 right-2.5 flex gap-1">
        {repository.hasNpmPackage && (
          <Button asChild size="icon" variant="ghost">
            <a
              data-umami-event="npm_link_clicked"
              data-umami-event-repository={repository.id}
              href={`https://npmjs.com/package/@ras-sh/${repository.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiNpm className="size-4 text-[#CB3837]" />
            </a>
          </Button>
        )}

        {repository.externalUrl && (
          <Button asChild size="icon" variant="ghost">
            <a
              data-umami-event="external_link_clicked"
              data-umami-event-repository={repository.id}
              href={repository.externalUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="size-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
