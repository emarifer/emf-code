import { nanoid } from "nanoid";
import { ReactElement, useState } from "react";
import { readDirectory, writeFile } from "../helpers/filesys";
import { saveFileObject } from "../store/file";
import { IFile } from "../types";
import { NavFiles } from "./NavFiles";

interface NavFolderItemProps {
  file: IFile;
  active: boolean;
}

export function NavFolderItem({
  file,
  active,
}: NavFolderItemProps): ReactElement {
  const [files, setFiles] = useState<IFile[]>([]);
  const [unfold, setUnfold] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [newFile, setNewFile] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");

  const onShow = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();

    if (loaded) {
      setUnfold(!unfold);
      return;
    }

    const entries = await readDirectory(file.path + "/");

    setLoaded(true);
    setFiles(entries);
    setUnfold(!unfold);
  };

  const onEnter = (key: string) => {
    if (key === "Escape") {
      setNewFile(false);
      setFilename("");
      return;
    }

    if (key !== "Enter") return;

    const filePath = `${file.path}/${filename}`;

    writeFile(filePath, "").then(() => {
      const id = nanoid();

      const newFile: IFile = {
        id,
        kind: "file",
        name: filename,
        path: filePath,
      };

      saveFileObject(id, newFile);
      setFiles((prevEntries) => [newFile, ...prevEntries]);
      setNewFile(false);
      setFilename("");
    });
  };

  return (
    <div className="source-item">
      <div
        className={`source-folder ${
          active ? "bg-gray-200" : ""
        } flex items-center gap-2 px-2 py-1 text-gray-500 hover:text-gray-400 cursor-pointer`}
      >
        <i className="ri-folder-fill text-yellow-500" />
        <div className="source-header flex items-center justify-between w-full group">
          <span onClick={onShow}>{file.name}</span>
          <i
            onClick={() => setNewFile(true)}
            className="ri-add-line invisible group-hover:visible"
          />
        </div>
      </div>

      {newFile ? (
        <div className="mx-4 flex items-center gap-0.5 p-2">
          <i className="ri-file-edit-line text-gray-300" />
          <input
            autoFocus={true}
            className="inp"
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyUp={(e) => onEnter(e.key)}
          />
        </div>
      ) : null}

      <NavFiles visible={unfold} files={files} />
    </div>
  );
}
