// 3D scenen med skateboardet
import { Canvas, useThree } from '@react-three/fiber'; //gør det muligt at skrive three.js elementer som React tags (såsom <mesh>)
import { OrbitControls, StatsGl, Html } from '@react-three/drei'; //færdiglavet hjælpefunktioner til kamera kontrol og statistik
import { Suspense, useEffect } from 'react'; //fremtidssikring, så vi kan bruge Suspense til at indlæse vores 3D-model asynkront 
import Model from "./Model.jsx"; //importerer skateboard model fra Model.jsx

function ResponsiveCamera() {
    const { camera, size } = useThree(); //får fat i kameraet og størrelsen på canvaset fra useThree hooken
    
    useEffect(() => {
        camera.fov = size.width < 640 ? 20 : 10; //hvis skærmen er mindre end 640px, så sætter vi fov til 20, ellers 10
        camera.updateProjectionMatrix(); //fortæller three.js at matrixen er ændret
    }, [size.width, camera]); //hvis bredden ændres, så opdaterer vi kameraet
    return null; //returner null, da vi intet synligt element har, så vi har ikke brug for at render noget
}


export default function Experience() {
    return ( 
        <Canvas 
        className="absolute inset-0 w-full h-full z-0" //gør at canvas fylder hele skærmen
        camera={{ position: [1, 1.2, 1], fov: 10 }} 
        shadows> 
            {/* lys /> */}
            <ambientLight intensity={10} />
            <directionalLight position={[0, 50, 0]} intensity={2} castShadow />
            
            {/* 3d-indhold */}
            <Suspense fallback={
                <Html center>
                    <p style={{ color: "white", fontWeight: "bold" }}>Loading...</p>
                </Html>
            }>
                {/* stress test */}
                {/* {Array.from({ length: 500 }).map((_, i) => (
                    <group
                        key={i}
                        position={[
                            (i % 10) - 4.5,
                            Math.floor(i / 10) * 0.6,
                            0
                        ]}
                        >
                <Model />
                </group>
                ))} */}
                
                {/* skateboard */}
                <Model />
            </Suspense>

            {/* drei funktion /> */}
            {/* gør det muligt at rotere og zoome med musen */}
            <OrbitControls 
            enablePan={false} //deaktiverer pan (skubbe) funktionen
            minDistance={1} //hvor tæt kameraet kan komme på objektet
            maxDistance={3}
            minPolarAngle={0}  //hvor meget kameraet kan dreje nedad
            maxPolarAngle={Math.PI}
            
            />
            <ResponsiveCamera /> {/* responsive camera (tilpasser kameraret til små skærme) */}
            <StatsGl className="select-none" /> {/*gør at vi kan se FPS og hukommelse i hjørnet af skærmen*/}
        </Canvas>
    );
}