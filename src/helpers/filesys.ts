import { invoke } from "@tauri-apps/api/tauri";
import { nanoid } from "nanoid";
import { saveFileObject } from "../store/file";
import { IFile } from "../types";

export const readDirectory = (path: string): Promise<IFile[]> => {
  return new Promise((resolve, _reject) => {
    // Es necesario poner la "key" del comando rust/tauri, que es path_folder,
    // pero en "formato javascript", es decir, en camelcase: pathFolder
    invoke("open_folder", { pathFolder: path }).then((content: unknown) => {
      // console.log(content);

      const files: IFile[] = JSON.parse(
        (content as string).replaceAll("\\", "/").replaceAll("//", "/")
      );

      const entries: IFile[] = [];
      const folders: IFile[] = [];

      if (!files || !files.length) {
        resolve(entries);
        return;
      }

      files.forEach((file) => {
        const id = nanoid();
        const entry: IFile = {
          id,
          kind: file.kind,
          name: file.name,
          path: file.path,
        };

        file.kind === "file" ? entries.push(entry) : folders.push(entry);

        saveFileObject(id, file);
      });

      resolve([...folders, ...entries]);
    });
  });
};

export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    invoke("get_file_content", { path: filePath })
      .then((message: unknown) => resolve(message as string))
      .catch((err) => reject(err as string));
  });
};

export const writeFile = (
  filePath: string,
  content: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    invoke("write_file", { path: filePath, content: content })
      .then((message) => resolve(message as string))
      .catch((err) => reject(err as string));
  });
};
