# US Interactive Map with State Links

This project displays an interactive map of the United States using Mapbox GL JS. Users can click on individual states to open a link associated with the state.

## Add on Pages Oregon Hiking project
- **Oregon Hiking**: https://github.com/rbrown29/Oregon-Hikes
- **Hike Explorer**: https://github.com/rbrown29/HikeExplorer
- **HikingStateView**:https://github.com/rbrown29/hiking-state-view

## Demo
[US Interactive Map](https://usmaptrails.netlify.app/)

## Features
- Interactive map with clickable states.
- State-specific links managed via the `stateLinks.js` file.
- Responsive design with a legend and easy navigation.

## Technologies Used
- React.js
- Mapbox GL JS
- GeoJSON for state boundaries
- CSS for responsive styling

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A Mapbox account with an access token.

### Installation
1. Clone the repository:
   

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set your Mapbox access token in the code:
    - make a file and name it  `.env` in the root directory of the project.
   ```javascript
   REACT_APP_MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';
   REACT_APP_MAPBOX_STYLE= 'your-mapbox-style';
   REACT_APP_GEOJSON_URL= 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The application will run at `http://localhost:3000`.

### Adding State Links
- Open the `stateLinks.js` file.
- Add an entry for each state in the following format:
  ```javascript
  { name: "State Name", url: "https://example.com/state-name" },
  ```
- Save the file. The links will automatically update in the application.

## File Structure
```
interactive-us-map/
├── public/
├── src/
│   ├── App.js          # Main React component
│   ├── stateLinks.js   # File containing state links
│   ├── App.css         # Styling for the application
│   ├── index.js        # Entry point for the React app
├── package.json
├── README.md           # Project documentation
```

## Screenshots
![US Interactive Map](/public/usmap.png)


## Acknowledgments
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) for the interactive map library.
- [PublicaMundi](https://github.com/PublicaMundi/MappingAPI) for the US states GeoJSON data.



This project was created with [Create React App](https://github.com/facebook/create-react-app).

