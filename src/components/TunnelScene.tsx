import { useRef, useMemo, forwardRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { DoubleSide, SRGBColorSpace, TextureLoader, Vector3 } from 'three';
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
];

export const HERO_IMAGE_COUNT = IMAGE_LIST.length;
export const HERO_SLIDE_INTERVAL_MS = 5000;
export const HERO_INITIAL_SLIDE_STEPS = 2;

export function getHeroSlideStep() {
  return 1 / Math.max(HERO_IMAGE_COUNT - 1, 1);
}

export function getHeroInitialSlideProgress() {
  return HERO_INITIAL_SLIDE_STEPS * getHeroSlideStep();
}

export function getHeroTunnelProgress(userProgress: number) {
  const initialFraction = getHeroInitialSlideProgress();
  const clamped = Math.max(0, Math.min(1, userProgress));
  return initialFraction + clamped * (1 - initialFraction);
}

const CARD_WORLD_WIDTH = 2.35;
const CARD_WORLD_HEIGHT = 1.76;
const CARD_SPACING = 1.08;
const MOBILE_CARD_BASE_Y = -0.8;
const MOBILE_GROUP_Y = 0.02;
const MOBILE_STACK_STEP_Y = 0.08;

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
  renderOrder?: number;
  texture: THREE.Texture;
  position: [number, number, number];
  width: number;
}

const Card = forwardRef<THREE.Mesh, CardProps>(({ height, renderOrder = 0, texture, position, width }, ref) => {
  const edgeWidth = 0.03;
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
      renderOrder={renderOrder}
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
  slideProgress,
}: {
  isCompact: boolean;
  slideProgress: React.MutableRefObject<{ current: number; target: number; ease: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const textures = useLoader(TextureLoader, IMAGE_LIST);
  textures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace;
  });

  const items = useMemo(
    () =>
      IMAGE_LIST.map((_, i) => {
        if (isCompact) {
          return {
            x: 0,
            y: MOBILE_CARD_BASE_Y + i * MOBILE_STACK_STEP_Y,
            z: -1.45 - i * CARD_SPACING,
          };
        }

        return {
          x: 1.8,
          y: 0.14,
          z: -1.15 - i * CARD_SPACING,
        };
      }),
    [isCompact]
  );

  const totalHeight = (IMAGE_LIST.length - 1) * CARD_SPACING;
  const loggedInitialRef = useRef(false);

  useFrame(() => {
    if (!groupRef.current) return;

    const progress = getHeroTunnelProgress(slideProgress.current.current);
    const zScroll = progress * totalHeight;

    groupRef.current.position.z = zScroll;

    if (!loggedInitialRef.current) {
      loggedInitialRef.current = true;

      // #region agent log
      fetch('http://127.0.0.1:7366/ingest/b36f4b69-b3b7-4b0b-b332-d41c2c52d7db',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8d4886'},body:JSON.stringify({sessionId:'8d4886',runId:'slider-zero',hypothesisId:'I3',location:'TunnelScene.tsx:useFrame',message:'Decoupled slider and tunnel',data:{userProgress:slideProgress.current.current,tunnelProgress:progress,zScroll,sliderUI:slideProgress.current.current},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    }

    groupRef.current.children.forEach((child) => {
      const worldPosition = child.getWorldPosition(new Vector3());
      const loopHeight = IMAGE_LIST.length * CARD_SPACING;
      if (worldPosition.z > 1.25) {
        child.position.z -= loopHeight;
      } else if (worldPosition.z < -loopHeight - 1.25) {
        child.position.z += loopHeight;
      }
    });
  });

  return (
    <group ref={groupRef} position={isCompact ? [0, MOBILE_GROUP_Y, 0] : [0, 0.19, 0]}>
      {textures.map((tex, i) => (
        <Card
          key={i}
          height={isCompact ? 1.18 : CARD_WORLD_HEIGHT}
          position={[items[i].x, items[i].y, items[i].z]}
          renderOrder={isCompact ? textures.length - i : 0}
          texture={tex}
          width={isCompact ? 1.58 : CARD_WORLD_WIDTH}
        />
      ))}
    </group>
  );
}

export default function TunnelCanvas({
  isCompact = false,
  slideProgress,
}: {
  isCompact?: boolean;
  slideProgress: React.MutableRefObject<{ current: number; target: number; ease: number }>;
}) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <Canvas
        camera={{ position: isCompact ? [0, -0.12, 5.15] : [0, 0, 5], fov: isCompact ? 54 : 50 }}
        gl={{ outputColorSpace: SRGBColorSpace, alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene isCompact={isCompact} slideProgress={slideProgress} />
      </Canvas>
    </div>
  );
}
