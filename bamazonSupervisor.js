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
          createNewDepartment();
          break;
        }
      });

  }

function createNewDepartment(){
  inquirer
  .prompt([{
    type: "input",
    name: "department_id",
    message: "Department Id",
  },
  {
    type: "input",
    name: "department_name",
    message: "Department Name",
  },
  {
    type: "input",
    name: "over_head_costs",
    message: "Over head costs",
  }
  ])
  .then(function(answer) {

    var post = {
      department_id: answer.department_id,
      department_name: answer.department_name,
      over_head_costs: answer.over_head_costs
    }
    var query = connection.query(
      "INSERT INTO departments SET ? ",
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
  