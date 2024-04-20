import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TourDetailPage = () => {
    const { tourId } = useParams(); // Get the tourId from the route parameters
    const [tourDetails, setTourDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tours/${tourId}`);
                setTourDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tour details", error);
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [tourId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tourDetails) {
        return <div>Tour not found</div>;
    }

    return (
        <div>
            {/* Render tour details here using tourDetails */}
            <h1>{tourDetails.name}</h1>
            <p>{tourDetails.description}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default TourDetailPage;
