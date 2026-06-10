# Smart Land Management System (SLMS)

## Overview
Project title: Smart Land Management System (SLMS in short). SLMS is a simple web application created for a university assignment. It demonstrates front-end design and basic data handling for managing land parcels, owners, and related applications. The project focuses on clarity, usability, and a small administrative workflow for registering parcels and tracking ownership changes.

## Key Features
- Parcel registration with basic metadata (location, size, owner)
- Owner profile management
- Submit and track transfer or registration applications
- Administrative views for searching and updating records
- Simple summary dashboards for parcel statistics

## Technologies
- HTML, CSS, JavaScript (static front-end)
- Files are organized for serving as a static site (no server-side DB in this assignment)

## Project structure (example)
- index.html — main entry page
- css/ — stylesheets
- js/ — client-side scripts
- assets/ — images and static assets

## Running the project
1. Open index.html in a browser for a quick preview.
2. Or serve the folder locally:
   python -m http.server 8000
   Open http://localhost:8000

Live demo:
- https://slms-rw.netlify.app

## Development notes
- All data is handled client-side for the assignment. For a full system, replace client storage with a backend API and persistent database.
- Code is structured for easy extension: add API calls in js/ and adjust UI in index.html and css/

## Author
Ndikubwimana Didier Gilbert
Reg No: 225058410

## License
This work is for academic purposes. Adapt and reuse with attribution.
