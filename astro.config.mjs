// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  redirects: {
    // redirect paths from old blog
    "/theres-an-r-package-for-that-ep1-making-noise": "/posts/r-making-noise",
    "/an-r-package-for-everything-ep2-gaps": "/posts/r-gaps-in-axes",
    "/a-walk-in-the-park": "/posts/a-walk-in-the-park",
  }
});