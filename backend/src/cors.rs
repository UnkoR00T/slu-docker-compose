use rocket::{Request, Response, fairing::{Fairing, Info, Kind}, options};
use rocket::http::Status;

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _req: &'r Request<'_>, res: &mut Response<'r>) {
        res.set_header(rocket::http::Header::new("Access-Control-Allow-Origin", "*"));
        res.set_header(rocket::http::Header::new("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"));
        res.set_header(rocket::http::Header::new("Access-Control-Allow-Headers", "Authorization, Content-Type"));
    }
}
#[options("/<_..>")]
pub fn preflight_cors() -> Status {
    Status::Ok
}