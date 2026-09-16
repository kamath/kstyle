import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="h-64 w-full max-w-2xl overflow-hidden rounded-lg border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

const Pane = ({ label }: { label: string }) => (
  <div className="flex h-full items-center justify-center p-4 text-sm font-medium">
    {label}
  </div>
)

export const Default: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="horizontal">
      <ResizablePanel defaultSize={30}>
        <Pane label="Sidebar" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <Pane label="Content" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="vertical">
      <ResizablePanel defaultSize={40}>
        <Pane label="Editor" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <Pane label="Output" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const WithHandle: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="horizontal">
      <ResizablePanel defaultSize={35}>
        <Pane label="Files" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={65}>
        <Pane label="Preview" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Nested: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="horizontal">
      <ResizablePanel defaultSize={30}>
        <Pane label="Navigation" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={60}>
            <Pane label="Editor" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>
            <Pane label="Terminal" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
