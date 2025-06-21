"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, "/earth.jpg");

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function StarField() {
  const points = useRef<THREE.Points>(null);

  useEffect(() => {
    if (points.current) {
      const positions = [];
      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 500;
        const y = (Math.random() - 0.5) * 500;
        const z = (Math.random() - 0.5) * 500;
        positions.push(x, y, z);
      }
      points.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
    }
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry />
      <pointsMaterial color="#ffffff" size={0.4} sizeAttenuation />
    </points>
  );
}

function ShootingMeteor() {
  const meteorRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(new THREE.Vector3());

  const reset = () => {
    const x = Math.random() * 40 - 20;
    const y = Math.random() * 20 + 10;
    const z = Math.random() * -30;
    const vx = -Math.random() * 0.5 - 0.2;
    const vy = -Math.random() * 0.3 - 0.1;
    const vz = 0;

    if (meteorRef.current && trailRef.current) {
      meteorRef.current.position.set(x, y, z);
      trailRef.current.position.set(x + 0.3, y + 0.3, z + 0.2);
    }
    velocity.current.set(vx, vy, vz);
  };

  useEffect(() => {
    reset();
  }, []);

  useFrame(() => {
    if (meteorRef.current && trailRef.current) {
      meteorRef.current.position.add(velocity.current);
      trailRef.current.position.copy(meteorRef.current.position);
      trailRef.current.position.z += 0.4;

      if (meteorRef.current.position.y < -10) {
        reset();
      }
    }
  });

  return (
    <>
      <mesh ref={meteorRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="orange" />
      </mesh>
      <mesh ref={trailRef}>
        <cylinderGeometry args={[0.01, 0.1, 1, 6]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function EarthAndMeteors() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <StarField />
        <Earth />
        {[...Array(6)].map((_, i) => (
          <ShootingMeteor key={i} />
        ))}
      </Canvas>
    </div>
  );
}
