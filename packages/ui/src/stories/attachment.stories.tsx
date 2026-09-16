import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, ImageIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@workspace/ui/components/attachment"

const meta = {
  title: "Components/Attachment",
  component: Attachment,
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm", "xs"] },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
  },
  args: { size: "default", orientation: "horizontal", state: "done" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>4.2 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["idle", "uploading", "processing", "error", "done"] as const).map(
        (state) => (
          <Attachment {...args} key={state} state={state}>
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>notes.md</AttachmentTitle>
              <AttachmentDescription className="capitalize">
                {state}
              </AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        )
      )}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["default", "sm", "xs"] as const).map((size) => (
        <Attachment {...args} key={size} size={size}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>size-{size}.txt</AttachmentTitle>
            <AttachmentDescription>12 KB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia variant="image">
        <img
          src="https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&dpr=2&q=80"
          alt=""
        />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>ridge.jpg</AttachmentTitle>
        <AttachmentDescription>1.8 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}

/** `AttachmentTrigger` covers the card so the whole thing is clickable. */
export const Clickable: Story = {
  render: (args) => (
    <Attachment {...args}>
      <AttachmentTrigger aria-label="Open attachment" />
      <AttachmentMedia>
        <ImageIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>screenshot.png</AttachmentTitle>
        <AttachmentDescription>Click anywhere to open</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
}

export const Group: Story = {
  args: { orientation: "vertical", size: "sm" },
  render: (args) => (
    <AttachmentGroup className="max-w-md">
      {["ridge.jpg", "notes.md", "budget.csv", "deck.pdf"].map((name) => (
        <Attachment {...args} key={name}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
}
