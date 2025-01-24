import { View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonVariant } from "../../../app/components/Button/Button"

const meta = {
  title: "Button",
  component: Button,
  argTypes: {
    onPress: { action: "pressed the button" },
    variant: {
      options: [ButtonVariant.PRIMARY, ButtonVariant.SECONDARY],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    text: "Hello world",
  },
  decorators: [
    (Story) => (
      <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}
