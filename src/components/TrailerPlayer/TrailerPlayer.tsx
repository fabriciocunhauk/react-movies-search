import { useEffect, useRef } from "react";
import { useDialogDismiss } from "../../hooks/useDialogDismiss";
import type { OpenTrailerState } from "../../hooks/useTrailer";
import { CloseIcon } from "../icons/CloseIcon";
import { TrailerScreen } from "./TrailerScreen";

interface TrailerPlayerProps {
  readonly trailer: OpenTrailerState;
  readonly onClose: () => void;
}

export function TrailerPlayer({ trailer, onClose }: TrailerPlayerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useDialogDismiss(onClose);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 id="trailer-title" className="truncate font-display text-3xl tracking-wide">
            {trailer.movie.title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close trailer"
            className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-full bg-curtain text-screen transition-colors hover:bg-seat"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <div className="aspect-video overflow-hidden rounded-xl bg-curtain shadow-2xl ring-1 ring-seat">
          <TrailerScreen trailer={trailer} />
        </div>
      </div>
    </div>
  );
}
