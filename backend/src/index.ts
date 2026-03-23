import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from "@graphql-tools/load-files";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { resolvers } from "./resolvers/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// shared/graphql/ から全スキーマファイルを読み込む
const typeDefs = loadFilesSync(
	join(__dirname, "..", "..", "shared", "graphql"),
	{ extensions: ["graphql"], recursive: true }
);

// Apollo Serverのインスタンスを作成
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// サーバーを起動
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
