import { useRef, useMemo, forwardRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { DoubleSide, MathUtils, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
import * as THREE from 'three';
import { publicAsset } from '@/lib/publicAsset';

const IMAGE_LIST = [
  publicAsset('/images/service-t2med.jpg'),
  publicAsset('/images/service-praxis-it.jpg'),
  publicAsset('/images/service-telefonie.jpg'),
  publicAsset('/images/service-sicherheit.jpg'),
  publicAsset('/images/service-cloud.jpg'),
  publicAsset('/images/service-digital.jpg'),
  publicAsset('/images/service-practice-interior.jpg'),
  publicAsset('/images/client-1.jpg'),
  publicAsset('/images/client-2.jpg'),
  publicAsset('/images/service-t2med.jpg'),
  publicAsset('/images/service-praxis-it.jpg'),
  publicAsset('/images/service-telefonie.jpg'),
];

const CARD_WORLD_WIDTH = 2.35;
const CARD_WORLD_HEIGHT = 1.76;
const CARD_SPACING = 1.08;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uCardSize;
  uniform vec2 uTextureSize;
  uniform float uEdgeWidth;

  vec2 coverUv(vec2 uv, vec2 resolution, vec2 aspect) {
    vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (aspect.x / aspect.y), 1.0),
      min((resolution.y / resolution.x) / (aspect.y / aspect.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 aspect = uTextureSize / uCardSize;
    vec2 uv = coverUv(vUv, uCardSize, uTextureSize);
    float edgeWidth = uEdgeWidth;
    vec4 edgeColor = vec4(1.0, 0.9, 0.8, 1.0);
    vec2 pixel = (vUv - 0.5) * uCardSize;
    float dist = sdRoundedBox(pixel, uCardSize / 2.0, 24.0);
    float a = 1.0 - smoothstep(0.0, 1.0, dist);
    vec4 tex = texture2D(uTexture, uv);
    float edgeMask = smoothstep(0.0, edgeWidth, vUv.x) * (1.0 - smoothstep(1.0 - edgeWidth, 1.0, vUv.x));
    float edge = (1.0 - edgeMask) * (1.0 - smoothstep(0.0, 1.0, dist));
    vec4 finalColor = mix(edgeColor, tex, edgeMask);
    gl_FragColor = vec4(finalColor.rgb, tex.a * a + edge);
  }
`;

interface CardProps {
  height: number;
  texture: THREE.Texture;
  position: [number, number, number];
  width: number;
}

const Card = forwardRef<THREE.Mesh, CardProps>(({ height, texture, position, width }, ref) => {
  const edgeWidth = useMemo(() => MathUtils.randFloat(0.01, 0.08), []);
  const textureSize = useMemo(() => {
    const image = texture.image as HTMLImageElement | ImageBitmap | undefined;

    return new THREE.Vector2(image?.width ?? 512, image?.height ?? 512);
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uCardSize: { value: new THREE.Vector2(320, 240) },
      uTextureSize: { value: textureSize },
      uEdgeWidth: { value: edgeWidth },
    }),
    [texture, textureSize, edgeWidth]
  );

  return (
    <mesh
      ref={ref}
      scale={[width, height, 1]}
      position={position}
    >
      <planeGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={DoubleSide}
      />
    </mesh>
  );
});

Card.displayName = 'Card';

function Scene({
  isCompact,
  scrollProgress,
}: {
  isCompact: boolean;
  scrollProgress: React.MutableRefObject<{ current: number; target: number; ease: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const textures = useLoader(TextureLoader, IMAGE_LIST);
  textures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace;
  });

  const items = useMemo(
    () =>
      IMAGE_LIST.map((_, i) => {
        const angle = i * 1.35;
        const baseX = isCompact ? 1.05 : 1.8;
        const radiusX = isCompact ? 0.72 : 1.15;
        const baseY = isCompact ? -1.1 : -0.15;
        const radiusY = isCompact ? 0.42 : 0.95;

        return {
          x: baseX + Math.sin(angle) * radiusX,
          y: baseY + Math.cos(angle) * radiusY,
          z: (isCompact ? -1.55 : -1.15) - i * CARD_SPACING,
        };
      }),
    [isCompact]
  );

  const totalHeight = IMAGE_LIST.length * CARD_SPACING;

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollCurrent = scrollProgress.current.current;
    const zScroll = (scrollCurrent * 0.004) % totalHeight;

    groupRef.current.position.z = zScroll;

    groupRef.current.children.forEach((child) => {
      const worldPosition = child.getWorldPosition(new Vector3());
      if (worldPosition.z > 1.25) {
        child.position.z -= totalHeight;
      } else if (worldPosition.z < -totalHeight - 1.25) {
        child.position.z += totalHeight;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => (
        <Card
          key={i}
          height={isCompact ? 1.36 : CARD_WORLD_HEIGHT}
          position={[items[i].x, items[i].y, items[i].z]}
          texture={tex}
          width={isCompact ? 1.82 : CARD_WORLD_WIDTH}
        />
      ))}
    </group>
  );
}

export default function TunnelCanvas({
  isCompact = false,
  scrollProgress,
}: {
  isCompact?: boolean;
  scrollProgress: React.MutableRefObject<{ current: number; target: number; ease: number }>;
}) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ outputColorSpace: SRGBColorSpace, alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene isCompact={isCompact} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
