import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@workspace/ui/components/message"

const meta = {
  title: "Components/Message",
  component: Message,
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  args: { align: "start" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/128?img=12" alt="" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            The migration finished. Want me to run the smoke tests?
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const Outgoing: Story = {
  args: { align: "end" },
  render: (args) => (
    <Message {...args}>
      <MessageContent>
        <Bubble align="end">
          <BubbleContent>Yes please — and post the results here.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/128?img=45" alt="" />
          <AvatarFallback>RN</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Rio Novak</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>
            Deploy is green. Two flaky tests retried and passed.
          </BubbleContent>
        </Bubble>
        <MessageFooter>9:42 AM</MessageFooter>
      </MessageContent>
    </Message>
  ),
}

export const Conversation: Story = {
  render: () => (
    <MessageGroup>
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/128?img=12" alt="" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Avery</MessageHeader>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Did the release notes go out?</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>I can draft them if not.</BubbleContent>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageContent>
          <BubbleGroup>
            <Bubble align="end">
              <BubbleContent>Sent an hour ago.</BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>Link is in the channel topic.</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <MessageFooter>Read</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}
