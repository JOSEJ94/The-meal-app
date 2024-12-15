const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    headerTitle: "FOODNATOR",
  },
  getStartedScreen: {
    title: "Are you hungry?",
    cta: "Get me a meal!",
    ctaHint: "Tap button to get a random recipe",
  },
  dishDetailScreen: {
    loading: "Loading meal...",
    openVideo: "Open Video",
    openVideoHint: "Tap to open recipe instructions on youtube",
    ingredientsTitle: "Ingredients",
    instructionsTitle: "Instructions",
    errorTitle: "An error occurred while loading the dish.",
    errorDescription: "Please try again.",
    errorTryAgain: "Try again",
    errorTryAgainHint: "Tap to reload the information.",
    refreshDishHint: "Tap to get a new random dish",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
}

export default en
export type Translations = typeof en
