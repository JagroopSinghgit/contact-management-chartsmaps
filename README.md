# Contact Management ChartsMaps

The Contact Management ChartsMaps is a web application built using React that offers a user-friendly contact management system and provides interactive charts and maps to visualize COVID-19 statistics worldwide. This README provides an overview of the application's features, installation process, usage instructions, and details about the APIs used to fetch COVID-19 data.

## Features

- **Contacts Management**: The application allows users to add, edit, and delete contact details with ease.

- **Interactive Charts**: The application displays an interactive line chart that visualizes historical COVID-19 data, including cases, deaths, and recoveries.

- **Interactive Maps**: The application features an interactive map that displays COVID-19 statistics for different countries, including total cases, recovered cases, and deaths.

- **Responsive Design**: The application is designed to be responsive, ensuring optimal viewing and functionality across various devices and screen sizes.

## Installation

Follow these steps to set up and run the Contact Management ChartsMaps application:

1. Clone the Repository:

   ```bash
   git clone https://github.com/JagroopSinghgit/contact-management-chartsmaps.git
   ```

2. Navigate to the Project Directory:

   ```bash
   cd contact-management-chartsmaps
   ```

3. Install Dependencies:

   ```bash
   npm install
   ```
I already add node_modules so you can forgot npm install

## Usage

1. Start the Development Server:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Contact Management ChartsMaps application.

3. Use the navigation sidebar to switch between the "Contacts" and "Charts & Maps" sections.

### Contacts Management

- **Adding a Contact**: Click the "Add Contact" button, fill in the contact details, select the status, and click "Save Contact."

- **Editing a Contact**: Click the "Edit" button on a contact card, modify the contact details, and click "Update Contact."

- **Deleting a Contact**: Click the "Delete" button on a contact card to remove the contact.

- **Viewing Contact Details**: Click the "View Details" button on a contact card to view detailed contact information.

### Interactive Charts

- The "Charts & Maps" section displays a line chart representing the historical COVID-19 data for cases, deaths, and recoveries worldwide.

### Interactive Maps

- The "COVID-19 Map" section displays an interactive map with markers representing different countries.

- Click on a marker to view a popup with COVID-19 statistics for that country, including total cases, recovered cases, and deaths.

## APIs Used

The application fetches COVID-19 data from the following APIs:

1. **World Data**: Fetches worldwide COVID-19 data.
   - API Endpoint: `https://disease.sh/v3/covid-19/all`

2. **Country Data**: Fetches COVID-19 data for different countries.
   - API Endpoint: `https://disease.sh/v3/covid-19/countries`

3. **Graph Data**: Fetches historical COVID-19 data for plotting charts.
   - API Endpoint: `https://disease.sh/v3/covid-19/historical/all?lastdays=all`

## Technologies Used

- React
- Redux
- Chart.js
- Leaflet (for maps)
- Tailwind CSS (for styling)

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README file further with additional information or instructions specific to your project. Include any additional details that users might find useful when setting up and using your application.
