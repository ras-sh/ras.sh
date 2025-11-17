// github-org-repos.ts

const org = process.argv[2];

if (!org) {
  console.error("Usage: bun github-org-repos.ts <org>");
  process.exit(1);
}

type Repo = {
  name: string;
  description: string | null;
};

async function fetchAllRepos(org: string): Promise<Repo[]> {
  const perPage = 100;
  let page = 1;
  const all: Repo[] = [];

  while (true) {
    const url = `https://api.github.com/orgs/${org}/repos?per_page=${perPage}&page=${page}`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`GitHub API error ${res.status} ${res.statusText}`);
      process.exit(1);
    }

    const repos = (await res.json()) as Repo[];
    if (repos.length === 0) {
      break;
    }

    all.push(...repos);
    if (repos.length < perPage) {
      break;
    }

    page += 1;
  }

  return all;
}

async function main() {
  if (!org) {
    console.error("Usage: bun github-org-repos.ts <org>");
    process.exit(1);
  }

  const repos = await fetchAllRepos(org);

  const filtered = repos.filter((r) => r.name !== ".github");

  for (const r of filtered) {
    console.log(r.name);
    if (r.description) {
      console.log(r.description);
    }
    console.log();
  }
}

main();
