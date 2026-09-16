import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

const Items = () => (
  <>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <CalendarIcon />
        Calendar
      </CommandItem>
      <CommandItem>
        <SmileIcon />
        Search emoji
      </CommandItem>
      <CommandItem disabled>
        <CalculatorIcon />
        Calculator
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <UserIcon />
        Profile
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <CreditCardIcon />
        Billing
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <SettingsIcon />
        Settings
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </>
)

export const Default: Story = {
  render: (args) => (
    <Command {...args} className="w-80 rounded-lg border">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <Items />
      </CommandList>
    </Command>
  ),
}

/** The palette people actually reach for, bound to ⌘K. */
export const Palette: Story = {
  render: function Palette() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          setOpen((previous) => !previous)
        }
      }
      document.addEventListener("keydown", onKeyDown)
      return () => document.removeEventListener("keydown", onKeyDown)
    }, [])

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open palette (⌘K)
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search…" />
            <CommandList>
              <Items />
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    )
  },
}

export const Empty: Story = {
  render: (args) => (
    <Command {...args} className="w-80 rounded-lg border">
      <CommandInput placeholder="Search…" defaultValue="zzzzz" />
      <CommandList>
        <CommandEmpty>Nothing matches “zzzzz”.</CommandEmpty>
      </CommandList>
    </Command>
  ),
}
