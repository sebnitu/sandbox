import { defineConfig } from "vite";
import data from "./package.json";

export default defineConfig({
  define: {
    "import.meta.env.VITE_REPO": JSON.stringify("https://github.com/sebnitu/sandbox"),
    "import.meta.env.VITE_BRANCH": JSON.stringify("main"),
    "import.meta.env.VITE_NAME": JSON.stringify(data.name),
    "import.meta.env.VITE_DESC": JSON.stringify(data.description),
    "import.meta.env.VITE_FAVICON": JSON.stringify("https://sebnitu.com/icons/favicon.png")
  },
});
