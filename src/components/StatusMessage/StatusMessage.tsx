import type { ReactNode } from "react";

interface StatusMessageProps {
  readonly title: string;
  readonly children?: ReactNode;
  readonly action?: ReactNode;
}

export function StatusMessage({ title, children, action }: StatusMessageProps) {
  return (
    <div role="status" className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <p className="font-display text-3xl tracking-wide">{title}</p>
      {children && <p className="mt-2 text-sm leading-relaxed text-dust">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
