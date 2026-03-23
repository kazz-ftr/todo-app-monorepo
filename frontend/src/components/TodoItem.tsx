import type { GetTodosConnectionQuery } from "../__generated__/graphql";

type TodoNode = GetTodosConnectionQuery["todosConnection"]["edges"][number]["node"];

type TodoItemProps = {
  todo: TodoNode;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
      />
      <span className={`flex-1 ${todo.completed ? "line-through opacity-50" : ""}`}>
        {todo.title}
      </span>
      {todo.category && (
        <span className="badge badge-primary">{todo.category.name}</span>
      )}
      {todo.tags.map((tag) => (
        <span key={tag.id} className="badge badge-secondary badge-outline">
          {tag.name}
        </span>
      ))}
      <button
        className="btn btn-ghost btn-sm text-error"
        onClick={() => onDelete(todo.id)}
      >
        削除
      </button>
    </div>
  );
};
