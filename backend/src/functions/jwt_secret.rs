use std::env;

pub fn get_jwt_secret() -> String {
    env::var("JWT_SECRET").expect("JWT_SECRET must be set in .env")
}