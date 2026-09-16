import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

const monthly = [
  { month: "Apr", desktop: 186, mobile: 80 },
  { month: "May", desktop: 305, mobile: 200 },
  { month: "Jun", desktop: 237, mobile: 120 },
  { month: "Jul", desktop: 273, mobile: 190 },
  { month: "Aug", desktop: 209, mobile: 130 },
  { month: "Sep", desktop: 314, mobile: 240 },
]

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

/**
 * `ChartContainer` requires `config` and a Recharts child, so the shared args
 * cover only the wrapper props and each story brings its own chart.
 */
type ChartArgs = {
  config: ChartConfig
  className?: string
}

const meta: Meta<ChartArgs> = {
  title: "Components/Chart",
  parameters: { layout: "padded" },
  args: { config },
}

export default meta
type Story = StoryObj<typeof meta>

const Frame = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) => (
  <Card className="w-full max-w-lg">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

export const Bars: Story = {
  render: (args) => (
    <Frame title="Visitors" description="April – September 2026">
      <ChartContainer {...args} className="h-56 w-full">
        <BarChart data={monthly}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Frame>
  ),
}

export const Lines: Story = {
  render: (args) => (
    <Frame title="Sessions" description="Two device classes, six months">
      <ChartContainer {...args} className="h-56 w-full">
        <LineChart data={monthly}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={32} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            dataKey="desktop"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="mobile"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </Frame>
  ),
}

export const StackedArea: Story = {
  render: (args) => (
    <Frame title="Traffic" description="Stacked by device">
      <ChartContainer {...args} className="h-56 w-full">
        <AreaChart data={monthly}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
          <Area
            dataKey="mobile"
            type="natural"
            stackId="a"
            stroke="var(--color-mobile)"
            fill="var(--color-mobile)"
            fillOpacity={0.35}
          />
          <Area
            dataKey="desktop"
            type="natural"
            stackId="a"
            stroke="var(--color-desktop)"
            fill="var(--color-desktop)"
            fillOpacity={0.35}
          />
        </AreaChart>
      </ChartContainer>
    </Frame>
  ),
}

const browsers = [
  { browser: "chrome", visitors: 275 },
  { browser: "safari", visitors: 200 },
  { browser: "firefox", visitors: 187 },
  { browser: "edge", visitors: 173 },
]

const browserConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
} satisfies ChartConfig

export const Donut: Story = {
  render: (args) => (
    <Frame title="Browsers" description="Share of visitors this month">
      <ChartContainer
        {...args}
        config={browserConfig}
        className="mx-auto h-56 w-full"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="browser" />} />
          <Pie data={browsers} dataKey="visitors" nameKey="browser" innerRadius={50}>
            {browsers.map((entry) => (
              <Cell
                key={entry.browser}
                fill={`var(--color-${entry.browser})`}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey="browser" />} />
        </PieChart>
      </ChartContainer>
    </Frame>
  ),
}

/** Themed colors resolve per light/dark instead of one fixed value. */
export const ThemedColors: Story = {
  render: (args) => (
    <Frame title="Themed series" description="Different colors per theme">
      <ChartContainer
        {...args}
        config={{
          desktop: {
            label: "Desktop",
            theme: { light: "var(--chart-1)", dark: "var(--chart-5)" },
          },
        }}
        className="h-56 w-full"
      >
        <BarChart data={monthly}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Frame>
  ),
}
