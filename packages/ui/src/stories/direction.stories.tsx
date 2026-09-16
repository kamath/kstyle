import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group"

const meta = {
  title: "Components/Direction Provider",
  component: DirectionProvider,
  argTypes: {
    direction: { control: "inline-radio", options: ["ltr", "rtl"] },
  },
  args: { direction: "rtl" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

/**
 * `DirectionProvider` tells every Base UI primitive underneath which way the
 * text runs, so popups, menus and addons flip to the correct side.
 */
export const Default: Story = {
  render: (args) => (
    <DirectionProvider {...args}>
      <div dir={args.direction} className="flex w-80 flex-col gap-4">
        <Input placeholder="اكتب هنا" />
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-44">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DirectionProvider>
  ),
}

export const LeftToRight: Story = {
  args: { direction: "ltr" },
  render: Default.render,
}
