var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//-------------Connect to database--------------------

var connection = mysql.createConnection({
    host: "localhost",
  

    port: 8889,
  
   
    user: "root",  
    password: "root",
    database: "bamazon_db"
});
// set connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    listProducts();
});


    //-------------Display Products table------------------ 
   
  //  Create function to show all items in table
function listProducts() {
      var table = new Table({
      head: ['ID', 'Product', 'Department', 'Price', 'Quantity'],
      colWidths: [10, 30, 30,10,10]
    }); 

    console.log("Selecting all products...\n");
    dspTable();

    function dspTable() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
    
      // Log all results of the SELECT statement
      // for (var index = 0; index < res.length; index++) {
      //   var id = res[i].item_id,
      //       product = res[i].product_name,
      //       department = res[i].department_name,
      //       price = res[i].price,
      //       quantity = res[i].stock_quantity;
      // table.push([id, product, department, price, quantity]
      //   );
        }
      })
    }
    
      console.log(table);
      runSearch();
}

// ------------Prompt questions for purchase----------------
  
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
  }]).then(function(purchaseProduct) {
        connection.query("SELECT * FROM products WHERE item_id=?", purchaseProduct.itemID, function(err, res) {
          for (var i = 0; i < res.length; i++) {

              if (purchaseProduct.quantity > res[i].stock_quantity) {
                   console.log("Insufficient qunatity! Please enter again.");
                   runSearch();
              } else {
                var newCount = (res[i].stock_quantity - purchaseProduct.quantity);
                var itemPurchased = (purchaseProduct.inputId);
                orderConfirm(newCount, itemPurchased);
                  }
                }
              }
           );
        })
    function orderConfirm(newCount, itemPurchased) {
    connection.query("UPDATE products SET ? WHERE ?", [{
      stock_quantity: newCount
  }, {
      item_id: itemPurchased
  }], function(err, res) {});
  console.log(orderConfirm);

  console.log("Your order has been placed. Thank you.");
  // listProducts();
};
}
      


    
      
  
  
