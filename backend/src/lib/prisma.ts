import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query",
		},
	],
});

// クエリログと実行時間を出力
prisma.$on("query", (e) => {
	console.log("Query: " + e.query);
	console.log("Duration: " + e.duration + "ms");
	console.log("---");
});
