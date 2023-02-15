export type SQLQuery<T extends Object> = (sql: string) => Promise<T>;
