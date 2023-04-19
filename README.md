# The Thought Police [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The Thought Police is a back end for a suggested social network, based on a MongoDB no-SQL database. I have wanted to work with MongoDB for a while, and try something other than SQL relational databases. I have other projects of mine that could benefit from the strengths of a document-based database, and this was an excellent opportunity to get my feet wet!

## What's with the title?

There's nothing nefarious about it: the project called for users' posts to be called "thoughts" and I thought it was vaguely dystopian to have, say, a `thoughtController` file and to talk of editing or deleting thoughts.

Don't worry, it's not stealing your thoughts. As far as you know. Have a look at the messages that get sent back from the server upon the completion (or failure) of various operations for a laugh.

## Table of Contents

- [Installation Instructions](#installation-instructions)
- [Usage Information](#usage-information)
- [Credits](#credits)
- [Software License](#software-license)
- [Contact the Developer](#contact-the-developer)

## Installation Instructions

The Thought Police runs on Node.js; if you do not already have Node and npm installed, do so. Then copy the source files into the directory of your choice, and run `npm i` to download the dependencies.

The Thought Police is just a set of APIs with no front end; you can utilize any program you wish to interact with it. You could use a browser and view the return in the JavaScript console, or you can use a tool like Insomnia to interact more directly and conveniently with the APIs.

## Usage Information

Once installed, you can launch the server by typing `npm start` while in the application's root directory. You can optionally seed the database with test data by turning off the server, and typing `npm run seed`.

You can utilize various API paths to interact with The Thought Police:

```
http://[your host and port here]/api/users/
```

The `users` path lets you view, create, delete and update users:

- `GET /users/` returns all users with their information, and arrays of thought and friend id's
- `POST /users/` creates a new user. You must include at least the username and email in the request body.
- `GET /users/[user id]` returns all information on one user, including the text of all their thoughts (the ones they typed in, we're not mind readers!) and full information on all their friends.
- `PUT /users/[user id]` edits the user. Include any fields to be edited along with their values in the request body.
- `DELETE /users/[user id]` deletes the user, including all their entered thoughts and their reactions to other users' thoughts.

```
http://[your host and port here]/api/thoughts
```

The `thoughts` path lets you view, create, delete and update thoughts; it also enables creation and deletion of reactions:

- `GET /thoughts/` returns all thoughts with their user authors and a list of reactions.
- `POST /thoughts/` creates a new thought. You must include at least the username of the author and thoguhtText content in the request body.
- `GET /thoughts/[thought id]` returns all information on the one indicated thought, including the full text of any reactions.
- `PUT /thoughts/[thought id]` edits the text of a thought. You must include the edited thoughtText in the request body.
- `DELETE /thoughts/[thought id]` deletes the given thought, along with all of its reactions
- `POST /thoughts/reactions/[thought id]` adds a reaction to the given thought. You must include the reacting username and reactionText in the request body.
- `DELETE /thoughts/reactions/[reaction id]` deletes the given reaction.

Note that some interactions are validated for required fields, and email addresses are validated for appropriate construction.

## Credits

The Thought Police was written by Lee Klusky, with the help and guidance (and boilerplate code) from the staff of the University of Minnesota Full Stack Coding Bootcamp. And as usual, this project wouldn't have been completed without the accumulated wisdom of coders around the Web, at places like [Stack Overflow](https://www.stackoverflow.com), the [Mozilla Developers Network](https://developers.mozilla.org) and [W3Schools](https://w3schools.com).

## Software License

©2023, Lee Klusky

This software is covered by a [MIT License](https://opensource.org/licenses/MIT).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Questions?

Contact me at <a href="mailto:lkbootcamp@yahoo.com">lkbootcamp@yahoo.com</a>, or visit my [GitHub profile](https://www.github.com/lkalliance).
