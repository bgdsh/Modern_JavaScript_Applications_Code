var app = require("express")();
var seneca = require('seneca')();
seneca.use("./account.js", { message: "Plugin Added" });
app.use(seneca.export("web"));
app.get("/account/register", function (httpRequest, httpResponse, next) {
    httpRequest.seneca.act({
        role: "accountManagement",
        cmd: "register",
        username: httpRequest.query.username,
        password: httpRequest.query.password
    }, function (error, response) {
        if (error) return httpResponse.send(error);
        if (response.value == true) {
            httpResponse.send("Account has been created");
        } else {
            httpResponse.send("Seems like an account with same username already exists.");
        }
    });
});
app.get("/account/login", function (httpRequest, httpResponse, next) {
    httpRequest.seneca.act({
        role: "accountManagement", cmd: "login",
        username: httpRequest.query.username, password: httpRequest.query.
            password
    }, function (error, response) {
        if (error) return httpResponse.send(error);
        if (response.value == true) {
            httpResponse.send("Logged in!!!");
        }
        else {
            httpResponse.send("Please check username and password");
        }
    });
});
app.listen(3000);

// create actions
// seneca.add({ role: "accountManagement", cmd: "login" }, function (args, respond) {

// });
// seneca.add({ role: "accountManagement", cmd: "register" }, function (args, respond) {

// });

// call the actions by code
// seneca.act({ role: "accountManagement", cmd: "register", username: "narayan", password: "mypassword" },
//     function (error, response) {

//     });
// seneca.act({ role: "accountManagement", cmd: "login", username: "narayan", password: "mypassword" },
//     function (error, response) {

//     });


//seneca.listen({ port: "9090", pin: { role: "accountManagement" } });
// seneca.client({ port: "9090", pin: { role: "accountManagement" } });

// call the actions by link:
// http://localhost:9090/act?role=accountManagement&cmd=login&usernam%20e=narayan&password=mypassword