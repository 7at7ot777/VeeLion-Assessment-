"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivityLog } from "@/types/api";
import { getErrorMessage, requestJson } from "@/lib/http";

export function useActivity() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const logs = await requestJson<ActivityLog[]>("/api/activity", {
        method: "GET",
      });

      setActivity(logs || []);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load activity right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleActivity = useMemo(() => {
    if (!normalizedQuery) {
      return activity;
    }

    return activity.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(normalizedQuery) ||
        (item.info || "").toLowerCase().includes(normalizedQuery)
    );
  }, [activity, normalizedQuery]);

  return {
    activity,
    visibleActivity,
    total: activity.length,
    loading,
    error,
    query,
    setQuery,
    fetchActivity,
  };
}
