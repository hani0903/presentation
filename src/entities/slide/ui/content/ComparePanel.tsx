import type { CompareColumn } from "../../model/types";

interface ComparePanelProps {
  left: CompareColumn;
  right: CompareColumn;
}

const Column = ({ heading, items }: CompareColumn) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-body-1 text-on-surface font-semibold">{heading}</h3>
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-body-2 text-on-surface-variant flex items-start gap-2"
        >
          <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const ComparePanel = ({ left, right }: ComparePanelProps) => (
  <div className="grid grid-cols-2 gap-8">
    <Column {...left} />
    <Column {...right} />
  </div>
);
