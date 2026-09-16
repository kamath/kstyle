import type { Meta, StoryObj } from "@storybook/react-vite"
import { FolderIcon, PlusIcon, SearchIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { Input } from "@workspace/ui/components/input"

const meta = {
  title: "Components/Empty",
  component: Empty,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md rounded-xl border border-dashed">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create your first project to start deploying.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          New project
        </Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoResults: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No matches for “atlas-v3”</EmptyTitle>
        <EmptyDescription>
          Check the spelling or try a broader term.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Input placeholder="Search projects" />
      </EmptyContent>
    </Empty>
  ),
}

/** Without `variant="icon"` the media slot is unstyled — good for illustrations. */
export const PlainMedia: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia>
          <span className="text-4xl">📭</span>
        </EmptyMedia>
        <EmptyTitle>Inbox zero</EmptyTitle>
        <EmptyDescription>Nothing left to triage today.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const TextOnly: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyTitle>No activity</EmptyTitle>
        <EmptyDescription>
          Events from the last 30 days show up here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
