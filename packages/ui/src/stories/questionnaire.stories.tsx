import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

const meta = {
  title: "Components/Questionnaire",
  component: Questionnaire,
  argTypes: {
    shortcuts: { control: "inline-radio", options: ["letters", "numbers"] },
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Questionnaire>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        name: "role",
        required: true,
        choices: [
          { value: "engineer" },
          { value: "designer" },
          { value: "product" },
        ],
      },
      {
        name: "size",
        choices: [{ value: "solo" }, { value: "small" }, { value: "large" }],
      },
      { name: "email", required: true },
    ],
  },
  render: (args) => (
    <Questionnaire {...args} onSubmit={(event) => event.preventDefault()}>
      <QuestionnaireProgress />

      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What do you do day to day?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Pick the one that fits best.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="engineer">Engineering</QuestionnaireChoice>
          <QuestionnaireChoice value="designer">Design</QuestionnaireChoice>
          <QuestionnaireChoice value="product">Product</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError>Pick one to continue.</QuestionnaireError>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
        </QuestionnaireActions>
      </QuestionnaireItem>

      <QuestionnaireItem name="size">
        <QuestionnaireTitle>How big is your team?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="solo">
            Just me
            <QuestionnaireChoiceDescription>
              A one-person operation.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="small">
            2–10 people
            <QuestionnaireChoiceDescription>
              Everyone still fits in one call.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="large">
            More than 10
            <QuestionnaireChoiceDescription>
              Multiple teams, multiple timezones.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
        </QuestionnaireActions>
      </QuestionnaireItem>

      <QuestionnaireItem name="email" required>
        <QuestionnaireTitle>Where should we send the results?</QuestionnaireTitle>
        <QuestionnaireInput type="email" placeholder="you@company.com" />
        <QuestionnaireError>Enter a valid email address.</QuestionnaireError>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </QuestionnaireItem>
    </Questionnaire>
  ),
}

/** `multiple` turns the choices into checkboxes. */
export const MultipleChoice: Story = {
  args: {
    items: [
      {
        name: "tools",
        choices: [
          { value: "figma" },
          { value: "linear" },
          { value: "github" },
          { value: "slack" },
        ],
      },
    ],
  },
  render: (args) => (
    <Questionnaire {...args} onSubmit={(event) => event.preventDefault()}>
      <QuestionnaireItem name="tools" multiple>
        <QuestionnaireTitle>Which tools do you use?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick as many as apply.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="figma">Figma</QuestionnaireChoice>
          <QuestionnaireChoice value="linear">Linear</QuestionnaireChoice>
          <QuestionnaireChoice value="github">GitHub</QuestionnaireChoice>
          <QuestionnaireChoice value="slack">Slack</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireActions>
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </QuestionnaireItem>
    </Questionnaire>
  ),
}

/** `shortcuts` puts a keyboard hint on every choice. */
export const WithShortcuts: Story = {
  args: {
    shortcuts: "letters",
    items: [
      {
        name: "plan",
        choices: [{ value: "hobby" }, { value: "pro" }, { value: "enterprise" }],
      },
    ],
  },
  render: (args) => (
    <Questionnaire {...args} onSubmit={(event) => event.preventDefault()}>
      <QuestionnaireItem name="plan">
        <QuestionnaireTitle>Which plan are you on?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="hobby">Hobby</QuestionnaireChoice>
          <QuestionnaireChoice value="pro">Pro</QuestionnaireChoice>
          <QuestionnaireChoice value="enterprise">Enterprise</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireActions>
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </QuestionnaireItem>
    </Questionnaire>
  ),
}
