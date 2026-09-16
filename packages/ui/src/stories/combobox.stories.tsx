import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox"
import { Label } from "@workspace/ui/components/label"

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  "Next.js",
  "Remix",
  "Astro",
  "SvelteKit",
  "Nuxt",
  "SolidStart",
]

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox {...args} items={frameworks}>
        <ComboboxInput placeholder="Pick a framework" />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const WithClear: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox {...args} items={frameworks} defaultValue="Astro">
        <ComboboxInput placeholder="Pick a framework" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const Grouped: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox {...args}>
        <ComboboxInput placeholder="Pick a runtime" />
        <ComboboxContent>
          <ComboboxEmpty>No runtime found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Server</ComboboxLabel>
              <ComboboxItem value="Node.js">Node.js</ComboboxItem>
              <ComboboxItem value="Deno">Deno</ComboboxItem>
              <ComboboxItem value="Bun">Bun</ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup>
              <ComboboxLabel>Edge</ComboboxLabel>
              <ComboboxItem value="Workers">Cloudflare Workers</ComboboxItem>
              <ComboboxItem value="Deno Deploy">Deno Deploy</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

/** Multi-select renders the picks as removable chips. */
export const Multiple: Story = {
  render: function Multiple() {
    const anchor = useComboboxAnchor()

    return (
      <div className="w-72">
        <Combobox multiple items={frameworks} defaultValue={["Remix"]}>
          <Label className="mb-2">Frameworks</Label>
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(value: string[]) => (
                <>
                  {value.map((item) => (
                    <ComboboxChip key={item} aria-label={item}>
                      {item}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Add another…" />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {frameworks.map((framework) => (
                <ComboboxItem key={framework} value={framework}>
                  {framework}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox {...args} items={frameworks} defaultValue="Nuxt" disabled>
        <ComboboxInput placeholder="Pick a framework" disabled />
        <ComboboxContent>
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}
