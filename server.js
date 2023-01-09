const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 1337

let products = require("./products.json");
app.use(express.json());

//save function
const save = () => {
    fs.writeFile(
      "./products.json",
      JSON.stringify(products, null, 2),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };

//GET - READ
app.get('/', function(req,res,next) {
    
    fs.readFile("products.json", function(err,data) {
        if (err) {
            console.log(err);
        }
    
    const products = JSON.parse(data)
    res.send(products)
    return;
    })
});

//POST - CREATE
app.post("/products", bodyParser.json(), (req, res) => {
    products.push(req.body);
    save();
    res.json({
      status: "success",
      productInfo: req.body,
    });
  });

// //PUT 
// app.put("/products", bodyParser.json(), (req, res) => {
    
//     fs.readFile("products.json", function(err,data) {
//         if (err) {
//             console.log(err);
//         }
    
//     save();
//     res.json({
//         status: "success",
//         productInfo: req.body,
//     });
// });
// });

DELETE
app.delete("/products/:id", (req, res) => {
    fs.readFile("products.json", function(err,data) {
        if (err) {
            console.log(err);
        }
    const products = JSON.parse(data)
    products.pop();
    console.log(products);
    res.send(products)
    return;
    })
});

app.listen(port, () => console.log(`Servern är igång på http://localhost:${port}`));
