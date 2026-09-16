import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@workspace/ui/components/label"
import { Slider } from "@workspace/ui/components/slider"

const meta = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: { min: 0, max: 100 },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: 40 },
}

export const Range: Story = {
  args: { defaultValue: [25, 75] },
}

export const Steps: Story = {
  args: { defaultValue: 60, step: 20 },
}

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true },
}

export const Vertical: Story = {
  args: { defaultValue: 55, orientation: "vertical" },
  decorators: [
    (Story) => (
      <div className="h-48">
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  args: { defaultValue: 70 },
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Label htmlFor="volume">Volume</Label>
      <Slider {...args} id="volume" />
    </div>
  ),
}
