# Doctor Booking System

A full-stack healthcare application built with the MERN stack (MongoDB, Express, React, Node.js) and Next.js, designed to streamline the process of booking medical appointments.

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Role-Based Access Control**:
  - **Admin**: Manage user and doctor accounts, approve or reject doctor applications.
  - **Doctor**: Manage profiles, set availability, and handle appointment requests.
  - **Patient**: Search for approved doctors, check availability, and book appointments.
- **Real-time Notifications**: In-app notifications for appointment status changes and new requests.
- **Responsive Design**: Clean and professional UI built with Ant Design and Bootstrap.
- **State Management**: Robust client-side state handling with Redux Toolkit and Persistence.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [Ant Design](https://ant.design/), [Bootstrap](https://getbootstrap.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons**: [Remix Icon](https://remixicon.com/)
- **Styling**: CSS, CSS Modules

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: Bcrypt

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd doctor-booking-system
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables:
   ```env
   PORT=8000
   DATABASE=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 License

This project is licensed under the ISC License.
