/**
 * Types for the InputMarkdown component (using MDXEditor)
 */

export interface InputMarkdownProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  mode?: "light" | "dark" | "auto";
  onChange?: (content: string) => void;
  readOnly?: boolean;
}
