import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";
import { ThemeToggle } from "@/features/toggle-theme";
import { DOC_LINKS, INTRO_MESSAGE } from "../model/constants";
import { DocLinkCard } from "./DocLinkCard";

export const HomePage = () => {
  return (
    <main
      className={cn(
        // "animate-home-fade-in",
        "mx-auto flex min-h-screen w-screen max-w-md flex-col gap-8",
        "px-4 py-10",
      )}
    >
      <header className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-4 text-primary font-logo">{`{ Loopin }`}</h1>
          <p className="text-body-3 text-on-surface-variant">{INTRO_MESSAGE}</p>
        </div>
        <ThemeToggle />
      </header>

      <Link
        to="/quiz"
        className={cn(
          "flex items-center justify-center rounded-xl px-4 py-3",
          "bg-primary text-on-primary",
          "text-button",
          "transition-opacity duration-300 hover:opacity-90",
          "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
        )}
      >
        시작하기
      </Link>

      <section aria-label="학습 자료">
        <h2 className="text-caption text-on-surface-variant mb-3 font-medium">
          학습 자료
        </h2>
        <ul className="flex flex-col gap-4">
          {DOC_LINKS.map((link, index) => (
            <li
              key={link.url}
              className="animate-home-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <DocLinkCard {...link} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
