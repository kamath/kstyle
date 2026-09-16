import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

const meta = {
  title: "Components/Native Select",
  component: NativeSelect,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
    disabled: { control: "boolean" },
  },
  args: { size: "default" },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="banana">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: Default.render,
}

export const Grouped: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="pst">
      <NativeSelectOptGroup label="North America">
        <NativeSelectOption value="est">Eastern</NativeSelectOption>
        <NativeSelectOption value="pst">Pacific</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="gmt">Greenwich</NativeSelectOption>
        <NativeSelectOption value="cet">Central European</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="native-fruit">Fruit</Label>
      <NativeSelect {...args} id="native-fruit" defaultValue="apple">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </div>
  ),
}
