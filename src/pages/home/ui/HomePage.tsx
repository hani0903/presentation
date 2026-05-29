import { ThemeToggle } from "@/features/toggle-theme";
import { PresentationCard, usePresentations } from "@/entities/presentation";
import { SITE_TITLE, SITE_DESCRIPTION } from "../model/constants";

export const HomePage = () => {
  const { data: presentations } = usePresentations();

  return (
    <div className="bg-background relative min-h-screen">
      <header className="absolute top-0 right-0 z-10 p-4">
        <ThemeToggle />
      </header>
      <main className="animate-home-fade-in flex min-h-screen flex-col items-center justify-center px-6">
        <section className="mb-12 flex flex-col items-center gap-3 text-center">
          <h1 className="font-logo text-heading-2 text-on-surface">
            {SITE_TITLE}
          </h1>
          <p className="text-body-2 text-on-surface-variant">
            {SITE_DESCRIPTION}
          </p>
        </section>
        <section className="flex w-full max-w-xl flex-col gap-4">
          {presentations.map((card) => (
            <PresentationCard key={card.path} card={card} />
          ))}
        </section>
      </main>
    </div>
  );
};
