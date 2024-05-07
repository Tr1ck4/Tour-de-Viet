import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axios.get('/api/authenticate');
                console.log(response.data.accountname);
                setRole(response.data.accountname);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, []);

    return (
        <>
            {role === 'admin' && (
                <div>
                    {/* Render content specific to admin */}
                    <h1>Welcome Admin!</h1>
                </div>
            )}
            {role !== 'admin' && (
                <div>
                    {/* Render content for non-admin users */}
                    <h1>Access Denied</h1>
                </div>
            )}
        </>
    );
}
