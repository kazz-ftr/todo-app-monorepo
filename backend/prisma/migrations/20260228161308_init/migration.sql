-- CreateIndex
CREATE INDEX "todos_category_id_idx" ON "todos"("category_id");

-- CreateIndex
CREATE INDEX "todos_deleted_at_idx" ON "todos"("deleted_at");

-- CreateIndex
CREATE INDEX "todos_created_at_idx" ON "todos"("created_at");
