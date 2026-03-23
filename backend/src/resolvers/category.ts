import { prisma } from "../lib/prisma";
import { Category } from "@prisma/client";

export const categoryResolvers = {
	// Category型のtodosフィールドを解決
	todos: async (parent: Category) => {
		// parentには親のCategoryオブジェクトが渡される
		return await prisma.todo.findMany({
			where: { categoryId: parent.id },
		});
	},
};
