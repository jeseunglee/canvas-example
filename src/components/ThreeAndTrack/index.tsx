import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import Stats from 'stats-js';
import * as dat from 'dat.gui';
import { setPlane, setSphere, setCube } from './poligons';

const controls = (() => {
    const rotationSpeed = 0.1;
    const bouncingSpeed = 0.2;
    return { rotationSpeed, bouncingSpeed };
})();

const ThreeAndTrack = () => {
    const canvasElemRef = useRef<HTMLDivElement>(null);
    const statsElemRef = useRef<HTMLDivElement>(null);
    const width = window.innerWidth;
    const height = window.innerHeight;
    let step = 0;



    const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
    const rendererRef = useRef<THREE.WebGLRenderer>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const spotLightRef = useRef<THREE.SpotLight>(null);
    const axesRef = useRef<THREE.AxesHelper>(null);

    const statsRef = useRef<Stats>(null);

    const planeRef = useRef<THREE.Mesh>(setPlane);
    const cubeRef = useRef<THREE.Mesh>(setCube);
    const sphereRef = useRef<THREE.Mesh>(setSphere);

    useLayoutEffect(() => {
        setStats();
        setGUI();

        setRenderer();
        setCamera();
        setAxes();
        setSpotLight();

        addToScene();

        statsElemRef.current.appendChild(statsRef.current.dom);
        canvasElemRef.current.appendChild(rendererRef.current.domElement);
        renderScene();
    })

    const setStats = () => {
        const stats = new Stats();
        stats.showPanel(1);// 0: fps, 1: ms, 2: mb, 3+: custom
        statsRef.current = stats;
    }

    const setGUI = () => {
        const gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'bouncingSpeed', 0, 0.5);
    }

    const renderScene = () => {
        statsRef.current.begin();

        cubeRef.current.rotation.x += controls.rotationSpeed;
        cubeRef.current.rotation.y += controls.rotationSpeed;
        cubeRef.current.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;

        cubeRef.current.position.x = 2 + (3 * (Math.cos(step)));
        cubeRef.current.position.y = 3 + (20 * Math.abs(Math.sin(step)));

        statsRef.current.end();

        requestAnimationFrame(renderScene);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    const setRenderer = () => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color('gray'));
        renderer.setSize(width * 0.375, height * 0.375);
        renderer.shadowMap.enabled = true;

        rendererRef.current = renderer;
    }

    const setCamera = () => {
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(10, 50, -15);
        camera.lookAt(sceneRef.current.position);
        cameraRef.current = camera;
    }

    const addToScene = () => {
        sceneRef.current.add(axesRef.current);
        sceneRef.current.add(spotLightRef.current);
        sceneRef.current.add(planeRef.current);
        sceneRef.current.add(cubeRef.current);
        // sceneRef.current.add(sphereRef.current);
    }

    const setSpotLight = () => {
        const spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(-5, 30, 15);
        spotLight.castShadow = true; // 그림자를 생성하는 쪽.
        // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);

        spotLightRef.current = spotLight;
    }

    const setAxes = () => {
        const axes = new THREE.AxesHelper(20);
        axes.position.set(5, 0, 10);
        axesRef.current = axes;
    }

    return (
        <>
            <div ref={statsElemRef} />
            <div ref={canvasElemRef} />
        </>
    );
}

export default ThreeAndTrack;