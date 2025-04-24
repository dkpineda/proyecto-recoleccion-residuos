import { cn } from "@/libs/utils";
import { Loader2Icon } from "lucide-react";
import React from "react";

const SIZES = {
  sm: "size-4",
  md: "size-10",
  lg: "size-12",
};
type PageSpinnerProps = {
  className?: string;
  size?: keyof typeof SIZES;
};
export const PageSpinner: React.FC<PageSpinnerProps> = ({ className = "", size = "md" }) => {
  return (
    <div
      className={cn(
        "bg-background flex h-screen items-center justify-center",
        SIZES[size],
        className,
      )}
    >
      <Loader2Icon className={cn("text-primary size-8 animate-spin", SIZES[size])} />
    </div>
  );
};
