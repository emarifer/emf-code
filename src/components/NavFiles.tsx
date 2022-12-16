import { ReactElement } from "react";
import { useSource } from "../context/SourceContext";
import { IFile } from "../types";
import { FileIcon } from "./FileIcon";
import { NavFolderItem } from "./NavFolderItem";

interface NavFilesProps {
  visible: boolean;
  files: IFile[];
}

export function NavFiles({ visible, files }: NavFilesProps): ReactElement {
  const { selected, setSelect, addOpenedFile } = useSource();

  const onShow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: IFile
  ) => {
    e.stopPropagation();

    if (file.kind === "file") {
      setSelect(file.id);
      addOpenedFile(file.id);
    }
  };

  return (
    <div className={`source-codes ${visible ? "" : "hidden"}`}>
      {files.map((file) => {
        const isSelected = file.id === selected;

        if (file.kind === "directory")
          return (
            <NavFolderItem
              file={file}
              active={isSelected}
              key={"folder" + file.id}
            />
          );

        return (
          <div
            onClick={(e) => onShow(e, file)}
            key={file.id}
            className={`source-item ${
              isSelected ? "source-item-active" : ""
            } flex items-center gap-2 px-2 py-1 text-gray-500 hover:text-gray-400 cursor-pointer`}
          >
            <FileIcon key={"icon" + file.id} name={file.name} />
            <span key={"filename" + file.id}>{file.name}</span>
          </div>
        );
      })}
    </div>
  );
}
