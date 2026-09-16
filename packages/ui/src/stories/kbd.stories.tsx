import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@workspace/ui/components/button"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  args: { children: "K" },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const Sequence: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      Press
      <KbdGroup>
        <Kbd>G</Kbd>
        <span>then</span>
        <Kbd>P</Kbd>
      </KbdGroup>
      to go to projects.
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <Button variant="outline">
      Command palette
      <KbdGroup className="ml-2">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  ),
}
