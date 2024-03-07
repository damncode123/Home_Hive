import React from 'react'
import { useState, useEffect } from "react";
import "../styles/WishList.css"
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../Components/Loader";
import ListingCard from "../Components/ListingCard";
// import Footer from "../Components/Footer"
const CategoryPage = () => {
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
  
    const dispatch = useDispatch()
    const listings = useSelector((state) => state.listings);
  
    const getFeedListings = async () => {
      try {
        const response = await fetch(
            `http://localhost:5000/Home-Hive/properties?category=${category}`,
          {
            method: "GET",
          }
        );
  
        const data = await response.json();
        console.log(data);
        dispatch(setListings({ listings: data }));
        setLoading(false);
      } catch (err) {
        console.log("Fetch Listings Failed", err.message);
      }
    };
  
    useEffect(() => {
      getFeedListings();
    }, [category]);
  
    return loading ? (
      <Loader />
    ) : (
      <>
        <Navbar />
        <h1 className="title-list">{category} listings</h1>
        <div className="list">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
        {/* <Footer /> */}
      </>
    );
}

export default CategoryPage;
