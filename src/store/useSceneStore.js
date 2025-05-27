//lille state management API til at holde styr på to felter (color og isRotating) og to actions (setColor og toggleRotation)
//som alle komponenter kan bruge til at ændre state og re-render

import { create } from 'zustand'; //create() bruges til at oprette en zustand store (samle state og actions ét sted)

//custom react hook, som kalder create() og sender resultatet som useSceneStore
export const useSceneStore = create((set) => ({
    color: '#fc4338', //default color
    setColor: (hex) => set({ color:hex}), //funktion til at ændre farven. set(objekt) betyder at kun feltet color ændres til hex

    isRotating: true, //boolean der bestemmer om skateboardet roterer eller ej
    toggleRotation: () => set((state) => ({ isRotating: !state.isRotating })), //set(funktion) modtager den nuværende state og skifter isRotating til det modsatte (true/false)
}));
