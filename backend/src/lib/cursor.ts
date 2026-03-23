// IDをカーソルに変換
export const toCursor = (id: number): string => {
	return Buffer.from(`cursor:${id}`).toString("base64");
};

// カーソルをIDに変換
export const fromCursor = (cursor: string): number => {
	const decoded = Buffer.from(cursor, "base64").toString("utf-8");
	return parseInt(decoded.replace("cursor:", ""));
};
