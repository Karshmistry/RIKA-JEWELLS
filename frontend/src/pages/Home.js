import React, { useState, useEffect } from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";
import heroProf from "../assets/hero-prof.png";
import weddingProf from "../assets/wedding-prof.png";
import goldProf from "../assets/gold-prof.png";
import diamondProf from "../assets/diamond-prof.png";
import societyProf from "../assets/society-prof.png";

function Home() {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch('/api/banners');
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
        const totalSlides = banners.length > 0 ? banners.length : 2;
        if (totalSlides > 1) {
            const interval = setInterval(() => {
                setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % totalSlides);
            }, 5000); // 5 seconds swap
            return () => clearInterval(interval);
        }
    }, [banners.length]);

    const currentBanner = banners.length > 0 ? banners[currentBannerIndex] : null;
    const bannerImage = currentBanner
        ? (currentBanner.image.startsWith('/uploads') ? `${currentBanner.image}` : currentBanner.image)
        : '';

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 50;
        const moveY = (clientY - window.innerHeight / 2) / 50;
        setMousePos({ x: moveX, y: moveY });
    };

    return (
        <div className="home-page">
            {/* HERO SECTION */}
            <section className="hero-section" onMouseMove={handleMouseMove}>
                {(banners.length > 0 ? banners : [1, 2]).map((banner, index) => {
                    const mainImg = banners.length > 0
                        ? (banner.image.startsWith('/uploads') ? `${banner.image}` : banner.image)
                        : (index === 0 ? diamondProf : goldProf);

                    return (
                        <div key={index} className={`hero-slide-group ${index === currentBannerIndex ? 'active' : ''}`}>
                            <div className="layer-main-bg" style={{ backgroundImage: `url(${mainImg})` }}></div>
                            <div className="hero-gradient-overlay"></div>
                        </div>
                    );
                })}

                <div className="container hero-container">
                    <div className="hero-content">
                        {banners.length > 0 ? (
                            <div className="reveal-text-premium animate-up">
                                <span className="hero-tag-premium">{currentBanner?.title || "ATELIER"}</span>
                                <h1 className="hero-title-premium">{currentBanner?.subtitle || "Luminous Craftsmanship"}</h1>
                                <div className="hero-promo-block">
                                    <h2 className="hero-promo-title">{currentBanner?.promoCode || "20% OFF"}</h2>
                                    <p className="hero-promo-subtitle">{currentBanner?.description || "On Select Items"}</p>
                                </div>
                                <div className="hero-btns-v2">
                                    <button className="btn-editorial" onClick={() => navigate("/collections/all")}>Shop Now</button>
                                    <button className="btn-editorial-outline" onClick={() => navigate("/contact")}>Bespeak</button>
                                </div>
                            </div>
                        ) : (
                            currentBannerIndex === 0 ? (
                                <div className="reveal-text-premium animate-up">
                                    <span className="hero-tag-premium">ORIGEM'S</span>
                                    <h1 className="hero-title-premium">Classic Solitaires</h1>
                                    <div className="hero-promo-block">
                                        <h2 className="hero-promo-title">20% OFF</h2>
                                        <p className="hero-promo-subtitle">On Diamond Value</p>
                                    </div>
                                    <p className="hero-description-premium">Shine bright, pay light, and let your sparkle do the talking.</p>
                                    <div className="hero-btns-v2">
                                        <button className="btn-editorial" onClick={() => navigate("/collections/diamond")}>Shop Now</button>
                                        <button className="btn-editorial-outline" onClick={() => navigate("/contact")}>Bespeak</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="reveal-text-premium animate-up">
                                    <span className="hero-tag-premium">For Every Role SHE Plays</span>
                                    <h1 className="hero-title-premium">AUTUMN COLLECTION</h1>
                                    <div className="hero-promo-outline">
                                        <h2 className="hero-promo-title" style={{ fontSize: '32px' }}>Enjoy Flat 8% Off*</h2>
                                    </div>
                                    <div className="hero-btns-v2">
                                        <button className="btn-editorial btn-editorial-light" onClick={() => navigate("/collections/all")}>Explore Now</button>
                                        <button className="btn-editorial-outline btn-editorial-outline-light" onClick={() => navigate("/contact")}>Bespeak</button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="hero-nav-modern">
                    {(banners.length > 0 ? banners : [1, 2]).map((_, index) => (
                        <div
                            key={index}
                            className={`nav-block ${index === currentBannerIndex ? 'active' : ''}`}
                            onClick={() => setCurrentBannerIndex(index)}
                        >
                            <span className="nav-num">0{index + 1}</span>
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="scroll-indicator">
                    <div className="mouse"></div>
                    <span></span>
                </div>
            </section>

            {/* WhatsApp Float */}
            <a href="https://wa.me/919999988888" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.55 4.197 1.592 6.015L0 24l6.149-1.613a11.751 11.751 0 005.9 1.594h.005c6.636 0 12.05-5.414 12.05-12.05 0-3.217-1.252-6.241-3.522-8.513z" />
                </svg>
            </a>

            {/* CURATED COLLECTIONS */}
            <section className="curated-collections">
                <div className="container">
                    <div className="section-header-centered">
                        <span className="subtitle">THE ATELIER CURATION</span>
                        <h2 className="section-title">Signature Collections</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="collections-grid">
                        <div className="collection-box" onClick={() => navigate("/wedding")}>
                            <img src={weddingProf} alt="The Bridal Suite" />
                            <div className="box-content">
                                <h3>The Bridal Suite</h3>
                                <p>Ethereal ensembles designed for the most precious of unions.</p>
                                <span className="explore-link">Explore Collection</span>
                            </div>
                        </div>
                        <div className="collection-box" onClick={() => navigate("/diamond")}>
                            <img src={diamondProf} alt="Brilliant Diamonds" />
                            <div className="box-content">
                                <h3>Brilliant Diamonds</h3>
                                <p>Unmatched fire and brilliance, curated for the modern connoisseur.</p>
                                <span className="explore-link">Shop Diamonds</span>
                            </div>
                        </div>
                        <div className="collection-box" onClick={() => navigate("/gold")}>
                            <img src={goldProf} alt="Aura Gold" />
                            <div className="box-content">
                                <h3>Aura Gold</h3>
                                <p>Minimalist gold pieces crafted for effortless daily luxury.</p>
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
                                Our journey began in 2026 with a simple vision: to create pieces that are as pure as the emotions they represent.
                            </p>
                            <p>
                                Every gemstone is hand-selected, and every setting is hand-finished by our master artisans in our signature ateliers.
                                We don't just sell jewellery; we preserve moments in gold and stone.
                            </p>
                            {/* <button className="btn-text-link" onClick={() => navigate("/about")}>Learn Our Story —</button> */}
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
                            { name: 'Gold', label: 'Au' },
                            { name: 'Diamond', label: 'Di' },
                            { name: 'Platinum', label: 'Pt' },
                            { name: 'Wedding', label: 'Wd' },
                            { name: 'Gifting', label: 'Gf' }
                        ].map((cat) => (
                            <div key={cat.name} className="nav-item" onClick={() => navigate(`/${cat.name.toLowerCase()}`)}>
                                <div className="cat-symbol">{cat.label}</div>
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
                        <span className="testimonial-author">RIDDHI PATEL &mdash; PRIVATE COLLECTOR</span>
                    </div>
                </div>
            </section>

            {/* GIFT CONCIERGE CTA
            <section className="gift-concierge">
                <div className="container">
                    <div className="concierge-card">
                        <div className="concierge-text">
                            <span className="subtitle">EXPERT GUIDANCE</span>
                            <h3>The Gift Concierge</h3>
                            <p>Find the perfect expression of your love with the help of our private consultants.</p>
                            <button className="btn-outline-white" onClick={() => navigate("/contact")}>Private Appointment</button>
                        </div>
                        <div className="concierge-image">
                            <img src="/assets/Gift.jpg" alt="Gift Concierge" />
                        </div>
                    </div>
                </div>m
            </section> */}

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
                            <img src={societyProf} alt="Rika Circle" />
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
        </div >
    );
}

export default Home;
