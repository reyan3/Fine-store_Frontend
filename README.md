# 🛍️ Fine-Store — MERN E-Commerce Platform

> **Live Demo:** [https://finestoreforu.netlify.app/](https://finestoreforu.netlify.app/)
> 
> ⚠️ **Notice:** If products don't load immediately, please wait **1–2 minutes** — Render's free tier spins down the backend after 15 minutes of inactivity.

---

## 📌 Overview

**Fine-Store** is a full-stack e-commerce web application built on the **MERN** stack. It features a sleek product browsing experience, secure authentication (including Google OAuth), an AI-powered chatbot, and transactional email support — all deployed across cloud platforms.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js — deployed on **Netlify** |
| **Backend** | Node.js + Express.js — deployed on **Render** |
| **Database** | **MongoDB Atlas** (cloud-hosted) |

---

## 🗂️ Project Structure

```
fine-store/
├── client/              # React frontend (Netlify)
│   ├── public/
│   │   └── _redirects   # Prevents Netlify 404 on refresh
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
└── server/              # Express backend (Render)
    ├── routes/
    ├── models/
    ├── middleware/
    └── index.js
```

---

## 📦 Backend Dependencies

| Package | Purpose |
|---|---|
| `express` | Core HTTP server & routing |
| `cors` | Cross-origin request handling |
| `mongoose` | MongoDB ODM for schema & queries |
| `dotenv` | Environment variable management |
| `bcrypt` | Password hashing & comparison |
| `jsonwebtoken` | JWT-based auth token generation |
| `google-auth-library` | Google OAuth token verification |
| `nodemailer` | Transactional emails (support, order confirm, password reset) |
| `@google/generative-ai` | **Gemini 3** API — powers the in-app AI chatbot |

### 🔧 Backend Features
- **Single/Whole Error Handler** — Centralized error middleware for consistent API error responses
- **Auth Verification Middleware** — Protects sensitive routes (e.g., deletions) from unauthorized access
- **Search with Filter/Categorization** — Backend-powered product search with category and attribute filtering

---

## 🎨 Frontend Dependencies

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing |
| `useNavigate`, `Link`, `useLocation` | Navigation & animation triggers |
| `useParams` | Dynamic route parameter access |
| `framer-motion` | Page & component animations |
| `lucide-react` | Icon library |
| `@react-oauth/google` | Google OAuth login button |
| `dicebear` API | Auto-generated user avatars |
| Toast Component | In-app notifications |
| `window.dispatchEvent()` | Custom cross-component event broadcasting |
| `_redirects` | Netlify SPA routing fix (prevents 404 on refresh) |
| Favicon | Custom tab icon for brand identity |

---

## 🔐 Authentication & Security

- **JWT Authentication** — Stateless session management with signed tokens
- **Google OAuth Login** — One-click sign-in via `@react-oauth/google` + `google-auth-library`
- **bcrypt Password Hashing** — Salted hashing before storing credentials
- **Auth Middleware** — Server-side route protection to block unauthorized mutations (e.g., product/user deletion)

---

## 📧 Email Notifications (Nodemailer)

Automated emails are sent for:
- 🛒 **Order Confirmation** — Sent immediately after a successful purchase
- 🔑 **Password Reset** — Secure reset link delivered to registered email
- 💬 **Support Requests** — Confirmation + forwarding on support form submission

---

## 🤖 AI Chatbot (Gemini 3)

An integrated conversational assistant powered by **Google's Gemini 3 API** helps users with:
- Product discovery & recommendations
- Order-related queries
- General store FAQs

---

## 🌐 Deployment

| Service | Role | URL |
|---|---|---|
| **Netlify** | Frontend hosting + CDN | [finestoreforu.netlify.app](https://finestoreforu.netlify.app/) |
| **Render** | Backend API server | Render free instance |
| **MongoDB Atlas** | Cloud database | Atlas shared cluster |

> **Note:** Render free tier hibernates after 15 min of inactivity. First request after sleep may take 1–2 minutes to respond.

---

## 🛣️ Future Improvements

- [ ] 💳 **Razorpay Integration** — UPI & card payments via Razorpay payment gateway
- [ ] ☁️ **AWS Deployment** — Migrate backend to EC2/ECS for always-on performance & scalability
- [ ] 🎯 **UX Optimization** — More refined UI, better mobile experience, accessibility improvements
- [ ] 📊 **Admin Dashboard** — Sales analytics, inventory management
- [ ] 🔔 **Push Notifications** — Order status updates via web push

---

## ⚙️ Environment Variables

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_nodemailer_email
EMAIL_PASS=your_nodemailer_password
```

---

## 🏃 Running Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/fine-store.git
cd fine-store

# Backend
cd server
npm install
npm start

# Frontend (new terminal)
cd client
npm install
npm run dev
```

---

## 📄 License

MIT © Fine-Store
