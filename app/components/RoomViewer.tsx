"use client";

import React, { useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin, } from "@photo-sphere-viewer/markers-plugin";
import { VirtualTourPlugin, VirtualTourPluginConfig } from "@photo-sphere-viewer/virtual-tour-plugin";
import { GalleryPlugin, GalleryPluginConfig } from "@photo-sphere-viewer/gallery-plugin";

import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/gallery-plugin/index.css";
import { Viewer } from "@photo-sphere-viewer/core";


export default function RoomViewer() {
    const viewerRef = useRef(null);
    const [intro, setIntro] = useState(true);

    const baseUrl = "pano_";
    const caption = "Panorama";


    const handleReady = (instance: Viewer) => {
        const virtualTour = instance.getPlugin(VirtualTourPlugin) as VirtualTourPlugin;
        if (!virtualTour) return;

        const customArrow = { image: 'info.png', size: { width: 60, height: 60 } }

        virtualTour.setNodes(
            [
                {
                    id: "1",
                    panorama: baseUrl + "1.jpg",
                    thumbnail: baseUrl + "1.jpg",
                    name: "One",
                    caption: "First Panorama",
                    links: [{
                        nodeId: "2", position: { yaw: "200deg", pitch: "-25deg", },
                        arrowStyle: customArrow,
                    }],

                },
                {
                    id: "2",
                    panorama: baseUrl + "2.jpg",
                    thumbnail: baseUrl + "2.jpg",
                    name: "Second Panorama",
                    caption: `Second Panorama`,
                    links: [{
                        nodeId: "3", position: { yaw: "40deg", pitch: "-25deg", },
                        arrowStyle: customArrow,
                    },
                    {
                        nodeId: "1", position: { yaw: "220deg", pitch: "-25deg", },
                        arrowStyle: customArrow,
                    }],
                },
                {
                    id: "3",
                    panorama: baseUrl + "3.jpg",
                    thumbnail: baseUrl + "3.jpg",
                    name: "Three",
                    caption: `[3] ${caption}`,
                    links: [{
                        nodeId: "4", position: { yaw: "-70deg", pitch: "-10deg", },
                        arrowStyle: customArrow,
                    }],
                },
                {
                    id: "4",
                    panorama: baseUrl + "4.jpg",
                    thumbnail: baseUrl + "4.jpg",
                    name: "Four",
                    caption: `[4] ${caption}`,
                    links: [{
                        nodeId: "1", position: { yaw: "-90deg", pitch: "-25deg", },
                        arrowStyle: customArrow,
                    },
                    {
                        nodeId: "3", position: { yaw: "80deg", pitch: "-25deg", },
                        arrowStyle: customArrow,
                    }],
                },
            ],
            "1"
        );
    };

    const plugins: Array<
        | typeof MarkersPlugin
        | [typeof GalleryPlugin, GalleryPluginConfig]
        | [typeof VirtualTourPlugin, VirtualTourPluginConfig]
    > = [
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
                    positionMode: "manual",
                    renderMode: "2d",
                },
            ],
        ];
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

        </div>
    );
}
