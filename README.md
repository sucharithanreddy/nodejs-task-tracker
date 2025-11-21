# Task Tracker (Node.js + Express + PostgreSQL + Docker)

# A simple task-tracking application built using:

Node.js + Express (backend API)

PostgreSQL database

Docker + Docker Compose

Basic HTML frontend served from Express

The application allows you to create simple tasks and store them in a PostgreSQL database.

# Features

Add tasks via a web form

Tasks persist in a PostgreSQL database

Containers for Node and Postgres using Docker Compose

Auto database initialization using environment variables and tables created on first start

# Prerequisites

Before running the project, ensure you have installed:

Docker

Docker Compose

Git (optional but helpful)

# Setup & Run

Clone the project:

git clone <your-repo-url>
cd nodejs-task-tracker


Start containers:

docker compose up --build


Once running:

# Component	URL
Task Tracker UI	http://localhost:3001

API Base URL	http://localhost:3001/api/tasks

# Stop the App

To stop containers:

docker compose down


To stop and delete data volumes:

docker compose down -v
