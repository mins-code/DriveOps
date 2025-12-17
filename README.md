# DriveOps: AI-Powered Automotive Predictive Maintenance Interface

**DriveOps** is a frontend application for an Agentic AI-based Predictive Maintenance and Proactive Service Scheduling System. Designed for automotive OEMs, this interface provides a centralized platform to monitor vehicle telemetry, manage service pipelines, and interact with AI agents to reduce unplanned downtime.

## 🚀 Overview

This repository contains the role-based web interface that connects vehicles, service centers, and manufacturing teams. The UI facilitates the visualization of predictive failure detections and autonomous scheduling workflows.

### Key Features
* **Dual-Portal Access:** Role-specific interfaces for OEM Executives (Admin) and Service Managers.
* **Predictive Analytics:** Real-time visualization of fleet health, failure distribution, and demand forecasting.
* **Voice Agent UI:** Integrated interface for monitoring the AI Voice Agent ("Kore") during customer scheduling calls.
* **OEM Feedback Loop:** A dedicated view for Root Cause Analysis (RCA) and manufacturing quality insights shared with engineering teams.

## 🛠️ Tech Stack

* **Framework:** React 19
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Charts:** Recharts
* **Language:** TypeScript

## 📦 Getting Started

### Prerequisites
* Node.js installed on your machine.

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
    Set the `GEMINI_API_KEY` in `.env.local` to enable AI-driven features:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run Locally:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

