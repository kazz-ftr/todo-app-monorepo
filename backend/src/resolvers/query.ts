import { prisma } from "../lib/prisma";
import { toCursor, fromCursor } from "../lib/cursor";

export const queryResolvers = {
	todos: async () => {
		return await prisma.todo.findMany({
			where: { deletedAt: null },
			include: {
				category: true,
				tags: true,
			},
			orderBy: { createdAt: "desc" },
		});
	},

	todo: async (_parent: unknown, args: { id: string }) => {
		return await prisma.todo.findUnique({
			where: { id: parseInt(args.id) },
			include: {
				category: true,
				tags: true,
			},
		});
	},

	todosConnection: async (_parent: unknown, args: { first?: number; after?: string }) => {
		const take = args.first ?? 10; // デフォルト10件
		const cursor = args.after ? fromCursor(args.after) : undefined;

		// カーソルより後のデータを取得（1件多く取得してhasNextPageを判定）
		const todos = await prisma.todo.findMany({
			where: {
				deletedAt: null,
				...(cursor && { id: { lt: cursor } }), // カーソルより小さいID
			},
			take: take + 1, // 1件多く取得
			orderBy: { id: "desc" },
			include: { category: true, tags: true },
		});

		const hasNextPage = todos.length > take;
		const edges = todos.slice(0, take).map((todo) => ({
			node: todo,
			cursor: toCursor(todo.id),
		}));

		const totalCount = await prisma.todo.count({
			where: { deletedAt: null },
		});

		return {
			edges,
			pageInfo: {
				hasNextPage,
				hasPreviousPage: !!cursor,
				startCursor: edges[0]?.cursor ?? null,
				endCursor: edges[edges.length - 1]?.cursor ?? null,
			},
			totalCount,
		};
	},

	deletedTodos: async () => {
		return await prisma.todo.findMany({
			where: {
				deletedAt: { not: null },
			},
			include: { category: true, tags: true },
			orderBy: { deletedAt: "desc" },
		});
	},

	categories: async () => {
		return await prisma.category.findMany({
			include: { todos: true },
			orderBy: { name: "asc" },
		});
	},

	tags: async () => {
		return await prisma.tag.findMany({
			orderBy: { name: "asc" },
		});
	},
};
