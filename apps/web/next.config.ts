import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@repo/ui"],
	typescript: {
		tsconfigPath: "tsconfig.app.json"
	},
};

export default nextConfig;
