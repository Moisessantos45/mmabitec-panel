/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}

declare module 'vue-toastification' {
  import type { Plugin } from 'vue'
  export const useToast: any
  const Toast: Plugin
  export default Toast
}