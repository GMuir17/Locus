import { useRef, useState } from "react";
import { Box } from "@mui/material";
import ReactMapboxGl, { Source, Layer, Marker, Feature } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { exampleData } from "./exampleData.ts";

const Map = ReactMapboxGl({
  attributionControl: false,
  accessToken:
    "pk.eyJ1IjoiZ2FyeW11aXIxNyIsImEiOiJjbGRhcGY2YnUwMnJpM25ucG9hbHhiNm55In0.z201qPKYa8T4KHQEFUMT3A",
});

const MapPage = () => {
  const mapRef = useRef(null);
  const [, setMap] = useState(null);

  // const manipulatedExampleData = exampleData.map((feature) => {
  //   return {
  //     type: feature.type,
  //     geometry: {
  //       type: feature.type,
  //       coordinates: feature.coordinates,
  //     },
  //     properties: {},
  //   };
  // });

  // overview of Scotland
  const viewState = {
    center: [-4.25, 55.860916],
    zoom: [5.6],
    bearing: [0],
    pitch: [0],
  };

  const mapLoadEvent = async (map: any) => {
    setMap(map);
    mapRef.current = map;

    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");

    await map.once("idle");
  };
  console.log("banana landscapeLink", { exampleData });

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      {exampleData.polygons && <div style={{ color: "white" }}>hello</div>}

      <Map
        style="mapbox://styles/mapbox/satellite-v9"
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        onStyleLoad={mapLoadEvent}
        {...viewState}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "school-15" }}>
          <Feature coordinates={[-4.073774522608431, 56.21677196617614]} />
        </Layer>
        {exampleData.polygons && (
          <>
            <Source
              id="landscapeLinkPolygons"
              geoJsonSource={{
                type: "geojson",
                data: exampleData?.polygons || {},
              }}
            />
            <Layer
              id="anything"
              type="fill"
              sourceId="landscapeLinkPolygons"
              paint={{
                "fill-color": "#ff2bff",
                "fill-opacity": 0.8,
              }}
            />
          </>
        )}
      </Map>
    </Box>
  );
};

export default MapPage;
