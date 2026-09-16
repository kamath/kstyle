import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ArrowRightIcon,
  DownloadIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Spinner } from "@workspace/ui/components/spinner"

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} size="xs">
        Extra small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
}

export const IconSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} variant="outline" size="icon-xs" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button {...args} variant="outline" size="icon-sm" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button {...args} variant="outline" size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button {...args} variant="outline" size="icon-lg" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
}

/** `data-icon="inline-start" | "inline-end"` tightens the padding on that side. */
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args}>
        <DownloadIcon data-icon="inline-start" />
        Download
      </Button>
      <Button {...args} variant="outline">
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button {...args} variant="destructive">
        <TrashIcon data-icon="inline-start" />
        Delete
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button {...args} disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button {...args} variant="outline" size="icon" disabled aria-label="Saving">
        <Spinner />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  render: (args) => (
    <Button {...args} variant="outline" aria-invalid>
      Invalid
    </Button>
  ),
}
