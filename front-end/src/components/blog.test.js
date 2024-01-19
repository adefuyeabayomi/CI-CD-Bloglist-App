import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

test('Testing to make sure the Blog component gets rendered',async () => {
    const mockHandler = jest.fn()
    let blog = 
    {
      "title": "Olekzander Zinchenko",
      "author": "Michael Chan",
      "url": "https://reactpatterns.com/",
      "likes": 24,
      "user": {
        "id": "64eb32e74f4c38ad077e01b1"
      },
      "__v": 0,
      "id" : "64eb38aa72fb22fdb4eb81d6"
    };
    const removePost = (id) => {
        console.log("post removed ", id)
    }
    let user = userEvent.setup();
    const { container } = render(<Blog blog={blog} removePost={removePost}/>)
    //renders the blog's title and author, but does not render its URL or number of likes by default.
    //Add CSS classes to the component to help the testing as necessary
    const author = container.querySelector(".author");
    const title = container.querySelector(".title");
    const element = screen.findByText('Olekzander',{exact : false})
    const showButton = container.querySelector(".showButton");
    await user.click(showButton);
    console.log("mock calls",mockHandler.mock);
    expect(mockHandler).toHaveBeenCalledTimes(1)
    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes")
    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(url).not.toBeFalsy();
    expect(likes).not.toBeFalsy();
    expect(element).toBeDefined();
  })