"use client";

import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

export const CoolThreeJSGeometricFigure = () => {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const size = 205;
    canvas.width = size;
    canvas.height = size;
    if (context) {
      context.fillStyle = "rgb(5 150 105)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      context.font = "bold 50px PT Sans";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("GDapps", canvas.width / 2, canvas.height / 2 - 24);
      context.fillText("Studio", canvas.width / 2, canvas.height / 2 + 24);
    }
    const textTexture = new THREE.CanvasTexture(canvas);

    const imageTexture = new THREE.TextureLoader().load(
      "/assets/gdapps-logo-cube.png"
    );

    const materials = [
      new THREE.MeshStandardMaterial({ map: textTexture }),
      new THREE.MeshStandardMaterial({ map: imageTexture }),
      new THREE.MeshStandardMaterial({ map: textTexture }),
      new THREE.MeshStandardMaterial({ map: imageTexture }),
      new THREE.MeshStandardMaterial({ map: textTexture }),
      new THREE.MeshStandardMaterial({ map: imageTexture }),
    ];

    const cube = new THREE.Mesh(geometry, materials);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const lineSegments = new THREE.LineSegments(edges, lineMaterial);
    cube.add(lineSegments);

    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    const spotLight = new THREE.SpotLight(0xffffff, 1);

    pointLight.position.set(5, 5, 5);
    directionalLight.position.set(-5, 5, 5);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 50;

    scene.add(ambientLight, pointLight, directionalLight, spotLight);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "80vh",
      }}
      className="max-h-[400px] lg:max-h-[600px]"
    />
  );
};
