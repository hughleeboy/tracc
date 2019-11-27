const app = require("express")()
const bodyParser = require("body-parser")
const port = 3002

// middleware
app.use(bodyParser.json())

// route declaration
const userRoutes = require("./routes/user")
app.use("/user", userRoutes)

app.listen(port, () => {
    console.log("serviceme server listening on port", port)
})
