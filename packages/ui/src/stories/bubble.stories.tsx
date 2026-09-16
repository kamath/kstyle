import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@workspace/ui/components/bubble"

const meta = {
  title: "Components/Bubble",
  component: Bubble,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "muted",
        "tinted",
        "outline",
        "ghost",
        "destructive",
      ],
    },
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  args: { variant: "default", align: "start" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>
        The build is green again — the flaky test was a timezone assumption.
      </BubbleContent>
    </Bubble>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {(
        [
          "default",
          "secondary",
          "muted",
          "tinted",
          "outline",
          "ghost",
          "destructive",
        ] as const
      ).map((variant) => (
        <Bubble {...args} key={variant} variant={variant}>
          <BubbleContent className="capitalize">{variant}</BubbleContent>
        </Bubble>
      ))}
    </div>
  ),
}

export const Aligned: Story = {
  render: (args) => (
    <BubbleGroup>
      <Bubble {...args} variant="muted" align="start">
        <BubbleContent>Aligned to the start.</BubbleContent>
      </Bubble>
      <Bubble {...args} align="end">
        <BubbleContent>Aligned to the end.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}

/** Consecutive bubbles in a group tighten their shared corners. */
export const Stacked: Story = {
  render: (args) => (
    <BubbleGroup>
      {[
        "Morning — did the migration land?",
        "I see the branch merged.",
        "Just checking before I deploy.",
      ].map((text) => (
        <Bubble {...args} key={text} variant="muted">
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
}

export const WithReactions: Story = {
  render: (args) => (
    <div className="pb-4">
      <Bubble {...args} variant="muted" className="relative">
        <BubbleContent>Shipped it. Going for coffee.</BubbleContent>
        <BubbleReactions side="bottom" align="end">
          <span>🎉</span>
          <span>☕</span>
          <span className="text-xs text-muted-foreground">3</span>
        </BubbleReactions>
      </Bubble>
    </div>
  ),
}

/** `render` turns a bubble into a button or link without losing its styling. */
export const Interactive: Story = {
  render: (args) => (
    <Bubble {...args} variant="outline">
      <BubbleContent render={<button type="button" />}>
        Tap to retry sending
      </BubbleContent>
    </Bubble>
  ),
}
