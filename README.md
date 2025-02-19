# Quiz App

A fully interactive quiz application built with Next.js, ShadCN UI, Tailwind CSS, and TypeScript. The app supports multiple-choice and integer-based questions, tracks quiz history using IndexedDB, and provides a detailed scoreboard.

## 🚀 Features

- **Multiple Choice & Integer-Based Questions**
- **Timer-Based Quiz** (30 seconds per question)
- **Scoreboard & Attempt History**
- **Quiz History Saved in IndexedDB**
- **Clean & Responsive UI**
- **Retake Quiz Option**

## 🛠️ Installation & Running Locally

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

### Install Dependencies
```sh
npm install
# or
yarn install
```

### Start the Development Server
```sh
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:3000`

## 🌍 Deployed App
You can access the live version of the app here:
👉 [Live Demo](https://your-deployed-link.vercel.app)

## 📂 Project Structure
```
/quiz-app
├── /src/components
│   ├── ui/ (Reusable UI Components)
├── /src/app/
│   ├── /page.tsx (Main Quiz Page)
│   ├── /history/page.tsx (Quiz History Page)
├── /src/utils/
│   ├── indexedDB.ts/ (IndexedDB Storage Logic)
├── /src/data.json (Quiz Questions Data)
├── /public
└── README.md
```

## 📝 Contributing
Feel free to contribute! Fork the repo, create a new branch, and submit a PR. 🚀

## 📄 License
MIT License © 2025 Vaibhav Pant

