import React, { useRef, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';

const ThreeComp = () => {
    const rendererRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // === THREE.JS CODE START ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild(renderer.domElement);

        rendererRef.current && rendererRef.current.appendChild(renderer.domElement);

        const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100000);
        pointLight.position.set(100, 100, 100);
        scene.add(pointLight);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const material = new THREE.MeshLambertMaterial({ color: '#fff000' });
        const material = new THREE.MeshStandardMaterial({ color: 'red', wireframe: false });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        scene.background = new THREE.Color('gray');

        camera.position.z = 5;
        const animate = function () {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
        // === THREE.JS EXAMPLE CODE END ===
    })

    return (
        <div ref={rendererRef} />
    )
}

export default ThreeComp;