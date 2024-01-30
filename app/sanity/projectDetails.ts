const {
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_URL = "http://localhost:3333",
  SANITY_STUDIO_STEGA_ENABLED = false,
  SANITY_STUDIO_API_VERSION,
  SANITY_FRONTEND_URL
} = typeof document === "undefined" ? process.env : window.ENV;


export const projectId = SANITY_STUDIO_PROJECT_ID!;
export const dataset = SANITY_STUDIO_DATASET!;
export const studioUrl = SANITY_STUDIO_URL!;
export const stegaEnabled = SANITY_STUDIO_STEGA_ENABLED === "true";
export const apiVersion = SANITY_STUDIO_API_VERSION!;
export const frontendUrl = SANITY_FRONTEND_URL!;

export const projectDetails = () => ({
    projectId,
    dataset,
    apiVersion,
  })

if (!projectId) throw new Error("Missing SANITY_STUDIO_PROJECT_ID in .env");
if (!dataset) throw new Error("Missing SANITY_STUDIO_DATASET in .env");
if (!studioUrl) throw new Error("Missing SANITY_STUDIO_URL in .env");
if (!apiVersion) throw new Error(`Missing SANITY_STUDIO_API_VERSION in .env`);
if (!frontendUrl) throw new Error(`Missing SANITY_FRONTEND_URL in .env`);
