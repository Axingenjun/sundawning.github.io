<script setup>
import { onMounted, ref } from "vue";

import * as THREE from "three";

/**
 * @param {HTMLElement} container
 * @see https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene
 */
function init(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
}
let containerRef = ref();
onMounted(function () {
  init(containerRef.value);
});
</script>

<template>
  <div ref="containerRef"></div>
</template>

<style scoped>
</style>
