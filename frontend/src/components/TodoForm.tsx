import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../__generated__/graphql";

type TodoFormProps = {
  onSubmit: (title: string, categoryId: string, tagIds: string[]) => void;
};

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: tagData } = useGetTagsQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && categoryId) {
      onSubmit(title.trim(), categoryId, selectedTagIds);
      setTitle("");
      setSelectedTagIds([]);
    }
  };

  const handleTagChange = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="新しいToDoを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">カテゴリを選択</option>
          {categoryData?.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        {tagData?.tags.map((tag) => (
          <label key={tag.id} className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={selectedTagIds.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
            />
            <span className="text-sm">{tag.name}</span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!title.trim() || !categoryId}
      >
        追加
      </button>
    </form>
  );
};
