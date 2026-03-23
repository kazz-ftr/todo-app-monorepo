import { useState } from "react";
import {
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
} from "../__generated__/graphql";

export const CategoryManager = () => {
	const [name, setName] = useState("");
	const { data } = useGetCategoriesQuery();
	const [createCategory] = useCreateCategoryMutation({
		refetchQueries: ["GetCategories"],
	});
	const [deleteCategory] = useDeleteCategoryMutation({
		refetchQueries: ["GetCategories", "GetTodos"],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			createCategory({ variables: { name: name.trim() } });
			setName("");
		}
	};

	const handleDelete = (id: string) => {
		deleteCategory({ variables: { id } });
	};

	return (
		<div className="card bg-base-200 p-4">
			<h2 className="text-lg font-bold mb-2">カテゴリ管理</h2>
			<form onSubmit={handleSubmit} className="flex gap-2 mb-4">
				<input
					type="text"
					className="input input-bordered input-sm flex-1"
					placeholder="新しいカテゴリ名"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button
					type="submit"
					className="btn btn-primary btn-sm"
					disabled={!name.trim()}
				>
					追加
				</button>
			</form>
			<div className="flex flex-wrap gap-2">
				{data?.categories.map((category) => (
					<div key={category.id} className="badge badge-outline gap-1">
						{category.name}
						<button
							className="text-error font-bold"
							onClick={() => handleDelete(category.id)}
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
