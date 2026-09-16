import type { Meta, StoryObj } from "@storybook/react-vite"
import { BoldIcon, ItalicIcon, StarIcon } from "lucide-react"

import { Toggle } from "@workspace/ui/components/toggle"

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    disabled: { control: "boolean" },
    pressed: { control: "boolean" },
  },
  args: { variant: "default", size: "default" },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
}

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Toggle {...args} aria-label="Toggle italic">
      <ItalicIcon />
    </Toggle>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Toggle {...args} key={size} size={size} variant="outline" aria-label={`Toggle ${size}`}>
          <StarIcon />
        </Toggle>
      ))}
    </div>
  ),
}

export const WithText: Story = {
  render: (args) => (
    <Toggle {...args} variant="outline">
      <StarIcon data-icon="inline-start" />
      Starred
    </Toggle>
  ),
}

export const Pressed: Story = {
  args: { defaultPressed: true },
  render: (args) => (
    <Toggle {...args} variant="outline" aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Toggle {...args} variant="outline" aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
}
