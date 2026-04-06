import { ValidationErrors } from '@angular/forms';

export type FileValidator = (file: File) => ValidationErrors | null;
export type UploaderValidator = (files: File[]) => ValidationErrors | null;

// ── helpers ──────────────────────────────────────────────────────────────────

function fileSignature(file: File): string {
  return `${file.name}::${file.size}::${file.lastModified}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── file-level validators ─────────────────────────────────────────────────────

/**
 * Validates the MIME type of a single file.
 * Attaches `acceptedTypes` metadata so the component can render
 * "Supported files: PNG, JPG" automatically.
 */
export function fileType(accepted: string[]): FileValidator {
  const validator: FileValidator & { acceptedTypes: string[] } = (file: File) => {
    if (accepted.includes(file.type)) {
      return null;
    }
    const labels = accepted.map(t => t.split('/')[1].toUpperCase());
    return { fileType: { actual: file.type, accepted, labels } };
  };
  validator.acceptedTypes = accepted;
  return validator;
}

/**
 * Validates that a single file does not exceed the given byte limit.
 */
export function maxFileSize(maxBytes: number): FileValidator {
  return (file: File) => {
    if (file.size <= maxBytes) {
      return null;
    }
    return {
      maxFileSize: {
        actual: file.size,
        max: maxBytes,
        actualFormatted: formatBytes(file.size),
        maxFormatted: formatBytes(maxBytes),
      },
    };
  };
}

// ── uploader-level validators ─────────────────────────────────────────────────

/**
 * Requires at least one file to be present.
 */
export function requiredFiles(): UploaderValidator {
  return (files: File[]) => (files.length > 0 ? null : { requiredFiles: true });
}

/**
 * Validates that the number of files does not exceed the given limit.
 */
export function maxFiles(max: number): UploaderValidator {
  return (files: File[]) => {
    if (files.length <= max) {
      return null;
    }
    return { maxFiles: { actual: files.length, max } };
  };
}

/**
 * Validates that the combined size of all files does not exceed the given byte limit.
 */
export function maxTotalSize(maxBytes: number): UploaderValidator {
  return (files: File[]) => {
    const total = files.reduce((sum, f) => sum + f.size, 0);
    if (total <= maxBytes) {
      return null;
    }
    return {
      maxTotalSize: {
        actual: total,
        max: maxBytes,
        actualFormatted: formatBytes(total),
        maxFormatted: formatBytes(maxBytes),
      },
    };
  };
}

/**
 * Validates that no two files share the same name + size + lastModified signature.
 */
export function noDuplicateFiles(): UploaderValidator {
  return (files: File[]) => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const file of files) {
      const sig = fileSignature(file);
      if (seen.has(sig)) {
        duplicates.push(file.name);
      } else {
        seen.add(sig);
      }
    }
    return duplicates.length > 0 ? { noDuplicateFiles: { duplicates } } : null;
  };
}
