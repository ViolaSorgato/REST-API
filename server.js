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
app.get('/', function(req, res, next) {
    
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

//PUT - UPDATE
app.put("/products/:id", bodyParser.json(), (req, res) => {      
  products = products.map((product) => {
    if (product.id === req.params.id) {
      return req.body;
    } else {
      return product;
    }
  });
  save();

  res.json({
    status: "success",
    productInfo: req.body,
  });
});

//DELETE
// app.delete("/products/:id", bodyParser.json(), (req, res) => {
//   products = products.filter((product) => product.id !== req.params.id);
//   save();
//   res.json({
//     status: "success",
//     removed: req.params.id,
//     newLength: products.length,
//   });
// });

app.delete("/:id", (req, res) => {
  fs.readFile("products.json", function (err, data){

    if(err){
        return res.status(404).json("Error")
    }

let products = JSON.parse(data);

const { id } = req.params;

const product = products.find((product) => product.id === id);

products = products.filter((product) => product.id !== id);

save();

res.json(`Success! The product has been deleted.`);
    
});
});

app.listen(port, () => console.log(`Servern är igång på http://localhost:${port}`));
