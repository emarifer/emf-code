import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactElement,
} from "react";

interface ISourceContext {
  selected: string;
  setSelect: (id: string) => void;
  openedFiles: string[];
  addOpenedFile: (id: string) => void;
  deleteOpenedFile: (id: string) => void;
}

// Se podría pasarle a `createContext()` un objeto que se ajustara
// al tipo de la interfaz `ISourceContext`, como se hace en
// https://github.com/hudy9x/huditor/blob/main/src/context/SourceContext.tsx (línea 11)
// pero eso daría warnings de parámetros no usados. Es mejor usar un
// objeto vacío y castearlo como `ISourceContext`:
const SourceContext = createContext<ISourceContext>({} as ISourceContext);

export const SourceProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [selected, setSelected] = useState<string>("");
  const [openedFiles, setOpenedFiles] = useState<string[]>([]);

  const setSelect = (id: string) => setSelected(id);

  const addOpenedFile = useCallback(
    (id: string) => {
      if (openedFiles.includes(id)) return;
      setOpenedFiles((prevOpen) => [...prevOpen, id]);
    },
    [openedFiles]
  );

  const deleteOpenedFile = useCallback(
    (id: string) => {
      setOpenedFiles((prevOpen) => prevOpen.filter((opened) => opened !== id));
    },
    [openedFiles]
  );

  return (
    <SourceContext.Provider
      value={{
        selected,
        setSelect,
        openedFiles,
        addOpenedFile,
        deleteOpenedFile,
      }}
    >
      {children}
    </SourceContext.Provider>
  );
};

export const useSource = () => {
  const { selected, setSelect, openedFiles, addOpenedFile, deleteOpenedFile } =
    useContext(SourceContext);

  return { selected, setSelect, openedFiles, addOpenedFile, deleteOpenedFile };
};
