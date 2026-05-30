interface BulletListProps {
  items: string[];
}

export const BulletList = ({ items }: BulletListProps) => (
  <ul className="flex flex-col gap-3">
    {items.map((item, i) => (
      <li
        key={i}
        className="text-body-1 text-on-surface-variant flex items-start gap-3"
      >
        <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
        {item}
      </li>
    ))}
  </ul>
);
