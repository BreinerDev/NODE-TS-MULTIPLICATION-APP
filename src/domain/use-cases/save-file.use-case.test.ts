import { SaveFile, Options } from "./save-file.use-case";
import { CreateTable } from "./create-table.use-case";
import fs from "fs";
import exp from "constants";

describe("SaveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-output/file-destination",
    fileName: "custom-table-name",
  };

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    const exist = fs.existsSync("outputs");
    const customExist = fs.existsSync(customFilePath);
    if (exist) fs.rmSync("outputs", { recursive: true });
    if (customExist) fs.rmSync(customFilePath, { recursive: true });
  });

  const saveFile = new SaveFile();

  it("should save file", async () => {
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };
    const result = saveFile.execute(options);

    expect(result).toBe(true);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {
      encoding: "utf-8",
    });

    expect(fileExist).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("should save file with custom values", async () => {
    const result = saveFile.execute(customOptions);
    expect(result).toBe(true);

    const fileExist = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, {
      encoding: "utf-8",
    });
    expect(fileExist).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  it("shoud return false if directory could not be created", () => {
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Directory could not be created");
    });
    const result = saveFile.execute(customOptions);
    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  it("shoud return false if file could not be created", () => {
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom writing error message");
    });
    const result = saveFile.execute({ fileContent: "Hola" });
    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  });
});
