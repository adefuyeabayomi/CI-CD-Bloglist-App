describe('Blog App', function() {

  let loginDetails = {
    username : "Adefuye Abayomi",
    password : "12345678"
  }

  let secondUser = {
    username : "Robert Baratheon",
    password : "12345678"
  }

  let wrongLogin = {
    username : "Aimee Leeroy",
    password : "856845353555"
  }

  beforeEach(function() {
      // resets the database
      cy.request('POST', 'http://localhost:3003/api/testing/reset').then(response=> {
        console.log("formatted database", response)
      })

      // creates new users
      cy.request("POST","http://localhost:3003/api/users",loginDetails)
      cy.request("POST","http://localhost:3003/api/users",secondUser)

      // opens the application in the browsers
      cy.visit('http://localhost:5173')

  })
    
    // verifies that the login form is displayed on the screen by default
    it('front page can be opened', function() {
      cy.get("#loginForm");
    })

      // test for logging in with the right credentials and the wrong credentials.
    describe("Login Functionality", function () {
      it("login with correct credentials should succeed and user can create new blog", function () {
        cy.get("#loginUsername").type(loginDetails.username)
        cy.get("#loginPassword").type(loginDetails.password)
        cy.get("#loginButton").click();
        // this means the login was successful the below is the button that controls the blog post form.
        cy.contains("create new blog");
      })
      it("login with wrong credentials should fail",function () {
        cy.get("#loginUsername").type(wrongLogin.username)
        cy.get("#loginPassword").type(wrongLogin.password)
        try {
          cy.get("#loginButton").click();
        }
        catch(error){
          console.log("An error occured", error)
        }
        // this means that the login was unsuccessful
        cy.contains("Sign Up For New Users");
      })
    })

    describe("Blog Posts Functionalities", function (){
      beforeEach(function (){
        cy.get("#loginUsername").type(loginDetails.username)
        cy.get("#loginPassword").type(loginDetails.password)
        cy.get("#loginButton").click();
        // this means the login was successful the below is the button that controls the blog post form.
        cy.contains("create new blog").click();
        cy.get("#title").type("My awesome title")
        cy.get("#author").type("McDonalds")
        cy.get("#url").type("http://mcdonalds.com/mytitle")
        cy.get("#publishBlog").click()
      })
      it("Logged in user can create new blog post", function (){
        cy.contains("Author McDonalds")
      })
      it("Logged in user can like a blog post", function (){
        cy.contains("Author McDonalds").parent().find("button").click();
        cy.contains("Author McDonalds").parent().find("button").eq(1).click().then(x=>{
          cy.contains("Author McDonalds").parent().find("p").eq(2).contains(1)
        });
      })
      it("The user who created the blog can delete the blog post", function () {
        cy.contains("Author McDonalds").parent().find("button").click();
        cy.contains("Author McDonalds").parent().find("button").eq(2).click()
      })

      describe("Login another user to this current environment", function () {

        it("logs in another user", function (){
          cy.contains("Logout").click();
          cy.get("#loginUsername").type(secondUser.username)
          cy.get("#loginPassword").type(secondUser.password)
          cy.get("#loginButton").click();
          cy.contains("Author McDonalds").parent().find("button").click();
          // this test will fail because the delete button is the third on the list and since cypress does not find it, given it is a new user, the error will occur
          cy.contains("Author McDonalds").parent().find("button").eq(2)
        })

      })

    })
})