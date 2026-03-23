import { prisma } from "../lib/prisma";
import { Todo, Category, Tag } from "@prisma/client";

type TodoWithRelations = Todo & { category?: Category; tags?: Tag[] };

export const todoResolvers = {
	category: async (parent: TodoWithRelations) => {
		if (parent.category) return parent.category;
		if (!parent.categoryId) return null;

		return await prisma.category.findUnique({
			where: { id: parent.categoryId },
		});
	},

	tags: async (parent: TodoWithRelations) => {
		if (parent.tags) return parent.tags;

		return await prisma.tag.findMany({
			where: {
				todos: {
					some: { id: parent.id },
				},
			},
		});
	},
};
