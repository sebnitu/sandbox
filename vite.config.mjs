import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "import.meta.env.VITE_BRANCH": JSON.stringify("prototype-calendar"),
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "html", "json", "lcov"],
      include: ["**/src/**"]
    }
  }
});
