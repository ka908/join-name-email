const express = require("express");
const db = require("../db/database");
const router = express.Router();
const verifyToken = require("./mware");

router.post("/nameEmailAge", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    // const join = db.schema
    //   .table("email", function (table) {
    //     table.renameColumn("name_id", "email_id");
    //   })
    //   .then(() => console.log("Column renamed successfully"))
    //   .catch((err) => console.error("Failed to rename column:", err));

    // const name1 = await db("name").insert({ name: name });
    // const age1 = await db("age").insert({ email: email });
    // const email1 = await db("email").insert({ email: email });
    const join = await db("name as n")
      .leftJoin("email as e", "e.email_id", "n.id")
      //   .join("age", "age.age_id", "name.id")
      .select("n.name", "e.email");
    return res.json({ msg: join });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
