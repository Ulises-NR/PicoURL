## About The Project
This is a URL shorter application built with Next.js, Auth.js and Redux. The project showcases how to implement user authentication.
Unauthenticated users can generate a shortened link that automatically expires after 5 minutes. Once expired, they can create a new link under the same conditions.
Authenticated users, on the other hand, have full control over their links—they can create, edit, delete shortened URLs without restrictions.

### Built With

* [Nextjs](https://nextjs.org/)
* [MongoDB](https://www.mongodb.com/es)
* [Authjs](https://authjs.dev/)
* [Redux](https://redux-toolkit.js.org/introduction/getting-started)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

2. Clone the repo
   ```sh
   git clone https://github.com/Ulises-Saucedo/PicoURL.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configure .env variables
   ```js
   AUTH_SECRET=
   URL=
   MONGODB_URI=
    ```
5. Start the MongoDB database (Install MongoDB if not installed before)
    ```
    mongod
    ```
6. Run the development server
    ```
    npm run dev  
    ```
