import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@workspace/ui/components/carousel"
import { Card, CardContent } from "@workspace/ui/components/card"

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  args: { orientation: "horizontal" },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="px-14 py-14">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const Slide = ({ index }: { index: number }) => (
  <Card>
    <CardContent className="flex aspect-square items-center justify-center p-6 text-3xl font-medium">
      {index + 1}
    </CardContent>
  </Card>
)

export const Default: Story = {
  render: (args) => (
    <Carousel {...args} className="w-56">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, index) => (
          <CarouselItem key={index}>
            <Slide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/** Basis on the item controls how many slides are visible at once. */
export const MultipleVisible: Story = {
  render: (args) => (
    <Carousel {...args} className="w-72">
      <CarouselContent>
        {Array.from({ length: 8 }, (_, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <Slide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <Carousel {...args} className="w-48">
      <CarouselContent className="h-56">
        {Array.from({ length: 5 }, (_, index) => (
          <CarouselItem key={index} className="basis-full">
            <Slide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Looping: Story = {
  args: { opts: { loop: true } },
  render: Default.render,
}

/** `setApi` exposes the Embla instance — here to drive a slide counter. */
export const WithCounter: Story = {
  render: function WithCounter(args) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(1)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      if (!api) return
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)
      const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
      api.on("select", onSelect)
      return () => {
        api.off("select", onSelect)
      }
    }, [api])

    return (
      <div className="flex flex-col items-center gap-3">
        <Carousel {...args} setApi={setApi} className="w-56">
          <CarouselContent>
            {Array.from({ length: 5 }, (_, index) => (
              <CarouselItem key={index}>
                <Slide index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="text-sm text-muted-foreground tabular-nums">
          Slide {current} of {count}
        </p>
      </div>
    )
  },
}
