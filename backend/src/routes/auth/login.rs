use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use std::env;
use dotenvy::dotenv;
use rocket::http::Status;
use rocket::response::status;
use crate::functions::jwt_secret::get_jwt_secret;
use crate::types::claims::Claims;

#[derive(Debug, Deserialize)]
struct TokenInput {
    token: String,
}

#[rocket::post("/login", data = "<input>")]
pub async fn login(input: Json<TokenInput>) -> Result<String, Status> {
    let client = reqwest::Client::new();
    let auth_url = "https://sso.joltamp.pl/account/auth?app=Unihokej";
    println!("Request");
    let res = client
        .post(auth_url)
        .header("Authorization", &input.token)
        .send()
        .await
        .map_err(|_| Status::Unauthorized)?;
    println!("Request check");

    if !res.status().is_success() {
        return Err(Status::Unauthorized);
    }
    println!("All ok");

    let secret: String = get_jwt_secret();
    let expiration = Utc::now() + Duration::seconds(15);
    let claims = Claims {
        sub: input.token.clone(),
        exp: expiration.timestamp() as usize,
    };

    Ok(encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes())).unwrap())
}
