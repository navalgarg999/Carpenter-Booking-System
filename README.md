# Booking Management System

## Introduction

The **Booking Management System** is a backend service built with **Nest.js** that facilitates appointment scheduling and cancellation for carpenters. The system manages carpenters, available time slots, and bookings while ensuring proper data handling and error management.

## Features

- **Carpenters Management**: Add new carpenters dynamically.
- **Slot Management**: Automatically generates slots for carpenters (9 AM - 5 PM, 1-hour intervals).
- **Booking System**:
  - Book an available slot.
  - Cancel an existing booking.
  - Retrieve all bookings.
- **Error Handling**: Provides appropriate HTTP responses for invalid operations.

## Tech Stack

- **Backend**: Nest.js (TypeScript-based Node.js framework)
- **Database**: Currently using in-memory storage (Can be extended to PostgreSQL, MongoDB, etc.)
- **Architecture**: Modular (Carpenters, Slots, and Bookings are separate services)

## API Endpoints

### Carpenters

- **Create Carpenter**: `POST /carpenters`
- **Get All Carpenters**: `GET /carpenters`

### Slots

- **Get Slots for a Carpenter**: `GET /slots/:id`

### Bookings

- **Create Booking**: `POST /bookings`
  - Body: `{ "carpenterId": number, "time": number }`
- **Cancel Booking**: `POST /bookings/cancel`
  - Body: `{ "carpenterId": number, "time": number }`
- **Get All Bookings**: `GET /bookings`

##
