interface CodeBlockProps {
  lang: "text" | "md" | "js" | "ts";
  code: string;
}

export const CodeBlock = ({ lang, code }: CodeBlockProps) => (
  <div className="bg-surface-container-highest border-primary-300 relative rounded-2xl border-l-4 px-6 py-5">
    <span className="text-caption text-on-surface-variant absolute top-3 right-4 select-none">
      {lang}
    </span>
    <pre className="overflow-x-auto">
      <code className="text-code-display text-on-surface font-mono whitespace-pre">
        {code}
      </code>
    </pre>
  </div>
);
