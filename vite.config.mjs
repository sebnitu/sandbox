import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "import.meta.env.VITE_BRANCH": JSON.stringify("prototype-sortable"),
  },
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "html", "json", "lcov"],
      include: ["**/src/sortable/**"]
    },
  },
});
