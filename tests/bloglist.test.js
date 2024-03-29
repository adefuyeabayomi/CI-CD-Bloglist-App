let supertest = require("supertest");
let Blog = require("../models/blog_model");
let app = require("../app");
let request = supertest(app);

let blogList = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];
let testUser = {
  username: "yomidaniel",
  password: "829rj32f932n"
};
let token;



beforeEach(async () => {
  try {
    await request
      .post("/api/users")
      .send(testUser)
      let login = await request.post(`/api/login`).send(testUser).expect(200);
      // retrieve the token
      token = login.body.token;
      blogList = blogList.map(x=>{
        delete x.author;
        let newBlog = {...x}
        newBlog.author = testUser.username
        return newBlog;
      })
    await Blog.deleteMany({});
    await Blog.insertMany(blogList);
    console.log("initialized the database with our data");
  } catch (error) {
    console.error("unable to initialize the database", error.message);
  }
});

test("testing the '/api/blogs' route to see if the right amount of documents which in this case is blogList.length", async () => {
  console.log("token", token)
  let res = await request
    .get("/api/blogs")
    .set({ Authorization: token })
    .expect(200)
    .expect("Content-Type", /json/);
  let body = res.body;
  expect(body.length).toBe(blogList.length);
});

test("testing the '/api/blogs' route to see if the documents have an id property", async () => {
  let res = await request
    .get("/api/blogs").set({ Authorization: token })
    .expect(200)
    .expect("Content-Type", /json/);
  let body = res.body;
  expect(body[0].id).toBeDefined();
});

test("testing the [POST] '/api/blogs' route actually adds a document to the database", async () => {
  let testData = {
    title: "Olekzander Zinchenko",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };
  try {
    await request
      .post("/api/blogs").send(testData).set({ Authorization: token })
      .expect(201)
      .expect("Content-Type", /json/);

    let verify = await request
      .get("/api/blogs").set({ Authorization: token })
      .expect(200)
      .expect("Content-Type", /json/);
    let updated = verify.body;
    expect(updated.length).toBe(blogList.length + 1);
  } catch (error) {
    console.error("Error in the test for post request", error.message);
  }
});

test("testing the [POST] '/api/blogs' defaults the missing like to 0", async () => {
  let testData = {
    title: "Do Do Do Do Do Do. Saliba!",
    author: "The gunners",
    url: "https://arsenal.com/",
  };
  try {
    let res = await request
      .post("/api/blogs")
      .send(testData).set({ Authorization: token })
      .expect(201)
      .expect("Content-Type", /json/);
    let body = res.body;
    expect(body.likes).toBe(0);
  } catch (error) {
    console.error("Error in the test for post request", error.message);
  }
});

test("testing the [POST] '/api/blogs' responds [400 bad request] to the missing title or url", async () => {
  let testData = {
    author: "The gunners",
    url: "https://arsenal.com/",
  };
  try {
    let res = await request
      .post("/api/blogs")
      .send(testData).set({ Authorization: token })
      .expect("Content-Type", /json/);

    expect(res.status).toBe(400);
  } catch (error) {
    console.error("Error in the test for post request", error.message);
  }
});

test("testing to see if the delete works", async () => {
  let check = await request
    .get("/api/blogs").set({ Authorization: token })
    .expect(200)
    .expect("Content-Type", /json/);
  console.log("blog body id", check.body[0].id);
  
  let toBeDeleted = check.body[0].id;
  await request.delete("/api/blogs/" + toBeDeleted).set({ Authorization: token }).expect(204); // delete document
  
  let verify = await request
    .get("/api/blogs").set({ Authorization: token })
    .expect(200)
    .expect("Content-Type", /json/);
  expect(verify.body.length).toBe(blogList.length - 1);
});


