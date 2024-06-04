import React, { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {id:action.id,name:action.name,price:action.price,qnty:action.qnty,size:action.size,img:action.img}];            
        case "REMOVE":
             let newArr = [...state];
             newArr.splice(action.index,1);
              return newArr;
        case "UPDATE":
            let updateArr = [...state];
            updateArr.find((food,index)=>{
              if(food.id===action.id){
                updateArr[index]={...food,qnty:parseInt(action.qnty)+food.qnty,price : action.price+food.price}
              }
            
            return updateArr;
            });
        default:
           console.log("Invalid Action");
    }
};

const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  return (
    <div>
      <cartDispatchContext.Provider value={dispatch}>
        <cartStateContext.Provider value={state}>
          {children}
        </cartStateContext.Provider>
      </cartDispatchContext.Provider>
    </div>
  );
};

export const useCart = ()=>useContext(cartStateContext);

export const useCartDispatch = ()=>useContext(cartDispatchContext);

export default CardProvider;
