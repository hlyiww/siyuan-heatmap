import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import transformerDirective from "@unocss/transformer-directives";
import path from "path";

export default defineConfig(() => {
  return {
    base: "widgets/siyuan-heatmap",
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        dts: "src/auto-import.d.ts",
      }),
      Unocss({
        transformers: [transformerDirective()],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
