"use client";

import React from "react";
import { cn, formatLKR } from "@/lib/utils";

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  isCurrency?: boolean;
  className?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 10000,
  value,
  onChange,
  label,
  isCurrency = true,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("w-full space-y-3 text-left", className)}>
      <div className="flex items-center justify-between text-sm">
        {label && <span className="font-medium text-ink-900">{label}</span>}
        <span className="font-semibold text-primary-600">
          {isCurrency ? formatLKR(value) + "/mo" : value}
        </span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-ink-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/30"
          style={{
            background: `linear-gradient(to right, #1D4ED8 0%, #1D4ED8 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`,
          }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-ink-500">
        <span>{isCurrency ? formatLKR(min) : min}</span>
        <span>{isCurrency ? formatLKR(max) : max}</span>
      </div>
    </div>
  );
};
