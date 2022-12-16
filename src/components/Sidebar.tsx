import { ReactElement, useState } from "react";
import { IFile } from "../types";
import { open } from "@tauri-apps/api/dialog";
import { homeDir } from "@tauri-apps/api/path";
import { NavFiles } from "./NavFiles";
import { readDirectory } from "../helpers/filesys";

export function Sidebar(): ReactElement {
  const [projectName, setProjectName] = useState<string>("");
  const [files, setFiles] = useState<IFile[]>([]);

  const loadFile = async () => {
    const selected = await open({
      directory: true,
      title: "Proyectos",
      defaultPath: await homeDir(),
    });

    if (!selected) return;

    // console.log(selected);

    setProjectName(selected as string);

    const files = await readDirectory(selected + "/");
    // console.log(files);
    setFiles(files);
  };

  return (
    <aside id="sidebar" className="w-60 shrink-0 h-full bg-darken">
      <div className="sidebar-header flex items-center justify-between p-3 py-2.5 gap-1">
        <button className="project-explorer" onClick={loadFile}>
          browse
        </button>
        <span title={projectName.split("/").at(-1)} className="project-name">
          {projectName.split("/").at(-1)}
        </span>
      </div>
      <div className="code-structure">
        <NavFiles visible={true} files={files} />
      </div>
    </aside>
  );
}
