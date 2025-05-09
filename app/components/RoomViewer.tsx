/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { CompassPlugin } from "@photo-sphere-viewer/compass-plugin";

import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/compass-plugin/index.css";

export default function Home() {
    const viewerRef = useRef(null);

    // Images to load
    const images = {
        default: "home-1.jpg",
        marker1: "home-2.jpg",
    };

    const [src, setSrc] = useState(images.default);

    const handleReady = (viewer: any) => {
        const markersPlugs = viewer.getPlugin(MarkersPlugin);
        if (!markersPlugs) return;
        markersPlugs.addMarker({
            id: "imageLayer2",
            image: "vercel.svg",
            size: { width: 220, height: 220 },
            position: { yaw: "10.5deg", pitch: "-0.1deg" },
            tooltip: "Image embedded in the scene",
        });
        markersPlugs.addEventListener("select-marker", () => {
            setSrc(images.marker1);
        });
    };

    const plugins = [
        [MarkersPlugin,
            {
                markers: [
                ],
            },],
        [CompassPlugin, {
            hotspots: [
                { yaw: '0deg' },
                { yaw: '90deg' },
                { yaw: '180deg' },
                { yaw: '270deg' },
            ],
        }]
    ]

    return (
        <div>
            <ReactPhotoSphereViewer
                ref={viewerRef}
                src={src}
                height="100vh"
                width="100%"
                plugins={plugins}
                onReady={handleReady}
            />
        </div>
    );
}
