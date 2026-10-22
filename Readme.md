# 🎓 StudyPath AI — Smart Study Abroad Planner

Turn your academic profile, budget, and career goals into a personalized study-abroad plan.

AI-powered country recommendations · Scholarship suggestions · Expense estimation · Admission planning · Personalized guidance

**React · Node.js · Express · MongoDB · Google AI · Vercel · Render**

[Live Demo](https://study-path-seven.vercel.app) · [Report a Bug](https://github.com/kunalNK7387) · [Request a Feature](https://github.com/kunalNK7387)

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [How It Works](#️-how-it-works)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 📌 Overview

Choosing the right country for higher education can be challenging. Students need to compare tuition fees, living expenses, scholarship opportunities, admission requirements, and career prospects before making a decision.

StudyPath AI aims to simplify this process by providing personalized study-abroad guidance based on a student's academic background, financial budget, preferred field of study, and career goals.

The application uses AI to suggest suitable study destinations, estimate yearly expenses, identify potentially relevant scholarships, and help students plan their admission journey.

Whether a student is exploring international universities for the first time or comparing different destinations, StudyPath AI provides a starting point for making more informed decisions.

## 🚀 Features

| Feature                    | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| 🧠 AI-Powered Guidance     | Generates personalized study-abroad suggestions based on a student's profile.      |
| 🌍 Country Recommendations | Suggests potential study destinations based on academic interests and preferences. |
| 🎓 Scholarship Suggestions | Helps students discover scholarship opportunities that may match their profiles.   |
| 💰 Expense Estimation      | Provides estimated tuition fees and living costs to support financial planning.    |
| 🗓️ Admission Planning      | Helps students understand admission timelines and preparation steps.               |
| 👤 Student Profile         | Collects profile information to personalize recommendations.                       |
| 🔐 Authentication          | Provides registration, login, and logout functionality.                            |
| ⭐ Shortlisting            | Helps students keep track of preferred study destinations, if enabled.             |
| 🌓 Theme Switching         | Supports light and dark themes.                                                    |
| 📱 Responsive UI           | Provides a student-friendly interface for different screen sizes.                  |

> **Important:** AI-generated recommendations and cost estimates are informational. Scholarship eligibility, tuition fees, visa requirements, and deadlines should be verified through official university and government websites.

## 🖼️ Screenshots

Add screenshots of your actual application to a `docs/screenshots/` folder and update the paths below.

| Home Page                      | Student Assessment                         |
| ------------------------------ | ------------------------------------------ |
| ![Home Page](/Public/Home.png) | ![Student Assessment](/Public/Student.png) |

| Country Recommendations                        | Scholarship Suggestions                  |
| ---------------------------------------------- | ---------------------------------------- |
| ![Recommendations](/Public/Recommendation.png) | ![Scholarships](/Public/Scholership.png) |

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5 and CSS
- Tailwind CSS
- Vite
- React Router
- Lucide React

### Backend

- Node.js
- Express.js
- REST API
- Authentication middleware

### Database

- MongoDB
- Mongoose, if used in the current implementation

### AI Integration

- Google AI API
- AI-generated country and study-abroad recommendations
- Profile-based recommendation generation

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB or MongoDB Atlas

## ⚙️ How It Works

1. **Create an account:** Register or log in to access the application's features.
2. **Complete your profile:** Enter academic details, preferred study field, budget, and career goals.
3. **Generate recommendations:** Submit your profile to receive AI-powered study-abroad suggestions.
4. **Explore countries:** Review the recommended destinations and compare estimated expenses.
5. **Explore scholarships:** Check scholarship suggestions and investigate their eligibility criteria.
6. **Plan admission:** Review suggested preparation steps and admission timelines.
7. **Make an informed decision:** Research official university requirements before applying.

## 🏗️ Architecture

StudyPath AI follows a client-server architecture in which the React frontend communicates with the Express backend through HTTP requests.

```text
┌──────────────────────┐
│     React Frontend   │
│   Vite + Tailwind    │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│    Express REST API  │
│   Authentication    │
│   AI Recommendations│
└──────┬────────┬──────┘
       │        │
       ▼        ▼
┌────────────┐ ┌─────────────────┐
│  MongoDB   │ │   Google AI API │
│ User Data  │ │ Recommendations │
└────────────┘ └─────────────────┘
```

The exact data flow depends on the implemented routes, authentication method, and database operations.

## 📁 Project Structure

The following structure is illustrative. Update it to match your actual repository.

```text
StudyPath/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── docs/
│   └── screenshots/
│
├── .gitignore
└── README.md
```

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) and npm
- [Git](https://git-scm.com/)
- MongoDB or a MongoDB Atlas database
- Google AI API key, if required by your backend

### 1. Clone the Repository

```bash
git clone https://github.com/kunalNK7387/StudyPath.git
cd StudyPath
```

Replace the repository URL if your project uses a different GitHub repository.

### 2. Set Up the Backend

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and configure the environment variables required by your application.

Start the backend:

```bash
npm run dev
```

If your `package.json` does not contain a development script, use the appropriate script defined in that file.

### 3. Set Up the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### 4. Verify the Backend

Visit the deployed backend health endpoint:

[https://studypath-1agu.onrender.com/](https://studypath-1agu.onrender.com/)

The root endpoint should return the configured backend status message.

## 🔑 Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GOOGLE_API_KEY=your_google_ai_api_key
```

Use the exact variable names expected by your code. For example, the AI service may expect `GOOGLE_GENAI_API_KEY` rather than `GOOGLE_API_KEY`.

| Variable          | Required                    | Description                                    |
| ----------------- | --------------------------- | ---------------------------------------------- |
| `PORT`            | No                          | Port on which the Express server listens.      |
| `MONGO_URI`       | Yes, if using MongoDB       | MongoDB connection string.                     |
| `JWT_SECRET`      | If using JWT authentication | Secret used to sign and verify JWTs.           |
| Google AI API key | If using Google AI          | API key required by the configured AI service. |

**Security reminder:** Never commit real API keys, database credentials, or JWT secrets to GitHub. Add `.env` to `.gitignore`.

## 📡 API Reference

The following endpoints are based on the route paths shared during development. Confirm the implementation of each controller before treating this table as a complete API specification.

### Authentication

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/auth/register` | Register a new user.                     |
| POST   | `/api/auth/login`    | Authenticate a user.                     |
| POST   | `/api/auth/logout`   | Log out a user.                          |
| GET    | `/api/auth/me`       | Retrieve the current authenticated user. |

### AI Recommendations

| Method | Endpoint                  | Description                                         |
| ------ | ------------------------- | --------------------------------------------------- |
| POST   | `/api/ai/recommendations` | Generate personalized study-abroad recommendations. |

The AI recommendations route currently uses authentication middleware, so a valid authenticated session or token may be required.

### Backend Health Check

| Method | Endpoint | Description                           |
| ------ | -------- | ------------------------------------- |
| GET    | `/`      | Check whether the backend is running. |

Additional endpoints for scholarships, profile management, and shortlisting should be documented once their actual routes are confirmed.

## 🔐 Security

StudyPath AI should follow these security practices:

- Keep API keys and database credentials in environment variables.
- Protect private API routes using authentication middleware.
- Validate incoming profile data on the backend.
- Restrict CORS to trusted frontend origins.
- Use HTTPS in production.
- Configure authentication cookies securely if cookie-based authentication is used.
- Avoid exposing internal server errors or secrets to users.
- Verify scholarship and university information before presenting it as authoritative.

### Production Checklist

- [ ] Configure environment variables on the hosting platforms.
- [ ] Confirm registration and login create valid backend sessions.
- [ ] Verify protected routes reject unauthenticated requests.
- [ ] Configure production CORS origins.
- [ ] Test the frontend-to-backend API connection.
- [ ] Confirm AI recommendations work on the deployed application.
- [ ] Remove test credentials and development-only shortcuts.

## 🌐 Deployment

| Component | Platform                     |
| --------- | ---------------------------- |
| Frontend  | Vercel                       |
| Backend   | Render                       |
| Database  | MongoDB Atlas, if configured |

### Deployment Steps

1. Push the frontend and backend code to GitHub.
2. Deploy the frontend to Vercel.
3. Deploy the backend to Render.
4. Configure backend environment variables in Render.
5. Configure the frontend API base URL to point to the deployed backend.
6. Update the backend CORS configuration to allow the production frontend domain.
7. Test login, logout, and AI recommendations on the live application.

### Live Application

- **Frontend:** [StudyPath AI](https://study-path-seven.vercel.app)
- **Backend:** [StudyPath AI API](https://studypath-1agu.onrender.com)

## 🔮 Roadmap

Potential future improvements include:

- University-specific recommendations and comparisons.
- Verified scholarship information and eligibility filters.
- More detailed tuition and living-cost comparisons.
- Downloadable personalized study-abroad reports.
- Admission deadline reminders.
- University application tracking.
- Improved profile management and recommendation history.
- Automated testing and enhanced API error handling.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request.

## 📄 License

This project is currently intended for educational and portfolio purposes.

If you want to distribute the project under an open-source license, add a `LICENSE` file and update this section accordingly. The repository's actual license determines the permitted use and redistribution.

## 👨‍💻 Author

**Kunal Khairnar**

- GitHub: [@kunalNK7387](https://github.com/kunalNK7387)
- LinkedIn: [Kunal Khairnar](https://www.linkedin.com/)

---

⭐ If you find StudyPath AI useful, consider giving the repository a star!

**Built with ❤️ to help students plan their study-abroad journey.**
