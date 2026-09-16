import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  argTypes: {
    swipeDirection: {
      control: "inline-radio",
      options: ["up", "down", "left", "right"],
    },
    showSwipeHandle: { control: "boolean" },
    modal: { control: "boolean" },
  },
  args: { swipeDirection: "down", showSwipeHandle: true },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move to folder</DrawerTitle>
          <DrawerDescription>
            Pick a destination for the three selected files.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 px-4 py-2 text-sm">
          {["Inbox", "Archive", "Receipts"].map((folder) => (
            <button
              key={folder}
              type="button"
              className="rounded-lg px-3 py-2 text-left hover:bg-muted"
            >
              {folder}
            </button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const Directions: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-3">
      {(["up", "down", "left", "right"] as const).map((direction) => (
        <Drawer key={direction} {...args} swipeDirection={direction}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {direction}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">{direction}</DrawerTitle>
              <DrawerDescription>
                Swipe {direction} to dismiss.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
}

/** Snap points let the drawer rest part-way open. */
export const SnapPoints: Story = {
  args: { snapPoints: [0.35, 1] },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open with snap points
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Trip details</DrawerTitle>
          <DrawerDescription>
            Drag the handle to expand the full itinerary.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4 pb-4 text-sm text-muted-foreground">
          {Array.from({ length: 8 }, (_, index) => (
            <p key={index}>
              Day {index + 1} — a long walk, a short train, and somewhere warm
              to eat at the end of it.
            </p>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  ),
}

export const NonModal: Story = {
  args: { modal: false },
  render: Default.render,
}
