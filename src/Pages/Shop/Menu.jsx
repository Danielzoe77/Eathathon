import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { FaFilter } from "react-icons/fa6";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // loading data
  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      try {
        // const response = await fetch("http://localhost:3000/menu");
        const response = await fetch("https://foodie-backend-umhd.onrender.com/menu");
        // const response = await fetch(`${API_BASE_URL}/menu`);
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // const filterItems = (category) => {
  //   setSelectedCategory(category);
  //   if (category === "all") {
  //     setFilteredItems(menu);
  //   } else {
  //     const filtered = menu.filter((item) => item.category === category);
  //     setFilteredItems(filtered);
  //   }
  // };

  // show All
  const showAll = () => {
    setSelectedCategory("all");
    setFilteredItems(menu);
    setCurrentPage(1);
  };

  //sorting based on A-Z, Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    if (option === "default") {
      setFilteredItems(menu);
    } else if (option === "A-Z") {
      const sortedItems = [...filteredItems].sort((a, b) =>
        a.name.trim().localeCompare(b.name.trim())
      );
      setFilteredItems(sortedItems);
    } else if (option === "Z-A") {
      const sortedItems = [...filteredItems].sort((a, b) =>
        b.name.trim().localeCompare(a.name.trim())
      );
      setFilteredItems(sortedItems);
    } else if (option === "low-high") {
      const sortedItems = [...filteredItems].sort((a, b) => a.price - b.price);
      setFilteredItems(sortedItems);
    } else if (option === "high-low") {
      const sortedItems = [...filteredItems].sort((a, b) => b.price - a.price);
      setFilteredItems(sortedItems);
    }
    setCurrentPage(1);
  };

  // pagination logic

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%   ">
        <div className="py-48 flex flex-col  justify-center items-center gap-8">
          {/* text   */}
          <div className=" text-center space-y-7 px-4">
            <h2 className="text-4xl leading-snug md:text-5xl  md:leading-snug font-bold">
              For the love of Delicious
              <span className="text-green  "> Food</span>
            </h2>
            <p className="text-xl text-[#4a4a4a] md:w-4/5 mx-auto  ">
              {" "}
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>

            <button className="btn bg-green px-8 py-4 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className=" section-container">
        {/* filtering btns and sorting btns */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* all categories */}
          <div className="flex mb-4 flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap ">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("popular")}
              className={selectedCategory === "popular" ? "active" : ""}
            >
              Popular
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
             <button
              onClick={() => filterItems("fruits")}
              className={selectedCategory === "fruits" ? "active" : ""}
            >
              Fruits
            </button>
          </div>

          {/* sorting and filter */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className=" bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>

            {/* sortin option */}

            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-high">Low-High</option>
              <option value="High-low">Default</option>
            </select>
          </div>
        </div>

        {/* product cards */}

        <div className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* pagination section */}

      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
