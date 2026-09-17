"use client";

import React, { useState } from "react";
import { Bell, Plus, Trash2, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { mockJobSeeker } from "@/lib/data/mockUsers";
import { categories } from "@/lib/data/categories";

export default function SeekerAlertsPage() {
  const { success } = useToast();
  const [alerts, setAlerts] = useState(mockJobSeeker.jobAlerts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Software & IT");
  const [newFrequency, setNewFrequency] = useState<"daily" | "weekly">("daily");

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAlert = {
      id: `alert-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      location: "Colombo",
      frequency: newFrequency,
    };

    setAlerts([...alerts, newAlert]);
    setIsModalOpen(false);
    setNewTitle("");
    success("Alert Created", `Email notifications configured for "${newAlert.title}".`);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
    success("Alert Removed", "You will no longer receive emails for this alert.");
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight font-heading">
            Custom Job Alerts ({alerts.length})
          </h1>
          <p className="text-xs text-ink-500 mt-0.5">
            Get instant email notifications whenever matching Sri Lankan vacancies go live.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Create New Alert
        </Button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 rounded-2xl border border-border bg-surface shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink-900">{alert.title}</h3>
                <div className="flex items-center gap-3 text-xs text-ink-500 mt-1 flex-wrap">
                  <span className="font-semibold text-primary-600">{alert.category}</span>
                  <span>&bull;</span>
                  <span>Location: {alert.location || "Any City"}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 font-medium capitalize">
                    <Clock className="h-3 w-3" />
                    {alert.frequency} Email Digest
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active
              </span>
              <button
                type="button"
                onClick={() => handleDeleteAlert(alert.id)}
                className="p-2 rounded-lg text-ink-300 hover:text-accent-danger transition-colors"
                title="Delete Alert"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Custom Job Alert"
        description="Receive verified vacancies directly in your inbox"
      >
        <form onSubmit={handleCreateAlert} className="space-y-4 text-left">
          <Input
            label="Alert Name / Keywords"
            placeholder="e.g. Senior React Developer in Colombo"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <Select
            label="Industry / Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            options={categories.map((c) => ({ label: c.name, value: c.name }))}
          />

          <Select
            label="Frequency"
            value={newFrequency}
            onChange={(e) => setNewFrequency(e.target.value as "daily" | "weekly")}
            options={[
              { label: "Daily Digest (Recommended)", value: "daily" },
              { label: "Weekly Summary", value: "weekly" },
            ]}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Alert
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
