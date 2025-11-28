/**
 * InputMarkdown Component (powered by MDXEditor)
 * WYSIWYG markdown editor with Typora-like experience
 */

"use client";

import React, { useEffect, useState } from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  frontmatterPlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  CodeToggle,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { InputMarkdownProps } from "./types";

export default function InputMarkdown({
  defaultValue = "",
  placeholder = "Start writing your markdown...",
  className = "",
  mode = "auto",
  onChange,
  readOnly = false,
}: InputMarkdownProps) {
  const editorRef = React.useRef<MDXEditorMethods>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side only rendering to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getThemeClass = () => {
    if (mode === "auto") {
      return "mdx-editor-auto";
    }
    return mode === "dark" ? "mdx-editor-dark" : "mdx-editor-light";
  };

  if (!isMounted) {
    return (
      <div
        className={`mdx-editor-wrapper ${getThemeClass()} flex min-h-[400px] items-center justify-center ${className}`}
      >
        <div style={{ color: "var(--typora-meta-color)" }}>Loading editor...</div>
      </div>
    );
  }

  return (
    <div
      className={`mdx-editor-wrapper ${getThemeClass()} ${className}`}
      data-mode={mode}
    >
      <MDXEditor
        ref={editorRef}
        markdown={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(value) => {
          onChange?.(value);
        }}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "javascript" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              javascript: "JavaScript",
              ts: "TypeScript",
              typescript: "TypeScript",
              jsx: "JSX",
              tsx: "TSX",
              css: "CSS",
              html: "HTML",
              json: "JSON",
              python: "Python",
              bash: "Bash",
              shell: "Shell",
              sql: "SQL",
              yaml: "YAML",
              markdown: "Markdown",
            },
          }),
          frontmatterPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <CreateLink />
                <InsertImage />
                <ListsToggle />
                <InsertTable />
                <InsertThematicBreak />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
