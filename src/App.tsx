import { ReactElement } from "react";
import { CodeArea, Sidebar, Titlebar } from "./components";
import { SourceProvider } from "./context/SourceContext";

export default function App(): ReactElement {
  return (
    <div className="wrapper">
      <Titlebar />
      <div
        id="editor"
        className="h-screen flex items-start overflow-x-auto overflow-y-hidden"
      >
        <SourceProvider>
          <Sidebar />
          <CodeArea />
        </SourceProvider>
      </div>
    </div>
  );
}

/*
 * https://www.youtube.com/watch?v=LUcUn-_KVXo
 * https://github.com/hudy9x/huditor
 */
