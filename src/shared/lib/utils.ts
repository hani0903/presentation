import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "heading-1",
            "heading-1-mobile",
            "heading-2",
            "heading-3",
            "heading-4",
            "body-1",
            "body-2",
            "body-3",
            "caption",
            "button",
            "code-display",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
