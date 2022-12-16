import { ReactElement, useEffect, useMemo, useRef } from "react";
import { getFileObject } from "../store/file";
import { readFile, writeFile } from "../helpers/filesys";
import { nanoid } from "nanoid";
import { EditorView, basicSetup } from "codemirror";
import { javascript, esLint } from "@codemirror/lang-javascript";
import { lintGutter, linter } from "@codemirror/lint";
import Linter from "eslint4b-prebuilt";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { materialDark } from "cm6-theme-material-dark";

interface CodeEditorProps {
  id: string;
  active: boolean;
}

export function CodeEditor({ id, active }: CodeEditorProps): ReactElement {
  const isRendered = useRef<number>(0);
  const editorId = useMemo(() => nanoid(), []);
  const visible = active ? "" : "hidden";
  const editorRef = useRef<EditorView | null>(null);

  const fillContentInEditor = (content: string) => {
    const element = document.getElementById(editorId);

    if (element && isRendered.current === 0) {
      isRendered.current = 1;
      editorRef.current = new EditorView({
        doc: content,
        extensions: [
          basicSetup,
          javascript(),
          linter(esLint(new Linter())),
          lintGutter(),
          html(),
          css(),
          json(),
          markdown(),
          rust(),
          materialDark,
        ],
        parent: element,
      });
    }
  };

  const updateContentEditor = async (id: string) => {
    const file = getFileObject(id);
    const content = await readFile(file.path);

    fillContentInEditor(content);
  };

  const onSave = async () => {
    if (!editorRef.current) return;

    const content = editorRef.current.state.doc.toString();
    const file = getFileObject(id);

    await writeFile(file.path, content);
  };

  useEffect(() => {
    updateContentEditor(id);
  }, [id]);

  return (
    <main className={`w-full h-[calc(100vh-5rem)] overflow-y-auto ${visible}`}>
      <div
        id={editorId}
        tabIndex={-1}
        onKeyUp={(e) => {
          if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            e.stopPropagation();
            onSave();
          }
        }}
      ></div>
    </main>
  );
}

/*
 * Añadir linter a Codemirror:
 * https://codesandbox.io/s/f6nb0?file=/src/index.js:341-390
 */
