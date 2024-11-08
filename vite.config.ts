import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,  
      },
    },
  },
});
