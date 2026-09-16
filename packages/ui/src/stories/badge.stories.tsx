import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckIcon, ClockIcon, XIcon } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="destructive">
        Destructive
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
      <Badge {...args} variant="ghost">
        Ghost
      </Badge>
      <Badge {...args} variant="link">
        Link
      </Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="secondary">
        <CheckIcon data-icon="inline-start" />
        Shipped
      </Badge>
      <Badge {...args} variant="outline">
        <ClockIcon data-icon="inline-start" />
        Pending
      </Badge>
      <Badge {...args} variant="destructive">
        <XIcon data-icon="inline-start" />
        Failed
      </Badge>
    </div>
  ),
}

/** `render` swaps the underlying element — here for a link. */
export const AsLink: Story = {
  render: (args) => (
    <Badge {...args} render={<a href="#link" />}>
      Docs
    </Badge>
  ),
}

export const Numeric: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args}>1</Badge>
      <Badge {...args}>24</Badge>
      <Badge {...args} variant="secondary">
        99+
      </Badge>
    </div>
  ),
}
