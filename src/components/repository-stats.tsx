import { useNpmDownloadCounter } from "@erquhart/convex-oss-stats/react";
import { Download, Star } from "lucide-react";
import type { RepositoryStats as RepositoryStatsType } from "~/convex/ossStats";

type RepositoryStatsProps = {
  stats?: RepositoryStatsType;
};

export const RepositoryStats = ({ stats }: RepositoryStatsProps) => {
  // Use this hook to get a forecasted download count for an npm package or org
  const npmData = stats?.npm?.downloadCountUpdatedAt
    ? (stats.npm as {
        downloadCount: number;
        dayOfWeekAverages: number[];
        downloadCountUpdatedAt: number;
      })
    : null;
  const liveNpmDownloadCount = useNpmDownloadCounter(npmData);

  const githubStars = stats?.github?.starCount;

  return (
    <div className="flex items-center space-x-6 text-sm text-zinc-400">
      {githubStars !== undefined && (
        <div className="flex items-center space-x-2">
          <Star className="size-4" />
          <span>{githubStars}</span>
        </div>
      )}

      {npmData && (
        <div className="flex items-center space-x-2">
          <Download className="size-4" />
          <span>{liveNpmDownloadCount.count || 0}</span>
        </div>
      )}
    </div>
  );
};
