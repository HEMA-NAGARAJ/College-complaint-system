# 🏛️ CampusGrievance 360 — Smart College Complaint Redressal Portal

> **Official Client-Side Institutional Edition**  
> 100% Static & Standalone — Built with HTML5, Modern CSS (Tailwind + Cyber Mesh), and Vanilla JavaScript.  
> **Directly deployable to GitHub Pages with zero server setup or Python dependencies!**

---

## 🌟 Key Highlights & Features

1. **GitHub Pages Native (100% Zero-Backend Architecture)**:
   - Does not use server-side template tags (`{% ... %}`, `{{ ... }}`), making it render perfectly on GitHub Pages.
   - All complaint registrations, updates, ratings, and user sessions persist dynamically inside browser **`localStorage`**.

2. **Universal Login Role Switcher**:
   - **Student Login**: Any student can log in using `theirname.ppps@gmail.com` with the default password `college123`.
   - **Faculty / Staff Desk**: Administrative and departmental staff can log in using `staffname.ppps@gmail.com` with default password `staff123`.
   - Dynamic auto-account initialization on first login!

3. **Student Privacy Shield (Protection Against Staff Misuse)**:
   - Built-in **Change Password** security module allows students to immediately replace the college-issued default password (`college123`) with their own private secret password.
   - Prevents college staff from accessing student grievance dashboards without consent.

4. **100% Anonymous Reporting Mode**:
   - For sensitive concerns (e.g. Anti-Ragging, Cafeteria billing discrepancies), students can toggle anonymous mode to mask their name, registration number, and email.

5. **Live 4-Stage Stepper & Student Star Rating**:
   - Step-by-step audit visualization: `Lodged` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved`.
   - Interactive 1-5 Star Satisfaction rating system upon resolution.

6. **Staff Operations Desk & Real-Time Analytics**:
   - Live KPI metric cards (Total Tickets, In Progress, Pending Review, Resolved, Critical).
   - **Chart.js Visualizations**: Departmental Distribution Doughnut Chart & Status Lifecycle Bar Chart.
   - Interactive modal to assign technicians, append resolution notes, and update ticket lifecycle.
   - One-click print audit report generator (`window.print()`).

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Follow these simple steps to put this project live on the web:

### Step 1: Open Terminal / PowerShell in this folder
```bash
cd "C:\Users\backi\.gemini\antigravity\scratch\campus-grievance-portal"
```

### Step 2: Initialize Git and Commit
```bash
git init
git add .
git commit -m "Initial release of CampusGrievance 360 portal"
```

### Step 3: Link to Your GitHub Repository
1. Go to [github.com/new](https://github.com/new) and create a repository (e.g., `campus-grievance-portal` or `college-complaint-system`).
2. Run:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/campus-grievance-portal.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** ➔ **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**.
5. In 1 minute, your live site will be ready at:  
   `https://<your-username>.github.io/campus-grievance-portal/`

---

## 🔑 Default Institutional Credentials

| Role | Email ID Format | Default Password |
|---|---|---|
| **Student** | `<anyname>.ppps@gmail.com` *(e.g. `hema.ppps@gmail.com`)* | `college123` |
| **Staff / Faculty** | `<staffname>.ppps@gmail.com` *(e.g. `staff.ppps@gmail.com`)* | `staff123` |

---

## 🛠️ Project Structure
```text
campus-grievance-portal/
├── index.html       # Single Page Application structure & layout
├── styles.css       # Custom cyber-mesh background, glassmorphism & animations
├── app.js           # Client-side state machine, LocalStorage & Chart.js engine
└── README.md        # Documentation and deployment guide
```
