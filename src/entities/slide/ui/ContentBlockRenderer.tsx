import type { ElementType } from "react";
import type { ContentBlock } from "../model/types";
import { Body } from "./typography/Body";
import { Heading } from "./typography/Heading";
import { BulletList } from "./content/BulletList";
import { Callout } from "./content/Callout";
import { CodeBlock } from "./content/CodeBlock";
import { Highlight } from "./inline/Highlight";
import { InlineCode } from "./inline/InlineCode";

interface ContentBlockRendererProps {
  block: ContentBlock;
}

export const ContentBlockRenderer = ({ block }: ContentBlockRendererProps) => {
  switch (block.kind) {
    case "bullets":
      return <BulletList items={block.items} />;
    case "heading":
      return (
        <Heading as={block.as as ElementType | undefined}>{block.text}</Heading>
      );
    case "body":
      return <Body as={block.as as ElementType | undefined}>{block.text}</Body>;
    case "highlight":
      return <Highlight text={block.text} />;
    case "inline-code":
      return <InlineCode text={block.text} />;
    case "callout":
      return <Callout variant={block.variant} text={block.text} />;
    case "code":
      return <CodeBlock lang={block.lang} code={block.code} />;
    default:
      return null;
  }
};
