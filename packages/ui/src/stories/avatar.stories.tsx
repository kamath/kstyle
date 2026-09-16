import type { Meta, StoryObj } from "@storybook/react-vite"
import { CheckIcon, PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@workspace/ui/components/avatar"

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
  },
  args: { size: "default" },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

const faces = [
  "https://i.pravatar.cc/128?img=12",
  "https://i.pravatar.cc/128?img=32",
  "https://i.pravatar.cc/128?img=45",
]

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={faces[0]} alt="Avery Chen" />
      <AvatarFallback>AC</AvatarFallback>
    </Avatar>
  ),
}

/** The fallback shows while the image loads, or forever if it never does. */
export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://example.invalid/missing.png" alt="Rio Novak" />
      <AvatarFallback>RN</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={faces[1]} alt="Jordan Ellis" />
          <AvatarFallback>JE</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const WithBadge: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args}>
        <AvatarImage src={faces[0]} alt="Avery Chen" />
        <AvatarFallback>AC</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
      <Avatar {...args} size="lg">
        <AvatarImage src={faces[2]} alt="Sam Oduya" />
        <AvatarFallback>SO</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  ),
}

export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      {faces.map((src, index) => (
        <Avatar key={src} {...args}>
          <AvatarImage src={src} alt={`Teammate ${index + 1}`} />
          <AvatarFallback>T{index + 1}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}

export const GroupWithAction: Story = {
  render: (args) => (
    <AvatarGroup>
      {faces.slice(0, 2).map((src, index) => (
        <Avatar key={src} {...args}>
          <AvatarImage src={src} alt={`Teammate ${index + 1}`} />
          <AvatarFallback>T{index + 1}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <PlusIcon />
      </AvatarGroupCount>
    </AvatarGroup>
  ),
}
