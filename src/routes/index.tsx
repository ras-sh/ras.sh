import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/components/layout";
import { RepositorySection } from "~/components/repository-section";
import { api } from "~/convex/_generated/api";

export const Route = createFileRoute("/")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(
      convexQuery(api.ossStats.getAllStats, {})
    );
  },
  component: Home,
});

function Home() {
  return (
    <Layout>
      <RepositorySection />
    </Layout>
  );
}
