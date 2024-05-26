// src/pages/home/Home.jsx

import React from 'react';
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { ControlledBoard } from "../../components/kanban/Board"; // Import as named export
import Board from "../../components/kanban/Board";
import Column from "../../components/kanban/Column";

const Home = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '30%',
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
            <div style={{ marginLeft: '21.3%'}}>
				<Board />
            </div>
        </div>
    );
};

export default Home;
