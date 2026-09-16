import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronRightIcon, FileTextIcon, StarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@workspace/ui/components/item"

const meta = {
  title: "Components/Item",
  component: Item,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline", "muted"] },
    size: { control: "inline-radio", options: ["default", "sm", "xs"] },
  },
  args: { variant: "outline", size: "default" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Quarterly report</ItemTitle>
        <ItemDescription>Updated 2 hours ago · 4.2 MB</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm" aria-label="Open">
          <ChevronRightIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["default", "outline", "muted"] as const).map((variant) => (
        <Item {...args} key={variant} variant={variant}>
          <ItemContent>
            <ItemTitle className="capitalize">{variant}</ItemTitle>
            <ItemDescription>The {variant} surface treatment.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Item {...args} key={size} size={size}>
          <ItemMedia variant="icon">
            <StarIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Size {size}</ItemTitle>
            <ItemDescription>Padding and gap shrink with it.</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemMedia variant="image">
        <img src="https://i.pravatar.cc/128?img=32" alt="" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Jordan Ellis</ItemTitle>
        <ItemDescription>Invited you to review a pull request.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <Item {...args}>
      <ItemHeader>
        <span className="text-xs font-medium text-muted-foreground">
          Pull request
        </span>
        <Badge variant="secondary">Open</Badge>
      </ItemHeader>
      <ItemMedia>
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/128?img=12" alt="" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Drop the legacy migration path</ItemTitle>
        <ItemDescription>
          Removes the v1 adapter and the two shims that kept it alive.
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="text-xs text-muted-foreground">
        <span>#412 opened 3 days ago</span>
        <span>+18 −412</span>
      </ItemFooter>
    </Item>
  ),
}

/** `render` makes the whole item a link or button. */
export const Interactive: Story = {
  render: (args) => (
    <ItemGroup>
      {["Billing", "Members", "Integrations"].map((label, index) => (
        <div key={label}>
          <Item {...args} variant="default" render={<a href="#item" />}>
            <ItemContent>
              <ItemTitle>{label}</ItemTitle>
              <ItemDescription>Manage {label.toLowerCase()}.</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </ItemActions>
          </Item>
          {index < 2 && <ItemSeparator />}
        </div>
      ))}
    </ItemGroup>
  ),
}
