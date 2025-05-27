//selve skateboardet
import { useRef, useEffect } from 'react'; //så vi kan referere til hele gruppen for at rotere (useReF)
import { useFrame } from '@react-three/fiber'; //useframe til at opdatere animationer i vores 3D-scene
import { useGLTF } from '@react-three/drei'; //importerer GLTF loaderen fra drei
import { Color } from 'three'; //importerer color fra three.js
import { useSceneStore } from '../store/useSceneStore'; 


useGLTF.preload('/skateboard.glb'); //loader boardet, returnere nodes (meshes) og materials (materialer) fra skateboardet

export default function Model() {
    //useRef er en hook der giver os mulighed for at oprette en reference til et DOM-element eller en komponent
    //group bliver brugt til at gruppere flere meshes sammen, så vi kan rotere dem som en enhed (hele skateboardet)
    const group = useRef();

    //useGLTF er en hook der giver mulighed for at indlæse 3D-modeller i GLTF-format
    //nodes er en samling af alle meshes
    //materials er en samling af alle materialer
    const { nodes, materials } = useGLTF("/skateboard.glb");


    //zustand hooks
    //komponenten re-renderes fx ikke når farven skriftes, hvis vi kun lytter på isRotating
    const color = useSceneStore((state) => state.color); //farven fra zustand store

    const isRotating = useSceneStore((state) => state.isRotating); //er skateboardet i rotation eller ej

    const toggleRotation = useSceneStore((state) => state.toggleRotation); //funktionen til at skifte rotation
    

    //skrifter farve når color ændres
    useEffect(() => {
        if (materials.deckBack) {
            materials.deckBack.color = new Color(color); //konvertere hex-strengen til three.color-object
        }
    }, [color, materials]); //kører hver gang global color ændres


    //kører hver frame og hvis isRotating er true, så roterer skateboardet (group) mod uret
    //bruger "_" da jeg ikke bruger "state" i funktionen
    useFrame((_, delta) => {
        if (isRotating && group.current) group.current.rotation.y -= delta * 0.1; //bruger delta til at gøre rotationen uafhængig af FPS
    });


    return (
        <group 
        ref={group} //refererer til three.group så vi kan rotere hele skateboardet i en enhed
        rotation={[Math.PI, 0, 0]} //vender skateboardet så den loader omvendt
        onClick={(e) => {
            e.stopPropagation(); //stopper eventet fra at gå videre til de andre elementer
            toggleRotation(); //pauser eller starter rotationen
        }}
        dispose={null} //drei smider selv geometry og materialer ud, når gruppen unmountes

        >
            <mesh
            geometry={nodes.Plane_2.geometry}
            material={materials.deckBack}
            castShadow
            receiveShadow
            >
            </mesh>
            <mesh
            geometry={nodes.Plane_3.geometry}
            material={materials.deckTop}
            castShadow
            receiveShadow
            >
            </mesh>
            <mesh
            geometry={nodes.Plane_1.geometry}
            material={materials.deckSide}
            castShadow
            receiveShadow
            >
            </mesh>
        </group>
    );
}
