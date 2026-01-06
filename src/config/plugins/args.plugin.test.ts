const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugin");

  return yarg;
};

describe("Test args.plugin.ts", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });
 
  it("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  it("should return configurations with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "5",
      "-l",
      "20",
      "-s",
      "-n",
      "custom-name",
      "-d",
      "custom-dir",
    ]);
    expect(argv).toEqual(
      expect.objectContaining({
        b: argv?.b,
        l: argv?.l,
        s: argv?.s,
        n: argv?.n,
        d: argv?.d,
      })
    );
  });
});
