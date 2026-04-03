import React, { useState, useEffect } from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/banners');
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setBanners(data);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length > 1) {
            const interval = setInterval(() => {
                setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, 5000); // 5 seconds swap
            return () => clearInterval(interval);
        }
    }, [banners]);

    const currentBanner = banners.length > 0 ? banners[currentBannerIndex] : null;
    const bannerImage = currentBanner
        ? (currentBanner.image.startsWith('/uploads') ? `http://localhost:5000${currentBanner.image}` : currentBanner.image)
        : '';

    return (
        <div className="home-page">
            {/* HERO SECTION */}
            <section className="hero-section">
                {banners.map((banner, index) => (
                    <div
                        key={banner._id || index}
                        className={`hero-slide ${index === currentBannerIndex ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${banner.image.startsWith('/uploads') ? `http://localhost:5000${banner.image}` : banner.image})`
                        }}
                    ></div>
                ))}

                {/* Fallback if no banners */}
                {banners.length === 0 && !loading && (
                    <div className="hero-slide active fallback-image"></div>
                )}

                <div className="hero-overlay"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="reveal-text">
                            <span className="hero-tag">{currentBanner?.title || "ESTABLISHED 2026"}</span>
                            <h1 className="hero-title">
                                {currentBanner?.subtitle ? (
                                    currentBanner.subtitle.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>{line}<br /></React.Fragment>
                                    ))
                                ) : (
                                    <>Timeless Artistry <br /><span className="gold-text">Modern Elegance</span></>
                                )}
                            </h1>
                            <p className="hero-description">
                                {currentBanner?.description || "Discover a world of exquisite craftsmanship where heritage meets contemporary design. Each piece is meticulously handcrafted to celebrate your most precious moments."}
                            </p>
                            <div className="hero-btns">
                                <button className="btn-primary-gold" onClick={() => navigate("/collections/all")}>
                                    Shop Now
                                </button>
                                <button className="btn-outline-white" onClick={() => navigate("/contact")}>
                                    Bespeak
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {banners.length > 1 && (
                    <div className="hero-dots">
                        {banners.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentBannerIndex ? 'active' : ''}`}
                                onClick={() => setCurrentBannerIndex(index)}
                            ></div>
                        ))}
                    </div>
                )}

                <div className="scroll-indicator">
                    <div className="mouse"></div>
                    <span>Scroll</span>
                </div>
            </section>

            {/* CURATED COLLECTIONS */}
            <section className="curated-collections">
                <div className="container">
                    <div className="section-header-centered">
                        <span className="subtitle">THE CURATION</span>
                        <h2 className="section-title">Signature Collections</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="collections-grid">
                        <div className="collection-box" onClick={() => navigate("/wedding")}>
                            {/* <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200" alt="The Bridal Suite" /> */}
                            <img src="/assets/Weddingshop.jpg" alt="The Bridal Suite" />
                            <div className="box-content">
                                <h3>The Bridal Suite</h3>
                                <p>Ethereal designs for your forever after.</p>
                                {/* <div className="box-actions">
                                    <button className="box-btn-cart" onClick={(e) => { e.stopPropagation(); navigate("/wedding"); }}>CART</button>
                                    <button className="box-btn-buy" onClick={(e) => { e.stopPropagation(); navigate("/wedding"); }}>BUY NOW</button>
                                </div> */}
                                <span className="explore-link">Explore Collection</span>
                            </div>
                        </div>
                        <div className="collection-box" onClick={() => navigate("/diamond")}>
                            {/* <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800" alt="Brilliant Diamonds" /> */}
                            <img src="/assets/Silver1.jpg" alt="Brilliant Diamonds" />
                            <div className="box-content">
                                <h3>Brilliant Diamonds</h3>
                                <p>Unmatched fire and brilliance.</p>
                                {/* <div className="box-actions">
                                    <button className="box-btn-cart" onClick={(e) => { e.stopPropagation(); navigate("/diamond"); }}>CART</button>
                                    <button className="box-btn-buy" onClick={(e) => { e.stopPropagation(); navigate("/diamond"); }}>BUY NOW</button>
                                </div> */}
                                <span className="explore-link">Shop Diamonds</span>
                            </div>
                        </div>
                        <div className="collection-box" onClick={() => navigate("/gold")}>
                            {/* <img src="https://images.unsplash.com/photo-1611085583191-a3b1a308c02c?q=80&w=800" alt="Aura Gold" /> */}
                            <img src="/assets/s1.jpg" alt="Aura Gold" />
                            <div className="box-content">
                                <h3>Aura Gold</h3>
                                <p>Minimalist gold for everyday luxury.</p>
                                {/* <div className="box-actions">
                                    <button className="box-btn-cart" onClick={(e) => { e.stopPropagation(); navigate("/gold"); }}>CART</button>
                                    <button className="box-btn-buy" onClick={(e) => { e.stopPropagation(); navigate("/gold"); }}>BUY NOW</button>
                                </div> */}
                                <span className="explore-link">View Designs</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* BRAND STORY / HERITAGE */}
            <section className="brand-heritage">
                <div className="container">
                    <div className="heritage-flex">
                        <div className="heritage-text">
                            <span className="subtitle">THE ATELIER</span>
                            <h2 className="section-title">A Legacy of <br />Purism & Precision</h2>
                            <p>
                                For over two decades, Rika Jewells has stood as a beacon of trust in the world of high jewellery.
                                Our journey began in 1998 with a simple vision: to create pieces that are as pure as the emotions they represent.
                            </p>
                            <p>
                                Every gemstone is hand-selected, and every setting is hand-finished by our master artisans in our signature ateliers.
                                We don't just sell jewellery; we preserve moments in gold and stone.
                            </p>
                            <button className="btn-text-link" onClick={() => navigate("/about")}>Learn Our Story —</button>
                        </div>
                        <div className="heritage-image">
                            <img src="/assets/craftsmanship.jpg" alt="Craftsmanship" />
                            <div className="image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRESS / AS SEEN IN */}
            <section className="press-section">
                <div className="container">
                    <div className="press-logos">
                        <span className="press-label">AS FEATURED IN</span>
                        <div className="logo-grid">
                            <span>VOGUE</span>
                            <span>BAZAAR</span>
                            <span>ELLE</span>
                            <span>BRIDES</span>
                            <span>FORBES</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORY NAV */}
            <section className="category-nav-elegant">
                <div className="container">
                    <div className="nav-grid">
                        {[
                            { name: 'Gold', icon: '💍' },
                            { name: 'Diamond', icon: '💎' },
                            { name: 'Platinum', icon: '⛓️' },
                            { name: 'Wedding', icon: '👰' },
                            { name: 'Gifting', icon: '🎁' }
                        ].map((cat) => (
                            <div key={cat.name} className="nav-item" onClick={() => navigate(`/${cat.name.toLowerCase()}`)}>
                                <span className="cat-icon">{cat.icon}</span>
                                <span className="cat-name">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* TESTIMONIALS */}
            <section className="testimonials-luxury">
                <div className="container">
                    <div className="testimonial-content">
                        <span className="quote-mark">“</span>
                        <p className="testimonial-text">
                            The craftsmanship is unparalleled. My heritage necklace from Rika Jewells
                            isn't just a piece of jewellery; it's a family heirloom that carries
                            stories for generations to come.
                        </p>
                        <span className="testimonial-author">— RIDDHI PATEL, COLLECTOR</span>
                    </div>
                </div>
            </section>

            {/* GIFT CONCIERGE CTA */}
            <section className="gift-concierge">
                <div className="container">
                    <div className="concierge-card">
                        <div className="concierge-text">
                            <span className="subtitle">EXPERT GUIDANCE</span>
                            <h3>The Gift Concierge</h3>
                            <p>Find the perfect expression of your love with the help of our private consultants.</p>
                            <button className="btn-outline-white" onClick={() => navigate("/contact")}>Book an Appointment</button>
                        </div>
                        <div className="concierge-image">
                            <img src="/assets/Gift.jpg" alt="Gift Concierge" />
                        </div>
                    </div>
                </div>
            </section>

            {/* THE PROMISE (MINIMALIST) */}
            <section className="rika-promise-minimal">
                <div className="container">
                    <div className="promise-flex">
                        <div className="promise-item">
                            <span className="promise-icon">🛡️</span>
                            <h4>Certified Purity</h4>
                            <p>GIA, IGI & BIS Hallmarked.</p>
                        </div>
                        <div className="promise-item">
                            <span className="promise-icon">✨</span>
                            <h4>Lifetime Care</h4>
                            <p>Exchange & maintenance for life.</p>
                        </div>
                        <div className="promise-item">
                            <span className="promise-icon">🌍</span>
                            <h4>Insured Shipping</h4>
                            <p>Global secure door-step delivery.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE RIKA SOCIETY (EDITORIAL NEWSLETTER) */}
            <section className="rika-society">
                <div className="container">
                    <div className="society-grid">
                        <div className="society-info">
                            <span className="subtitle">PRIVATE CIRCLE</span>
                            <h2>The Rika Society</h2>
                            <p>
                                Join an exclusive fellowship of connoisseurs. Members receive
                                priority access to bespoke collections, private viewings, and
                                seasonal atelier reports.
                            </p>
                            <form className="society-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Application via Email" required />
                                <button type="submit">REQUEST INVITE</button>
                            </form>
                        </div>
                        <div className="society-visual">
                            {/* <img src="/assets/A_Diamond_Ring_with_vibrant_background.jpg" alt="Exclusivity" /> */}
                            <img src="/assets/circle.jpg" alt="Rika Circle" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER PROFESSIONAL */}
            <footer className="footer-professional">
                <div className="container">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="footer-logo">RIKA JEWELLS</div>
                            <p>Exquisite craftsmanship since 1998.</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h5>Collections</h5>
                                <ul>
                                    <li onClick={() => navigate("/wedding")}>The Bridal Suite</li>
                                    <li onClick={() => navigate("/diamond")}>Brilliant Diamonds</li>
                                    <li onClick={() => navigate("/gold")}>Aura Gold</li>
                                    <li onClick={() => navigate("/silver")}>Sterling Silver</li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h5>Services</h5>
                                <ul>
                                    <li onClick={() => navigate("/bespoke")}>Bespoke Design</li>
                                    <li onClick={() => navigate("/repair")}>Jewellery Care</li>
                                    <li onClick={() => navigate("/consultation")}>Private Consultation</li>
                                    <li onClick={() => navigate("/certification")}>Certification</li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h5>Contact</h5>
                                <ul>
                                    <li>Flagship Store</li>
                                    <li>+91 99999 88888</li>
                                    <li>concierge@rikajewells.com</li>
                                    <li onClick={() => navigate("/contact")}>Store Locator</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 Rika Jewells. All Rights Reserved.</p>
                        <div className="social-links">
                            <span>Instagram</span>
                            <span>Facebook</span>
                            <span>Pinterest</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
