var mysql = require("mysql");
var inquirer = require("inquirer");

//Connect to database 
var connection = mysql.createConnection({
    host: "localhost",
  

    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });
// set connection
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    readProducts();
  });

  //  Create function to show all items in table
  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      runSearch()
    });
  
  // Create questions with inquirer
  function runSearch() {
    inquirer
    .prompt([{
      name: "itemID",
      type: "answer",
      message: "What is the ID of the product you would like to buy?"
    },
    {
      name: "quantity",
      type: "answer",
      message: "How many units would you like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
    }
    }])
      .then(function(answer) {
        var item = "answer.itemID";
        var quantity = "answer.quantity";
        
        connection.query("INSERT INTO auctions SET ?",
          {
            item_name: answer.itemID,
            category: answer.quantity
          },


      function updateProduct() {
        console.log("Updating all Rocky Road quantities...\n");
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              quantity: 100
            },
            {
              flavor: "Rocky Road"
            }
          ],
          function(err, res) {
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
          }
        );
    })
  })
}
}
      
  
  
  