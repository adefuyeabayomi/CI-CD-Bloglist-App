let supertest = require("supertest");
let User = require("../models/user_model");
let app = require("../app");
let request = supertest(app);

beforeEach(async () => {
    try{
        await User.deleteMany({})   
        console.log("initialized to Zero Data");
    }
    catch(error){
        console.error("unable to initialize the database",error.message)
    }
})
// implement test to add user to the database
describe("Scenario : addition of users to the user collection", ()=>{
    // add a valid user to the database. expect the result to be 200 success and return object to contain username, id and password
    test("adding a valid user to the database",async ()=>{
        let validUserObject = {
            username : "yomidaniel",
            password : "829rj32f932n"
        }
        let response = await request.post("/api/users").send(validUserObject).expect(201);
        expect(response.body).toHaveProperty("username")
        expect(response.body).toHaveProperty("password")
        expect(response.body).toHaveProperty("id")
    })

    // add an invalid password, expect a 400 bad request response from the server
    test("adding a user with invalid username should fail",async ()=>{
        let userObject = {
            username : "yo",
            password : "829rj32f932n"
        }
        let response = await request.post("/api/users").send(userObject).expect(400);
        expect(response.body).toEqual({error : "Username and password must be of length greater than 3 and 8 respectively"})
    })
    // add an invalid username, expect a 400 bad request response from the server
    test("adding a valid user with invalid password should fail",async ()=>{
        let userObject = {
            username : "yomidaniel",
            password : "829r"
        }
        let response = await request.post("/api/users").send(userObject).expect(400);
        expect(response.body).toEqual({error : "Username and password must be of length greater than 3 and 8 respectively"})
    })
})