import {create} from "zustand"

 const useFoodStore = create((set) => ({
  foodName: "",                      
  setFoodName: (name) => set({ foodName: name }),
}));

export default useFoodStore;