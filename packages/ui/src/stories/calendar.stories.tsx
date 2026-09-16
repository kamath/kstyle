import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DateRange } from "react-day-picker"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {
    captionLayout: {
      control: "inline-radio",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    showOutsideDays: { control: "boolean" },
  },
  args: { captionLayout: "label", showOutsideDays: true },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

const today = new Date(2026, 8, 15)

export const Default: Story = {
  render: function Default(args) {
    const [date, setDate] = React.useState<Date | undefined>(today)

    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={today}
        className="rounded-xl border"
      />
    )
  },
}

export const Range: Story = {
  render: function Range(args) {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: today,
      to: new Date(2026, 8, 22),
    })

    return (
      <Calendar
        {...args}
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={today}
        numberOfMonths={2}
        className="rounded-xl border"
      />
    )
  },
}

export const Multiple: Story = {
  render: function Multiple(args) {
    const [dates, setDates] = React.useState<Date[] | undefined>([
      today,
      new Date(2026, 8, 18),
      new Date(2026, 8, 24),
    ])

    return (
      <Calendar
        {...args}
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        defaultMonth={today}
        className="rounded-xl border"
      />
    )
  },
}

/** `captionLayout="dropdown"` swaps the month label for month/year selects. */
export const WithDropdowns: Story = {
  args: { captionLayout: "dropdown" },
  render: function WithDropdowns(args) {
    const [date, setDate] = React.useState<Date | undefined>(today)

    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={today}
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
        className="rounded-xl border"
      />
    )
  },
}

export const WithDisabledDays: Story = {
  render: function WithDisabledDays(args) {
    const [date, setDate] = React.useState<Date | undefined>()

    return (
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={today}
        disabled={{ dayOfWeek: [0, 6] }}
        className="rounded-xl border"
      />
    )
  },
}

/** Inside a card the calendar drops its own background. */
export const InCard: Story = {
  render: function InCard(args) {
    const [date, setDate] = React.useState<Date | undefined>(today)

    return (
      <Card className="w-fit">
        <CardContent className="px-0">
          <Calendar
            {...args}
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={today}
          />
        </CardContent>
      </Card>
    )
  },
}

export const DatePicker: Story = {
  render: function DatePicker(args) {
    const [date, setDate] = React.useState<Date | undefined>()

    return (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          {date ? date.toLocaleDateString() : "Pick a date"}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            {...args}
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={today}
          />
        </PopoverContent>
      </Popover>
    )
  },
}
