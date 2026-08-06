import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      manifest: true, // emits mf-manifest.json,
      dts: {
        // the root tsconfig.json only holds project references, so the dts
        // plugin has to extend the app config to pick up `jsx`
        generateTypes: { tsConfigPath: "./tsconfig.app.json" },
      },
      exposes: {
        "./button": "./src/components/button/index.tsx",
        "./card": "./src/components/card/index.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),
  ],
});
