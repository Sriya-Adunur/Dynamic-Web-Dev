import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import credentials from "../services/credential-svc";

dotenv.config();
const router = express.Router();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "NOT_A_SECRET";

// /auth/register
/*router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).send("Invalid input");
  }

  credentials.create(username, password)
    .then((creds) => generateToken(creds.username))
    .then((token) => res.status(201).send({ token }))
    .catch((err) => res.status(409).send({ error: err.toString() }));
});*/

router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body; // from form

  if ( typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create(username, password)
      .then((creds) => generateToken(creds.username))
      .then((token) => {
        res.status(201).send({ token: token });
      })
      .catch((err) => {
        res.status(409).send({ error: err.message });
      });
  }
});

// /auth/login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Invalid input");

  credentials.verify(username, password)
    .then((user) => generateToken(user))
    .then((token) => res.status(200).send({ token }))
    .catch(() => res.status(401).send("Unauthorized"));
});

function generateToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({ username }, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err || !token) reject(err);
      else resolve(token as string);
    });
  });
}

/*export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).end();

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (decoded) next();
    else res.status(403).end();
  });
}*/

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).end();

  jwt.verify(token, TOKEN_SECRET, (err, decoded: any) => {
    if (err || !decoded?.username) return res.status(403).end();
    (req as any).user = { username: decoded.username }; // attach user to request
    next();
  });
}

router.get("/user", authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

export default router;
