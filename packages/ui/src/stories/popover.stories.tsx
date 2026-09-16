import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@workspace/ui/components/button"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

const meta = {
  title: "Components/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the canvas size for this artboard.
          </PopoverDescription>
        </PopoverHeader>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="popover-width">Width</FieldLabel>
          <Input id="popover-width" defaultValue="1280" className="h-7" />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="popover-height">Height</FieldLabel>
          <Input id="popover-height" defaultValue="720" className="h-7" />
        </Field>
      </PopoverContent>
    </Popover>
  ),
}

export const Sides: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side} {...args}>
          <PopoverTrigger render={<Button variant="outline" />}>
            {side}
          </PopoverTrigger>
          <PopoverContent side={side} className="w-48">
            Anchored to the {side}.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}

export const Alignment: Story = {
  render: (args) => (
    <div className="flex gap-3">
      {(["start", "center", "end"] as const).map((align) => (
        <Popover key={align} {...args}>
          <PopoverTrigger render={<Button variant="outline" />}>
            {align}
          </PopoverTrigger>
          <PopoverContent align={align} className="w-48">
            Aligned to {align}.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
}
