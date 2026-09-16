import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIcon, ScissorsIcon, TrashIcon } from "lucide-react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"

const meta = {
  title: "Components/Context Menu",
  component: ContextMenu,
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

const Surface = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex h-36 w-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
    {children ?? "Right-click here"}
  </div>
)

export const Default: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger render={<Surface />} />
      <ContextMenuContent className="min-w-44">
        <ContextMenuItem>
          <CopyIcon />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <ScissorsIcon />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const WithSubmenu: Story = {
  render: (args) => (
    <ContextMenu {...args}>
      <ContextMenuTrigger render={<Surface />} />
      <ContextMenuContent className="min-w-44">
        <ContextMenuItem inset>Back</ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page as…</ContextMenuItem>
            <ContextMenuItem>Create shortcut…</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const CheckboxesAndRadios: Story = {
  render: function CheckboxesAndRadios(args) {
    const [bookmarks, setBookmarks] = React.useState(true)
    const [person, setPerson] = React.useState("avery")

    return (
      <ContextMenu {...args}>
        <ContextMenuTrigger render={<Surface />} />
        <ContextMenuContent className="min-w-48">
          <ContextMenuCheckboxItem
            checked={bookmarks}
            onCheckedChange={setBookmarks}
            closeOnClick={false}
          >
            Show bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel inset>Assign to</ContextMenuLabel>
          <ContextMenuRadioGroup
            value={person}
            onValueChange={(value) => setPerson(value as string)}
          >
            <ContextMenuRadioItem value="avery">Avery</ContextMenuRadioItem>
            <ContextMenuRadioItem value="jordan">Jordan</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    )
  },
}
