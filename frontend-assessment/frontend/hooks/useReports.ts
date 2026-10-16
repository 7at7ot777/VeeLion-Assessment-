"use client";

import { useCallback, useEffect, useState } from "react";
import type { TasksSummary } from "@/types/api";
import { getErrorMessage, requestJson } from "@/lib/http";

export function useReports() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const body = await requestJson<TasksSummary>("/api/reports/tasks-summary", {
        method: "GET",
      });

      setSummary(body);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load reports right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    fetchSummary,
  };
}
