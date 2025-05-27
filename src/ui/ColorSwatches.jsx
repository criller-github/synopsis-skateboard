//formål: At vise en række farveprøver, som brugeren kan vælge imellem.
import { memo } from 'react'; //en react optimering der gør at komponenten kun re-renders hvis props ændres
import { useSceneStore } from '../store/useSceneStore'; //importerer vores zustand store

export default memo(function ColorSwatches() {
    //tager kun præcis de to ting, så der kun re-renderes når lige netop de to ting ændres
    const color = useSceneStore((state) => state.color); //henter farven fra zustand store
    const setColor = useSceneStore((state) => state.setColor); //henter setColor funktionen fra zustand store

    const palette = ['#fc4338', '#ffd166', '#32beb1', '#f8f9fa', '#6465F5']; //pallette array af farver brugeren kan vælge imellem

    return (
        <div className="flex gap-3">
            {/* loop over farver, hver farve bliver til en knap */}
            {palette.map((hex) => { 
                const selected = color === hex; //her sammenligner vi den valgte farve med den aktuelle farve og sætter selected til true hvis de er ens
                return (
                    //key er en unik nøgle for hver farve, så react kan holde styr på dem
                    //onClick sætter den valgte farve til den farve der er klikket på
                    //når man klikker kører den globale action setColor som patcher state (color:hex)
                    //og alle komponenter der bruger color (App, Model, ColorSwitches) vil re-render
                    <button key={hex} onClick={() => setColor(hex)} 
                    aria-label={`vælg farve ${hex}`}
                    className={`w-10 h-10 rounded-full transition-transform 
                        ${selected ? "ring-[3px] ring-white scale-[1.15]" : " ring-transparent hover:scale-110"}`}
                        style={{ background: hex }}
                        />
                    );
                })}
        </div>
    );
});
