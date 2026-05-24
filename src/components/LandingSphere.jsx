import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WEBGL_NOISE = `
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

function createDotTexture(size = 32, color = '#FFFFFF') {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  const radius = size * 0.5;
  context.fillStyle = color;
  context.beginPath();
  context.arc(radius, radius, radius, 0, Math.PI * 2);
  context.fill();

  return new THREE.CanvasTexture(canvas);
}

class Molecule extends THREE.Object3D {
  constructor() {
    super();

    this.radius = 1.1;
    this.detail = 40;
    this.particleSizeMin = 0.02;
    this.particleSizeMax = 0.13;

    this.build();
  }

  build() {
    const geometry = new THREE.IcosahedronGeometry(1, this.detail);
    const material = new THREE.PointsMaterial({
      map: createDotTexture(),
      blending: THREE.NormalBlending,
      color: 0xffffff,
      depthTest: false,
      transparent: true,
      sizeAttenuation: true,
      opacity: 0.98,
    });

    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = { value: 0 };
      shader.uniforms.radius = { value: this.radius };
      shader.uniforms.particleSizeMin = { value: this.particleSizeMin };
      shader.uniforms.particleSizeMax = { value: this.particleSizeMax };
      shader.uniforms.colorDeep = { value: new THREE.Color(0x1d4ed8) };
      shader.uniforms.colorViolet = { value: new THREE.Color(0x6d28d9) };

      shader.vertexShader = `varying float vShade;\n${shader.vertexShader}`;
      shader.vertexShader = `uniform float particleSizeMax;\n${shader.vertexShader}`;
      shader.vertexShader = `uniform float particleSizeMin;\n${shader.vertexShader}`;
      shader.vertexShader = `uniform float radius;\n${shader.vertexShader}`;
      shader.vertexShader = `uniform float time;\n${shader.vertexShader}`;
      shader.vertexShader = `${WEBGL_NOISE}\n${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          vec3 p = position;
          float n = snoise(vec3(
            p.x * 0.6 + time * 0.2,
            p.y * 0.4 + time * 0.3,
            p.z * 0.2 + time * 0.2
          ));
          p += n * 0.4;

          float l = radius / length(p);
          p *= l;
          float s = mix(particleSizeMin, particleSizeMax, n);
          vShade = clamp((p.y / radius) * 0.5 + 0.5 + n * 0.16, 0.0, 1.0);
          vec3 transformed = vec3(p.x, p.y, p.z);
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        'gl_PointSize = size;',
        'gl_PointSize = s;'
      );

      shader.fragmentShader = `varying float vShade;\nuniform vec3 colorDeep;\nuniform vec3 colorViolet;\n${shader.fragmentShader}`;
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
          #include <color_fragment>
          vec3 sphereTint = mix(colorDeep, colorViolet, vShade);
          diffuseColor.rgb = sphereTint;
          diffuseColor.a *= 0.98;
        `
      );

      material.userData.shader = shader;
    };

    this.material = material;
    this.geometry = geometry;
    this.mesh = new THREE.Points(geometry, material);
    this.add(this.mesh);
  }

  animate(time) {
    this.mesh.rotation.set(0, time * 0.2, 0);

    if (this.material.userData.shader) {
      this.material.userData.shader.uniforms.time.value = time;
    }
  }

  dispose() {
    this.geometry.dispose();
    if (this.material.map) {
      this.material.map.dispose();
    }
    this.material.dispose();
  }
}

export default function LandingSphere() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 1000);
    camera.position.z = 4.9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    host.appendChild(renderer.domElement);

    const molecule = new Molecule();
    scene.add(molecule);

    const fit = () => {
      const width = host.clientWidth || window.innerWidth;
      const height = host.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    fit();
    window.addEventListener('resize', fit);

    let frameId = 0;
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      molecule.animate(time);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', fit);
      molecule.dispose();
      scene.remove(molecule);
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={hostRef} className="landing-sphere" aria-hidden="true" />;
}