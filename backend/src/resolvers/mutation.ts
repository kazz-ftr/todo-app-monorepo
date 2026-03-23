import { prisma } from "../lib/prisma";

interface CreateTodoInput {
	title: string;
	categoryId?: string;
	tagIds?: string[];
}

interface UpdateTodoInput {
	title?: string;
	completed?: boolean;
	categoryId?: string;
	tagIds?: string[];
}

export const mutationResolvers = {
	createTodo: async (_parent: unknown, args: { input: CreateTodoInput }) => {
		return await prisma.todo.create({
			data: {
				title: args.input.title,
				categoryId: args.input.categoryId ? parseInt(args.input.categoryId) : undefined,
				tags: args.input.tagIds
					? { connect: args.input.tagIds.map((id) => ({ id: parseInt(id) })) }
					: undefined,
			},
			include: { category: true, tags: true },
		});
	},

	updateTodo: async (_parent: unknown, args: { id: string; input: UpdateTodoInput }) => {
		return await prisma.todo.update({
			where: { id: parseInt(args.id) },
			data: {
				title: args.input.title ?? undefined,
				completed: args.input.completed ?? undefined,
				categoryId: args.input.categoryId
					? parseInt(args.input.categoryId)
					: args.input.categoryId === null
					? null
					: undefined,
				tags: args.input.tagIds
					? { set: args.input.tagIds.map((id) => ({ id: parseInt(id) })) }
					: undefined,
			},
			include: { category: true, tags: true },
		});
	},

	deleteTodo: async (_parent: unknown, args: { id: string }) => {
		// 論理削除
		return await prisma.todo.update({
			where: { id: parseInt(args.id) },
			data: { deletedAt: new Date() },
			include: { category: true, tags: true },
		});
	},

	restoreTodo: async (_parent: unknown, args: { id: string }) => {
		return await prisma.todo.update({
			where: { id: parseInt(args.id) },
			data: { deletedAt: null },
			include: { category: true, tags: true },
		});
	},

	createCategory: async (_parent: unknown, args: { name: string }) => {
		return await prisma.category.create({
			data: { name: args.name },
		});
	},

	deleteCategory: async (_parent: unknown, args: { id: string }) => {
		const categoryId = parseInt(args.id);

		return await prisma.$transaction(async (tx) => {
			await tx.todo.deleteMany({
				where: { categoryId },
			});

			return await tx.category.delete({
				where: { id: categoryId },
			});
		});
	},

	createTag: async (_parent: unknown, args: { name: string }) => {
		return await prisma.tag.create({
			data: { name: args.name },
		});
	},

	deleteTag: async (_parent: unknown, args: { id: string }) => {
		return await prisma.tag.delete({
			where: { id: parseInt(args.id) },
		});
	},

	addTagToTodo: async (_parent: unknown, args: { todoId: string; tagId: string }) => {
		return await prisma.todo.update({
			where: { id: parseInt(args.todoId) },
			data: {
				tags: {
					connect: { id: parseInt(args.tagId) },
				},
			},
			include: { category: true, tags: true },
		});
	},

	removeTagFromTodo: async (_parent: unknown, args: { todoId: string; tagId: string }) => {
		return await prisma.todo.update({
			where: { id: parseInt(args.todoId) },
			data: {
				tags: {
					disconnect: { id: parseInt(args.tagId) },
				},
			},
			include: { category: true, tags: true },
		});
	},
};
