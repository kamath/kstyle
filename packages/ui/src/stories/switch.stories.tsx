import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

const meta = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { size: "default" },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultChecked: true },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args} size="sm" defaultChecked />
      <Switch {...args} size="default" defaultChecked />
    </div>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <Label>
      <Switch {...args} id="airplane" />
      Airplane mode
    </Label>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Label>
        <Switch {...args} disabled />
        Off and disabled
      </Label>
      <Label>
        <Switch {...args} disabled defaultChecked />
        On and disabled
      </Label>
    </div>
  ),
}

export const InField: Story = {
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldLabel htmlFor="autodeploy" className="flex-col items-start gap-0.5">
        Automatic deploys
        <FieldDescription>
          Push to <code>main</code> and we ship it for you.
        </FieldDescription>
      </FieldLabel>
      <Switch {...args} id="autodeploy" defaultChecked />
    </Field>
  ),
}
