import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
    disabled: { control: "boolean" },
  },
  args: { placeholder: "you@company.com", type: "email" },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="input-email">Email</Label>
      <Input {...args} id="input-email" />
    </div>
  ),
}

export const Types: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} type="text" placeholder="Text" />
      <Input {...args} type="password" placeholder="Password" />
      <Input {...args} type="number" placeholder="42" />
      <Input {...args} type="search" placeholder="Search" />
      <Input {...args} type="file" placeholder={undefined} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "locked@company.com" },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: "read-only@company.com" },
}
