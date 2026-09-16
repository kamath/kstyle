import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

const meta = {
  title: "Components/Toggle Group",
  component: ToggleGroup,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    spacing: { control: { type: "number", min: 0, max: 4 } },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { variant: "outline", size: "default", spacing: 2, multiple: true },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: ["bold"] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** `multiple={false}` behaves like a radio group. */
export const Single: Story = {
  args: { multiple: false, defaultValue: ["center"] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** `spacing={0}` joins the items into one connected control. */
export const Joined: Story = {
  args: { spacing: 0, multiple: false, defaultValue: ["center"] },
  render: Single.render,
}

export const Sizes: Story = {
  args: { multiple: false, defaultValue: ["center"] },
  render: (args) => (
    <div className="flex flex-col items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup {...args} key={size} size={size}>
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
}

export const WithText: Story = {
  args: { multiple: false, spacing: 0, defaultValue: ["week"] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ["bold"] },
  render: Default.render,
}
