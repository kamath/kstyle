import { Form } from "@base-ui/react/form";
import { useAtom, useSetAtom } from "jotai";
import { useRef, type RefObject } from "react";
import { api, type Task } from "../example/api.ts";
import { useCreateTask, useRemoveTask, useTaskBusy, useTasks, useToggleTask } from "../example/queries.ts";
import { cursorAtoms, deleteTaskAtom, newTaskOpenAtom, outageAtom } from "../state.ts";
import { ActionButton, Kbd, useAction } from "../ui/keys.tsx";
import { toast } from "../ui/toast.tsx";
import { buttons } from "../ui/tw.ts";
import { CancelButton, Confirm, Modal, Query, SubmitButton, TextField, useSubmit } from "../ui/ui.tsx";
import { Hint, List, Pane, useCursorOnOpen, usePath, width } from "./panes.tsx";

const when = (t: number) => new Date(t).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

/**
 * A small task app built exactly the way the skill says to build one, so visitors can feel the result.
 * IA: tasks (c new, r refresh, ! outage) → a task (x done/reopen, d delete).
 */
export function Example() {
  const { item, go } = usePath();
  const tasks = useTasks();
  const open = item === undefined ? undefined : tasks.data?.find((t) => t.id === item);
  useCursorOnOpen(cursorAtoms.example, item);

  const setCreating = useSetAtom(newTaskOpenAtom);
  const create = useAction({
    id: "task.new",
    label: "New task",
    keys: ["c"],
    group: "Tasks",
    run: () => setCreating(true),
  });
  const changing = useTaskBusy();
  const refresh = useAction({
    id: "task.refresh",
    label: "Refresh",
    keys: ["r"],
    group: "Tasks",
    // On error, <Query> owns r (retry).
    // Not while it's already fetching, and not over a pending change: a refetch that lands first would paint the
    // old value over it. The change's own invalidation refetches when it settles.
    enabled: !tasks.isError && !tasks.isFetching && !changing,
    run: () => void tasks.refetch(),
  });
  const [down, setDown] = useAtom(outageAtom);
  const outage = useAction({
    id: "task.outage",
    label: down ? "Go online" : "Go offline",
    keys: ["!"],
    group: "Tasks",
    run: () => {
      api.setOutage(!down);
      setDown(!down);
      toast.done(down ? "Back online. Press r to recover." : "Every request now fails. Press r to see it.");
    },
  });

  const toolbar = (
    <div className={`${buttons} bg-bar px-1.5 py-1.5`}>
      <ActionButton action={create} tone="primary" />
      <ActionButton action={refresh} pending={tasks.isFetching && !tasks.isPending && "Refreshing…"} />
      <ActionButton action={outage} tone={down ? "danger" : undefined} />
    </div>
  );

  return (
    <>
      <Pane active={!item} onBack={() => go()} title="Example" toolbar={toolbar} className={`${width.list} bg-page`}>
        <Query
          q={tasks}
          what="your tasks"
          isEmpty={(t) => !t.length}
          empty={
            <p>
              No tasks left. Press <Kbd keys={create.keys} /> to add one.
            </p>
          }
        >
          {(list) => (
            <List
              name="Tasks"
              items={list}
              keyOf={(t) => t.id}
              cursorAtom={cursorAtoms.example}
              active={!item}
              onOpen={(t) => go("example", t.id)}
              row={(t) => (
                <>
                  <span className={`min-w-0 flex-1 truncate ${t.done ? "text-muted line-through" : ""}`}>
                    {t.title}
                  </span>
                  <Status task={t} />
                </>
              )}
            />
          )}
        </Query>
      </Pane>
      {item === undefined ? (
        <Hint>
          <p>
            A working task app built with this skill. Its data lives in this tab, behind a fake network with real
            latency, so every loading, saving and error state shows.
          </p>
          <p>
            <Kbd keys={["Enter"]} /> opens the highlighted task, <Kbd keys={create.keys} /> adds one, and{" "}
            <Kbd keys={outage.keys} /> takes the network down so you can watch it fail and recover.
          </p>
        </Hint>
      ) : (
        <Pane
          key={item}
          active
          reader
          showTitle
          onBack={() => go("example")}
          title={open?.title ?? (tasks.isPending ? "Loading…" : "Not found")}
          className={`${width.fill} bg-raised`}
        >
          <div className="px-5 pb-8">
            {open ? (
              <TaskDetail task={open} />
            ) : (
              !tasks.isPending && <p className="text-muted">This task no longer exists.</p>
            )}
          </div>
        </Pane>
      )}
      <NewTask />
      <DeleteTask tasks={tasks.data ?? []} onDeleted={() => go("example")} />
    </>
  );
}

