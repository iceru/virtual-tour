"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import RoomViewer from './components/RoomViewer';

const rooms: Record<string, { image: string, hotspots: any[] }> = {
    room1: {
        image: '/room-1.jpg',
        hotspots: [
            {
                id: 'toKitchen',
                x: 1.5,
                y: 0.1,
                tooltip: 'Go to Kitchen',
                targetRoom: 'room2',
            },
        ],
    },
    room2: {
        image: '/room-2.jpg',
        hotspots: [
            {
                id: 'toLiving',
                x: -1.2,
                y: 0.2,
                tooltip: 'Back to Living Room',
                targetRoom: 'room1',
            },
        ],
    },
};


function App() {
    const [currentRoom, setCurrentRoom] = useState('room1');

    const { image, hotspots } = rooms[currentRoom];

    return (
        <RoomViewer
            image={image}
            hotspots={hotspots}
            onNavigate={setCurrentRoom}
        />
    );
}

export default App;
