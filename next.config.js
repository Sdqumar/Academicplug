module.exports = {
	images: {
		domains: ['firebasestorage.googleapis.com'],
	},
};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});
