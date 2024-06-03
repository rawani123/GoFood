import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Crausol from "../components/Crausol";
import axios from "axios";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [catFood, setCatFood] = useState([]);
  const [search, setSearch] = useState("");

  const foodData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/food/food-data"
      );
      setFoodItems(data[0]);
      setCatFood(data[1]);
    } catch (error) {
      console.log("Error in fetching food data: ", error.message);
    }
  };

  useEffect(() => {
    foodData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" style={{ maxHeight: "500px" }}>
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex ">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?noodles"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?drinks"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {catFood.length > 0 ? (
          catFood.map((cat) => (
            <div key={cat._id} className="mb-4">
              <div className="fs-3 m-3">{cat.CategoryName}</div>
              <hr />
              <div className="row">
                {foodItems.length > 0 ? (
                  foodItems
                    .filter((item) => (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItem) => (
                      <div
                        key={filterItem._id}
                        className="col-12 col-md-6 col-lg-3 mb-4"
                      >
                        <Cards
                          foodName={filterItem.name}
                          options={filterItem.options[0]}
                          imgSrc={filterItem.img}
                        />
                      </div>
                    ))
                ) : (
                  <div>No data found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
