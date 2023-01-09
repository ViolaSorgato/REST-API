const express = require('express');
const app = express();
const fs = require('fs');
const port = 1337

app.use(express.json());

//app.get('/', (req,res) => res.send('Hello World!'))

// app.get('/', function(req,res,next) {
    
//     fs.readFile("products.json", function(err,data) {
//         if (err) {
//             console.log(err);
//         }
    
//     const products = JSON.parse(data)
//     console.log("it works");
//     res.send(products)
//     return;
//     })
    
// });


app.listen(port, () => console.log(`Servern är igång på http://localhost:${port}`));
