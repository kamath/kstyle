import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

const meta = {
  title: "Components/Label",
  component: Label,
  args: { children: "Email address" },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInput: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Label {...args} htmlFor="label-email" />
      <Input id="label-email" type="email" placeholder="you@company.com" />
    </div>
  ),
}

/** Wrapping a control makes the whole label a hit target. */
export const WrappingControl: Story = {
  render: () => (
    <Label>
      <Checkbox />
      Remember this device
    </Label>
  ),
}
