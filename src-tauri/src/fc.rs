use serde::{Deserialize, Serialize};
// use serde_json::Result;
use std::{fs, path::Path};

#[derive(Debug, Deserialize, Serialize)]
pub struct FileInfo {
    name: String,
    kind: String,
    path: String,
}

// Leer carpeta
pub fn read_directory(dir_path: &str) -> String {
    let new_path = Path::new(dir_path);
    // println!("new_path: {:?}", new_path);

    let paths = fs::read_dir(new_path).unwrap();

    let mut files: Vec<FileInfo> = Vec::new();

    for path in paths {
        let path_unwrap = path.unwrap();
        let meta = path_unwrap.metadata();
        let meta_unwrap = meta.unwrap();

        let mut kind = String::from("file");

        if meta_unwrap.is_dir() {
            kind = String::from("directory");
        }

        let filename = match path_unwrap.file_name().into_string() {
            Ok(str) => str,
            Err(_err) => String::from("ERROR"),
        };

        let file_path = dir_path.to_owned() + &filename;

        let new_file_info = FileInfo {
            name: filename,
            kind,
            path: file_path,
        };

        files.push(new_file_info);
    }

    let files_str = match serde_json::to_string(&files) {
        Ok(str) => str,
        Err(err) => panic!("Problem opening the file: {:?}", err),
    };

    files_str
}

// Leer fichero
pub fn read_file(path: &str) -> String {
    fs::read_to_string(path).expect("ERROR")
}

// Actualizar y crear un nuevo fichero
pub fn write_file(path: &str, content: &str) -> String {
    let file_path = Path::new(path);

    match fs::write(file_path, content) {
        Ok(()) => String::from("Ok"),
        Err(_err) => String::from("ERROR"),
    }
}

/*
// Crear carpeta
pub fn create_directory(path: &str) -> std::io::Result<()> {
    fs::create_dir(path)?;
    Ok(())
}

// Eliminar carpeta
pub fn remove_folder(path: &str) -> std::io::Result<()> {
    fs::remove_dir_all(path)?;
    Ok(())
}

// Eliminar archivo
pub fn remove_file(path: &str) -> std::io::Result<()> {
    fs::remove_file(path)?;
    Ok(())
}
*/
