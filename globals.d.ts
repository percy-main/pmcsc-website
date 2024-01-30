export {};
declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    SANITY_STUDIO_PROJECT_ID: string;
    SANITY_STUDIO_DATASET: string;
    SANITY_STUDIO_URL: string;
    SANITY_STUDIO_STEGA_ENABLED: string;
    SANITY_READ_TOKEN: string
    SANITY_WRITE_TOKEN: string
    SANITY_STUDIO_API_VERSION: string
    SANITY_FRONTEND_URL: string
  }

  interface Process {
    env: ProcessEnv;
  }
  let process: Process;

  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string;
      SANITY_STUDIO_DATASET: string;
      SANITY_STUDIO_URL: string;
      SANITY_STUDIO_STEGA_ENABLED: string;
      SANITY_STUDIO_API_VERSION: string
      SANITY_FRONTEND_URL: string
    };
  }
}
