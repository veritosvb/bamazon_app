var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    console.log("Connecting to db");
    if (err) throw err;
    displayAll();
  });


  function runSearch() {
    inquirer
      .prompt([{
        type: "input",
        name: "id_item",
        message: "Which ITEM ID you wish to purchase??",
      },
      {
        type: "input",
        name: "quantity",
        message: "How many ITEMS do you need?",
      }
      ])
      .then(function(answer) {
        checkOrder(answer.id_item, answer.quantity );

      });
  }

  function checkOrder(id_item, quantity) {
    var query = "SELECT item_id,stock_quantity,price FROM products WHERE ?";
    connection.query(query,{ item_id: id_item}, function(err, res) {
        try{
            if(res[0].stock_quantity >= quantity){
                console.log("Fulfilling the customer's order \n ") ;
                purchesing(res[0].item_id, res[0].stock_quantity-quantity, quantity * res[0].price);
            }else{
                console.log("INVENTORY CHECK: Insufficient quantity!");
                runSearch();
            }
        }
        catch(err){
            console.log("INVENTORY CHECK: ITEM ID not valid *******");
            runSearch();
        }

      }
    );
  }
  
function purchesing(item_id,quantity,price){
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
            stock_quantity: quantity,
            product_sales: product_sales + price

        },
        {
          item_id: item_id
        }
      ],
      function(err, res) {
        console.log("TOTAL PRICE: $" + price);
        runSearch();
        // Call deleteProduct AFTER the UPDATE completes
        //deleteProduct();
      }
    );
}



  function displayAll() {



 
    var table = new Table({
      head: ['ITEM ID', 'PRODUCT NAME', 'PRICE']
    , colWidths: [10, 60, 10]});

    var query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
       table.push([res[i].item_id ,res[i].product_name,res[i].price]);
      }
      console.log(table.toString());
      runSearch();
    });
    
  }
  