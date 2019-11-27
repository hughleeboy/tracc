const mysql = require("mysql")
const creds = require("./dbcreds")

// db connection
const connection = mysql.createConnection(creds)
connection.connect(err => {
	if(err)
		console.log("THERE WAS AN ERROR: ",err)
	else
		console.log("SUCCESSFULLY connected to mysql")
})

module.exports = {
    connection: mysql.createConnection(creds)
}


