import React from 'react';
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home = () => {
    const containerStyle = {
        display: 'flex',
        height: '100vh',
        padding: '5px', // Reduced padding
        boxSizing: 'border-box',
        margin: '10px',
    };
    

    const sidebarStyle = {
        width: '30%',
        height: '100%',
        backgroundColor: 'rgba(51, 51, 51, 0.7)', // Light black with 70% opacity
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        boxSizing: 'border-box',
    };

    const contentStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        boxSizing: 'border-box',
    };

    const messageContainerStyle = {
        flex: 1,
        overflowY: 'auto',
        boxSizing: 'border-box',
    };

    return (
        <div style={containerStyle} className='responsive-block'>
            <div style={sidebarStyle}>
                <Sidebar />
            </div>
            <div style={contentStyle}>
                <div style={messageContainerStyle}>
                    <MessageContainer />
                </div>
            </div>
        </div>
    );
};

export default Home;
