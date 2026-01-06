import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  const createTable = new CreateTable();

  it("should create table with deafault values", () => {
    const table = createTable.execute({ base: 5 });
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("5 x 1 = 5");
    expect(table).toContain("5 x 2 = 10");
    expect(rows).toBe(10);
  });

  it("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };

    const table = createTable.execute(options);
    const rows = table.split("\n").length;

    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 10 = 30");
    expect(table).toContain("3 x 20 = 60");
    expect(rows).toBe(options.limit);
  });
});
