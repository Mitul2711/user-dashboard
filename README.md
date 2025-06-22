# Angular Developer Coding Test

## 📋 Overview

This project is a **simple Angular application** built to demonstrate core Angular concepts and latest features, including:
- Authentication using Signals (Angular 19)
- Route Guards
- Lazy-loaded modules
- Standalone components
- Custom directives
- Deferred loading
- Search & filtering
- Pagination using Angular Material

---

## 🚀 Features Implemented

### ✅ Authentication
- **Login** with mock credential validation using `json-server`
- **Logout** functionality
- **Authentication state** managed via Angular **Signals**
- **Login state persisted** in localStorage

### ✅ Dashboard
- **Fetches users** from: `https://jsonplaceholder.typicode.com/users`
- **Displays users** in a paginated table (5 per page)
- **Search functionality** filters across all user properties
- **Clicking a row** shows user details in a form
- **Deferred loading** applied to user detail section

### ✅ Routing & Guards
- **Dashboard module** is **lazy-loaded**
- **AuthGuard** protects routes from unauthenticated access

### ✅ Angular Features
- **Standalone Components** (LoginComponent, HeaderComponent)
- **Signals** for reactive state management
- **Custom Directive**: `HighlightDirective` changes row background on hover
- **Deferred Loading** for improved performance

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- `json-server` (`npm install -g json-server`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com//Mitul2711/user-dashboard.git
   cd user-dashboard
