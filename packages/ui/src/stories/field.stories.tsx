import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Switch } from "@workspace/ui/components/switch"
import { Textarea } from "@workspace/ui/components/textarea"

const meta = {
  title: "Components/Field",
  component: Field,
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
  args: { orientation: "vertical" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" type="email" placeholder="you@company.com" />
      <FieldDescription>We only use this for receipts.</FieldDescription>
    </Field>
  ),
}

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="field-beta" className="flex-col items-start gap-0.5">
        Join the beta
        <FieldDescription>Ships weekly, breaks occasionally.</FieldDescription>
      </FieldLabel>
      <Switch id="field-beta" />
    </Field>
  ),
}

export const Invalid: Story = {
  render: (args) => (
    <Field {...args} data-invalid>
      <FieldLabel htmlFor="field-invalid">Email</FieldLabel>
      <Input id="field-invalid" aria-invalid defaultValue="avery@" />
      <FieldError>Enter a complete email address.</FieldError>
    </Field>
  ),
}

/** `FieldError` also accepts an array of validation results. */
export const MultipleErrors: Story = {
  render: (args) => (
    <Field {...args} data-invalid>
      <FieldLabel htmlFor="field-password">Password</FieldLabel>
      <Input id="field-password" type="password" aria-invalid defaultValue="abc" />
      <FieldError
        errors={[
          { message: "Must be at least 12 characters." },
          { message: "Must contain a number." },
        ]}
      />
    </Field>
  ),
}

export const Group: Story = {
  render: (args) => (
    <FieldGroup>
      <Field {...args}>
        <FieldLabel htmlFor="group-name">Full name</FieldLabel>
        <Input id="group-name" defaultValue="Avery Chen" />
      </Field>
      <Field {...args}>
        <FieldLabel htmlFor="group-bio">Bio</FieldLabel>
        <Textarea id="group-bio" placeholder="A sentence or two." />
        <FieldDescription>Shown on your public profile.</FieldDescription>
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field {...args} orientation="horizontal">
        <Checkbox id="group-import" />
        <FieldLabel htmlFor="group-import">Import from GitHub</FieldLabel>
      </Field>
    </FieldGroup>
  ),
}

export const Fieldset: Story = {
  render: (args) => (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldDescription>
        Pick how often we interrupt your day.
      </FieldDescription>
      <RadioGroup defaultValue="mentions">
        {[
          { value: "all", title: "Everything", hint: "Every event, instantly." },
          { value: "mentions", title: "Mentions", hint: "Only when named." },
          { value: "none", title: "Nothing", hint: "Total silence." },
        ].map((option) => (
          <Field {...args} key={option.value} orientation="horizontal">
            <RadioGroupItem value={option.value} id={`notify-${option.value}`} />
            <FieldContent>
              <FieldTitle>{option.title}</FieldTitle>
              <FieldDescription>{option.hint}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
}
