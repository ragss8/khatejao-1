import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import '../User/Main.css';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";
import Brands from "../Brands/Brands";
import Header  from '../Header/Header';
import Advertisement from '../Ad/Advertisement';
import NavigationBar from '../Nav/NavigationBar';

const Main = () => {
  const location = useLocation();
  const sessionToken = location.state?.sessionToken;
  const handleLogout = () => {
    axios
      .post('http://localhost:8000/logout', { session_token: sessionToken })
      .then((response) => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
        }
      });      
  };

  const Restaurant = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [averageRating, setAverageRating] = useState('');
    const [restaurantPhoto, setRestaurantPhoto] = useState(null);
    const [restaurantLicense, setRestaurantLicense] = useState(null);
    const [businessRegistration, setBusinessRegistration] = useState(null);
    const [healthAndSafetyCertificates, setHealthAndSafetyCertificates] = useState(null);
    const [taxRegistration, setTaxRegistration] = useState(null);
    const [state, setState] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
  
    const handleRestaurantSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append('restaurantPhoto', restaurantPhoto);
        formData.append('restaurantLicense', restaurantLicense);
        formData.append('businessRegistration', businessRegistration);
        formData.append('healthAndSafetyCertificates', healthAndSafetyCertificates);
        formData.append('taxRegistration', taxRegistration);
      
        const payload = {
          restaurantName,
          address,
          phoneNumber,
          email,
          password,
          cuisineType,
          openingHours,
          deliveryTime,
          averageRating,
        };
      
        axios
          .post('http://localhost:8000/store-restaurant', { formData, payload })
          .then((response) => {
            console.log('Restaurant information stored successfully:', response.data);
            setRestaurantPhoto(null);
            setRestaurantLicense(null);
            setBusinessRegistration(null);
            setHealthAndSafetyCertificates(null);
            setTaxRegistration(null);
          })
          .catch((error) => {
            console.error('Error storing restaurant information:', error);
          });
      };
  
    const handlePhotoChange = (event, setState) => {
      const file = event.target.files[0];
      setState(file);
    };

    const handleDetailing = (event) => {
        const file = event.target.files[0];
        setState(file);
    }

    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked);
      };

      
  
    return (
        <div>
            <div className="policies-terms" style={{width:"1400px"}}>
            <h2>Terms and Conditions *</h2>
            <p>Privacy Policy: The privacy policy describes how the app collects, uses, and protects the personal information of the food delivery partners. It may include details about data sharing, storage, and security measures.</p>
            <p>Acceptable Use Policy: The acceptable use policy sets forth guidelines for the appropriate and responsible use of the app and its services. It may prohibit actions such as harassment, discrimination, fraud, or any illegal activities.</p>
            <p>Code of Conduct: The code of conduct outlines expected behavior and professional conduct for food delivery partners. It may include guidelines on professionalism, punctuality, proper attire, and customer interactions.</p>
            <p>Insurance and Liability: The app may require food delivery partners to maintain appropriate insurance coverage for their vehicles, liability, and personal injury. It may outline the responsibilities and liabilities of partners in case of accidents or damages during delivery.</p>
            <p>Modification and Termination: The app may state its right to modify the terms and conditions, policies, or notices at any time. It may also outline the circumstances under which the partnership agreement can be terminated by either party.</p>
            <p>Dispute Resolution: The app may provide information on the process for resolving disputes, including mediation or arbitration procedures, and the jurisdiction or governing law applicable to any legal actions.</p>
            <p>Compliance with Laws: The agreement may emphasize the obligation for food delivery partners to comply with all applicable laws and regulations related to food safety, transportation, employment, and any other relevant legislation.</p>
            <p>Communication and Notices: The app may specify how it will communicate with partners and deliver important notices or updates, such as changes in policies or service updates. It may require partners to maintain updated contact information.</p>
            <label>
              <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />
              <b>I agree to the terms and policies.</b>
            </label>
            </div>
        <div className="restaurant-form">
          <h2>Restaurant Form</h2>
          <form onSubmit={handleRestaurantSubmit}>
            <label>
              Restaurant Name:
              <input type="text" id="restaurantName" required />
            </label>
            <label>
              Address:
              <input type="text" id="address" required />
            </label>
            <label>
              Phone Number:
              <input type="tel" id="phoneNumber" required />
            </label>
            <label>
              Email:
              <input type="email" id="email" required />
            </label>
            <label>
              Cuisine Type:
              <input type="text" id="cuisineType" required />
            </label>
            <label>
              Opening Hours:
              <input type="time" id="openingHours" step="900" required />
            </label>
            <label>
              Delivery Time:
              <input type="time" id="deliveryTime" step="900" required />
            </label>
            <label>
              Average Rating:
              <input type="number" id="averageRating" step="0.1" min="0" max="5" required />
            </label>
            <label>
              Restaurant Photo:
              <input type="file" id="restaurantPhoto" accept="image/*" onChange={handlePhotoChange} required />
            </label>
            <label>
              License:
              <input type="file" id="restaurantLicense" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleDetailing} required />
            </label>
            <label>
              Owner's ID Proof:
              <input type="file" id="ownersIdProof" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleDetailing}  required />
            </label>
            <label>
              Business Registration:
              <input type="file" id="businessRegistration" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleDetailing} required />
            </label>
            <label>
              Address Verification:
              <input type="file" id="addressVerification" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleDetailing} required />
            </label>
            <label>
              Health and Safety Certificates:
              <input type="file" id="healthAndSafetyCertificates" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleDetailing}  required />
            </label>
            <label>
              Tax Registration:
              <input type="file" id="taxRegistration" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" onChange={handleDetailing} required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      );
};

  return (
    <div className='main'>
      <Header />
      <NavigationBar handleLogout={handleLogout} />
      <div className='container'>
      <Sidebar />
      <div className='content'>
      {/* <PartnerProfile/> */}
      <Restaurant/>
      <Advertisement/>
      <h3>Browse by Brands :</h3>
      <Brands />
      </div>
      </div>
    </div>
  );
};

export default Main;
