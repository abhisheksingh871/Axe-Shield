# 🛡️ AxeShield: Web Accessibility Testing Tool

**AxeShield** is an open-source accessibility testing platform that helps developers identify and fix accessibility issues in their websites. It uses **axe-core** and **Puppeteer** to scan web pages and provides detailed violation reports with direct links to solutions.  

Built with **Spring Boot**, **React**, and **Node.js**, AxeShield aims to simplify accessibility compliance (like WCAG) through automation and an intuitive interface.

---

## 🚀 Features

- 🔍 Automated accessibility scans using axe-core
- 🌐 Web page scanning via headless Chromium (Puppeteer)
- 📊 Real-time violation reporting with severity, location, and description
- 🔗 Helpful remediation links from Deque University
- 💡 Optional AI-based fix suggestions (coming soon!)
- 🧩 Modular architecture: Spring Boot (API), Node.js (scanner), React (UI)

---

## 🧱 Tech Stack

| Layer     | Technology              |
|----------|--------------------------|
| Frontend | React.js                 |
| Backend  | Spring Boot (Java)       |
| Scanner  | Node.js + Puppeteer + axe-core |
| Database | (Optional - to be added) |

---

## 📂 Project Structure

axeshield/
├── backend/ # Spring Boot API
├── frontend/ # React App
├── scanner/ # Node.js accessibility scanner
├── README.md
└── ...


---
### 1. Clone the repository

```bash
git clone https://github.com/your-username/axeshield.git
cd axeshield

