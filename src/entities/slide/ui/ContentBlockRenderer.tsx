import type { ContentBlock } from "../model/types";
import { BulletList } from "./content/BulletList";

interface ContentBlockRendererProps {
  block: ContentBlock;
}

export const ContentBlockRenderer = ({ block }: ContentBlockRendererProps) => {
  switch (block.kind) {
    case "bullets":
      return <BulletList items={block.items} />;
    default:
      return null;
  }
};
