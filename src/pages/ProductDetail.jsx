// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2 className="not-found-title">Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container product-detail">
      <div className="product-container">
        <div className="product-content">
          <div className="product-image-wrapper">
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image"
            />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">${product.price}</p>
            
            <h2 className="section-title">Description</h2>
            <p className="product-description">{product.description}</p>
            
            <p className="product-category">
              Category: <span className="capitalize">{product.category}</span>
            </p>
            
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;