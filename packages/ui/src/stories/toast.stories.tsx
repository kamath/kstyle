import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@workspace/ui/components/button"
import { Toaster, toast } from "@workspace/ui/components/toast"

const meta = {
  title: "Components/Toast",
  component: Toaster,
  decorators: [
    (Story) => (
      <Toaster>
        <Story />
      </Toaster>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Deployment queued",
          description: "Atlas will be live in about a minute.",
        })
      }
    >
      Show toast
    </Button>
  ),
}

/** `type` selects the leading icon. */
export const Types: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["success", "info", "warning", "error", "loading"] as const).map(
        (type) => (
          <Button
            key={type}
            variant="outline"
            className="capitalize"
            onClick={() =>
              toast.add({
                type,
                title: `${type[0].toUpperCase()}${type.slice(1)}`,
                description: `This is a ${type} toast.`,
              })
            }
          >
            {type}
          </Button>
        )
      )}
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Message archived",
          description: "You can still find it in the archive.",
          actionProps: {
            children: "Undo",
            onClick: () => toast.add({ type: "success", title: "Restored" }),
          },
        })
      }
    >
      Archive message
    </Button>
  ),
}

export const Persistent: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          type: "error",
          title: "Upload failed",
          description: "The file exceeded the 25 MB limit.",
          timeout: 0,
        })
      }
    >
      Show sticky toast
    </Button>
  ),
}

/** Toasts stack, and expand when you hover the pile. */
export const Stacked: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        [1, 2, 3].forEach((index) =>
          toast.add({
            title: `Notification ${index}`,
            description: "Hover the stack to fan it out.",
          })
        )
      }
    >
      Show three toasts
    </Button>
  ),
}
