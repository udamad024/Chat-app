import React from 'react';
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '30%',
            height: '100%', // Ensure it takes up the full height of the screen
            backgroundColor: 'gray', // Add any background color or other styles you need
        }}>
            <div style={{ flex: 'none' }}>
                <Sidebar />
            </div>
            <div style={{
                flex: '1 1 auto',
                maxHeight: '400px', // Set the maximum height you want for the MessageContainer
                overflowY: 'auto', // Make it scrollable if the content exceeds the max height
                backgroundColor: 'white', // Add any background color or other styles you need
            }}>
                <MessageContainer />
            </div>
        </div>
    );
};

export default Home;
