use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use rocket::http::Status;
use rocket::Request;
use rocket::request::{FromRequest, Outcome};
use crate::functions::jwt_secret::get_jwt_secret;
use crate::types::claims::Claims;

pub struct JwtUser {
    pub user_id: String,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for JwtUser {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let auth_header = request.headers().get_one("Authorization");

        if let Some(token) = auth_header.and_then(|h| h.strip_prefix("Bearer ")) {
            let validation = Validation::new(Algorithm::HS256);

            match decode::<Claims>(token, &DecodingKey::from_secret(get_jwt_secret().as_bytes()), &validation) {
                Ok(token_data) => Outcome::Success(JwtUser {
                    user_id: token_data.claims.sub,
                }),
                Err(_) => Outcome::Error((Status::Unauthorized, ())),
            }
        } else {
            Outcome::Error((Status::Unauthorized, ()))
        }
    }
}