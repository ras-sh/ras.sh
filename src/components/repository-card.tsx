import { SiNpm } from "@icons-pack/react-simple-icons";
import { Button } from "@ras-sh/ui";
import { ExternalLink } from "lucide-react";
import posthog from "posthog-js";
import { RepositoryStats } from "~/components/repository-stats";
import type { RepositoryStats as RepositoryStatsType } from "~/convex/ossStats";
import type { Repository } from "~/lib/constants";

type RepositoryCardProps = {
  repository: Repository;
  stats?: RepositoryStatsType;
};

export function RepositoryCard({ repository, stats }: RepositoryCardProps) {
  return (
    <div className="relative">
      <Button
        asChild
        className="block h-auto whitespace-normal p-4 transition-all duration-200"
        variant="outline"
      >
        <a
          href={`https://github.com/ras-sh/${repository.id}`}
          onClick={() => {
            posthog.capture("repository_card_clicked", {
              repository: repository.id,
            });
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="space-y-3 sm:space-y-2">
            <h3 className="font-bold text-base text-zinc-100 transition-all duration-200 sm:text-lg">
              {repository.id}
            </h3>

            <p className="font-sans text-sm text-zinc-300 leading-relaxed transition-all duration-200 sm:text-base">
              {repository.description}
            </p>

            <RepositoryStats stats={stats} />
          </div>
        </a>
      </Button>

      <div className="absolute top-2.5 right-2.5 flex gap-1">
        {repository.hasNpmPackage && (
          <Button asChild size="icon" variant="ghost">
            <a
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
