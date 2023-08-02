const baseUrl = "https://optimal-backend-62d59a37302d.herokuapp.com";

export async function logIn(username, password) {
  return await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
}
