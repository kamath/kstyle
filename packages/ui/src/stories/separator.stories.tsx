import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "@workspace/ui/components/separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: { orientation: "horizontal" },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Base UI</p>
        <p className="text-sm text-muted-foreground">
          Unstyled primitives for building design systems.
        </p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center gap-3 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Changelog</span>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Left</span>
      <Separator {...args} />
      <span>Right</span>
    </div>
  ),
}
