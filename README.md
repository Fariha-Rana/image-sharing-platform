# website url = "https://image-sharing-platform-19xf.vercel.app"

## Image Sharing Platform

This project is an image sharing platform built using Next.js, Appwrite, and Chakra UI.

## Project Structure

`src/appwrite/config.js`: Contains the configuration for the Appwrite client, database, and account.

- `src/appwrite/postsDatabase.js`: Contains logic for interacting with the database and user authentication.

- `src/appwrite/chatService.js`: Contains logic for interacting with user authentication.

- [src/components]: Contains reusable components.
- [src/context] Contains context api logic.

## Environment Variables

check out env.example file to configure environment variables.

## Installation

1. Clone the repository.
2. Install the dependencies using [pnpm install]
3. Configure the Appwrite backend and obtain the necessary API keys as shown in the `.env.example` file.
4. Start the development server by running [pnpm run dev].
