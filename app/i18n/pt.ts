const en = {
  common: {
    ok: "OK!",
    cancel: "Cancelar",
    back: "Retornar",
    headerTitle: "FOODNATOR",
  },
  getStartedScreen: {
    title: "Você está com fome?",
    cta: "Encontrar uma refeição!",
    ctaHint: "Toque no botão para obter uma receita aleatória",
  },
  dishDetailScreen: {
    loading: "Carregando refeição...",
    openVideo: "Reproduzir Video",
    openVideoHint: "Toque para abrir as instruções da receita no YouTube",
    ingredientsTitle: "Ingredientes",
    instructionsTitle: "Instruções",
    errorTitle: "Ocorreu um erro ao carregar o prato.",
    errorDescription: "Por favor, tente novamente.",
    errorTryAgain: "Tentar novamente",
    errorTryAgainHint: "Toque para recarregar as informações.",
    refreshDishHint: "Toque para obter um novo prato aleatório",
  },
  errorScreen: {
    title: "Algo deu errado!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "Recarregar app",
  },
}

export default en
export type Translations = typeof en
