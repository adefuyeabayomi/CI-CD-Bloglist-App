const dummy = (blogs) => {
    return 1;
  }
const totalLikes = (blogs) => {
    let reducer = (sum,addition) => {
        return sum + addition.likes;
    }
    if(Array.isArray(blogs)){
        let total = blogs.reduce(reducer,0);
        return total;
    }   
    else{
        throw new Error("blog must be of type 'array'");
        return;
    }
}
const favouriteBlog = (blogs) => {
    let reducer = (current,nextChecked) => {
        return current.likes > nextChecked.likes ? current : nextChecked
    }
    let fav = blogs.reduce(reducer,{});
    return fav;
}
const mostBlogs = (blogs) => {
    let authors = blogs.map(x=> {return {author: x.author, blogs : 0}})

    blogs.forEach(x=>{
        for(let authorsIndex = 0; authorsIndex < authors.length; authorsIndex++ ){
            if(authors[authorsIndex].author === x.author){
                authors[authorsIndex].blogs = authors[authorsIndex].blogs+1;
            }
        }
    })
    let reducer = (current,nextChecked) => {
        return current.blogs > nextChecked.blogs ? current : nextChecked
    }
    console.log(authors)
    let most = authors.reduce(reducer,{});
    return most;
}
const popularBloggers = (blogs) => {
    let authors = blogs.map(x=> {return {author: x.author, likes : 0}})
    blogs.forEach(x=>{
        for(let authorsIndex = 0; authorsIndex < authors.length; authorsIndex++ ){
            if(authors[authorsIndex].author === x.author){
                authors[authorsIndex].likes = authors[authorsIndex].likes+x.likes;
            }
        }
    })
    console.log("authors",authors)
    let reducer = (current,nextChecked) => {
        return current.likes > nextChecked.likes ? current : nextChecked
    }
    let popularBloggers = authors.reduce(reducer,{})
    return popularBloggers;
}
  
  module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs,popularBloggers
  }