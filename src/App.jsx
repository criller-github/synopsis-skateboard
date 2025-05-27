// formål: wrapper komponenten der har 3D-scenen i baggrunden, titel i hjørnet og farvevælgeren i bunden
import Experience from './three/Experience.jsx' //henter 3D-scenen
import { useSceneStore } from './store/useSceneStore.js' //henter den globale hook fra zustand
import ColorSwatches from './ui/ColorSwatches.jsx' //henter farve knapperne

function App() {
  //komponenten har ingen lokal state, så den er kun et "vindue" ud mod den globale state
  const color = useSceneStore((state) => state.color); //kigger kun på color feltet i global state 

  return (
    <> {/* react fragment, så vi kan returnere flere elementer uden at wrappe dem i en div */}
      {/* fuldskærm flex container med relative så absolute-placereret ting kan måles fra den */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* 3D figuren som ligger bag alt pga absolute og z-0 i experience.jsx */}
        <Experience></Experience>

        {/* titel - stor responsiv (clamp) overskrift og kan klikkes på 3D objektet igennem teksten (pointer-events-none) */}
        <p className="absolute top-10 left-5
        text-[clamp(2.75rem,15vw,8.75rem)]
        leading-none font-bold uppercase text-white opacity-75 pointer-events-none whitespace-nowrap">
          c-boards
        </p>

        {/* farve vælger - sidder nederst centreret med overskrift og colorswatches inde i */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none">
          <h2 className="text-3xl text-white uppercase">
            deck&nbsp;color
          </h2>

          {/* farve swatches */}
          <div className="pointer-events-auto">
            <ColorSwatches />
          </div>
        </div>

      </div>

    </>
  );
}

export default App
