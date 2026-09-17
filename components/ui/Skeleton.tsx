import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "avatar" | "text";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "rounded-xl",
    card: "rounded-2xl h-48 w-full",
    avatar: "rounded-full h-10 w-10 shrink-0",
    text: "rounded-md h-4 w-3/4",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-ink-100/80 dark:bg-ink-100",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
