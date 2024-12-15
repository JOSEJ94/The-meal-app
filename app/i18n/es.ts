import { Translations } from "./en"

const es: Translations = {
  common: {
    ok: "OK",
    cancel: "Cancelar",
    back: "Volver",
    headerTitle: "FOOTNATOR",
  },
  getStartedScreen: {
    title: "Tienes hambre?",
    cta: "Dame un platillo!",
    ctaHint: "Presiona para obtener una receta al azar",
  },
  dishDetailScreen: {
    loading: "Cargando platillo...",
    openVideo: "Abrir Vídeo",
    ingredientsTitle: "Ingredientes",
    instructionsTitle: "Instrucciones",
    errorTitle: "Un error ocurrió mientras se cargaba el platillo ",
    errorDescription: "Por favor intenta de nuevo.",
    errorTryAgain: "Intentar de nuevo",
    errorTryAgainHint: "Presiona para recargar la información",
    openVideoHint: "Presiona para abrir las instrucciones en youtube",
    refreshDishHint: "Presiona para obtener un nuevo platillo",
  },
  errorScreen: {
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
    reset: "REINICIA LA APP",
  },
}

export default es
