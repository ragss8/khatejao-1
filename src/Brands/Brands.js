import React from "react";
import "./Brands.css";
import img1 from "../images/cb.png";
import img2 from "../images/bb.png";
import img3 from "../images/kfc.png";
import img4 from "../images/mcd.jpeg";
import img5 from "../images/lol.png";
import img6 from "../images/on.png";
import img7 from "../images/pp.png";
import img8 from "../images/cw.png";

const Brands = () => {
    return(
    <div className='brands'>
      <div className='image-container'>
        <img src={img1} alt="Pizza" />
        <p className="description">pizza</p>
        </div>
        <div className='image-container'>
        <img src={img2} alt="Pizza" />
        <p className="description">Biryani</p>
        </div>
        <div className='image-container'>
        <img src={img3} alt="Pizza" />
        <p className="description">Burger</p>
        </div>
        <div className='image-container'>
        <img src={img4} alt="Pizza" />
        <p className="description">Dosa</p>
        </div>
        <div className='image-container'>
        <img src={img5} alt="Pizza" />
        <p className="description">Ice-Cream</p>
        </div>
        <div className='image-container'>
        <img src={img6} alt="Pizza" />
        <p className="description">Rolls</p>
        </div>
        <div className='image-container'>
        <img src={img7} alt="Pizza" />
        <p className="description">Cake</p>
        </div>
        <div className='image-container'>
        <img src={img8} alt="Pizza" />
        <p className="description">Tea</p>
        </div>   
    </div>
    );
  };

  export default Brands;