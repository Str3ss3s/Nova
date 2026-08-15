import {
  Environment,
  Float,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const meshRef =
    useRef<THREE.Mesh>(null);

  const rotation = useRef({
    x: 0,
    y: 0,
  });

  useFrame((state, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    const pointerX =
      state.pointer.x;

    const pointerY =
      state.pointer.y;

    const targetX =
      pointerY * 0.45;

    const targetY =
      pointerX * 0.65;

    rotation.current.x =
      THREE.MathUtils.lerp(
        rotation.current.x,
        targetX,
        1 - Math.exp(-3 * delta),
      );

    rotation.current.y =
      THREE.MathUtils.lerp(
        rotation.current.y,
        targetY,
        1 - Math.exp(-3 * delta),
      );

    const breathing =
      Math.sin(
        state.clock.elapsedTime * 1.3,
      ) * 0.025;

    mesh.scale.setScalar(
      1.15 + breathing,
    );

    mesh.rotation.x =
      rotation.current.x +
      state.clock.elapsedTime * 0.08;

    mesh.rotation.y =
      rotation.current.y +
      state.clock.elapsedTime * 0.12;
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.12}
      floatIntensity={0.45}
    >
      <mesh ref={meshRef}>
        <torusKnotGeometry
          args={[
            1.45,
            0.42,
            220,
            40,
          ]}
        />

        <meshPhysicalMaterial
          color="#e8e8ea"
          roughness={0.12}
          metalness={0.72}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transmission={0.08}
          thickness={0.5}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={3}
      />

      <pointLight
        position={[-4, -2, 3]}
        intensity={7}
        color="#7c3aed"
      />

      <pointLight
        position={[4, 1, -2]}
        intensity={3}
        color="#ffffff"
      />

      <Orb />

      <Environment preset="studio" />
    </>
  );
}

function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 5.5],
          fov: 45,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default HeroScene;