const express = require('express');
const app = express();
const fs = require('fs');
const port = 1337

app.use(express.json());

//app.get('/', (req,res) => res.send('Hello World!'))

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

// app.get('/api/products', (req, res) => {
//     res.status(200).send("här är alla produkter");
// });

// app.post('/api/products', (req, res) => {
//     res.status(201).json(req.body);
// })         //writeFile???

// //Jannes video del 2, readFile + writeFile + push new element

// app.get('/add', (req, res) => {

//     fs.readFile("products.json", function(err, data){
//         if(err) {
//             console.log(err);
//         }

//         const products = JSON.parse(data)

//         let newProduct = {"title": "iPhone 11", "description": "It's a phone.","id": "3587498", "price": "15000 kr"};

//         products.push(newProduct);

//         fs.writeFile("products.json", JSON.stringify(products), function(err){
//             if(err) {
//                 console.log(err);
//             }
//         });
//         res.send(products)
//         return;
//     });
// })

// let newProduct =
// {
//     title: "iPhone 11", 
//     description: "It's a phone.",
//     id: "3587498",
//     price: "15000 kr"
// }

// //Jannes Video

// fetch('http://localhost:1337/api/products/newproduct', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application.json'
//     },
//     body: JSON.stringify(newProduct)
// })
// .then(res => res.json())
// .then(res => console.log(res));

// //Fredriks video

// const postData = async () => {
//     const response = await fetch('/products.json', {  //ska det vara json fil här?
//         method: "POST",
//         headers: {
//             'Content-Type': 'application.json'
//         },
//         body: JSON.stringify(newProduct)
//     });

//     const data = await response.json();
//     console.log(data);
// }


// app.put //???

// app.delete //???

app.listen(port, () => console.log(`Servern är igång på http://localhost:${port}`));
