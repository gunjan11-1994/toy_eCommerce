
// server/index.js — a tiny API that issues JWTs and checks them.
import express from "express";
import jwt from "jsonwebtoken";

const PORT = 4000;

// Real apps read this from an environment variable and never commit it.
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-secret-change-me";

const app = express();
app.use(express.json());

// 1. Login — check credentials from JSON Server, then create JWT.
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  try {
    // Ask JSON Server to find the user.
    const response = await fetch(
      `http://localhost:3000/Registration?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    );

    const users = await response.json();

    // JSON Server returns an array.
    const user = users[0];

    // No matching user found.
    if (!user) {
      return res.status(401).json({
        message: "Wrong username or password",
      });
    }

    // Create JWT using the user found in JSON Server.
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.Fname ?? user.FirstName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Unable to login",
    });
  }
});

// 2. Guard — only lets a request through if it carries
// "Authorization: Bearer <valid token>".
function requireAuth(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Missing token",
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

// 3. A protected route — placing an order needs a logged-in user.
app.post("/api/orders", requireAuth, (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];

  if (items.length === 0) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }

  res.status(201).json({
    orderId: Date.now().toString(36).toUpperCase(),
    placedBy: req.user.username,
  });
});

app.listen(PORT, () =>
  console.log(`API ready on http://localhost:${PORT}`)
);

