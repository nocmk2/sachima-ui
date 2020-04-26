import * as THREE from 'three'
// import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber'
// import Effects from './Effects'
import './styles/styles.css'
import { useSpring, a } from 'react-spring/three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// function Swarm({ count, mouse }) {
//     const mesh = useRef()
//     const dummy = useMemo(() => new THREE.Object3D(), [])

//     const particles = useMemo(() => {
//         const temp = []
//         for (let i = 0; i < count; i++) {
//             const t = Math.random() * 100
//             const factor = 20 + Math.random() * 100
//             const speed = 0.01 + Math.random() / 200
//             const xFactor = -20 + Math.random() * 40
//             const yFactor = -20 + Math.random() * 40
//             const zFactor = -20 + Math.random() * 40
//             temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
//         }
//         return temp
//     }, [count])

//     useFrame(state => {
//         particles.forEach((particle, i) => {
//             let { t, factor, speed, xFactor, yFactor, zFactor } = particle
//             t = particle.t += speed / 2
//             const a = Math.cos(t) + Math.sin(t * 1) / 10
//             const b = Math.sin(t) + Math.cos(t * 2) / 10
//             const s = Math.max(1.5, Math.cos(t) * 5)
//             particle.mx += (mouse.current[0] - particle.mx) * 0.02
//             particle.my += (-mouse.current[1] - particle.my) * 0.02
//             dummy.position.set(
//                 (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
//                 (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
//                 (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
//             )
//             dummy.scale.set(s, s, s)
//             dummy.updateMatrix()
//             mesh.current.setMatrixAt(i, dummy.matrix)
//         })
//         mesh.current.instanceMatrix.needsUpdate = true
//     })

//     return (
//         <>
//             <instancedMesh ref={mesh} args={[null, null, count]}>
//                 <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
//                 <meshPhongMaterial attach="material" color="white" />
//             </instancedMesh>
//         </>
//     )
// }

// function ThreeDemo1() {
//     const mouse = useRef([0, 0])
//     const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
//     return (
//         <Canvas onMouseMove={onMouseMove}
//             gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
//             camera={{ fov: 75, position: [0, 0, 70] }}
//             onCreated={({ gl }) => {
//                 gl.setClearColor('white')
//                 gl.toneMapping = THREE.ACESFilmicToneMapping
//                 gl.outputEncoding = THREE.sRGBEncoding
//             }}>
//             <ambientLight intensity={1.1} />
//             <pointLight position={[100, 100, 100]} intensity={2.2} />
//             <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
//             <Swarm mouse={mouse} count={5} />
//             <Suspense fallback={null}>
//                 <Effects />
//             </Suspense>
//         </Canvas>
//     )
// }

extend({ OrbitControls })

const Controls = () => {
    const orbitRef = useRef();
    const { camera, gl } = useThree();

    useFrame(() => {
        orbitRef.current.update()
    })

    return (
        <orbitControls
            autoRotate
            // maxPolarAngle={Math.PI / 2}
            // minPolarAngle={Math.PI / 3}
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    )
}

const Plane = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshPhysicalMaterial attach="material" color={"gray"} />
        </mesh >
    )
}

const Box = () => {
    // const meshref = useRef();
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const props = useSpring({
        scale: active ? [1, 2.5, 1] : [1, 1, 1],
        color: hovered ? "hotpink" : "gray"
    });
    // useFrame(() => {
    //     meshref.current.rotation.y += 0.03
    //     // meshref.current.rotation.x += 0.01
    // })

    return (
        <a.mesh
            // ref={meshref}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setActive(!active)}
            scale={props.scale}
            castShadow
        >
            {/* <pointLight position={[100, 100, 100]} intensity={0.2} /> */}
            <ambientLight />
            <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <a.meshPhysicalMaterial attach="material" color={props.color} />
        </a.mesh >
    )
}

function ThreeDemo() {
    return (
        <Canvas camera={{ position: [0, 5, 5] }} onCreated={({ gl }) => {
            gl.shadowMap.enabled = true
            gl.shadowMapType = THREE.PCFShadowMap
        }}>
            <fog attach="fog" args={["white", 5, 15]} />
            <Controls />
            <Box />
            <Plane />
        </Canvas>
    )
}


export default ThreeDemo;