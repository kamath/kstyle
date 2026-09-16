import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { Label } from "@workspace/ui/components/label"

/**
 * `OTPInput` types `children` and `render` as mutually exclusive, so the args
 * here cover only the plain input props and each story supplies its own slots.
 */
type InputOTPArgs = {
  maxLength: number
  containerClassName?: string
  className?: string
  disabled?: boolean
  pattern?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  autoFocus?: boolean
}

const meta: Meta<InputOTPArgs> = {
  title: "Components/Input OTP",
  args: { maxLength: 6 },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const Separated: Story = {
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        {[0, 1, 2].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {[3, 4, 5].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const Digits: Story = {
  args: { maxLength: 4, pattern: "^[0-9]*$", inputMode: "numeric" },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        {[0, 1, 2, 3].map((index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}

export const Controlled: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState("123")

    return (
      <div className="flex flex-col items-center gap-3">
        <Label htmlFor="otp">Verification code</Label>
        <InputOTP {...args} id="otp" value={value} onChange={setValue}>
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground">
          {value.length === 6 ? "Ready to verify" : `${value.length} of 6`}
        </p>
      </div>
    )
  },
}
