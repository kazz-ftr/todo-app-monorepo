import { queryResolvers } from "./query";
import { mutationResolvers } from "./mutation";
import { todoResolvers } from "./todo";
import { categoryResolvers } from "./category";
import { tagResolvers } from "./tag";

export const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	Todo: todoResolvers,
	Category: categoryResolvers,
	Tag: tagResolvers,
};
