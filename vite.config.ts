import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        allowedHosts: true,
        hmr: {
            // Force the WebSocket client to connect to CapRover's HTTPS port (443)
            // instead of trying to hit localhost:3000 or wss://...:3000
            clientPort: 443,
        },
    },
    build: {
        outDir: 'build',
    },
});
