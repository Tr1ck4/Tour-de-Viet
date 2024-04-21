import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TourDetailPage = () => {
    const { townID, tourName } = useParams(); // Get the tourId from the route parameters
    const [tourDetails, setTourDetails] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tours/${townID}/${tourName}`);
                setTourDetails(response.data);
            } catch (error) {
                console.error("Error fetching tour details", error);
            }
        };

        fetchTourDetails();
    }, [townID, tourName]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/comments/${townID}/${tourName}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [townID, tourName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tourDetails) {
        return <div>Tour not found</div>;
    }

    return (
        <div>
            {console.log(tourDetails, comments)}
            <h1>{tourDetails.tourName}</h1>
            <p>{tourDetails.description}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default TourDetailPage;
