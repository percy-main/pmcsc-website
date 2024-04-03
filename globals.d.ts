import type { DefaultMantineColor, MantineColorsTuple } from '@mantine/core'

export {}
declare global {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    SANITY_STUDIO_PROJECT_ID: string
    SANITY_STUDIO_DATASET: string
    SANITY_STUDIO_URL: string
    SANITY_STUDIO_STEGA_ENABLED: string
    SANITY_STUDIO_API_VERSION: string
    SANITY_FRONTEND_URL: string
    SANITY_READ_TOKEN: string
    GIFT_AID_WEBHOOK: string
    PLAYER_REG_WEBHOOK: string
  }

  interface Process {
    env: ProcessEnv
  }
  let process: Process

  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string
      SANITY_STUDIO_DATASET: string
      SANITY_STUDIO_URL: string
      SANITY_STUDIO_STEGA_ENABLED: string
      SANITY_STUDIO_API_VERSION: string
      SANITY_FRONTEND_URL: string
    }
  }
}

type ExtendedCustomColors = 'pmccMaroon' | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}
