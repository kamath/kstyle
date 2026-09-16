import type { Meta, StoryObj } from "@storybook/react-vite"
import { InfoIcon, PlusIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipContent>Adds a new deployment</TooltipContent>
    </Tooltip>
  ),
}

export const Sides: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} {...args}>
          <TooltipTrigger render={<Button variant="outline" />}>
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>Placed on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}

export const OnIconButton: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger
        render={<Button variant="outline" size="icon" />}
        aria-label="New project"
      >
        <PlusIcon />
      </TooltipTrigger>
      <TooltipContent>New project</TooltipContent>
    </Tooltip>
  ),
}

export const WithShortcut: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" />}>
        <InfoIcon data-icon="inline-start" />
        Command palette
      </TooltipTrigger>
      <TooltipContent>
        Open the palette
        <KbdGroup>
          <Kbd className="bg-background/20 text-background">⌘</Kbd>
          <Kbd className="bg-background/20 text-background">K</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  ),
}
