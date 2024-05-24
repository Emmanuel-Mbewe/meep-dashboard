import HeaderSection from '@/ui-components/HeaderSection';
import React, { useState } from 'react';

const Profile = (props) => {
    const [profilePic, setProfilePic] = useState('/user-pic.jpg'); // Initial profile picture state

    const handleProfilePicChange = (e) => {
        // Handle the change event when user selects a new profile picture
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePic(reader.result); // Update profile picture state with the selected image
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <HeaderSection 
                heading={'Hello Emmanuel'}
            />
            <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
                {/* Profile Picture */}
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <img src={profilePic} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4285F4' }} />
                </div>
                {/* Profile Picture Upload */}
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: 'none' }} id="profilePicInput" />
                    <label htmlFor="profilePicInput" style={{ color: '#185ADB', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}>Change Profile Picture</label>
                </div>

                {/* User Details */}
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: '#4285F4', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Bio</h2>
                    <p style={{ fontSize: '1rem', marginBottom: '5px' }}><strong>Name:</strong> Emmanuel</p>
                    <p style={{ fontSize: '1rem', marginBottom: '5px' }}><strong>Email:</strong> emmanuel@gmail.com</p>
                    <p style={{ fontSize: '1rem', marginBottom: '5px' }}><strong>Role:</strong> Admin</p>
                    {/* Add more user details as needed */}
                </div>
                {/* Settings */}
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: '#4285F4', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Settings</h2>
                    <p style={{ fontSize: '1rem', marginBottom: '5px' }}> </p>
                    {/* Add various settings options */}
                </div>
            </div>
        </>
    );
}

export default Profile;