.PHONY: help codegen dev-fe dev-be dev-db install migrate seed db-reset

help: ## コマンド一覧を表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

codegen: ## GraphQL の型を自動生成
	npx graphql-codegen --config codegen.ts

dev-fe: ## FE の開発サーバーを起動
	cd frontend && npm run dev

dev-be: ## BE の開発サーバーを起動
	cd backend && npm run dev

dev-db: ## PostgreSQL コンテナを起動
	docker compose up -d

install: ## 全パッケージの依存関係をインストール
	cd frontend && npm install && cd .. && cd backend && npm install

migrate: ## Prisma マイグレーションを実行
	cd backend && npx prisma migrate dev

seed: ## Seed データを投入
	cd backend && npx prisma db seed

db-reset: ## DB をリセット（コンテナ再作成 + マイグレーション + Seed）
	docker compose down -v
	docker compose up -d
	sleep 3
	cd backend && npx prisma migrate dev --name init
	cd backend && npx prisma db seed
