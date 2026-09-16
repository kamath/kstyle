import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  args: { size: "default" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Monthly usage</CardTitle>
        <CardDescription>Resets on the first of each month.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-medium tabular-nums">48,210</p>
        <p className="text-muted-foreground">requests of 100,000</p>
      </CardContent>
    </Card>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: Default.render,
}

export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Atlas</CardTitle>
        <CardDescription>Deployed 6 minutes ago</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="Project options">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        main@4f2b19c · production
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your work email to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="card-email">Email</FieldLabel>
          <Input id="card-email" type="email" placeholder="you@company.com" />
        </Field>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
}

/** An image as the first child loses the top padding and rounds with the card. */
export const WithImage: Story = {
  render: (args) => (
    <Card {...args}>
      <img
        src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&dpr=2&q=80"
        alt="Mountain ridge at dusk"
        className="h-40 w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Ridgeline</CardTitle>
        <CardDescription>Fourteen photographs, one evening.</CardDescription>
      </CardHeader>
    </Card>
  ),
}
