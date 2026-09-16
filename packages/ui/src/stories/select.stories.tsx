import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const fruits = {
  apple: "Apple",
  banana: "Banana",
  blueberry: "Blueberry",
  grapes: "Grapes",
  pineapple: "Pineapple",
}

export const Default: Story = {
  render: (args) => (
    <Select {...args} items={fruits}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(fruits).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

export const WithDefaultValue: Story = {
  args: { defaultValue: "blueberry" },
  render: Default.render,
}

export const Small: Story = {
  render: (args) => (
    <Select {...args} items={fruits}>
      <SelectTrigger size="sm" className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(fruits).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

export const Grouped: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern (EST)</SelectItem>
          <SelectItem value="cst">Central (CST)</SelectItem>
          <SelectItem value="pst">Pacific (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
          <SelectItem value="cet">Central European (CET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const DisabledItem: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="hobby">Hobby</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (contact sales)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "apple", items: fruits },
  render: Default.render,
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-48 flex-col gap-2">
      <Label htmlFor="select-fruit">Favourite fruit</Label>
      <Select {...args} items={fruits}>
        <SelectTrigger id="select-fruit" className="w-full">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fruits).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}
