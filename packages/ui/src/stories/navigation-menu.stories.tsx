import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"

const meta = {
  title: "Components/Navigation Menu",
  component: NavigationMenu,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="flex min-h-72 justify-center pt-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

const products = [
  { title: "Analytics", hint: "Traffic, funnels and retention." },
  { title: "Logs", hint: "Structured, searchable, retained 30 days." },
  { title: "Alerts", hint: "Page the right person, once." },
  { title: "Status", hint: "A public page you never have to edit." },
]

export const Default: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[420px] grid-cols-2 gap-1 p-2">
              {products.map((product) => (
                <li key={product.title}>
                  <NavigationMenuLink
                    href="#product"
                    className="flex-col items-start gap-0.5"
                  >
                    <span className="font-medium">{product.title}</span>
                    <span className="text-muted-foreground">
                      {product.hint}
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[260px] gap-1 p-2">
              {["About", "Careers", "Blog"].map((item) => (
                <li key={item}>
                  <NavigationMenuLink href="#company">{item}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="#pricing"
            className={navigationMenuTriggerStyle()}
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/** `align` positions the popup relative to the menu. */
export const AlignCenter: Story = {
  args: { align: "center" },
  render: Default.render,
}
