# Budget Tracker App

A full-stack personal finance tracker that lets users manage income and expenses, visualize monthly trends, and stay on budget. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

> [Live Demo][(https://budget-tracker-rust-mu.vercel.app/) ]
> Make sure your backend is deployed and configured with CORS for this link.

---

## Screenshots

![Dashboard Screenshot](https://github.com/user-attachments/assets/6b833614-079d-40a9-9b4d-5e67cf344085)

---

## Features

- User authentication (login and register)
- Add income and expense transactions
- Choose a custom date for each transaction
- Bar chart displaying income vs expense by month
- Transaction list with delete functionality
- Real-time dashboard summary (income, expense, and total)
- Responsive design for desktop and mobile

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Recharts
- React Toastify

**Backend**
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication

**Deployment**
- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/)

---

## Folder Structure
```
budget-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── .env
```
## Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/budget-tracker.git
cd budget-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Run the frontend:
```bash
npm run dev
```

---

## Future Improvements

- Pie chart showing category breakdown  
- Monthly budget cap with progress bar and warnings  
- Support for recurring transactions  
- Ability to edit or update transactions  
- Export transaction history to CSV  

---

## Author

Created by [Your Name]  
GitHub: [https://github.com/yourusername](https://github.com/gilalkmalik03)  
LinkedIn: [(https://linkedin.com/in/yourusername](https://www.linkedin.com/in/bilal-malik-0022b2251/))
