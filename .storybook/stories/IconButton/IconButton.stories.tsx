import { View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react"
import { IconButton } from "../../../app/components/IconButton/IconButton"
import { AnimatedRefreshIcon } from "../../../app/components/Icons/RefreshIcon/AnimatedRefreshIcon"
import React from "react"

const meta = {
  title: "IconButton",
  component: IconButton,
  argTypes: {
    onPress: { action: "pressed the button" },
    children: {
      options: ["Static", "Loading"],
      mapping: {
        Static: <AnimatedRefreshIcon key={1} loading={false} />,
        Loading: <AnimatedRefreshIcon key={2} loading />,
      },
      control: { type: "radio" },
    },
  },
  args: {
    children: <AnimatedRefreshIcon loading={false} />,
  },
  decorators: [
    (Story) => (
      <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}
