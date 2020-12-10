import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeAndTrack = () => {
    const ref = useRef<HTMLDivElement>(null);
    const width = window.innerWidth;
    const height = window.innerHeight;

    useLayoutEffect(() => init());

    const init = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.setSize(width * 0.375, height * 0.375);

        setPlane(scene);
        setBox(scene);
        setSphere(scene);

        camera.position.set(-30, 40, 30);
        camera.lookAt(scene.position);

        ref.current.appendChild(renderer.domElement);
        renderer.render(scene, camera);
    }

    const setPlane = (scene: THREE.Scene) => {
        // 오브젝트 변수 쉐이더 변수 선언.
        const planeGeometry = new THREE.PlaneGeometry(60, 20);
        // 폴리곤 종류와 색상 지정.
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });
        // 위치나 회전과 크기를 지정할 수 있는 객체 생성.
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.4 * Math.PI;
        plane.position.set(15, 0, 0);

        // 씬에 추가.
        scene.add(plane);
    }

    const setBox = (scene: THREE.Scene) => {
        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xCCBBBA })
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(-5, 10, 2);

        scene.add(box);
    }

    const setSphere = (scene: THREE.Scene) => {
        const sphereGeometry = new THREE.SphereGeometry(8, 20, 20);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xACCBCA, wireframe: true });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(3, 2, 1);

        scene.add(sphere);
    }

    return <div ref={ref} />;
}

export default ThreeAndTrack;