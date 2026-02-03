import express from "express";
import session from "express-session";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "node-state-secret",
  resave: false,
  saveUninitialized: true
}));

// SAVE
app.post("/state/save", (req, res) => {
  req.session.field1 = req.body.field1 || "";
  req.session.field2 = req.body.field2 || "";
  req.session.savedAt = new Date().toUTCString();

  res.send(`
    <h1>Data Saved (NodeJS)</h1>
    <ul>
      <li>Field 1: ${req.session.field1}</li>
      <li>Field 2: ${req.session.field2}</li>
      <li>Saved at: ${req.session.savedAt}</li>
    </ul>
    <a href="/state/view">View Saved Data</a>
  `);
});

// VIEW
app.get("/state/view", (req, res) => {
  res.send(`
    <h1>Saved State (NodeJS)</h1>
    <ul>
      <li>Field 1: ${req.session.field1 || "None"}</li>
      <li>Field 2: ${req.session.field2 || "None"}</li>
      <li>Saved at: ${req.session.savedAt || "N/A"}</li>
    </ul>
    <a href="/state/clear">Clear Data</a>
  `);
});

// CLEAR
app.get("/state/clear", (req, res) => {
  req.session.destroy(() => {
    res.send(`
      <h1>Session Cleared</h1>
      <a href="/state-form.html">Back to Form</a>
    `);
  });
});

app.listen(3000, () =>
  console.log("NodeJS state server running on http://localhost:3000")
);
