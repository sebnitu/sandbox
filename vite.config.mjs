import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "import.meta.env.VITE_BRANCH": JSON.stringify("prototype-dark-mode"),
  },
});
