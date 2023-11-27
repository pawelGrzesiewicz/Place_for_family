import React, {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import {useFamilyData} from "../hooks/FamilyDataContext.jsx";
import {CircularProgress} from "@mui/material";

export default function SearchEngine_Map() {
    const { familyData } = useFamilyData();
    const [coordinates, setCoordinates] = useState(null);

    console.log("Family Data:", familyData);
    console.log("Coordinates:", coordinates);

    useEffect(() => {
        const getCoordinates = async () => {
            if (familyData && familyData.length > 0 && familyData[0].city) {
                const apiKey =  "ABQIAAAAqNSzGzaEZ-oLF5t965J0aRSa1xZB9HXr6knabyFZRyEcatenWhTT6KNxkZ7ovTLOwmDvGXdAtVuX6Q";
                const city = encodeURIComponent(familyData[0].city);


                try {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`
                    );

                    const data = await response.json();

                    if (data.results && data.results.length > 0) {
                        const { lat, lng } = data.results[0].geometry.location;
                        setCoordinates({ lat, lng });
                    } else {
                        console.error("No results found for the given city.");
                    }
                } catch (error) {
                    console.error("Error fetching coordinates:", error.message);
                }
            }
        };

        getCoordinates();
    }, [familyData]);

    if (!coordinates) {
        return <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}
        >
            <CircularProgress/>;
        </div>
    }

    return (
        <div style={{ height: '80vh'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key:  "AIzaSyDkumcU-Bh1GOJ3VqkVNnl04RvBxWSNG9U"}}
                defaultCenter={{
                    lat: 40.7128,
                    lng: -74.0060
                }}
                defaultZoom={14}
            >
            </GoogleMapReact>
        </div>
    )
}