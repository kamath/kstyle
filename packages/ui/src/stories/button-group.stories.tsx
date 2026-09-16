import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ChevronDownIcon,
  CopyIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@workspace/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"

const meta = {
  title: "Components/Button Group",
  component: ButtonGroup,
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: { orientation: "horizontal" },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: Default.render,
}

export const IconButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" size="icon" aria-label="Align left">
        <AlignLeftIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align center">
        <AlignCenterIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align right">
        <AlignRightIcon />
      </Button>
    </ButtonGroup>
  ),
}

/** A split button: primary action plus a menu for the variants. */
export const Split: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Deploy</Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" size="icon" />}
          aria-label="More deploy options"
        >
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Deploy to preview</DropdownMenuItem>
          <DropdownMenuItem>Deploy to production</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input defaultValue="kamath.style" className="w-48" />
      <Button variant="outline" size="icon" aria-label="Copy URL">
        <CopyIcon />
      </Button>
    </ButtonGroup>
  ),
}
