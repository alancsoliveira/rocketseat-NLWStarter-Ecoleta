const express = require("express");
const nunjucks = require("nunjucks");
const server = express();

const db = require("./database/db")
// Habilita o uso do req,body
server.use(express.urlencoded({ extended: true }))

server.use(express.static("public"));
nunjucks.configure("src/views", {
  express: server,
  noCache: true
});

server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
});

server.post("/savepoint", (req, res) => {
  const { name, image, address, address2, state, city, items } = req.body

  const query = `
        INSERT INTO places (
          image,
          name,
          address,
          address2,
          state,
          city,
          items
        ) VALUES (?,?,?,?,?,?,?);
    `

  const values = [
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ]

  function afeterInsertData(err) {
    if (err) {
      console.log(err)
      return res.render("create-point.html", { saved: false })

    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afeterInsertData)

})

server.get("/search", (req, res) => {
  const { search } = req.query

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

    return res.render("search-results.html", { places: rows, total: total })
  })
});

server.listen(3000);