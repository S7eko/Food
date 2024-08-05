import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarRegular } from "@fortawesome/free-solid-svg-icons";
import './card.module.css';

const OneProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://fakestoreapi.com/products/${id}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const totalStars = 5;

    return [...Array(totalStars)].map((_, index) => {
      if (index < fullStars) {
        return <FontAwesomeIcon key={index} className="star" icon={faStar} />;
      } else if (index === fullStars && halfStar) {
        return <FontAwesomeIcon key={index} className="star" icon={faStarHalfAlt} />;
      } else {
        return <FontAwesomeIcon key={index} className="star" id="star0" icon={faStarRegular} />;
      }
    });
  };

  return (
    <div className="container card mb-3" key={product.id} style={{ maxWidth: "1000px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.image} className="img-fluid rounded-start" alt={product.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <div className="card-footer">
              <div id="card-text1">
                <p className="card-text"><small className="text-body-secondary">Category: {product.category}</small></p>
                <p className="card-text"><small className="text-body-secondary">Price: ${product.price}</small></p>
              </div>
              <div className="rating">
                {renderStars(product.rating.rate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
