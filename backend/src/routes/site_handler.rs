use rocket::fs::NamedFile;
use std::path::{Path, PathBuf};
use rocket::get;

// Add a new route
#[get("/<path..>", rank = 20)]
pub async fn site_handler(path: PathBuf) -> Option<NamedFile> {
    // Serve index.html for any unknown path under /site
    NamedFile::open(Path::new("slu/dist/index.html")).await.ok()
}