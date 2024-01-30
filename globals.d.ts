export {};
declare global {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    SANITY_STUDIO_PROJECT_ID: string;
    SANITY_STUDIO_DATASET: string;
    SANITY_STUDIO_URL: string;
    SANITY_STUDIO_STEGA_ENABLED: string;
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
    };
  }
}
