import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Label } from "@workspace/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"

const meta = {
  title: "Components/Radio Group",
  component: RadioGroup,
  argTypes: { disabled: { control: "boolean" } },
  args: { defaultValue: "comfortable" },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const densities = ["compact", "comfortable", "spacious"]

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {densities.map((value) => (
        <Label key={value} className="capitalize">
          <RadioGroupItem value={value} />
          {value}
        </Label>
      ))}
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}

export const DisabledItem: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Label>
        <RadioGroupItem value="compact" />
        Compact
      </Label>
      <Label>
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label>
        <RadioGroupItem value="spacious" disabled />
        Spacious (Pro only)
      </Label>
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  args: { defaultValue: "hobby" },
  render: (args) => (
    <RadioGroup {...args} className="gap-3">
      {[
        { value: "hobby", title: "Hobby", hint: "One project, free forever." },
        { value: "pro", title: "Pro", hint: "Unlimited projects, $20/month." },
      ].map((plan) => (
        <Field key={plan.value} orientation="horizontal">
          <RadioGroupItem value={plan.value} id={plan.value} />
          <FieldLabel htmlFor={plan.value} className="flex-col items-start gap-0.5">
            {plan.title}
            <FieldDescription>{plan.hint}</FieldDescription>
          </FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  ),
}
