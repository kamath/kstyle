import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "@workspace/ui/components/skeleton"

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: "h-4 w-48" },
}

export const Card: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
}

export const Row: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-none" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  ),
}
