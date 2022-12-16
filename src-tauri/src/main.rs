#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod fc;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_folder(path_folder: &str) -> String {
    fc::read_directory(path_folder)
}

#[tauri::command]
fn get_file_content(path: &str) -> String {
    fc::read_file(path)
}

#[tauri::command]
fn write_file(path: &str, content: &str) -> String {
    fc::write_file(path, content)
    // String::from("OK")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            open_folder,
            get_file_content,
            write_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
