interface SlideIndicatorProps {
  current: number;
  total: number;
}

export const SlideIndicator = ({ current, total }: SlideIndicatorProps) => {
  return (
    <p className="text-caption text-on-surface-variant">
      {current} / {total}
    </p>
  );
};
