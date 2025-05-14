use std::env;
use dotenvy::dotenv;
use rocket::fs::{relative, FileServer};
use rocket::routes;
use crate::cors::CORS;
use crate::routes::auth::{login, verify};
use crate::routes::site_handler;

mod routes;
mod guards;
mod types;
mod functions;
mod cors;

#[rocket::launch]
fn rocket() -> _ {
    dotenv().ok();
    rocket::build()
    .attach(CORS)
    .mount("/", rocket::routes![
        cors::preflight_cors,
        login::login,
        verify::verify,
    ])
    .mount("/site", FileServer::from(relative!("www")).rank(10))
    .mount("/site", routes![site_handler::site_handler])
}
