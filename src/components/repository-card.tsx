import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";
import { Badge, Button } from "@ras-sh/ui";
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
        <div className="relative space-y-3 sm:space-y-2">
          <h3 className="font-bold text-base text-zinc-100 transition-all duration-200 sm:text-lg">
            {repository.id}
          </h3>

          {repository.externalUrl && (
            <Button
              asChild
              className="-top-1.5 -right-1.5 absolute"
              size="icon"
              variant="ghost"
            >
              <a
                href={repository.externalUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}

          <div className="flex items-center gap-4">
            <RepositoryStats stats={stats} />

            {!(repository.hasNpmPackage || repository.isTemplate) && (
              <Badge variant="secondary">
                <img
                  alt="App"
                  className="mr-1 size-3"
                  height={16}
                  src="https://r2.ras.sh/icon.svg"
                  width={16}
                />
                App
              </Badge>
            )}

            {repository.hasNpmPackage && (
              <Badge asChild variant="secondary">
                <a
                  href={`https://npmjs.com/package/@ras-sh/${repository.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SiNpm className="mr-1 size-4 text-[#CB3837]" />
                  Package
                </a>
              </Badge>
            )}

            {repository.isTemplate && (
              <Badge variant="secondary">
                <SiGithub className="mr-1 size-4 text-[#ffffff]" />
                Template
              </Badge>
            )}
          </div>

          <p className="font-sans text-sm text-zinc-300 leading-relaxed transition-all duration-200 sm:text-base">
            {repository.description}
          </p>
        </div>
      </a>
    </Button>
  );
}
