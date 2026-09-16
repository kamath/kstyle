import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatio } from "@workspace/ui/components/aspect-ratio"

const meta = {
  title: "Components/Aspect Ratio",
  component: AspectRatio,
  argTypes: {
    ratio: { control: { type: "number", step: 0.01 } },
  },
  args: { ratio: 16 / 9 },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

const Placeholder = ({ label }: { label: string }) => (
  <div className="flex size-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
    {label}
  </div>
)

export const Default: Story = {
  render: (args) => (
    <AspectRatio {...args}>
      <Placeholder label="16 / 9" />
    </AspectRatio>
  ),
}

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <AspectRatio {...args}>
      <Placeholder label="1 / 1" />
    </AspectRatio>
  ),
}

export const Portrait: Story = {
  args: { ratio: 3 / 4 },
  render: (args) => (
    <AspectRatio {...args}>
      <Placeholder label="3 / 4" />
    </AspectRatio>
  ),
}

export const WithImage: Story = {
  render: (args) => (
    <AspectRatio {...args} className="overflow-hidden rounded-xl">
      <img
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
        alt="Sunlit desert road"
        className="size-full object-cover"
      />
    </AspectRatio>
  ),
}
