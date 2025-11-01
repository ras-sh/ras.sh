import { OssStats } from "@erquhart/convex-oss-stats";
import {
  GITHUB_PREFIX,
  isPackage,
  NPM_PREFIX,
  ORG,
  PACKAGES,
  REPOSITORIES,
} from "../src/lib/constants";
import { components } from "./_generated/api";
import { type QueryCtx, query } from "./_generated/server";

const githubRepos = REPOSITORIES.map(
  (repository) => `${GITHUB_PREFIX}${repository.id}`
);
const npmPackages = PACKAGES.map((pkg) => `${NPM_PREFIX}${pkg.id}`);

export const ossStats = new OssStats(components.ossStats, {
  githubOwners: [ORG],
  npmOrgs: [ORG],
  githubRepos,
  npmPackages,
});

export const {
  sync,
  clearAndSync,
  getGithubOwner,
  getNpmOrg,
  getGithubRepo,
  getGithubRepos,
  getNpmPackage,
  getNpmPackages,
} = ossStats.api();

async function fetchRepositoryStats(
  ctx: QueryCtx,
  repositoryId: string,
  isPackage: boolean
) {
  let githubData: Awaited<ReturnType<typeof ossStats.getGithubRepo>> | null =
    null;
  let npmData: Awaited<ReturnType<typeof ossStats.getNpmPackage>> | null = null;

  try {
    githubData = await ossStats.getGithubRepo(
      ctx,
      `${GITHUB_PREFIX}${repositoryId}`
    );
  } catch {
    // Ignore error
  }

  if (isPackage) {
    try {
      npmData = await ossStats.getNpmPackage(
        ctx,
        `${NPM_PREFIX}${repositoryId}`
      );
    } catch {
      // Ignore error
    }
  }

  return {
    github: githubData,
    npm: npmData,
  };
}

export type RepositoryStats = {
  repository: string;
  github: Awaited<ReturnType<typeof ossStats.getGithubRepo>> | null;
  npm: Awaited<ReturnType<typeof ossStats.getNpmPackage>> | null;
};

export const getAllStats = query({
  args: {},
  handler: async (ctx): Promise<RepositoryStats[]> => {
    const stats = await Promise.all(
      REPOSITORIES.map(async (repository) => {
        const data = await fetchRepositoryStats(
          ctx,
          repository.id,
          isPackage(repository)
        );

        return {
          repository: repository.id,
          ...data,
        };
      })
    );

    return stats;
  },
});
