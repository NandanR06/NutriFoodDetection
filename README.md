# 🍽️ NutriAI – Smart Food Detection and Nutrition Tracking App

NutriAI is a MERN stack application that allows users to detect food items using a camera, view nutritional information powered by TensorFlow and custom data, and keep track of their daily intake. It includes user authentication (JWT), image upload via Cloudinary, and a modern UI using Tailwind CSS and Framer Motion.

---



## 📷 Preview Screens

### 🔐 Login Page  
![Login](https://i.imgur.com/your-login-image.png)

### 📝 Register Page  
![Register](https://i.imgur.com/your-register-image.png)

### 📊 Dashboard (Logs + Camera Access)  
![Dashboard](https://i.imgur.com/your-dashboard-image.png)

### 🍔 Food Details Page  
![Food Details](https://i.imgur.com/your-foodinfo-image.png)

---

## 🧠 Features

- 📷 **Camera Integration** for live food capture  
- 🍔 **Food Detection** using TensorFlow (YOLO or custom model)  
- 📦 **Cloudinary Upload** of captured images  
- 🧾 **Nutritional Breakdown** based on identified food  
- 🗂️ **Daily Nutrition Logs** stored in MongoDB  
- 🔐 **User Authentication** with JWT (Login/Register)  
- 🌐 **Modern Responsive UI** with Tailwind CSS + Framer Motion  
- 🧠 **GPT-powered tips** (optional feature)

---

## 🛠️ Tech Stack

**Frontend**:  
- React.js  
- Tailwind CSS  
- React Router  
- Framer Motion  

**Backend**:  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Cloudinary (for image storage)

**ML Integration**:  
- TensorFlow.js or Flask API for ML inference  

---

## 📁 Project Structure

NutriAI/
├── Frontend/                       # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images, icons, and static assets
│   │   ├── components/          # Reusable components (e.g., Camera, Navbar)
│   │   │   └── Camera.jsx
│   │   ├── pages/               # Main pages (e.g., Home, FoodInfo)
│   │   │   └── FoodInfo.jsx
│   │   ├── services/            # Axios instances, API helpers
│   │   ├── store/               # Zustand or Redux store (e.g., foodstore.js)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
│
├── Backend/                      # Node.js + Express backend
│   ├── controllers/             # Logic for routes
│   │   ├── foodController.js
│   │   └── uploadController.js
│   ├── models/                  # Mongoose models
│   │   └── Food.js
│   ├── routes/                  # Express routes
│   │   ├── foodRoutes.js
│   │   └── uploadRoutes.js
│   ├── utils/                   # Utility functions (e.g., cloudinary.js)
│   ├── config/                  # DB and API config
│   │   └── db.js
│   ├── middleware/              # Middleware (e.g., errorHandler)
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package-lock.json


