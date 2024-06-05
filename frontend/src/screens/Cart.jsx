import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useCartDispatch } from "../components/contextReducer";
import axios from "axios";
export default function Cart() {
    let data = useCart();
    let dispatch = useCartDispatch();
    if (data.length === 0) {
      return (
        <div>
          <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
        </div>
      )
    }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("userEmail");
      // console.log(data,localStorage.getItem("userEmail"),new Date())
      let response = await axios.post("http://localhost:5000/orders/order-data", {
        email: userEmail,
        order_data: data,
        order_date: new Date()
      })
     
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
    }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      {/* {console.log(data)} */}
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md text-white ">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qnty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
