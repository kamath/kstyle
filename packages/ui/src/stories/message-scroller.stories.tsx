import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Bubble,
  BubbleContent,
} from "@workspace/ui/components/bubble"
import {
  Message,
  MessageContent,
} from "@workspace/ui/components/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"

const meta = {
  title: "Components/Message Scroller",
  component: MessageScroller,
  parameters: { layout: "padded" },
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

const transcript = Array.from({ length: 24 }, (_, index) => ({
  id: `m-${index}`,
  align: index % 3 === 0 ? ("end" as const) : ("start" as const),
  text:
    index % 3 === 0
      ? "Got it — pushing the fix now."
      : `Message ${index + 1}: the deploy queue drained, then filled up again while the migration was running.`,
}))

export const Default: Story = {
  render: (args) => (
    <MessageScrollerProvider>
      <div className="h-80 w-full max-w-md overflow-hidden rounded-xl border">
        <MessageScroller {...args}>
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent>
              {transcript.map((entry) => (
                <MessageScrollerItem key={entry.id} messageId={entry.id}>
                  <Message align={entry.align}>
                    <MessageContent>
                      <Bubble
                        align={entry.align}
                        variant={entry.align === "end" ? "default" : "muted"}
                      >
                        <BubbleContent>{entry.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton
            direction="end"
            className="bottom-3"
          />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  ),
}

/** Start pinned to the top instead of the latest message. */
export const StartAtTop: Story = {
  render: (args) => (
    <MessageScrollerProvider defaultScrollPosition="start" autoScroll={false}>
      <div className="h-80 w-full max-w-md overflow-hidden rounded-xl border">
        <MessageScroller {...args}>
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent>
              {transcript.map((entry) => (
                <MessageScrollerItem key={entry.id} messageId={entry.id}>
                  <Message align={entry.align}>
                    <MessageContent>
                      <Bubble
                        align={entry.align}
                        variant={entry.align === "end" ? "default" : "muted"}
                      >
                        <BubbleContent>{entry.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="end" className="bottom-3" />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  ),
}
