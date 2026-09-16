import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BarChart3Icon,
  ChevronRightIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MoreHorizontalIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  argTypes: {
    side: { control: "inline-radio", options: ["left", "right"] },
    variant: {
      control: "inline-radio",
      options: ["sidebar", "floating", "inset"],
    },
    collapsible: {
      control: "inline-radio",
      options: ["offcanvas", "icon", "none"],
    },
  },
  args: { side: "left", variant: "sidebar", collapsible: "offcanvas" },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="h-[520px] w-full overflow-hidden rounded-xl border">
          <SidebarProvider className="min-h-full">
            <Story />
          </SidebarProvider>
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const navigation = [
  { title: "Home", icon: HomeIcon, badge: undefined },
  { title: "Inbox", icon: InboxIcon, badge: "12" },
  { title: "Projects", icon: FolderIcon, badge: undefined },
  { title: "Reports", icon: BarChart3Icon, badge: undefined },
]

const Content = ({ title }: { title: string }) => (
  <SidebarInset>
    <header className="flex h-12 items-center gap-2 border-b px-3">
      <SidebarTrigger />
      <span className="text-sm font-medium">{title}</span>
    </header>
    <div className="p-4 text-sm text-muted-foreground">
      The trigger in the header toggles the sidebar. ⌘B works too.
    </div>
  </SidebarInset>
)

export const Default: Story = {
  render: (args) => (
    <>
      <Sidebar {...args}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  A
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-sm font-medium">Atlas</span>
                  <span className="text-xs text-muted-foreground">Pro plan</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={index === 0} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <Content title="Home" />
    </>
  ),
}

/** `collapsible="icon"` keeps a rail of icons when collapsed. */
export const CollapsibleIcon: Story = {
  args: { collapsible: "icon" },
  render: Default.render,
}

export const Floating: Story = {
  args: { variant: "floating", collapsible: "icon" },
  render: Default.render,
}

export const Inset: Story = {
  args: { variant: "inset", collapsible: "icon" },
  render: Default.render,
}

export const RightSide: Story = {
  args: { side: "right" },
  render: Default.render,
}

export const WithSearchAndSubmenus: Story = {
  render: (args) => (
    <>
      <Sidebar {...args}>
        <SidebarHeader>
          <SidebarInput placeholder="Search…" aria-label="Search" />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <SearchIcon />
                    <span>Overview</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover aria-label="More">
                    <MoreHorizontalIcon />
                  </SidebarMenuAction>
                </SidebarMenuItem>

                <Collapsible defaultOpen>
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={<SidebarMenuButton />}
                      className="group/collapsible"
                    >
                      <FolderIcon />
                      <span>Projects</span>
                      <ChevronRightIcon className="ml-auto size-4 transition-transform group-data-panel-open/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {["Atlas", "Beacon", "Corvus"].map((project) => (
                          <SidebarMenuSubItem key={project}>
                            <SidebarMenuSubButton href="#project">
                              {project}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>

                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<SidebarMenuButton />}>
                      <SettingsIcon />
                      <span>Settings</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem>General</DropdownMenuItem>
                      <DropdownMenuItem>Members</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <Content title="Overview" />
    </>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <>
      <Sidebar {...args}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 5 }, (_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Content title="Loading" />
    </>
  ),
}
