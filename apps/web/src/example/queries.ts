import { useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api.ts";

export const keys = {
  tasks: ["tasks"] as const,
};

// Mutations on one task share a key, so any of them in flight locks the task's other actions.
const mutations = { task: (id: string) => ["task", id] as const, any: ["task"] as const };

/** A change to this task (or, with no id, to any task) is in flight. */
export const useTaskBusy = (id?: string) => useIsMutating({ mutationKey: id ? mutations.task(id) : mutations.any }) > 0;

export const useTasks = () => useQuery({ queryKey: keys.tasks, queryFn: api.list });

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.tasks }),
    // Shown on the title field instead of as a toast.
    onError: () => {},
  });
}

export function useToggleTask(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutations.task(id),
    mutationFn: () => api.toggle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.tasks }),
  });
}

export function useRemoveTask(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: mutations.task(id),
    mutationFn: () => api.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.tasks }),
  });
}
