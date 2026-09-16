import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Label } from "@workspace/ui/components/label"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultChecked: true },
}

export const WithLabel: Story = {
  render: (args) => (
    <Label>
      <Checkbox {...args} id="terms" />
      Accept the terms of service
    </Label>
  ),
}

export const Indeterminate: Story = {
  args: { indeterminate: true, checked: true },
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox {...args} disabled />
        Disabled, unchecked
      </Label>
      <Label>
        <Checkbox {...args} disabled defaultChecked />
        Disabled, checked
      </Label>
    </div>
  ),
}

export const Invalid: Story = {
  args: { "aria-invalid": true },
  render: (args) => (
    <Label>
      <Checkbox {...args} />
      You must accept to continue
    </Label>
  ),
}

/** Inside a `Field` the label, description and control line up as one row. */
export const InField: Story = {
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox {...args} id="digest" defaultChecked />
      <FieldLabel htmlFor="digest" className="flex-col items-start gap-0.5">
        Weekly digest
        <FieldDescription>
          A Monday summary of everything that shipped.
        </FieldDescription>
      </FieldLabel>
    </Field>
  ),
}

export const Group: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {["Deployments", "Comments", "Mentions"].map((label) => (
        <Label key={label}>
          <Checkbox {...args} defaultChecked={label === "Mentions"} />
          {label}
        </Label>
      ))}
    </div>
  ),
}
