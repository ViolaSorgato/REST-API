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

//PUT - UPDATE
// app.put("/products", (req, res, next) => {
//         const updProduct = new Product({
//           title: req.body.title,
//           description: req.body.description,
//           id: req.params.id,
//           price: req.body.price,
//         });
//         Product.updateOne({id: req.params.id}, product).then(  //I found out too late that .updateOne only works with Mongoose
//           () => {
//             res.status(201).json({
//               message: 'Thing updated successfully!'
//             });
//           }
//         ).catch(
//           (error) => {
//             res.status(400).json({
//               error: error
//             });
//           }
//         );
//       });


//DELETE
app.delete("/products", (req, res) => {
    fs.readFile("products.json", function(err,data) {
        if (err) {
            console.log(err);
        }
    const products = JSON.parse(data)
    products.pop(); //I know it's not the right way... but it works :)
    res.send(products)
    return;
    })
});

app.listen(port, () => console.log(`Servern är igång på http://localhost:${port}`));
