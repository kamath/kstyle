// The example app's "server": an in-memory list with network-like latency, so every query and mutation state
// shows up for real. During a simulated outage every request fails, to show the error state and its retry.

export type Task = { id: string; title: string; done: boolean; created: number };

const day = 86_400_000;
let tasks: Task[] = [
  { id: "t1", title: "Map the information architecture", done: true, created: Date.now() - 3 * day },
  { id: "t2", title: "Write the keymap next to it", done: true, created: Date.now() - 2 * day },
  { id: "t3", title: "Pick Base UI parts for each control", done: false, created: Date.now() - day },
  { id: "t4", title: "Split server and client state", done: false, created: Date.now() - day / 2 },
  { id: "t5", title: "Run the review checklist", done: false, created: Date.now() - day / 8 },
];
let outage = false;
let nextId = 6;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function call<T>(run: () => T): Promise<T> {
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));
  if (outage) {
    throw new ApiError("503 Service Unavailable (simulated)", 503);
  }
  return structuredClone(run());
}

const find = (id: string) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new ApiError("That task no longer exists", 404);
  return task;
};

export const api = {
  list: () => call(() => tasks),
  create: (title: string) =>
    call(() => {
      const name = title.trim();
      if (!name) throw new ApiError("Give the task a title", 422);
      if (tasks.some((t) => t.title.toLowerCase() === name.toLowerCase()))
        throw new ApiError(`There's already a task called "${name}"`, 422);
      const task = { id: `t${nextId++}`, title: name, done: false, created: Date.now() };
      tasks = [...tasks, task];
      return task;
    }),
  toggle: (id: string) =>
    call(() => {
      const task = { ...find(id), done: !find(id).done };
      tasks = tasks.map((t) => (t.id === id ? task : t));
      return task;
    }),
  remove: (id: string) =>
    call(() => {
      find(id);
      tasks = tasks.filter((t) => t.id !== id);
    }),
  setOutage: (on: boolean) => void (outage = on),
};
