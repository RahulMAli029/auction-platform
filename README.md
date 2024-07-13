# Online Bidding Platform

## Project Overview

This project involves developing an online bidding platform where users can list items for auction and place bids in real time. The platform ensures a seamless user experience with real-time updates and secure transactions.

## Table of Contents
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Installation](#installation)

## Features

### User Roles and Authentication
- **User Authentication via OTP:**
  - Users can log in using their mobile number or email.
  - Upon entering their mobile number or email, users receive a predefined OTP (e.g., "123456") for authentication.
  - Users must enter the OTP to access the platform.
  - No traditional sign-up process; users authenticate via OTP each time.

### Item Management
- **Item Listing:**
  - Authenticated users can list/create items for auction.
  - Fields include title, description, starting bid, bid increment, auction start and end time, and item images.
- **Item Browsing:**
  - All users (authenticated and unauthenticated) can browse listed items.
  - Implemented search and filter functionalities (by category, price range, auction end time).

### Bidding Process
- **Placing Bids:**
  - Authenticated users can place bids on listed items.
  - Users receive notifications when they are outbid via email or on the platform.
- **Winning Bids:**
  - Automatically determine the winning bid when the auction ends.
  - Notify the winning bidder and the item lister via email.

### Technical Requirements
- **Backend:**
  - Django and Django REST framework to build the API.
  - Secure user authentication and authorization.
  - Predefined OTP for initial version to avoid integration with third-party services.
- **Frontend:**
  - React and TypeScript for frontend development.
  - Responsive design using CSS frameworks (e.g., Tailwind CSS, Bootstrap).
  - Smooth and intuitive user interface for browsing, listing, and bidding.
- **Database:**
  - PostgreSQL for database management.
  - Database schema to support users, items, bids, and transactions.

## Technical Stack

- **Backend:** Django, Django REST framework
- **Frontend:** React, TypeScript, Tailwind CSS
- **Database:** PostgreSQL

## Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/RahulMAli029/auction-platform.git
   cd online-bidding-platform
   ```
2. Backend Setup:
   - **Create virtual environment:**
   ```bash
   python -m venv venv
   .\end\Scripts\activate
   ```
   
   - **Install Dependencies:**
   ```bash
   pip install -r requirement.txt
   ```
   - **Run Migration**
   ```bash
   python manage.py migrate
   ```
   - **Run Django server:**
   ```bash
   python manage.py runserver
   ```
3. Frotend Setup
   - **Navigate to frotend directory:**
    ```bash
    cd frontend
    ```
  - **Install dependencies**
    ```bash
    npm install
    ```
  - **Start the React development server:**
    ```bash
    npm start
    ```
