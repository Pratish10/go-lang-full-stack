import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/register", async ({}) => {
    const body = await request.json();
    if (!body.email)
      return HttpResponse.json({ error: "Email required" }, { status: 400 });
    return HttpResponse.json({ message: "Registered" }, { status: 201 });
  }),

  http.post("/login", async ({ request }) => {
    const { email, password } = await request.json();
    if (email === "test@example.com" && password === "password")
      return HttpResponse.json({ token: "abc123" }, { status: 200 });

    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  http.get("/profile/692d42dacbc25fc6295c8f33", () => {
    return HttpResponse.json({
      id: "123",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });
  }),
];
