import { cn } from "../../utils/cn";
import type { SelectHTMLAttributes } from "react";

export const Select = ({ className="", ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={cn("w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white outline-none", className)} />
);
