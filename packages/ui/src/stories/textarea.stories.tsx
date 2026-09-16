import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: { disabled: { control: "boolean" } },
  args: { placeholder: "Tell us what happened…" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="textarea-notes">Notes</Label>
      <Textarea {...args} id="textarea-notes" />
    </div>
  ),
}

/** `field-sizing-content` grows the box with the text instead of scrolling. */
export const Autosizing: Story = {
  args: {
    defaultValue:
      "The deploy failed on the migration step. Rolling back put the database in a half-applied state, so the next deploy has to run the down migration first.",
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Locked." },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Too short" },
}
