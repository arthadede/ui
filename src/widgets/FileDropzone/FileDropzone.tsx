import React, { useCallback, useMemo, useRef, useState, useId } from "react";
import { bytesToString, acceptsToExtensions } from "../../utils/file";
import { Icon } from "../../components/Icon";
import { getComponentVariant, getTypographyForSize } from "../../tokens";

export type FileDropzoneProps = {
  accepts: string[];
  multiple: boolean;
  onFilesAdded: (files: File[]) => void;
  maxSize: number;
  title?: string;
  variant?: "dark" | "light";
  className?: string;
  onError?: (error: string) => void;
  onSuccess?: (message: string) => void;
};

function validateFiles(files: File[], accepts: string[], maxFileSize: number): boolean {
  const acceptedTypes = accepts.map((s) => s.trim()).filter(Boolean);
  return files.every((file) => acceptedTypes.includes(file.type) && file.size <= maxFileSize);
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  accepts,
  onFilesAdded,
  multiple,
  maxSize,
  title = "Upload Files",
  variant = "dark",
  className,
  onError,
  onSuccess,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const helperId = useId();

  // Get variant and typography tokens from the token system
  const variantTokens = getComponentVariant(variant);
  const titleTypography = getTypographyForSize("lg");
  const descriptionTypography = getTypographyForSize("sm");

  // Icons use contrasting variant: dark containers get light icons, light containers get dark icons
  const iconVariant = variant === "dark" ? "light" : "dark";

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);

        if (!multiple && files.length > 1) {
          const error = "Only one file can be dropped at a time.";
          onError?.(error);
          return;
        }

        if (!validateFiles(files, accepts, maxSize)) {
          const error = "Invalid file type or file size.";
          onError?.(error);
          return;
        }

        onFilesAdded(files);
        onSuccess?.(files.length === 1 ? "File uploaded successfully" : `${files.length} files uploaded successfully`);
        e.dataTransfer.clearData();
      }
    },
    [multiple, accepts, maxSize, onFilesAdded, onError, onSuccess],
  );

  const descriptionText = `Total file size allowed is ${bytesToString(maxSize)}, and the supported formats are ${acceptsToExtensions(accepts).join(", ")}.`;

  const baseClass = useMemo(
    () =>
      [
        "group cursor-pointer outline-none",
        "flex w-full flex-col items-center justify-center",
        "gap-2 p-6",
        "rounded-lg border-2 border-dashed",
        variantTokens.border,
        variantTokens.background,
        "transition-colors focus-visible:ring-2 focus-visible:ring-white/20",
        isDragging ? variantTokens.hover : "",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [isDragging, className, variantTokens],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Upload files. Allowed: ${acceptsToExtensions(accepts).join(", ")}. Max size: ${bytesToString(maxSize)}.`}
      aria-describedby={helperId}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openFileDialog();
        }
      }}
      onClick={openFileDialog}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={baseClass}
    >
      <Icon name="upload" size={60} variant={iconVariant} />
      <p className={`${titleTypography.className} ${variantTokens.text}`}>{title}</p>
      <p id={helperId} className={`text-center ${descriptionTypography.className} ${variantTokens.text} opacity-80`}>
        {descriptionText}
      </p>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={accepts.join(",")}
        multiple={multiple}
        onChange={(e) => {
          if (e.target.files) {
            const files = Array.from(e.target.files);

            if (!multiple && files.length > 1) {
              const error = "Only one file can be selected at a time.";
              onError?.(error);
            } else if (!validateFiles(files, accepts, maxSize)) {
              const error = "Invalid file type or file size.";
              onError?.(error);
            } else {
              onSuccess?.(files.length === 1 ? "File selected successfully" : `${files.length} files selected successfully`);
              onFilesAdded(files);
              return;
            }
          }

          e.currentTarget.value = "";
        }}
      />
    </div>
  );
};

export default FileDropzone;