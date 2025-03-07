import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    compression({
      algorithm: 'brotliCompress', 
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 512, // Lower threshold to compress more files
    }),
    compression({
      algorithm: 'gzip', 
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 512, // Lower threshold to compress more files
    }),
    visualizer({ // Add bundle analyzer
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  // Optimize build for production
  build: {
    // Enable minification with more aggressive settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2, // Multiple passes for better minification
        ecma: 2020,
      },
      mangle: {
        properties: false, // Careful with this setting
      },
      format: {
        comments: false, // Remove comments
      },
    },
    
    // Enable code splitting with more granular chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules')) {
            if (id.includes('react-calendar')) return 'vendor-calendar';
            if (id.includes('react-scroll')) return 'vendor-scroll';
            return 'vendor-other';
          }
          if (id.includes('components/common')) {
            return 'common';
          }
          // Default behavior for app code
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Disable source maps in production
    sourcemap: false,
    // Add additional optimizations
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    target: 'es2018', // Target modern browsers
    modulePreload: true, // Enable module preloading
  },

  // Optimize asset handling
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp'],
  
  // Configure server
  server: {
    // Enable compression
    compress: true,
    // Optimize HMR
    hmr: {
      overlay: true,
      protocol: 'ws',
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['fsevents'],
  },
})
