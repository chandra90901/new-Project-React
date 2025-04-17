import React, { useEffect, useState } from "react";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";//React-Bootstrap
import "./Home.css";
import homeImage from "./images/unnamed.jpg";
import dairyImage from "./images/dairy.jpg";
import snacksImage from "./images/snacks.jpg";
import bakeryImage from "./images/bakery.jpg";
import foodImage from "./images/food.webp";
import teaImage from "./images/tea.jpg";
import fruitsImage from "./images/fruits.jpg";
import drinksImage from "./images/drinks.jpg";
import meatImage from "./images/meat.jpg";
import careImage from "./images/care.jpg";
import cleanImage from "./images/clean.jpg";
import petcareImage from "./images/petcare.webp";
import grainsImage from "./images/grains.jpg";
import haldiramIamge from "./images/haldiram.jpg";
import nutriImage from "./images/nutriChoice.jpg";
import laysImage from "./images/lays.jpg";
import oreoImage from "./images/oreo.jpg";
import milkImage from "./images/amul.jpg";
import juiceImage from "./images/mixedjuice.jpg"


const Home = () => {
    const [user, setUser] = useState(null);
    const [popularProducts, setPopularProducts] = useState([
        {
            id: 1,
            category: "Snack & Munchies",
            name: "Haldiram's Sev Bhujia",
            weight: "400g",
            price: 55,
            discountPrice: 50,
            image: haldiramIamge,
            discount: "5% OFF"
        },
        {
            id: 2,
            category: "Bakery & Biscuits",
            name: "NutriChoice Digestive",
            weight: "250g",
            price: 25,
            discountPrice: 20,
            image: nutriImage,
            discount: "2% OFF"
        },
        {
            id: 3,
            category: "Snack & Munchies",
            name: "Lays Classic Salted",
            weight: "150g",
            price: 30,
            discountPrice: 27,
            image: laysImage,
            discount: "10% OFF"
        },
        {
            id: 4,
            category: "Bakery & Biscuits",
            name: "Oreo Chocolate",
            weight: "120g",
            price: 40,
            discountPrice: 35,
            image: oreoImage,
            discount: "12% OFF"
        },
        {
            id: 5,
            category: "Dairy, Bread & Eggs",
            name: "Amul Full Cream Milk",
            weight: "1L",
            price: 65,
            discountPrice: 60,
            image: milkImage,
            discount: "7% OFF"
        },
        {
            id: 6,
            category: "Cold Drink & Juices",
            name: "Real Mixed Fruit Juice",
            weight: "1L",
            price: 110,
            discountPrice: 99,
            image: juiceImage,
            discount: "10% OFF"
        }
    ]);


    const categories = [
        { name: "Dairy, Bread & Eggs", image: dairyImage },
        { name: "Snack & Munchies", image: snacksImage },
        { name: "Bakery & Biscuits", image: bakeryImage },
        { name: "Instant Food", image: foodImage },
        { name: "Tea, Coffee & Drinks", image: teaImage },
        { name: "Fruits & Vegetables", image: fruitsImage },
        { name: "Cold Drink & Juices", image: drinksImage },
        { name: "Chicken, Meat & Fish", image: meatImage },
        { name: "Baby Care", image: careImage },
        { name: "Cleaning Essentials", image: cleanImage },
        { name: "Pet Care", image: petcareImage },
        { name: "Atta, Salt & Dal", image: grainsImage }
    ];


    return (
        <div>
            <div style={{
                position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundImage: `url(${homeImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: -1,
            }}></div>
            <div className="supermarket-home">
                <section className="categories-section">
                    <div className="section-header">
                        <h3>Shop Popular Categories</h3>
                        <Button variant="link">View all</Button>
                    </div>
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <div key={index} className="category-card">
                                <img src={category.image} alt={category.name} className="category-img" />
                                <h6>{category.name}</h6>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Promotional Banners */}
                <Carousel className="promo-carousel">
                    <Carousel.Item>
                        <div className="promo-banner fruits-promo">
                            <h3>Fruits & Vegetables</h3>
                            <p>Get Upto 30% Off</p>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="promo-banner bakery-promo">
                            <h3>Freshly Baked Buns</h3>
                            <p>Get Upto 25% Off</p>
                        </div>
                    </Carousel.Item>
                </Carousel>

                {/* Popular Products */}
                <section className="products-section">
                    <div className="section-header">
                        <h3>Popular Products</h3>
                        <Button variant="link">View all</Button>
                    </div>
                    <div className="products-grid">
                        {popularProducts.map(product => (
                            <Card key={product.id} className="product-card">
                                <div className="product-badge">{product.category}</div>
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.weight}</Card.Text>
                                    <div className="price-section">
                                        <span className="original-price">${product.price}</span>
                                        <span className="discount-price">${product.discountPrice}</span>
                                        {product.discount && <span className="discount-badge">{product.discount}</span>}
                                    </div>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Daily Deals */}
                <section className="daily-deals">
                    <h3>Daily Best Sells</h3>
                    <div className="deals-grid">
                        {/* Map through daily deals here */}
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div>
                        <Row>
                            <Col md={3}>
                                <div className="feature-box">
                                    <i className="fas fa-clock"></i>
                                    <h4>10 minute grocery now</h4>
                                    <p>Get your order delivered to your doorstep at the earliest from Eatpure pickup stores near you.</p>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="feature-box">
                                    <i className="fas fa-tag"></i>
                                    <h4>Best Prices & Offers</h4>
                                    <p>Cheaper prices than your local supermarket, great cashback offers to top it off.</p>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="feature-box">
                                    <i className="fas fa-boxes"></i>
                                    <h4>Wide Assortment</h4>
                                    <p>Choose from 5001+ products across food, personal care, household and more.</p>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="feature-box">
                                    <i className="fas fa-exchange-alt"></i>
                                    <h4>Easy Returns</h4>
                                    <p>Not satisfied with a product? Return it at the doorstep & get a refund within hours.</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* Footer */}
                <footer className="supermarket-footer">
                    <Container>
                        <Row>
                            <Col md={3}>
                                <h5>Category</h5>
                                <ul>
                                    {[
                                        "Vegetables & Fruits",
                                        "Breakfast & instant food",
                                        "Bakery & Biscuits",
                                        "Atta, rice & dal",
                                        "Sauces & spreads",
                                        "Organic & gourmet"
                                    ].map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </Col>
                            <Col md={3}>
                                <h5>Useful Links</h5>
                                <ul>
                                    {[
                                        "Home",
                                        "Listing",
                                        "Checkout",
                                        "Product Detail",
                                        "My Account",
                                        "FAQ"
                                    ].map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </Col>
                            <Col md={6}>
                                <h5>Get deliveries with App</h5>
                                <div className="app-download">
                                    <Button variant="dark"><i className="fab fa-apple"></i> App Store</Button>
                                    <Button variant="dark"><i className="fab fa-google-play"></i> Google Play</Button>
                                </div>
                                <div className="social-links">
                                    <h5>Follow us</h5>
                                    {['facebook', 'twitter', 'instagram'].map((social, index) => (
                                        <a key={index} href="#"><i className={`fab fa-${social}`}></i></a>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                        {/* <div className="copyright">
                        <p>© Copyright 2023 Ram Super Market, All rights reserved.</p>
                    </div> */}
                    </Container>
                </footer>
            </div>
        </div>
    );
};

export default Home;