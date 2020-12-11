import * as THREE from 'three';

export const setCube = (() => {
    const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'red' })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.set(6, 4, -5);
    cube.rotateX(60);

    cube.castShadow = true;

    return cube;
})();