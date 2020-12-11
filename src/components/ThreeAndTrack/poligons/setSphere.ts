import * as THREE from 'three';

export const setSphere = (() => {
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    // 그림자를 받을 수 있는 '램버트'와 같은 쉐이딩 설정
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-5, 22, 8);
    sphere.castShadow = true; // 그림자를 생성하는 물체

    return sphere;
    // scene.add(sphere);
})();