import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const MyOrderData = () => {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/orders/myorder-data", {
        email: localStorage.getItem("userEmail")
      });
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <div className='row'>
          {orderData && orderData.data && orderData.data.order_data ? (
            orderData.data.order_data.slice(0).reverse().map((item, index) => (
              <div key={index}>
                {item.map((arrayData, idx) => (
                  <div key={idx}>
                    {arrayData.Order_date ? (
                      <div className='m-auto mt-5'>
                        {arrayData.Order_date}
                        <hr />
                      </div>
                    ) : (
                      <div className='col-12 col-md-6 col-lg-3'>
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                          <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                          <div className="card-body">
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                              <span className='m-1'>{arrayData.qnty}</span>
                              <span className='m-1'>{arrayData.size}</span>
                              <span className='m-1'>{arrayData.Order_date}</span>
                              <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No order data found</div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default MyOrderData;
    