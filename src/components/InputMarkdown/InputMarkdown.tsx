/**
 * InputMarkdown Component
 * Features:
 * - Live preview
 * - Customizable toolbar
 * - Keyboard shortcuts
 * - Word count
 * - Auto-save support
 */

"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Toolbar } from "./Toolbar";
import { EditorContext, InputMarkdownProps } from "./types";
import { defaultToolbarActions } from "./config";

export default function InputMarkdown({
  toolbar = defaultToolbarActions,
  enablePreview = true,
  defaultValue = "",
  placeholder = "Start writing your markdown...",
  minHeight = "400px",
  maxHeight = "none",
  className = "",
  mode = "auto",
  showWordCount = true,
  autoSave = false,
  onChange,
  onSave,
}: InputMarkdownProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(defaultValue);
  const [showPreview, setShowPreview] = useState(false);

  // Calculate word and character count using useMemo
  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter((word) => word.length > 0).length;
  }, [content]);

  const charCount = useMemo(() => {
    return content.length;
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !onSave) return;

    const timer = setTimeout(() => {
      onSave(content);
    }, 2000);

    return () => clearTimeout(timer);
  }, [content, autoSave, onSave]);

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange?.(newContent);
  };

  // Editor context for toolbar actions
  const editorContext: EditorContext = useMemo(
    () => ({
      insertText: (text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + text + content.substring(end);

        setContent(newContent);
        onChange?.(newContent);

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
      },

      wrapSelection: (before: string, after: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        const replacement = before + selectedText + after;
        const newContent = content.substring(0, start) + replacement + content.substring(end);

        setContent(newContent);
        onChange?.(newContent);

        setTimeout(() => {
          textarea.focus();
          if (selectedText) {
            textarea.setSelectionRange(start + before.length, end + before.length);
          } else {
            textarea.setSelectionRange(start + before.length, start + before.length);
          }
        }, 0);
      },

      replaceSelection: (text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + text + content.substring(end);

        setContent(newContent);
        onChange?.(newContent);

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
      },

      getSelection: () => {
        const textarea = textareaRef.current;
        if (!textarea) return "";

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        return content.substring(start, end);
      },

      setContent: (newContent: string) => {
        setContent(newContent);
        onChange?.(newContent);
      },

      getContent: () => content,
    }),
    [content, onChange]
  );

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        editorContext.wrapSelection("**", "**");
      } else if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        editorContext.wrapSelection("_", "_");
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const selection = editorContext.getSelection();
        if (selection) {
          editorContext.replaceSelection(`[${selection}](url)`);
        } else {
          editorContext.insertText("[Link text](url)");
        }
      } else if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        onSave?.(content);
      } else if (e.key === "Tab") {
        e.preventDefault();
        editorContext.insertText("  ");
      }
    },
    [editorContext, content, onSave]
  );

  // Process content to preserve multiple consecutive blank lines
  const processedContent = useMemo(() => {
    // Replace sequences of 3+ newlines with explicit breaks
    // This preserves multiple blank lines in the preview
    return content.replace(/\n\n\n+/g, (match) => {
      const blankLines = match.length - 2; // Number of extra blank lines
      return '\n\n' + '<br/>'.repeat(blankLines) + '\n';
    });
  }, [content]);

  const getThemeClasses = () => {
    if (mode === "auto") {
      return "bg-white dark:bg-gray-900 text-black dark:text-gray-100 border-gray-300 dark:border-gray-700";
    }
    return mode === "dark"
      ? "bg-gray-900 text-gray-100 border-gray-700"
      : "bg-white text-black border-gray-300";
  };

  const getButtonClasses = (isActive: boolean) => {
    const baseClasses = "rounded px-3 py-1 text-sm font-medium transition-colors";
    if (mode === "auto") {
      return isActive
        ? `${baseClasses} bg-blue-600 text-white`
        : `${baseClasses} text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`;
    }
    return mode === "dark"
      ? isActive
        ? `${baseClasses} bg-blue-600 text-white`
        : `${baseClasses} text-gray-400 hover:bg-gray-700 hover:text-white`
      : isActive
        ? `${baseClasses} bg-blue-600 text-white`
        : `${baseClasses} text-gray-700 hover:bg-gray-200 hover:text-gray-900`;
  };

  const getToggleBorderClasses = () => {
    if (mode === "auto") {
      return "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30";
    }
    return mode === "dark" ? "border-gray-700 bg-gray-800/30" : "border-gray-300 bg-gray-50";
  };

  const getStatusBarClasses = () => {
    if (mode === "auto") {
      return "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400";
    }
    return mode === "dark"
      ? "border-gray-700 bg-gray-800/30 text-gray-400"
      : "border-gray-300 bg-gray-50 text-gray-600";
  };

  const getPlaceholderClasses = () => {
    if (mode === "auto") {
      return "placeholder:text-gray-400 dark:placeholder:text-gray-500";
    }
    return mode === "dark" ? "placeholder:text-gray-500" : "placeholder:text-gray-400";
  };

  const getProseClasses = () => {
    if (mode === "auto") {
      return "prose dark:prose-invert max-w-none";
    }
    return mode === "dark" ? "prose prose-invert max-w-none" : "prose max-w-none";
  };

  return (
    <div className={`flex flex-col rounded-lg border ${getThemeClasses()} ${className}`}>
      {/* Toolbar */}
      <Toolbar actions={toolbar} editorContext={editorContext} mode={mode} />

      {/* View Toggle */}
      {enablePreview && (
        <div className={`flex gap-2 border-b ${getToggleBorderClasses()} p-2`}>
          <button
            onClick={() => setShowPreview(false)}
            className={getButtonClasses(!showPreview)}
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={getButtonClasses(showPreview)}
            type="button"
          >
            Preview
          </button>
        </div>
      )}

      {/* Editor/Preview Area */}
      <div className="flex-1" style={{ minHeight, maxHeight }}>
        {!showPreview ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none ${getPlaceholderClasses()}`}
            style={{ minHeight, maxHeight }}
          />
        ) : (
          <div className="h-full overflow-auto p-4">
            <article className={getProseClasses()}>
              <ReactMarkdown
                remarkPlugins={[remarkBreaks, remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {processedContent}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div
        className={`flex items-center justify-between border-t ${getStatusBarClasses()} px-4 py-2 text-xs`}
      >
        <div className="flex gap-4">
          {showWordCount && (
            <>
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {autoSave && <span className="text-green-500">Auto-save enabled</span>}
          <span>Markdown</span>
        </div>
      </div>
    </div>
  );
}
