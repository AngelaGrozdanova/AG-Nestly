# AG-Nestly

AG-Nestly is a property rental application, similar to Airbnb, built with **Next.js**, **Prisma**, **MongoDB**, **NextAuth**, and **Cloudinary**.

---

## Features

- List and search properties
- Sign up and log in with Google and GitHub
- Upload property images via Cloudinary
- Secure session and password management using NextAuth
- Responsive design for mobile and desktop

---

## 🛠 Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Next.js API Routes, Prisma ORM
- Database: MongoDB
- Authentication: NextAuth.js
- File Uploads: Cloudinary

---

## Getting Started

### Clone the Repository

``bash
git clone https://github.com/AngelaGrozdanova/AG-Nestly.git
cd AG-Nestly

## Install Dependencies

`bash
npm install
- or
yarn install
- or
pnpm install

## Configure Environment Variables

-- Create a .env file in the root directory:

DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/airbnb?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your_nextauth_secret"
GITHUB_ID="your_github_id"
GITHUB_SECRET="your_github_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"

## Start the Development Server

npm run dev
- or
yarn dev
- or
pnpm dev

-- Open http://localhost:3000 in your browser.


