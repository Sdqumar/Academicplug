const withPWA = require("next-pwa");

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// });

module.exports =  withPWA({
	pwa: {
	  dest: "public",
	  register: true,
	  skipWaiting: true,
	  disable: process.env.NODE_ENV === 'development'
	},
  
	webpack: (config, { isServer }) => {
		if (isServer) {
		  require('./generateSiteMap')
		}
	
		return config
	  },
	experimental: { esmExternals: true },
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
	productionBrowserSourceMaps: true,
	webpack: (config, { dev, isServer }) => {
		// Replace React with Preact only in client production build
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			});
	 	}

		return config;
	},
});
