import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleAlertIcon, InfoIcon, RocketIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"

const meta = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "destructive"] },
  },
  args: { variant: "default" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Your trial converts to a paid plan in three days.
      </AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <RocketIcon />
      <AlertTitle>Deploy finished</AlertTitle>
      <AlertDescription>
        Version 2.4.0 is live on production.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args}>
      <CircleAlertIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        We could not charge the card on file. Update it to avoid interruption.
      </AlertDescription>
    </Alert>
  ),
}

/** Title only — the grid collapses to a single row. */
export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon />
      <AlertTitle>Scheduled maintenance tonight at 11pm UTC.</AlertTitle>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon />
      <AlertTitle>New version available</AlertTitle>
      <AlertDescription>Reload to pick up the latest build.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          Reload
        </Button>
      </AlertAction>
    </Alert>
  ),
}
