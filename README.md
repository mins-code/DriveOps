# DriveOps: AI-Powered Automotive Predictive Maintenance Interface

[cite_start]**DriveOps** is the frontend application for an Agentic AI-based Predictive Maintenance and Proactive Service Scheduling System[cite: 5, 25]. [cite_start]Built for automotive OEMs, it provides a centralized dashboard to monitor vehicle telemetry, manage service pipelines, and interact with AI agents to reduce unplanned downtime[cite: 22, 41, 47].

## 🚀 Overview

[cite_start]This repository contains the role-based web interface designed to connect vehicles, service centers, and manufacturing teams in real-time[cite: 29, 47]. [cite_start]The UI facilitates the visualization of predictive failure detections and autonomous scheduling workflows[cite: 30, 42].

### Key Features
* [cite_start]**Dual-Portal Access:** Role-specific interfaces for OEM Executives (Admin) and Service Managers[cite: 39, 47].
* [cite_start]**Predictive Analytics:** Real-time visualization of fleet health, failure distribution, and demand forecasting[cite: 26, 41].
* [cite_start]**Voice Agent UI:** Integrated interface for monitoring the AI Voice Agent during customer scheduling calls[cite: 32, 50].
* [cite_start]**OEM Feedback Loop:** A dedicated view for Root Cause Analysis (RCA) and manufacturing quality insights[cite: 33, 43].

## 🛠️ Tech Stack

* **Framework:** React 19
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Charts:** Recharts
* **Language:** TypeScript

## 📦 Getting Started

### Prerequisites
* Node.js installed on your machine

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd DriveOps
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Set the `GEMINI_API_KEY` in `.env.local` to enable AI-driven features.

4.  **Run Locally:**
    ```bash
    npm run dev
    ```
    The application will typically run on `http://localhost:3000`.
