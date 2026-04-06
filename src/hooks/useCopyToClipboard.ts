import { useCallback, useState } from "react";

interface CopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

/** Copy text to clipboard with feedback state */
export function useCopyToClipboard(resetDelay = 2000): CopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        setCopied(false);
      }
    },
    [resetDelay],
  );

  return { copied, copy };
}
