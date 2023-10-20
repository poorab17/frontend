// frontend/src/components/ModuleDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ModuleDetails() {
    const { moduleId } = useParams(); // Access the module ID from the URL
    const [moduleDetails, setModuleDetails] = useState(null);

    useEffect(() => {
        // Fetch the module details from the backend API using the moduleId
        // Set the module details in the state
    }, [moduleId]);

    if (!moduleDetails) {
        // You can add loading logic here
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Module Details</h2>
            <h3>{moduleDetails.name}</h3>
            <p>{moduleDetails.description}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default ModuleDetails;
