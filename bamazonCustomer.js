var mysqul = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "playlist_db"
  });
// set connection
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    filterConnection();
  });
  function filterConnection() {
    connection.query("SELECT * FROM procucts", function(err, res) {
      if (err) throw err;
      console.log(res);
        res.forEach( function(elem) {
          console.log(elem.id+ " | " +elem.product_name+ " | " +elem.department_name+ " | " +price+ " | " +stock_quantity)
        });
      connection.end();
  }

    )}