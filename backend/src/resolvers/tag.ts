import { prisma } from "../lib/prisma";
import { Tag, Todo } from "@prisma/client";

type TagWithTodos = Tag & { todos?: Todo[] };

export const tagResolvers = {
	todos: async (parent: TagWithTodos) => {
		if (parent.todos) return parent.todos;

		return await prisma.todo.findMany({
			where: {
				tags: {
					some: { id: parent.id },
				},
			},
		});
	},
};
