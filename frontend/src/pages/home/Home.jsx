// src/pages/home/Home.jsx

import React from 'react';
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
const Home = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }} className='responsive-block'>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '0 0 30%',
                height: '100%',
                backgroundColor: 'gray',
            }}>
                <Sidebar />
                <div style={{
                    flex: '1 1 auto',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    backgroundColor: 'white',
                }}>
                    <MessageContainer />
                </div>
            </div>
        </div>
    );
};

export default Home;
