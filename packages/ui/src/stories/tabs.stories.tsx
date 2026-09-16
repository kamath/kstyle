import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: { defaultValue: "account", orientation: "horizontal" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-2 text-muted-foreground">
        Your profile, email and display name live here.
      </TabsContent>
      <TabsContent value="password" className="pt-2 text-muted-foreground">
        Rotate your password or turn on two-factor authentication.
      </TabsContent>
      <TabsContent value="sessions" className="pt-2 text-muted-foreground">
        Four devices are signed in right now.
      </TabsContent>
    </Tabs>
  ),
}

/** `variant="line"` drops the pill background for an underline. */
export const Line: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-3 text-muted-foreground">
        Your profile, email and display name live here.
      </TabsContent>
      <TabsContent value="password" className="pt-3 text-muted-foreground">
        Rotate your password or turn on two-factor authentication.
      </TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="px-2 text-muted-foreground">
        Your profile, email and display name live here.
      </TabsContent>
      <TabsContent value="password" className="px-2 text-muted-foreground">
        Rotate your password or turn on two-factor authentication.
      </TabsContent>
      <TabsContent value="sessions" className="px-2 text-muted-foreground">
        Four devices are signed in right now.
      </TabsContent>
    </Tabs>
  ),
}

export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-2 text-muted-foreground">
        Billing is only available on paid plans.
      </TabsContent>
    </Tabs>
  ),
}

export const WithCards: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Change your display name.</CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel htmlFor="tabs-name">Name</FieldLabel>
              <Input id="tabs-name" defaultValue="Avery Chen" />
            </Field>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Pick something long.</CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel htmlFor="tabs-password">New password</FieldLabel>
              <Input id="tabs-password" type="password" />
            </Field>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Update</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}
