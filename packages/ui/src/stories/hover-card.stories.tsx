import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

const meta = {
  title: "Components/Hover Card",
  component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger render={<Button variant="link" />}>
        @averychen
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/128?img=12" alt="" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Avery Chen</p>
            <p className="text-muted-foreground">
              Design engineer. Builds the boring parts well.
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarIcon className="size-3" />
              Joined March 2021
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export const Sides: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side} {...args}>
          <HoverCardTrigger render={<Button variant="outline" />}>
            {side}
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-48">
            Opens on the {side}.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: Default.render,
}
