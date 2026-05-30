interface OrderedListProps {
  items: string[];
}

export const OrderedList = ({ items }: OrderedListProps) => (
  <ol className="flex flex-col gap-3">
    {items.map((item, i) => (
      <li
        key={i}
        className="text-body-1 text-on-surface-variant flex items-start gap-3"
      >
        <span className="text-primary mt-0.5 shrink-0 font-semibold tabular-nums">
          {i + 1}.
        </span>
        {item}
      </li>
    ))}
  </ol>
);
