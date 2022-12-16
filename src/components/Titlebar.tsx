import { ReactElement, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";

export function Titlebar(): ReactElement {
  const [scaleup, setScaleup] = useState(false);

  const onMinimize = () => appWindow.minimize();
  const onScaleup = () => {
    appWindow.toggleMaximize();
    setScaleup(true);
  };
  const onScaledown = () => {
    appWindow.toggleMaximize();
    setScaleup(false);
  };

  const onClose = () => appWindow.close();

  return (
    <div id="titlebar" data-tauri-drag-region>
      {/* Icono y Título */}
      <div className="flex items-center gap-2 pl-2 my-1">
        <img className="w-5" src="/app-icon.png" alt="app-icon" />
        <span className="text-xs font-bold">Emf Code</span>
      </div>

      {/* Acciones */}
      <div className="titlebar-actions">
        {/* Minimizar */}
        <i className="titlebar-icon ri-subtract-line" onClick={onMinimize} />

        {/* Alternar pantalla completa/anterior tamaño */}
        {scaleup ? (
          <i
            className="titlebar-icon ri-file-copy-line"
            onClick={onScaledown}
          />
        ) : (
          <i className="titlebar-icon ri-stop-line" onClick={onScaleup} />
        )}

        {/* Cerrar aplicación */}
        <i
          id="ttb-close"
          className="titlebar-icon ri-close-fill"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
