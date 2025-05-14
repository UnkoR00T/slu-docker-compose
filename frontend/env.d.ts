/// <reference types="vite/client" />
import 'vue-i18n'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}
