# Anonymous Messaging App

WhisperSend - An anonymous messaging app built with [Next.js](https://nextjs.org), featuring AI-generated messages, email verification, and a modern UI.

## Features

- **Anonymous Messaging**: Send and receive messages anonymously.
- **AI-Generated Messages**: Generate topic-based messages with [Cohere AI](https://cohere.ai).
- **Email Verification**: Secure account creation and login using [NextAuth.js](https://next-auth.js.org) and [Nodemailer](https://nodemailer.com).
- **Modern UI**: Sleek and responsive UI powered by [shadcn](https://shadcn.dev).

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org) (v16 or later)
- A package manager: `npm`, `yarn`, or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anonymous-messaging-app.git
   cd anonymous-messaging-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure environment variables:  
   Create a `.env` file in the root of the project and add the following:
   ```env
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   COHERE_API_KEY=your_cohere_api_key
   EMAIL_SERVER=smtp.your-email-provider.com
   EMAIL_FROM=your-email@example.com
   ```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to explore the app.

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **AI Integration**: [Cohere AI](https://cohere.ai)
- **Email Service**: [Nodemailer](https://nodemailer.com)
- **UI Library**: [shadcn](https://shadcn.dev)

---

## Learn More

Check out the official documentation of the tools and libraries used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Cohere AI Documentation](https://docs.cohere.ai/)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [shadcn Documentation](https://shadcn.dev/docs)

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is through [Vercel](https://vercel.com).  
Follow the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) for detailed steps.

---

Visit the live website hosted on Vercel: [WhisperSend](https://whispersend-chandrashu.vercel.app/).

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/yourusername/anonymous-messaging-app).

