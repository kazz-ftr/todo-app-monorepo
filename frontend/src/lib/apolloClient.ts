import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					todosConnection: {
						keyArgs: false, // 引数でキャッシュを分けない
						merge(existing, incoming) {
							if (!existing) return incoming;
							return {
								...incoming,
								edges: [...existing.edges, ...incoming.edges],
							};
						},
					},
				},
			},
		},
	}),
});
