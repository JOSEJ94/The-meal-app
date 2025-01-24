import { useEffect, useState } from "react"

export const useToggleStorybook = () => {
  const [isStorybookEnabled, setIsStorybookEnabled] = useState(false)

  useEffect(() => {
    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { registerDevMenuItems } = require("expo-dev-menu")
      const devMenuItems = [
        {
          name: `Toggle Storybook ${isStorybookEnabled ? "Off" : "On"}`,
          callback: () => {
            setIsStorybookEnabled((prev) => !prev)
          },
        },
      ]

      registerDevMenuItems(devMenuItems)
    }
  }, [isStorybookEnabled])

  return __DEV__ ? { isStorybookEnabled } : { isStorybookEnabled: false }
}
