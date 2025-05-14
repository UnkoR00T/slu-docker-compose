use rocket::serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub(crate) sub: String,
    pub(crate) exp: usize,
}