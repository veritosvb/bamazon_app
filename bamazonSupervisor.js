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
    runSearch();
  });

1
  function runSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Product Sales by Department",
          "Create New Department"
        ]
      })
      .then(function(answer) {
          console.log(answer.action)
        switch (answer.action) {
        case "View Product Sales by Department":
          displayProductSales();
          break;
  
        case "Create New Department":
          checkInventory();
          break;
        }
      });

  }

  function checkInventory() {
    var table = new Table({
        head: ['ITEM ID','QUANTITY'],
         colWidths: [10, 10] 
    });
   
    var query = "SELECT item_id,stock_quantity FROM products WHERE stock_quantity <= 5";
    connection.query(query, function(err, res) {
        for(var i = 0 ; i < res.length ; i ++){
            table.push([res[i].item_id, res[i].stock_quantity]);
        }
        console.log(table.toString());
        runSearch();
      }
    );
  }
  
function addToInventory(item_id,quantity,price){
  inquirer
  .prompt([{
    type: "input",
    name: "id_item",
    message: "Which ITEM ID you wish to add inventory??",
  },
  {
    type: "input",
    name: "quantity",
    message: "How many ITEMS do you will add?",
  }
  ])
  .then(function(answer) {
    var query = connection.query(
      "UPDATE products SET stock_quantity=stock_quantity +"+ answer.quantity+ " WHERE ?",
      [
        {
            item_id: answer.id_item
        }
      ],
      function(err, res) {
        console.log(answer.item_id + " item updated");
        runSearch();
  
      }
    );

  });
}

function addNewProduct(item_id,quantity,price){
  inquirer
  .prompt([{
    type: "input",
    name: "id_item",
    message: "Product Id",
  },
  {
    type: "input",
    name: "product_name",
    message: "Product Name",
  },
  {
    type: "input",
    name: "department_name",
    message: "Department name",
  },
  {
    type: "input",
    name: "price",
    message: "Price",
  },
  {
    type: "input",
    name: "stock_quantity",
    message: "stock quantity",
  }
  ])
  .then(function(answer) {

    var post = {
      item_id: answer.id_item,
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: answer.price,
      stock_quantity: answer.stock_quantity
    }
    var query = connection.query(
      "INSERT INTO products SET ? ",
      [
        post
      ],
      function(err, res) {
        console.log(err);
        console.log("item added");
        runSearch();
  
      }
    );

  });
}


  function displayProductSales() {
    var table = new Table({
      head: ['department_id', 'department_name', 'over_head_costs', 'product_sales',`total_profit`]
    , colWidths: [10, 20, 10,10,10]});

    var query = "SELECT department_id,departments.department_name,over_head_costs, SUM(products.product_sales) FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY products.department_name";

    connection.query(query, function(err, res) {
        if(err)
        return;

      for (var i = 0; i < res.length; i++) {
       table.push([res[i].department_id,res[i].department_name,res[i].over_head_costs,res[i].product_sales]);
      }
      //console.log(table.toString());
      runSearch();
    });
    
  }
  