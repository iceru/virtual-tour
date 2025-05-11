/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";

import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/gallery-plugin/index.css";


export default function RoomViewer() {
    const viewerRef = useRef(null);
    const [intro, setIntro] = useState(false);
    const [getCurrentNodeFunction, setGetCurrentNodeFunction] =
        useState(null);

    const baseUrl = "pano_";
    const caption = "Panorama";



    const handleReady = (instance: any) => {
        const virtualTour = instance.getPlugin(VirtualTourPlugin);
        if (!virtualTour) return;

        const markerLighthouse = {
            id: "marker-1",
            image: baseUrl + "pictos/pin-red.png",
            tooltip: "Cape Florida Light, Key Biscayne",
            size: { width: 32, height: 32 },
            anchor: "bottom center",
            gps: [-80.155973, 25.666601, 29 + 3],
        };

        virtualTour.setNodes(
            [
                {
                    id: "1",
                    panorama: baseUrl + "1.jpg",
                    thumbnail: baseUrl + "1.jpg",
                    name: "One",
                    caption: `[1] ${caption}`,
                    links: [{ nodeId: "2" }],
                    markers: [markerLighthouse],
                    gps: [-80.156479, 25.666725, 3],
                    panoData: { poseHeading: 80 },
                },
                {
                    id: "2",
                    panorama: baseUrl + "2.jpg",
                    thumbnail: baseUrl + "2.jpg",
                    name: "Two",
                    caption: `[2] ${caption}`,
                    links: [{ nodeId: "3" }, { nodeId: "1" }],
                    markers: [markerLighthouse],
                    gps: [-80.156168, 25.666623, 3],
                    panoData: { poseHeading: 270 },
                },
                {
                    id: "3",
                    panorama: baseUrl + "3.jpg",
                    thumbnail: baseUrl + "3.jpg",
                    name: "Three",
                    caption: `[3] ${caption}`,
                    links: [{ nodeId: "4" }, { nodeId: "2" }],
                    gps: [-80.155932, 25.666498, 5],
                    panoData: { poseHeading: 400 },
                },
                {
                    id: "4",
                    panorama: baseUrl + "4.jpg",
                    thumbnail: baseUrl + "4.jpg",
                    name: "Four",
                    caption: `[4] ${caption}`,
                    links: [{ nodeId: "3" }, { nodeId: "1" }],
                    gps: [-80.156089, 25.666357, 3],
                    panoData: { poseHeading: 78 },
                },
            ],
            "1"
        );

        const getCurrentNode = virtualTour.getCurrentNode.bind(virtualTour);
        setGetCurrentNodeFunction(() => getCurrentNode);
    };

    const plugins = [
        MarkersPlugin,
        [
            GalleryPlugin,
            {
                thumbnailSize: { width: 100, height: 100 },
            },
        ],
        [
            VirtualTourPlugin,
            {
                positionMode: "gps",
                renderMode: "3d",
            },
        ],
    ];

    const handleClick = () => {
        console.log(getCurrentNodeFunction);
    };
    return (
        <div>
            <ReactPhotoSphereViewer
                ref={viewerRef}
                loadingTxt="Loading"
                src={baseUrl + "1.jpg"}
                height="100vh"
                width="100%"
                plugins={plugins}
                onReady={handleReady}
                defaultTransition={{ effect: 'fade' }}
            />
            {intro && (
                <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-auto bg-white z-[100] text-black p-8 rounded-2xl">
                    <h1 className="font-bold text-4xl mb-4">Welcome to Virtual Tour</h1>
                    <p className="text-lg mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae ipsum enim, et debitis, sequi sit hic obcaecati officiis fuga neque est dolore officia, culpa voluptates consectetur maxime ea nulla ad.</p>
                    <p className="mb-4 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptatem commodi fugiat non dolorem quos corrupti necessitatibus, vel ad hic nulla repudiandae tempora saepe eum officia explicabo dolores doloribus reprehenderit!</p>
                    <button type="button" onClick={() => setIntro(false)} className="bg-sky-700 text-white font-bold px-6 py-3 text-lg rounded-2xl cursor-pointer">
                        Start Virtual Tour
                    </button>
                </div>
            )}

            <button onClick={handleClick}>Get Current Node</button>
        </div>
    );
}
