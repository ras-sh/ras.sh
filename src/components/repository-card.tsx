import { SiNpm } from "@icons-pack/react-simple-icons";
import { Button, cn } from "@ras-sh/ui";
import { ExternalLink } from "lucide-react";
import { memo } from "react";
import { RepositoryStats } from "~/components/repository-stats";
import type { RepositoryStats as RepositoryStatsType } from "~/convex/ossStats";
import {
  GITHUB_PREFIX,
  getAppUrl,
  isApp,
  isPackage,
  isTemplate,
  NPM_PREFIX,
  type Repository,
} from "~/lib/constants";

type RepositoryCardProps = {
  repository: Repository;
  stats?: RepositoryStatsType;
};

const getBorderColor = (repository: Repository) => {
  if (isApp(repository)) {
    return "border-indigo-400/50! hover:border-indigo-400/70!";
  }
  if (isPackage(repository)) {
    return "border-red-500/50! hover:border-red-500/70!";
  }
  if (isTemplate(repository)) {
    return "border-zinc-200/50! hover:border-zinc-200/70!";
  }
  return "";
};

const getShadowColor = (repository: Repository) => {
  if (isApp(repository)) {
    return "shadow-[6px_6px_0_0_--theme(--color-indigo-400/0.5)] hover:shadow-[6px_6px_0_0_--theme(--color-indigo-400/0.7)]";
  }
  if (isPackage(repository)) {
    return "shadow-[6px_6px_0_0_--theme(--color-red-500/0.5)] hover:shadow-[6px_6px_0_0_--theme(--color-red-500/0.7)]";
  }
  if (isTemplate(repository)) {
    return "shadow-[6px_6px_0_0_--theme(--color-zinc-200/0.5)] hover:shadow-[6px_6px_0_0_--theme(--color-zinc-200/0.7)]";
  }
  return "";
};

export const RepositoryCard = memo(function RepositoryCardComponent({
  repository,
  stats,
}: RepositoryCardProps) {
  return (
    <div className="relative h-full">
      <Button
        asChild
        className={cn(
          "relative block h-full whitespace-normal rounded-none border-2 bg-transparent! p-4",
          getBorderColor(repository),
          getShadowColor(repository)
        )}
        variant="outline"
      >
        <a
          data-umami-event="github_link_clicked"
          data-umami-event-repository={repository.id}
          href={`https://github.com/${GITHUB_PREFIX}${repository.id}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="flex h-full flex-col gap-3 sm:gap-2">
            <div className="flex-1 space-y-3 sm:space-y-2">
              <h3 className="font-bold text-base text-zinc-100 sm:text-lg">
                {repository.id}
              </h3>

              <p className="font-sans text-sm text-zinc-300 leading-relaxed sm:text-base">
                {repository.description}
              </p>
            </div>

            <RepositoryStats stats={stats} />
          </div>
        </a>
      </Button>

      <div className="absolute top-2.5 right-2.5 flex gap-1">
        {isPackage(repository) && (
          <Button asChild size="icon" variant="ghost">
            <a
              data-umami-event="npm_link_clicked"
              data-umami-event-repository={repository.id}
              href={`https://npmjs.com/package/${NPM_PREFIX}${repository.id}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiNpm className="size-4 text-[#CB3837]" />
            </a>
          </Button>
        )}

        {isApp(repository) && (
          <Button asChild size="icon" variant="ghost">
            <a
              data-umami-event="external_link_clicked"
              data-umami-event-repository={repository.id}
              href={getAppUrl(repository)}
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
});
