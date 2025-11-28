/**
 * Toolbar Component for InputMarkdown
 */

import { ToolbarAction, EditorContext } from "./types";

interface ToolbarProps {
  actions: ToolbarAction[];
  editorContext: EditorContext;
  className?: string;
  mode?: "light" | "dark" | "auto";
}

export function Toolbar({ actions, editorContext, className = "", mode = "auto" }: ToolbarProps) {
  const handleAction = (action: ToolbarAction) => {
    action.action(editorContext);
  };

  const getBorderClasses = () => {
    if (mode === "auto") {
      return "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50";
    }
    return mode === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-300 bg-gray-50";
  };

  const getSeparatorClasses = () => {
    if (mode === "auto") {
      return "bg-gray-300 dark:bg-gray-600";
    }
    return mode === "dark" ? "bg-gray-600" : "bg-gray-300";
  };

  const getButtonClasses = () => {
    if (mode === "auto") {
      return "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-800";
    }
    return mode === "dark"
      ? "text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-blue-500 focus:ring-offset-gray-800"
      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-blue-500 focus:ring-offset-white";
  };

  const getTooltipClasses = () => {
    if (mode === "auto") {
      return "bg-gray-900 dark:bg-gray-900 text-gray-200 dark:text-gray-200";
    }
    return mode === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-900 text-gray-200";
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-1 border-b ${getBorderClasses()} p-2 ${className}`}
      role="toolbar"
      aria-label="Markdown formatting toolbar"
    >
      {actions.map((action) => {
        if (action.separator) {
          return (
            <div
              key={action.id}
              className={`mx-1 h-6 w-px ${getSeparatorClasses()}`}
              role="separator"
              aria-orientation="vertical"
            />
          );
        }

        return (
          <button
            key={action.id}
            onClick={() => handleAction(action)}
            className={`group relative rounded-md px-3 py-1.5 text-sm font-medium transition-all ${getButtonClasses()} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            title={action.tooltip}
            aria-label={action.label}
            type="button"
          >
            <span className="font-semibold">{action.icon || action.label}</span>

            {/* Tooltip */}
            {action.tooltip && (
              <span
                className={`pointer-events-none absolute -bottom-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-xs opacity-0 transition-opacity group-hover:block group-hover:opacity-100 ${getTooltipClasses()}`}
              >
                {action.tooltip}
                {action.shortcut && (
                  <span className="ml-2 text-gray-400">({action.shortcut})</span>
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
