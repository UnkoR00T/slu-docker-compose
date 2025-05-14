use rocket::http::Status;
use crate::guards::jwt_user::JwtUser;

#[rocket::post("/verify")]
pub fn verify(user: JwtUser) -> Status {
    Status::Ok
}