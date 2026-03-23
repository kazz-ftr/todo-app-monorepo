-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_category_id_fkey";

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