// Only on the row: in the task's pane the button already says it ("Reopen"), and while saving, the button says so.
function Status({ task }: { task: Task }) {
  return task.done ? <span className="bg-ok px-1.5 py-0.5 text-xs text-ok-ink">Done</span> : null;
}

// The task's pane owns the actions on the task.
function TaskDetail({ task }: { task: Task }) {
  const toggle = useToggleTask(task.id);
  const setDeleting = useSetAtom(deleteTaskAtom);
  const saving = toggle.isPending;
  // Any change to this task in flight (a toggle, a delete) locks both actions on it.
  const busy = useTaskBusy(task.id);
  const done = useAction({
    id: "task.toggle",
    label: task.done ? "Reopen" : "Mark done",
    keys: ["x"],
    group: "Task",
    enabled: !busy,
    run: () => toggle.mutate(),
  });
  const del = useAction({
    id: "task.delete",
    label: "Delete task",
    keys: ["d"],
    group: "Task",
    enabled: !busy,
    run: () => setDeleting(task.id),
  });
  return (
    <div className="flex flex-col *:py-2">
      <p className="text-muted">Added {when(task.created)}</p>
      <div className={buttons}>
        <ActionButton action={done} tone="primary" pending={saving && "Saving…"} />
        <ActionButton action={del} tone="danger" />
      </div>
    </div>
  );
}

function NewTask() {
  const [open, setOpen] = useAtom(newTaskOpenAtom);
  const input = useRef<HTMLInputElement>(null);
  const create = useCreateTask();
  const close = () => {
    setOpen(false);
    create.reset();
  };
  return (
    <Modal open={open} onClose={close} title="New task" initialFocus={input}>
      <NewTaskForm create={create} input={input} onDone={close} />
    </Modal>
  );
}

// Inside the modal's scope, so its keys (mod+Enter, Esc) belong to the dialog.
function NewTaskForm({
  create,
  input,
  onDone,
}: {
  create: ReturnType<typeof useCreateTask>;
  input: RefObject<HTMLInputElement | null>;
  onDone: () => void;
}) {
  const form = useRef<HTMLFormElement>(null);
  const submit = useSubmit(form, "Add task", !create.isPending);
  return (
    <Form
      ref={form}
      className="flex flex-col *:py-2"
      errors={create.error ? { title: create.error.message } : undefined}
      onFormSubmit={({ title }) =>
        create.mutate(String(title), {
          onSuccess: (t) => {
            onDone();
            toast.done(`Added "${t.title}"`);
          },
        })
      }
    >
      <TextField ref={input} label="Title" name="title" autoComplete="off" required />
      <div className={`${buttons} justify-end`}>
        <CancelButton onClose={onDone} />
        <SubmitButton action={submit} pending={create.isPending && "Adding…"} />
      </div>
    </Form>
  );
}

function DeleteTask({ tasks, onDeleted }: { tasks: Task[]; onDeleted: () => void }) {
  const [id, setId] = useAtom(deleteTaskAtom);
  const remove = useRemoveTask(id ?? "");
  const task = tasks.find((t) => t.id === id);
  return (
    <Confirm
      open={!!id}
      onClose={() => setId(null)}
      title="Delete this task?"
      description={task ? `"${task.title}" will be gone for good.` : "This task will be gone for good."}
      confirm="Delete"
      pending={remove.isPending && "Deleting…"}
      onConfirm={() =>
        id &&
        remove.mutate(undefined, {
          onSuccess: () => {
            setId(null);
            onDeleted();
            toast.done(`Deleted "${task?.title}"`);
          },
          onError: () => setId(null),
        })
      }
    />
  );
}
