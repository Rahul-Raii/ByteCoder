const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const homeRouter= require('./routes/homeRoutes');
const compiler = require("compilex");
const options = { stats: true };
const app= express();
const port= 4000;
compiler.init(options);

app.set('view engine', 'ejs');

app.use(express.static('public'));

// body parser 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//codeMirror
app.use("/codemirror-5.65.9", express.static("C:/Users/RAHUL RAI/Desktop/Projects/ByteCoder/codemirror-5.65.18"))
//app.get("/codeMirror", function (req, res) {
//    compiler.flush(function () {
//        console.log("deleted")
//    })
//    res.sendFile("codeMirror")
//})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; 
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; 
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            console.log('python')
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})

app.use('/', homeRouter)

app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})



