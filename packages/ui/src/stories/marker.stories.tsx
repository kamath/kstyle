import type { Meta, StoryObj } from "@storybook/react-vite"
import { GitCommitIcon, InfoIcon } from "lucide-react"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@workspace/ui/components/marker"

const meta = {
  title: "Components/Marker",
  component: Marker,
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "separator", "border"],
    },
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
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Draft saved a moment ago</MarkerContent>
    </Marker>
  ),
}

/** `separator` centres the content between two rules — good for date dividers. */
export const Separator: Story = {
  args: { variant: "separator" },
  render: (args) => (
    <Marker {...args}>
      <MarkerContent>Today</MarkerContent>
    </Marker>
  ),
}

export const Border: Story = {
  args: { variant: "border" },
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <GitCommitIcon />
      </MarkerIcon>
      <MarkerContent>4f2b19c · deployed to production</MarkerContent>
    </Marker>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["default", "separator", "border"] as const).map((variant) => (
        <Marker {...args} key={variant} variant={variant}>
          <MarkerContent className="capitalize">{variant}</MarkerContent>
        </Marker>
      ))}
    </div>
  ),
}
