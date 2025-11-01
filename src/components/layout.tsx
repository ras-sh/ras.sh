import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@ras-sh/ui";
import { ORG } from "~/lib/constants";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-12 p-8 transition-all duration-300 sm:p-12 md:p-16 lg:p-20">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="ras.sh logo"
              className="size-10"
              height={40}
              src="https://r2.ras.sh/icon.svg"
              width={40}
            />

            <h1 className="font-bold font-mono text-4xl text-zinc-100">
              ras.sh
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild>
              <a
                data-umami-event="github_link_clicked"
                data-umami-event-project="ras.sh"
                href={`https://github.com/${ORG}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SiGithub className="size-4 text-[#181717]" />
                GitHub
              </a>
            </Button>

            <Button asChild>
              <a
                data-umami-event="npm_link_clicked"
                data-umami-event-project="ras.sh"
                href={`https://npmjs.com/org/${ORG}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <SiNpm className="size-4 text-[#CB3837]" />
                npm
              </a>
            </Button>
          </div>
        </div>

        <p className="font-sans text-xl text-zinc-300 leading-relaxed">
          A collection of side projects, experiments, and tools built with
          modern technologies.
        </p>
      </header>

      <main className="w-full space-y-8">{children}</main>

      <footer className="inline-flex flex-wrap items-center justify-center gap-1 text-center text-sm text-zinc-400">
        Made with ❤️ by{" "}
        <a
          className="inline-flex items-center gap-1 font-medium underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-zinc-100 hover:decoration-zinc-400"
          data-umami-event="footer_link_clicked"
          data-umami-event-project="ras.sh"
          href="https://solomou.dev"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Avatar className="size-5">
            <AvatarImage
              alt="Richard Solomou"
              src="https://github.com/richardsolomou.png"
            />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          @richardsolomou
        </a>
      </footer>
    </div>
  );
}
