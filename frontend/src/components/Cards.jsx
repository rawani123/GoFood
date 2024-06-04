import React, { useState, useRef, useEffect } from "react";
import { useCartDispatch, useCart } from "./contextReducer";

const Cards = (props) => {
  const priceOptions = Object.keys(props.options);

  let dispatch = useCartDispatch();

  let cart = useCart();

  const [qnty, setQnty] = useState(1);
  const [size, setSize] = useState("");

  let priceRef = useRef();

  const finalPrice = parseInt(props.options[size]) * qnty;

  const handleClick = async () => {
    let food = [];
    for (const item of cart) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
      if (food.length !== 0) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: props.foodItems._id,
            qnty: qnty,
            price: finalPrice,
          });
          return;
        }else if(food.size !== size){
          await dispatch({
            type: "ADD",
            id: props.foodItems._id,
            name: props.foodItems.name,
            price: finalPrice,
            qnty: qnty,
            size: size,
            img: props.foodItems.img,
          });
          return;
        }
        return;
      }
    }
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qnty: qnty,
      size: size,
      img: props.foodItems.img,
    });
    console.log(cart);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItems.img}
          className="card-img-top"
          height={150}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded "
              onChange={(e) => setQnty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              id=""
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>

            <div className="d-inline h-100 fs-5">Rs {finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
