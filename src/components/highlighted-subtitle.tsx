import { ReactNode } from "react";

export default function HighlightedSubtitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
      {children}
    </h2>
  );
}
