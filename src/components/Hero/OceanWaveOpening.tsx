import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Text, 
  Float, 
  Html, 
  useProgress,
  Environment,
  Sparkles 
} from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Vector3, ShaderMaterial, Mesh } from 'three'
// Removed suspend-react import as it's not needed for this implementation
import './OceanWaveOpening.css'

gsap.registerPlugin(ScrollTrigger)

// Custom Wave Shader
const waveVertexShader = `
  uniform float u_time;
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform vec2 u_mouse;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    
    // Primary wave
    float wave1 = sin(pos.x * u_frequency + u_time) * u_amplitude;
    float wave2 = sin(pos.z * u_frequency * 0.8 + u_time * 1.2) * u_amplitude * 0.5;
    
    // Mouse interaction
    float mouseDistance = distance(vec2(pos.x, pos.z), u_mouse);
    float mouseWave = sin(mouseDistance * 0.1 - u_time * 2.0) * 0.5 * exp(-mouseDistance * 0.01);
    
    pos.y += wave1 + wave2 + mouseWave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const waveFragmentShader = `
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    float depth = (vPosition.y + 1.0) * 0.5;
    
    // Create gradient based on wave height
    vec3 color = mix(u_color1, u_color2, depth);
    color = mix(color, u_color3, smoothstep(0.7, 1.0, depth));
    
    // Add foam effect
    float foam = sin(vPosition.x * 10.0 + u_time * 2.0) * 0.1 + 0.9;
    color = mix(color, vec3(1.0), foam * smoothstep(0.8, 1.0, depth));
    
    // Add transparency
    float alpha = 0.8 + sin(vPosition.x * 0.5 + u_time) * 0.1;
    
    gl_FragColor = vec4(color, alpha);
  }
`

// Wave Component
const OceanWaves = ({ mouse }: { mouse: Vector3 }) => {
  const meshRef = useRef<Mesh>(null!)
  const materialRef = useRef<ShaderMaterial>(null!)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime
      materialRef.current.uniforms.u_mouse.value = [mouse.x, mouse.z]
    }
  })
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_amplitude: { value: 0.8 },
          u_frequency: { value: 0.3 },
          u_mouse: { value: [0, 0] },
          u_color1: { value: [0.0, 0.2, 0.4] }, // Deep blue
          u_color2: { value: [0.0, 0.5, 0.8] }, // Medium blue
          u_color3: { value: [0.6, 0.9, 1.0] }, // Light blue/white
        }}
        transparent
        wireframe={false}
      />
    </mesh>
  )
}

// Medical Particles Component
const MedicalParticles = () => {
  return (
    <group>
      <Sparkles 
        count={200} 
        scale={20} 
        size={3} 
        speed={0.3} 
        color="#00D4FF" 
        opacity={0.6}
      />
      <Sparkles 
        count={100} 
        scale={15} 
        size={2} 
        speed={0.2} 
        color="#FFD700" 
        opacity={0.4}
      />
    </group>
  )
}

// Floating Logo Component
const FloatingLogo = ({ isVisible, onComplete }: { isVisible: boolean, onComplete: () => void }) => {
  const logoRef = useRef<any>(null)
  
  useEffect(() => {
    if (isVisible && logoRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 1000)
        }
      })
      
      tl.from(logoRef.current.position, {
        y: -10,
        duration: 2,
        ease: "power3.out"
      })
      .from(logoRef.current.rotation, {
        y: Math.PI,
        duration: 2,
        ease: "power3.out"
      }, 0)
      .from(logoRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
      }, 0.5)
    }
  }, [isVisible, onComplete])
  
  if (!isVisible) return null
  
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={logoRef}>
        <Text
          fontSize={2}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          color="#FFD700"
          position={[0, 2, 0]}
        >
          MEDCEZIR
        </Text>
        <Text
          fontSize={0.5}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.1}
          textAlign="center"
          color="#FFFFFF"
          position={[0, 1, 0]}
        >
          EXPORT
        </Text>
        <Text
          fontSize={0.3}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.05}
          textAlign="center"
          color="#B8E6FF"
          position={[0, 0.5, 0]}
        >
          WHERE MEDICINE MEETS LUXURY
        </Text>
      </group>
    </Float>
  )
}

// Main Scene Component
const OceanScene = ({ onComplete }: { onComplete: () => void }) => {
  const [mouse, setMouse] = useState(new Vector3())
  const [showLogo, setShowLogo] = useState(false)
  const sceneRef = useRef<any>(null)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const z = (event.clientY / window.innerHeight) * 2 - 1
      setMouse(new Vector3(x * 10, 0, z * 10))
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FFD700" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00D4FF" />
      
      <OceanWaves mouse={mouse} />
      <MedicalParticles />
      <FloatingLogo isVisible={showLogo} onComplete={onComplete} />
      
      <Environment preset="night" />
    </group>
  )
}

// Loading Component
const LoadingProgress = () => {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="ocean-loader">
        <div className="wave-loader">
          <div className="wave-loader-inner">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
        <div className="loading-text">
          <h3>MEDCEZIR EXPORT</h3>
          <p>Loading Experience... {Math.round(progress)}%</p>
        </div>
      </div>
    </Html>
  )
}

// Main Component
const OceanWaveOpening = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // const [isLoaded, setIsLoaded] = useState(false) // Removed unused state
  const [showContent, setShowContent] = useState(false)
  
  // Removed unused isLoaded effect
  
  const handleSceneComplete = () => {
    setShowContent(true)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }
  
  if (showContent) {
    return (
      <div className="ocean-transition" ref={containerRef}>
        <div className="transition-wave"></div>
      </div>
    )
  }
  
  return (
    <div className="ocean-opening" ref={containerRef}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
      >
        <Suspense fallback={<LoadingProgress />}>
          <OceanScene onComplete={handleSceneComplete} />
        </Suspense>
      </Canvas>
      
      {/* Audio Controls */}
      <div className="audio-controls">
        <button className="audio-toggle" aria-label="Toggle ocean sounds">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07" stroke="currentColor" strokeWidth="2"/>
            <path d="M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      
      {/* Skip Button */}
      <button 
        className="skip-opening"
        onClick={() => {
          setShowContent(true)
          setTimeout(() => {
            onComplete()
          }, 100)
        }}
        aria-label="Skip opening animation"
      >
        Skip →
      </button>
    </div>
  )
}

export default OceanWaveOpening