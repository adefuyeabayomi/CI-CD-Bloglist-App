const supertest = require("supertest")
let app = require("../app");
const request = supertest(app);

const generateRandomString = (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  let token;
  let password;
  let user;
  beforeEach(async ()=>{
        // user creates a new account. 
    // make a post request to "api/users"
    password = generateRandomString(10);
    user = {username : "leklroyufig saufyne", password};
    let createUser = await request.post("/api/users").send(user).expect(201)
    // makes a get request to the login route to generate a session token. The correct username and password are passed to the query.
    let login = await request.post(`/api/login`).send(user).expect(200);
    // retrieve the token
    token = login.body.token;
    console.log("tokenuiiiiiiiuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu",token);
  })

describe("TOKEN AUTHENTICATION FOR THE CREATION OF A NEW BLOG",()=>{

    // create a new blog object
    let newBlog = {
        "title": "Lorem ipsum dolor sit amet consecteur. Strovey katarina.",
        "author": "Olivier Giroud",
        "url": "https://reactpatterns.com/",
        "likes" : 7
    }

    test("Should succeed when a good blog object and valid token is sent", async ()=>{
        // make a [POST] request to "/api/blogs".
        let createBlog = await request.post("/api/blogs").set("Authorization",token).send(newBlog).expect(201);
        expect(createBlog.body).toHaveProperty("id");
    })
/*
    test("Should fail when a timed out token is sent", async () =>{
        setTimeout(async ()=>{
        let createBlog = await request.post("/api/blogs").send({blog : newBlog, token }).expect(401);
        expect(createBlog.body).toEqual({error : "Token Expired"})
        },4000)
    })

    test("should fail with a wrong token", async ()=>{
        let createBlog = await request.post("/api/blogs").send({blog : newBlog,token : token +'687' }).expect(401);
        expect(createBlog.body).toEqual({error: "Unauthorized"})
    })
*/
})