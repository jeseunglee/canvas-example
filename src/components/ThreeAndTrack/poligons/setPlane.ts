import * as THREE from 'three';

export const setPlane = (() => {
    // 오브젝트 변수 쉐이더 변수 선언.
    const planeGeometry = new THREE.PlaneGeometry(40, 60);
    // 폴리곤 종류와 색상 지정.
    // 그림자를 받을 수 있는 '램버트'와 같은 쉐이딩 설정
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // 위치나 회전과 크기를 지정할 수 있는 객체 생성.
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, 10);
    plane.rotation.x = -0.4 * Math.PI;
    plane.receiveShadow = true; // 그림자를 받는 쪽.

    return plane;
    // 씬에 추가.
    // scene.add(plane);
})();