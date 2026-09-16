import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  argTypes: {
    defaultOpen: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

const rows = ["@radix-ui/primitives", "@radix-ui/colors", "@stitches/react"]

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className="flex w-72 flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">3 starred repositories</span>
        <CollapsibleTrigger
          render={<Button variant="ghost" size="icon-sm" />}
          aria-label="Toggle repositories"
        >
          <ChevronsUpDownIcon />
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border px-3 py-2 font-mono text-sm">
        {rows[0]}
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {rows.slice(1).map((row) => (
          <div
            key={row}
            className="rounded-lg border px-3 py-2 font-mono text-sm"
          >
            {row}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ),
}

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
  render: Default.render,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}
