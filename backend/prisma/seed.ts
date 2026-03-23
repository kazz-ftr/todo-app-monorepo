import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// 既存データを削除（順序に注意）
	await prisma.todo.deleteMany();
	await prisma.category.deleteMany();
	await prisma.tag.deleteMany();

	// カテゴリを作成
	const workCategory = await prisma.category.create({ data: { name: "仕事" } });
	const hobbyCategory = await prisma.category.create({ data: { name: "趣味" } });
	const studyCategory = await prisma.category.create({ data: { name: "学習" } });

	// タグを作成
	const importantTag = await prisma.tag.create({ data: { name: "重要" } });
	const laterTag = await prisma.tag.create({ data: { name: "後で" } });
	const urgentTag = await prisma.tag.create({ data: { name: "急ぎ" } });

	// ToDoを作成（ページネーションの動作確認用に12件）
	await prisma.todo.create({
		data: {
			title: "報告書を書く",
			categoryId: workCategory.id,
			tags: { connect: [{ id: importantTag.id }, { id: urgentTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "会議の準備",
			categoryId: workCategory.id,
			tags: { connect: [{ id: importantTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "本を読む",
			categoryId: hobbyCategory.id,
			tags: { connect: [{ id: laterTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "Prismaを学ぶ",
			categoryId: studyCategory.id,
			completed: true,
		},
	});

	await prisma.todo.create({
		data: {
			title: "買い物に行く",
		},
	});

	await prisma.todo.create({
		data: {
			title: "メールを返信する",
			categoryId: workCategory.id,
			tags: { connect: [{ id: urgentTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "ランニングをする",
			categoryId: hobbyCategory.id,
		},
	});

	await prisma.todo.create({
		data: {
			title: "GraphQLを学ぶ",
			categoryId: studyCategory.id,
			tags: { connect: [{ id: importantTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "部屋を掃除する",
			tags: { connect: [{ id: laterTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "プレゼン資料を作る",
			categoryId: workCategory.id,
			tags: { connect: [{ id: importantTag.id }, { id: urgentTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "映画を観る",
			categoryId: hobbyCategory.id,
			tags: { connect: [{ id: laterTag.id }] },
		},
	});

	await prisma.todo.create({
		data: {
			title: "TypeScriptを学ぶ",
			categoryId: studyCategory.id,
			completed: true,
		},
	});

	console.log("Seed data has been inserted (12 todos)");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
