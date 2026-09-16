import type { Meta, StoryObj } from "@storybook/react-vite"
import { CreditCardIcon, SearchIcon, SendIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { Kbd } from "@workspace/ui/components/kbd"

const meta = {
  title: "Components/Input Group",
  component: InputGroup,
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search projects" />
    </InputGroup>
  ),
}

export const WithShortcut: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithText: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="kamath.style" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <CreditCardIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Card number" inputMode="numeric" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="outline">Verify</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** `block-start` and `block-end` stack the addons above and below the control. */
export const WithTextarea: Story = {
  render: (args) => (
    <InputGroup {...args} className="h-auto">
      <InputGroupTextarea placeholder="Write a reply…" rows={3} />
      <InputGroupAddon align="block-end" className="justify-between">
        <InputGroupText className="text-xs">Markdown supported</InputGroupText>
        <InputGroupButton>
          <SendIcon />
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args} data-disabled>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" disabled />
    </InputGroup>
  ),
}
