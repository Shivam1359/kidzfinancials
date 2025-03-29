import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh for better dev experience
      fastRefresh: true,
      // Remove the problematic babel plugin configuration
    }), 
    compression({
      algorithm: 'brotliCompress', 
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 512, // Lower threshold to compress more files
      compressionOptions: {
        level: 11, // Maximum compression level
      },
    }),
    compression({
      algorithm: 'gzip', 
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 512, // Lower threshold to compress more files
      compressionOptions: {
        level: 9, // Maximum compression level
      },
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
        passes: 3, // Increase passes for better minification
        ecma: 2020,
        unsafe: true, // More aggressive optimizations
        toplevel: true, // Better variable minification
      },
      mangle: {
        properties: false, // Careful with this setting
      },
      format: {
        comments: false, // Remove comments
        ecma: 2020,
      },
    },
    
    // Enable code splitting with more granular chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react-calendar')) return 'vendor-calendar';
            if (id.includes('react-scroll')) return 'vendor-scroll';
            
            // Split large packages into separate chunks
            if (id.includes('@emotion')) return 'vendor-emotion';
            if (id.includes('lodash')) return 'vendor-lodash';
            
            return 'vendor-other';
          }
          if (id.includes('components/common')) {
            return 'common';
          }
          if (id.includes('assets')) {
            return 'assets';
          }
          // Default behavior for app code
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Put different asset types in different folders
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Disable source maps in production
    sourcemap: false,
    // Add additional optimizations
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 10240, // Increase to 10KB for more inlined assets
    target: 'esnext', // Target modern browsers for better performance
    modulePreload: true, // Enable module preloading
  },

  // Optimize asset handling
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp', '**/*.avif'],
  
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
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
