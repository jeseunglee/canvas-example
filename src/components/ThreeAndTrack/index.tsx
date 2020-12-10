// import React from 'react'

import { render } from "@testing-library/react";
import { useLayoutEffect, useRef } from "react";
import * as THREE from 'three';

const ThreeAndTrack = () => {
    const ref = useRef<HTMLDivElement>(null);
    const width = window.innerWidth;
    const height = window.innerHeight;

    useLayoutEffect(() => {
        init();
    }, [])

    const init = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(width * 0.375, height * 0.375);

        const planeGeometry = new THREE.PlaneGeometry(60, 20);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.4 * Math.PI;
        plane.position.set(15, 0, 0);

        scene.add(plane);

        camera.position.set(-30, 40, 30);
        camera.lookAt(scene.position);

        ref.current.appendChild(renderer.domElement);
        renderer.render(scene, camera);
    }

    return <div ref={ref} />;
}

export default ThreeAndTrack;