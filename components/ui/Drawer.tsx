"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  side?: "left" | "right";
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  width = "md",
  className,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const widthStyles = {
    sm: "w-[85vw] max-w-xs",
    md: "w-[85vw] max-w-md",
    lg: "w-[90vw] max-w-lg",
    xl: "w-[90vw] max-w-2xl",
    full: "w-full max-w-full",
  };

  const initialPosition = side === "right" ? { x: "100%" } : { x: "-100%" };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={initialPosition}
            animate={{ x: 0 }}
            exit={initialPosition}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className={cn(
              "relative flex flex-col bg-surface shadow-2xl z-10 h-full overflow-hidden text-left",
              side === "right" ? "ml-auto" : "mr-auto",
              widthStyles[width],
              className
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              {title ? (
                <div className="text-base font-bold text-ink-900">{title}</div>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
