import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "shared/graphql/**/*.graphql",
	documents: "frontend/src/graphql/**/*.graphql",
	generates: {
		"frontend/src/__generated__/graphql.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-react-apollo",
			],
			config: {
				withHooks: true,
			},
		},
	},
};

export default config;
