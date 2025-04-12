![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)

# 📦 QuickLocate

QuickLocate is a mobile application developed to assist in managing and locating products in warehouse environments. Built with practicality in mind, it enables workers to quickly check and update the physical location of items, improving organization and reducing time spent searching for misplaced inventory.

---

## 🚀 Motivation

As someone who works in a warehouse, I often faced the challenge of locating items without clear identification or tracking. This real-world experience inspired me to build **QuickLocate** — a tool designed to simplify warehouse item management and reduce errors.

This is also my first full-stack project. I developed it to showcase my skills and potential as a developer while learning about backend development, mobile interfaces, and database integration. Every line of code reflects my growth and dedication to improving my craft.

---

## 📷 Screenshots
<table>
  <tr>
    <td><img src="quick-located/assets/screenshots/login.jpg" alt="Login Screen" width="200"/></td>
    <td><img src="quick-located/assets/screenshots/register.jpg" alt="Register" width="200"/></td>
  </tr>
</table>
---

## 📱 Project Overview

QuickLocate is a warehouse support app that allows users to:

- Import warehouse data from Excel, provided by the company system.
- View a product list.
- Edit the physical location of items.
- Track changes and prevent duplicate assignments.

---

## ✅ Features

- 📂 **Import Data from Excel**  
  Warehouse data is imported directly from Excel files using the `xlsx` library. The data is parsed and stored in a **Neon (PostgreSQL)** cloud database.

- 🔍 **Search and Filters**  
  The app fetches data from the cloud and displays items based on user-defined filters, allowing fast item lookup.

- ✏️ **Location Editing**  
  Users can update an item's physical location. The app includes validation to prevent assigning multiple items to the same location and warns users of duplicates.

- 🧾 **Location Change History**  
  A simple display of previous item locations, helping identify recent moves and preventing misplacements.

---

## 🧰 Tech Stack

**Frontend (Mobile):**
- React Native
- JavaScript
- Expo

**Backend:**
- Node.js
- Fastify

**Database:**
- PostgreSQL (via Neon)

**Other Libraries/Tools:**
- `xlsx` (for Excel parsing)
- AsyncStorage (for local state)
- Expo Router

---

## 💡 Skills & Concepts Applied

- **Database Management**: Performing inserts, updates, subqueries, and transactions with PostgreSQL.
- **API Development**: Built and consumed REST APIs using Fastify and Node.js.
- **Fullstack Architecture**: Gained a clear understanding of how frontend and backend communicate.
- **Error Handling & Validation**: Implemented location validation and duplicate location warnings.

---

## 🤝 Contributing

Currently, QuickLocate is a solo learning project and not open to contributions — but feedback and suggestions are more than welcome!

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgments

Thanks to everyone who has supported my learning journey — especially the developer community and mentors who share their knowledge so generously.

---

Feel free to connect with me on [LinkedIn](https://linkedin.com/in/yourprofile)!
