# Auto Premium Backend 🚗

This is the backend REST API for the Auto Premium project, built using **Node.js** and **Express.js**. The API is designed to handle user authentication, car announcements, image uploads, and messaging via SMS. It also integrates with MongoDB for database management, Cloudinary for image storage, and provides geolocation services for precise location-based data.

## Repository

[**Auto Premium Backend**](https://github.com/joaovff/Auto-Premium-Backend)

## Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose for object modeling)
- **Image Storage**: Cloudinary for storing announcement images
- **User Authentication**: Bcrypt for password encryption
- **Geolocation**: Google Maps API for managing location data
- **SMS Service**: Vonage API for sending SMS messages

## Features

- **User Authentication**: 
  - User registration and login with encrypted passwords using **bcrypt**.
  - JWT-based authentication for secure API access.

- **Announcements Management**:
  - Create, update, and delete car sale announcements.
  - Store car details such as make, model, year, mileage, price, and more.
  - Upload and store car images using **Cloudinary**.

- **Location Services**:
  - Use **Google Maps API** to store and retrieve the location of each car announcement.
  - Display the location on the frontend with precise geolocation.

- **Contact via SMS**:
  - Integrate with **Vonage API** to send SMS messages from potential buyers to sellers directly through the app.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** instance (local or cloud, e.g., MongoDB Atlas).
- Accounts for:
  - **Cloudinary** (for image storage)
  - **Vonage** (for sending SMS)
  - **Google Maps API** (for geolocation)

### Installation

1. **Clone the repository**:

```bash
   git clone https://github.com/joaovff/Auto-Premium-Backend.git
   cd Auto-Premium-Backend
```

2. Install dependencies:
   
```bash
   npm install
```

3. Set up environment variables:

```bash
MONGODB_URI=your-mongodb-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret
VONAGE_API_KEY=your-vonage-api-key
VONAGE_API_SECRET=your-vonage-api-secret
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

4. Running the Server

```bash
   num run dev
```

### API Endpoints

#### Authentication

- **POST** `/signup`  
  Register a new user.

- **POST** `/login`  
  Log in and receive a JWT token.

- **GET** `/verify`  
  Verify the user's authentication status.

#### Announcements

- **GET** `/announcements`  
  Retrieve all car announcements.

- **GET** `/announcements/:id`  
  Retrieve a specific announcement by ID.

- **POST** `/announcements/create`  
  Create a new car announcement (requires authentication).

- **PUT** `/announcements/edit/:announcementId`  
  Edit an existing announcement (requires authentication).

- **DELETE** `/announcements/:id`  
  Delete an announcement (requires authentication).

#### Image Upload

- **POST** `/announcements/upload`  
  Upload images for a specific announcement using **Cloudinary**.

#### User Profile

- **GET** `/profile/:userId`  
  Get user profile details.

- **PUT** `/profile/edit/security/:userId`  
  Update user email and password (requires authentication).

- **PUT** `/profile/edit/:userId`  
  Update user general information like name, phone, and profile picture (requires authentication).

- **DELETE** `/profile/:userId`  
  Delete a user account.

#### Favorites

- **GET** `/profile/favorites/:userId`  
  Retrieve user's favorite announcements.

- **PUT** `/profile/favorites/:userId`  
  Update user's favorites.

- **PATCH** `/profile/favorites/:userId`  
  Remove a specific item from user's favorites.

#### Contact via SMS

- **POST** `/send-sms`  
  Send an SMS to the announcement owner using the **Vonage API**.

#### External API

- **GET** `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`  
  Retrieve car makes for use in announcements.

### Contact
For any questions or suggestions, feel free to reach out to me at contact@joao-silva.pt or joao.figueiredosilva@protonmail.com.

### License
Commercial use of the software is only available by mutual agreement.
