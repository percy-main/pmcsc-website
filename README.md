# Percy Main Cricket and Sports Club

Built with

- Remix
- Sanity
- Mantine

Hosted on Netlify

## Local development

Smash the following into a `.env` file at the root of the repository

```
SANITY_STUDIO_PROJECT_ID=x4nd69rk
SANITY_STUDIO_DATASET=dev
SANITY_STUDIO_URL=http://localhost:3000
SANITY_STUDIO_STEGA_ENABLED=true
SANITY_STUDIO_API_VERSION=2023-11-15
SANITY_FRONTEND_URL=http://localhost:3000
```

You'll need a sanity login to read/write any data, raise an issue in this repo if you think you should have one.

Install dependencies

```sh
npm install
```

Start the app locally with

```sh
npm run dev
```

You should now be able to see the site at [http://localhost:3000](http://localhost:3000)