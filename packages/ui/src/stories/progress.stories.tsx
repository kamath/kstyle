import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"

const meta = {
  title: "Components/Progress",
  component: Progress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: { value: 62 },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

/** A `null` value renders the indeterminate state. */
export const Indeterminate: Story = {
  args: { value: null },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Preparing</ProgressLabel>
    </Progress>
  ),
}

export const Complete: Story = {
  args: { value: 100 },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Done</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

export const CustomFormat: Story = {
  args: { value: 41, max: 60 },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Storage</ProgressLabel>
      <ProgressValue>{(_, value) => `${value} of 60 GB`}</ProgressValue>
    </Progress>
  ),
}
