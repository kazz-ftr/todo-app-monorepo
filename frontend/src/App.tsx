import {
	useGetTodosConnectionQuery,
	useCreateTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} from "./__generated__/graphql";
import { TodoItem } from "./components/TodoItem";
import { TodoForm } from "./components/TodoForm";

function App() {
	const { data, loading, error, fetchMore } = useGetTodosConnectionQuery({
		variables: { first: 5 },
	});
	const [createTodo] = useCreateTodoMutation({
		refetchQueries: ["GetTodosConnection"],
	});
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation({
		refetchQueries: ["GetTodosConnection"],
	});

	const handleCreate = (title: string, categoryId: string, tagIds: string[]) => {
		createTodo({ variables: { input: { title, categoryId, tagIds } } });
	};

	const handleToggle = (id: string, completed: boolean) => {
		updateTodo({ variables: { id, input: { completed } } });
	};

	const handleDelete = (id: string) => {
		deleteTodo({ variables: { id } });
	};

	const handleLoadMore = () => {
		if (!data?.todosConnection.pageInfo.hasNextPage) return;

		fetchMore({
			variables: {
				after: data.todosConnection.pageInfo.endCursor,
			},
		});
	};

	if (loading && !data) return <div className="p-8">読み込み中...</div>;
	if (error) return <div className="p-8 text-error">エラー: {error.message}</div>;

	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<h1 className="text-3xl font-bold mb-8">ToDo アプリ</h1>
			<div className="mb-6">
				<TodoForm onSubmit={handleCreate} />
			</div>
			<div className="space-y-2">
				{data?.todosConnection.edges.map(({ node }) => (
					<TodoItem key={node.id} todo={node} onToggle={handleToggle} onDelete={handleDelete} />
				))}
			</div>
			<div className="mt-4 flex items-center justify-between">
				<span className="text-sm text-gray-500">全 {data?.todosConnection.totalCount} 件</span>
				{data?.todosConnection.pageInfo.hasNextPage && (
					<button className="btn btn-outline btn-sm" onClick={handleLoadMore} disabled={loading}>
						{loading ? "読み込み中..." : "もっと見る"}
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
