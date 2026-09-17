"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  name = "",
  size = "md",
  verified = false,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeDimensions = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  const getInitials = (n: string) => {
    if (!n) return "SK";
    const parts = n.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          "relative overflow-hidden rounded-full border border-border bg-primary-50 font-semibold text-primary-700 flex items-center justify-center select-none shadow-sm",
          sizeDimensions[size],
          className
        )}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || name || "Avatar"}
            fill
            sizes="64px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>
      {verified && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full bg-white text-primary-600 shadow-sm",
            size === "sm" ? "p-0" : "p-0.5"
          )}
          title="Verified Employer"
        >
          <CheckCircle className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4", "fill-primary-600 text-white")} />
        </span>
      )}
    </div>
  );
};
