import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    multiple: true,
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    value: "shipping",
    title: "How long does shipping take?",
    content:
      "Orders ship within one business day. Standard delivery lands in three to five days; express arrives the next morning.",
  },
  {
    value: "returns",
    title: "What is the return window?",
    content:
      "Anything unopened can go back within 30 days. We email a prepaid label as soon as the return is approved.",
  },
  {
    value: "support",
    title: "How do I reach support?",
    content:
      "Reply to any order email and a human answers. Live chat is open weekdays from 9am to 6pm.",
  },
]

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

/** `multiple={false}` collapses the open panel when another one opens. */
export const Single: Story = {
  args: { multiple: false, defaultValue: ["shipping"] },
  render: Default.render,
}

export const DefaultOpen: Story = {
  args: { defaultValue: ["shipping", "returns"] },
  render: Default.render,
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}

export const DisabledItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="one">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionContent>This panel opens normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two" disabled>
        <AccordionTrigger>Unavailable</AccordionTrigger>
        <AccordionContent>You will not see this.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
