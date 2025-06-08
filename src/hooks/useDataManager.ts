import { useCallback, useEffect, useState } from "react";
import { DataManager } from "@/lib/data/DataManager";
import type { Project, Experience } from "@/types";

interface UseDataState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export function useProjects() {
  const [state, setState] = useState<UseDataState<Project[]>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const dataManager = DataManager.getInstance();
        const projects = await dataManager.getActiveProjects();
        setState({ data: projects, loading: false, error: null });
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to load projects",
        });
      }
    };

    loadProjects();
  }, []);

  const refetch = useCallback(async () => {
    const dataManager = DataManager.getInstance();
    dataManager.clearCache("projects");

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const projects = await dataManager.getActiveProjects();
      setState({ data: projects, loading: false, error: null });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : "Failed to load projects",
      }));
    }
  }, []);

  return {
    projects: state.data,
    loading: state.loading,
    error: state.error,
    refetch,
  };
}

export function useExperiences() {
  const [state, setState] = useState<UseDataState<Experience[]>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const dataManager = DataManager.getInstance();
        const experiences = await dataManager.getExperiencesData();
        setState({ data: experiences, loading: false, error: null });
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to load experiences",
        });
      }
    };

    loadExperiences();
  }, []);

  return {
    experiences: state.data,
    loading: state.loading,
    error: state.error,
  };
}
