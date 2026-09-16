import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"

const meta = {
  title: "Components/Scroll Area",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 40 }, (_, index) => `v1.2.0-beta.${40 - index}`)

export const Default: Story = {
  render: (args) => (
    <ScrollArea {...args} className="h-64 w-56 rounded-lg border">
      <div className="p-3">
        <p className="mb-2 text-sm font-medium">Tags</p>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="py-1.5 font-mono text-sm">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: (args) => (
    <ScrollArea {...args} className="w-80 rounded-lg border whitespace-nowrap">
      <div className="flex gap-3 p-3">
        {Array.from({ length: 10 }, (_, index) => (
          <figure key={index} className="shrink-0">
            <div className="flex size-32 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
              {index + 1}
            </div>
            <figcaption className="pt-1 text-xs text-muted-foreground">
              Photo {index + 1}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}
