import { ReactElement /*, useRef*/ } from "react";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export interface PreviewImageProps {
  path: string;
  active: boolean;
}

export function PreviewImage({
  path,
  active,
}: PreviewImageProps): ReactElement {
  // const imgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div className={`${active ? "" : "hidden"} p-8`}>
      <img src={convertFileSrc(path)} alt={path} />
    </div>
  );
}
