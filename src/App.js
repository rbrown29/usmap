import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import stateLinks from "./stateLinks";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    fetch(
      process.env.REACT_APP_GEOJSON_URL 
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GeoJSON data");
        }
        return response.json();
      })
      .then((geojsonData) => {
        // Enrich GeoJSON data with links from the `stateLinks` array
        geojsonData.features.forEach((feature) => {
          const stateLink = stateLinks.find(
            (link) => link.name.toLowerCase() === feature.properties.name.toLowerCase()
          );
          feature.properties.link = stateLink ? stateLink.url : null;
        });

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: process.env.REACT_APP_MAPBOX_STYLE,
          center: [-98.5795, 39.8283],
          zoom: 3.5,
        });

        map.current.on("load", () => {
          if (!map.current.getSource("states")) {
            map.current.addSource("states", {
              type: "geojson",
              data: geojsonData,
            });
          }

          if (!map.current.getLayer("states-layer")) {
            map.current.addLayer({
              id: "states-layer",
              type: "fill",
              source: "states",
              paint: {
                "fill-color": "#e6e6e6",
                "fill-opacity": 0.5,
              },
            });
          }

          if (!map.current.getLayer("states-border")) {
            map.current.addLayer({
              id: "states-border",
              type: "line",
              source: "states",
              paint: {
                "line-color": "#2b2b2b",
                "line-width": 1.5,
              },
            });
          }

          if (!map.current.getLayer("state-labels")) {
            map.current.addLayer({
              id: "state-labels",
              type: "symbol",
              source: "states",
              layout: {
                "text-field": ["get", "name"],
                "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                "text-size": 12,
              },
              paint: {
                "text-color": "#2b2b2b",
              },
            });
          }

          map.current.on("click", "states-layer", (e) => {
            const { name, link } = e.features[0].properties;
            console.log("State clicked:", name, "Link:", link);
            if (link) {
              window.open(link, "_blank");
            } else {
              alert(`No link available for ${name}`);
            }
          });

          map.current.on("mouseenter", "states-layer", () => {
            map.current.getCanvas().style.cursor = "pointer";
          });

          map.current.on("mouseleave", "states-layer", () => {
            map.current.getCanvas().style.cursor = "";
          });
        });
      })
      .catch((error) => {
        console.error("Error loading GeoJSON data:", error);
      });

    return () => map.current && map.current.remove();
  }, []);

  return (
    <div className="app-container">
      <div ref={mapContainer} className="map-container"></div>
      <div className="legend">
        <h3>Legend</h3>
        <ul>
          <li>
            <span
              className="legend-color"
              style={{ backgroundColor: "#e6e6e6" }}
            ></span>{" "}
            State Fill
          </li>
          <li>
            <span
              className="legend-color"
              style={{ backgroundColor: "#2b2b2b" }}
            ></span>{" "}
            State Borders
          </li>
          <li>
            <span
              className="legend-color"
              style={{ backgroundColor: "#2b2b2b" }}
            ></span>
            Click on a state to view its Trails.
          </li>
          <li>
            Created by:&nbsp;
            <a
              className="link"
              href="https://interactive-reality.netlify.app/"
              rel="nonopener noreferrer"
              target="_blank"
            >
              Richard Brown
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
