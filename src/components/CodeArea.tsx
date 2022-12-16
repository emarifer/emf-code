import { ReactElement } from "react";
import { useSource } from "../context/SourceContext";
import { useHorizontalScroll } from "../helpers/useHorizontalScroll";
import { getFileObject } from "../store/file";
import { CodeEditor } from "./CodeEditor";
import { FileIcon } from "./FileIcon";
import { PreviewImage } from "./PreviewImage";

export function CodeArea(): ReactElement {
  const { openedFiles, selected, setSelect, deleteOpenedFile } = useSource();

  const scrollRef = useHorizontalScroll();

  const onClose = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    deleteOpenedFile(id);
  };

  const isImage = (name: string) =>
    [".png", ".gif", ".jpeg", ".jpg", ".bmp", ".ico", ".icns"].some(
      (ext) => name.lastIndexOf(ext) !== -1
    );

  return (
    <div id="code-area" className="w-full h-full">
      <div
        ref={scrollRef}
        className="code-tab-items flex items-center border-b border-stone-800 divide-x divide-stone-800 overflow-x-auto"
      >
        {openedFiles.map((item) => {
          const file = getFileObject(item);
          const active = selected === item ? "bg-darken text-gray-400" : "";
          // console.log({ selected, item, active });

          return (
            <div
              onClick={() => setSelect(item)}
              className={`tab-item shrink-0 px-3 py-1.5 text-gray-500 hover:text-gray-400 cursor-pointer flex items-center gap-2 ${active}`}
              key={item}
            >
              <FileIcon name={file.name} size="sm" />
              <span className="text-xs">{file.name}</span>
              <i
                onClick={(e) => onClose(e, item)}
                className="ri-close-line hover:text-red-400"
              />
            </div>
          );
        })}
      </div>

      <div className="code-contents">
        {openedFiles.map((item) => {
          const file = getFileObject(item);
          if (isImage(file.name)) {
            return (
              <PreviewImage
                key={"img" + item}
                path={file.path}
                active={item === selected}
              />
            );
          }

          return (
            <CodeEditor
              key={"code" + item}
              id={item}
              active={item === selected}
            />
          );
        })}
      </div>
    </div>
  );
}
