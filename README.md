# 🩸 Blood Donation Management System (MERN)

A comprehensive and user-friendly platform designed to connect blood donors with recipients. This application facilitates blood donation activities, donor management, and organizational funding with role-based access control.

## 🌐 Live Site
**Live URL:** [(https://blood-donation-11.web.app/)]

---

## 📖 Table of Contents
* [Objective](#-objective)
* [Key Features](#-key-features)
* [User Roles & Permissions](#-user-roles--permissions)
* [Tech Stack](#-tech-stack)
* [Packages Used](#-packages-used)
* [Installation & Setup](#-installation--setup)
* [Credentials](#-credentials)

---

## 🎯 Objective
The Blood Donation Application aims to create a seamless experience for finding donors during emergencies. It ensures efficient donor management, secure donation requests, and a transparent funding system.

---

## 🚀 Key Features

- **Dynamic Search:** Public search page to find donors by blood group, district, and upazila.
- **Role-Based Dashboards:** Specific layouts and features for **Donors**, **Volunteers**, and **Admins**.
- **Donation Management:** Create, update, and track blood donation requests (Pending, Inprogress, Done, Canceled).
- **Secure Authentication:** Firebase-powered login/registration with JWT (JSON Web Token) for private API protection.
- **Funding & Payments:** Integrated **Stripe** payment gateway for users to contribute funds.
- **Data Visualization:** Admin and Volunteer dashboards feature charts (Recharts) for statistical data.
- **PDF Generation:** Search results and reports can be downloaded as PDF.
- **Profile Management:** Users can update their personal information including blood group and location.

---

## 👥 User Roles & Permissions

- **Donor 🩸:** Register, search donors, create donation requests, and manage personal requests.
- **Volunteer 🤝:** View all donation requests, update donation statuses, and access dashboard statistics.
- **Admin 🌐:** Full control over users (Block/Unblock), role management (make Volunteer/Admin), and global donation request oversight.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, DaisyUI.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Authentication:** Firebase Auth & JWT.

---

## 📦 Packages Used

### **Client-Side Dependencies:**
* **Navigation:** `react-router`
* **Form Handling:** `react-hook-form`, `react-datepicker`
* **Data Fetching:** `@tanstack/react-query`, `axios`
* **Payment:** `@stripe/react-stripe-js`, `@stripe/stripe-js`
* **State Management:** `react-is`
* **Icons & UI:** `lucide-react`, `react-icons`, `sweetalert2`, `daisyui`
* **Charts & PDF:** `recharts`, `jspdf`, `html2pdf.js`, `html2canvas`
* **Animations:** `lottie-react`, `@dotlottie/react-player`

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
**Live Website URL** `https://blood-donation-11.web.app`

**GitHub Repository Link** 

**Frontend source code** `https://github.com/sheponhossain/Blood-Donation-Client.git`
**Backend source code**`https://github.com/sheponhossain/Blood-Donation-Server.git`

**Demo Credentials**

**User:** `Donor`
**Email:**`donor@gmail.com`
**Password:** `123456`

**Admin:** `Admin`
**Email:** `shepon@gmail.com`
**Password:** `123456`