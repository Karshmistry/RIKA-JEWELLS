// //NEW NEW CODE 
// import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import "./Collections.css";
// import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext";

// function Collections() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { addToCart } = useContext(CartContext);
//   const { user } = useContext(AuthContext);

//   // If no category in URL, redirect to /collections/all
//   useEffect(() => {
//     if (location.pathname === '/collections') {
//       navigate('/collections', { replace: true });
//     }
//   }, [location.pathname, navigate]);

//   // Filter states
//   const [selectedFilters, setSelectedFilters] = useState({
//     price: [],
//     material: [],
//     jewelleryType: [], // platinum, gold, silver, gemstone, diamond
//     category: [], // rings, necklaces, earrings, etc.
//     purity: [], // 18K, 22K, 24K, 925, etc.
//     occasion: [],
//     gemstone: [],
//     sortBy: "featured"
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const [quickViewItem, setQuickViewItem] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [wishlist, setWishlist] = useState([]);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [allJewellery, setAllJewellery] = useState([]);

//   // ==============================================
//   // JEWELLERY DATA - FIXED SYNTAX
//   // ==============================================

//   const jewelleryData = useMemo(() => [
//     // Gold Jewellery
//     {
//       id: 1,
//       name: "24K Gold Temple Necklace Set",
//       category: "necklaces",
//       price: 459999,
//       originalPrice: 599999,
//       discount: 23,
//       image: require("../assets/t1.jpg"),
//       rating: 4.9,
//       reviews: 256,
//       description: "Traditional temple jewellery with intricate carving",
//       inStock: true,
//       isNew: true,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "24K",
//       type: "Traditional",
//       weight: "50g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 2,
//       name: "22K Gold Bridal Haram",
//       category: "haram",
//       price: 789999,
//       originalPrice: 999999,
//       discount: 21,
//       image: require("../assets/t2.jpg"),
//       rating: 4.8,
//       reviews: 189,
//       description: "Heavy bridal haram with polki and meenakari work",
//       inStock: true,
//       isNew: false,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "22K",
//       type: "Bridal",
//       weight: "120g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Wedding",
//       gemstone: "Polki",
//       delivery: "5-7 days"
//     },
//     {
//       id: 3,
//       name: "18K Gold Diamond Earrings",
//       category: "earrings",
//       price: 129999,
//       originalPrice: 169999,
//       discount: 24,
//       image: require("../assets/t3.jpg"),
//       rating: 4.7,
//       reviews: 167,
//       description: "Contemporary diamond stud earrings in 18K gold",
//       inStock: true,
//       isNew: true,
//       isBestseller: false,
//       isPure: false,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "18K",
//       type: "Contemporary",
//       weight: "8g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Party",
//       gemstone: "Diamond",
//       delivery: "5-7 days"
//     },
//     {
//       id: 4,
//       name: "22K Gold Bangles Set",
//       category: "bangles",
//       price: 189999,
//       originalPrice: 249999,
//       discount: 24,
//       image: require("../assets/t4.jpg"),
//       rating: 4.9,
//       reviews: 245,
//       description: "Set of 7 kadas with traditional motifs",
//       inStock: true,
//       isNew: false,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "22K",
//       type: "Traditional",
//       weight: "45g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 5,
//       name: "24K Gold Mangalsutra",
//       category: "mangalsutra",
//       price: 89999,
//       originalPrice: 119999,
//       discount: 25,
//       image: require("../assets/t5.jpg"),
//       rating: 4.8,
//       reviews: 192,
//       description: "Traditional mangalsutra with black beads and gold pendant",
//       inStock: true,
//       isNew: true,
//       isBestseller: false,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "24K",
//       type: "Traditional",
//       weight: "15g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Wedding",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 6,
//       name: "18K Gold Tennis Bracelet",
//       category: "bracelets",
//       price: 229999,
//       originalPrice: 299999,
//       discount: 23,
//       image: require("../assets/t6.jpg"),
//       rating: 4.6,
//       reviews: 156,
//       description: "Modern tennis bracelet with channel-set diamonds",
//       inStock: false,
//       isNew: true,
//       isBestseller: true,
//       isPure: false,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "18K",
//       type: "Contemporary",
//       weight: "25g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Party",
//       gemstone: "Diamond",
//       delivery: "5-7 days"
//     },
//     {
//       id: 7,
//       name: "22K Gold Nose Pin Collection",
//       category: "nose-pins",
//       price: 29999,
//       originalPrice: 39999,
//       discount: 25,
//       image: require("../assets/t7.jpg"),
//       rating: 4.5,
//       reviews: 78,
//       description: "Set of traditional nose pins with different designs",
//       inStock: true,
//       isNew: false,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "22K",
//       type: "Traditional",
//       weight: "12g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 8,
//       name: "24K Gold Coin Set",
//       category: "coins",
//       price: 589999,
//       originalPrice: 759999,
//       discount: 22,
//       image: require("../assets/t8.jpg"),
//       rating: 4.9,
//       reviews: 203,
//       description: "Set of 10 gold coins with Lakshmi embossing",
//       inStock: true,
//       isNew: true,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "24K",
//       type: "Investment",
//       weight: "100g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 9,
//       name: "18K Gold Chain",
//       category: "chains",
//       price: 75999,
//       originalPrice: 99999,
//       discount: 24,
//       image: require("../assets/t9.jpg"),
//       rating: 4.7,
//       reviews: 178,
//       description: "Solid gold chain with secure clasp",
//       inStock: true,
//       isNew: true,
//       isBestseller: false,
//       isPure: false,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "18K",
//       type: "Contemporary",
//       weight: "12g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Daily Wear",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 10,
//       name: "22K Gold Toe Rings",
//       category: "toe-rings",
//       price: 15999,
//       originalPrice: 21999,
//       discount: 27,
//       image: require("../assets/t10.jpg"),
//       rating: 4.4,
//       reviews: 42,
//       description: "Traditional gold toe rings for married women",
//       inStock: true,
//       isNew: false,
//       isBestseller: false,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "22K",
//       type: "Traditional",
//       weight: "4g",
//       material: "Gold",
//       jewelleryType: "gold",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     // Silver Jewellery
//     {
//       id: 11,
//       name: "Sterling Silver Diamond Necklace",
//       category: "necklaces",
//       price: 15999,
//       originalPrice: 21999,
//       discount: 27,
//       image: require("../assets/Silver1.jpg"),
//       rating: 4.8,
//       reviews: 142,
//       description: "925 Sterling Silver with pave diamond accents",
//       inStock: true,
//       isNew: true,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "925",
//       type: "Diamond",
//       weight: "25g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Party",
//       gemstone: "Diamond",
//       delivery: "5-7 days"
//     },
//     {
//       id: 12,
//       name: "Oxidized Silver Tribal Earrings",
//       category: "earrings",
//       price: 4599,
//       originalPrice: 6999,
//       discount: 34,
//       image: require("../assets/Silver2.jpg"),
//       rating: 4.7,
//       reviews: 89,
//       description: "Traditional tribal design with oxidized finish",
//       inStock: true,
//       isNew: false,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "925",
//       type: "Tribal",
//       weight: "15g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 13,
//       name: "Silver Gemstone Bracelet Set",
//       category: "bracelets",
//       price: 8999,
//       originalPrice: 12999,
//       discount: 31,
//       image: require("../assets/Silver3.jpg"),
//       rating: 4.6,
//       reviews: 67,
//       description: "Set of 3 bracelets with natural gemstones",
//       inStock: true,
//       isNew: true,
//       isBestseller: false,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "925",
//       type: "Gemstone",
//       weight: "30g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Casual",
//       gemstone: "Multi",
//       delivery: "5-7 days"
//     },
//     {
//       id: 14,
//       name: "Silver Filigree Anklet",
//       category: "anklets",
//       price: 3299,
//       originalPrice: 4999,
//       discount: 34,
//       image: require("../assets/Silver4.jpg"),
//       rating: 4.5,
//       reviews: 45,
//       description: "Delicate filigree work with pearl accents",
//       inStock: true,
//       isNew: false,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "925",
//       type: "Filigree",
//       weight: "12g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Traditional",
//       gemstone: "Pearl",
//       delivery: "5-7 days"
//     },
//     {
//       id: 15,
//       name: "Silver Statement Ring",
//       category: "rings",
//       price: 2599,
//       originalPrice: 3999,
//       discount: 35,
//       image: require("../assets/Silver5.jpg"),
//       rating: 4.7,
//       reviews: 92,
//       description: "Bold statement ring with cubic zirconia",
//       inStock: true,
//       isNew: true,
//       isBestseller: false,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "925",
//       type: "Statement",
//       weight: "8g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Party",
//       gemstone: "CZ",
//       delivery: "5-7 days"
//     },
//     {
//       id: 16,
//       name: "Silver Mangalsutra Set",
//       category: "mangalsutra",
//       price: 12999,
//       originalPrice: 18999,
//       discount: 32,
//       image: require("../assets/Silver6.jpg"),
//       rating: 4.9,
//       reviews: 156,
//       description: "Contemporary silver mangalsutra with black beads",
//       inStock: false,
//       isNew: true,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "925",
//       type: "Contemporary",
//       weight: "20g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Daily Wear",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 17,
//       name: "Silver Nose Pin Collection",
//       category: "nose-pins",
//       price: 1799,
//       originalPrice: 2799,
//       discount: 36,
//       image: require("../assets/Silver7.jpg"),
//       rating: 4.4,
//       reviews: 38,
//       description: "Set of 5 different nose pin designs",
//       inStock: true,
//       isNew: false,
//       isBestseller: false,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "925",
//       type: "Traditional",
//       weight: "10g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 18,
//       name: "Silver Pendant with Chain",
//       category: "pendants",
//       price: 6999,
//       originalPrice: 9999,
//       discount: 30,
//       image: require("../assets/Silver8.jpg"),
//       rating: 4.8,
//       reviews: 203,
//       description: "Elegant pendant with adjustable chain",
//       inStock: true,
//       isNew: true,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: false,
//       purity: "925",
//       type: "Minimalist",
//       weight: "15g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Casual",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 19,
//       name: "Silver Bangles Set",
//       category: "bangles",
//       price: 11999,
//       originalPrice: 16999,
//       discount: 29,
//       image: require("../assets/Silver9.jpg"),
//       rating: 4.7,
//       reviews: 78,
//       description: "Set of 7 silver bangles with engraving",
//       inStock: true,
//       isNew: false,
//       isBestseller: true,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "925",
//       type: "Traditional",
//       weight: "35g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     },
//     {
//       id: 20,
//       name: "Silver Toe Rings",
//       category: "toe-rings",
//       price: 1499,
//       originalPrice: 2299,
//       discount: 35,
//       image: require("../assets/Silver10.jpg"),
//       rating: 4.5,
//       reviews: 42,
//       description: "Pair of adjustable silver toe rings",
//       inStock: true,
//       isNew: true,
//       isBestseller: false,
//       isPure: true,
//       isHallmark: true,
//       isTraditional: true,
//       purity: "925",
//       type: "Minimalist",
//       weight: "5g",
//       material: "Silver",
//       jewelleryType: "silver",
//       occasion: "Traditional",
//       gemstone: "None",
//       delivery: "5-7 days"
//     }
//   ], []); // Empty dependency array to prevent re-creation

//   // ==============================================
//   // END: JEWELLERY DATA
//   // ==============================================

//   // Initialize jewellery data
//   useEffect(() => {
//     // Load from localStorage or use default data
//     const loadData = () => {
//       const saved = localStorage.getItem('allJewellery');
//       if (saved) {
//         try {
//           const parsed = JSON.parse(saved);
//           setAllJewellery(parsed);
//         } catch (e) {
//           setAllJewellery(jewelleryData);
//           localStorage.setItem('allJewellery', JSON.stringify(jewelleryData));
//         }
//       } else {
//         setAllJewellery(jewelleryData);
//         localStorage.setItem('allJewellery', JSON.stringify(jewelleryData));
//       }
//     };

//     loadData();
//   }, [jewelleryData]);

//   // Get items for current category or all items if no category
//   const items = useMemo(() => {
//     if (category && category !== 'all') {
//       return allJewellery.filter(item => 
//         item.category === category || 
//         item.jewelleryType === category ||
//         item.material?.toLowerCase() === category.toLowerCase()
//       );
//     }
//     return allJewellery; // Show all jewellery if no category
//   }, [allJewellery, category]);

//   // Load wishlist from localStorage
//   useEffect(() => {
//     const savedWishlist = localStorage.getItem('jewellery-wishlist');
//     if (savedWishlist) {
//       try {
//         setWishlist(JSON.parse(savedWishlist));
//       } catch (error) {
//         console.error('Error loading wishlist:', error);
//       }
//     }
//   }, []);

//   // Save wishlist to localStorage
//   useEffect(() => {
//     localStorage.setItem('jewellery-wishlist', JSON.stringify(wishlist));
//   }, [wishlist]);

//   // Filter options based on available jewellery data
//   const filterOptions = useMemo(() => {
//     // Extract unique values from jewellery data
//     const materials = [...new Set(allJewellery.map(item => item.material).filter(Boolean))];
//     const jewelleryTypes = [...new Set(allJewellery.map(item => item.jewelleryType).filter(Boolean))];
//     const categories = [...new Set(allJewellery.map(item => item.category).filter(Boolean))];
//     const purities = [...new Set(allJewellery.map(item => item.purity).filter(Boolean))];
//     const occasions = [...new Set(allJewellery.map(item => item.occasion).filter(Boolean))];
//     const gemstones = [...new Set(allJewellery.map(item => item.gemstone).filter(Boolean))];

//     return {
//       price: [
//         { label: "Under ₹10,000", min: 0, max: 10000 },
//         { label: "₹10,000 - ₹25,000", min: 10000, max: 25000 },
//         { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
//         { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
//         { label: "Over ₹1,00,000", min: 100000, max: Infinity }
//       ],
//       material: materials,
//       jewelleryType: jewelleryTypes,
//       category: categories,
//       purity: purities,
//       occasion: occasions,
//       gemstone: gemstones,
//       sortBy: [
//         { value: "featured", label: "Featured" },
//         { value: "newest", label: "Newest First" },
//         { value: "price-low", label: "Price: Low to High" },
//         { value: "price-high", label: "Price: High to Low" },
//         { value: "rating", label: "Highest Rated" },
//         { value: "discount", label: "Best Discount" },
//         { value: "popular", label: "Most Popular" }
//       ]
//     };
//   }, [allJewellery]);

//   // Filter items based on selected filters
//   const filteredItems = useMemo(() => {
//     let result = [...items];

//     // Search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase().trim();
//       result = result.filter(item =>
//         item.name.toLowerCase().includes(query) ||
//         item.description.toLowerCase().includes(query) ||
//         (item.material && item.material.toLowerCase().includes(query)) ||
//         (item.jewelleryType && item.jewelleryType.toLowerCase().includes(query))
//       );
//     }

//     // Price filter
//     if (selectedFilters.price.length > 0) {
//       result = result.filter(item => {
//         return selectedFilters.price.some(rangeLabel => {
//           const priceRange = filterOptions.price.find(r => r.label === rangeLabel);
//           if (!priceRange) return false;

//           if (priceRange.max === Infinity) {
//             return item.price >= priceRange.min;
//           }
//           return item.price >= priceRange.min && item.price <= priceRange.max;
//         });
//       });
//     }

//     // Material filter
//     if (selectedFilters.material.length > 0) {
//       result = result.filter(item =>
//         selectedFilters.material.includes(item.material)
//       );
//     }

//     // Jewellery Type filter
//     if (selectedFilters.jewelleryType.length > 0) {
//       result = result.filter(item =>
//         selectedFilters.jewelleryType.includes(item.jewelleryType)
//       );
//     }

//     // Category filter
//     if (selectedFilters.category.length > 0) {
//       result = result.filter(item =>
//         selectedFilters.category.includes(item.category)
//       );
//     }

//     // Purity filter
//     if (selectedFilters.purity.length > 0) {
//       result = result.filter(item =>
//         selectedFilters.purity.includes(item.purity)
//       );
//     }

//     // Occasion filter
//     if (selectedFilters.occasion.length > 0) {
//       result = result.filter(item =>
//         selectedFilters.occasion.includes(item.occasion)
//       );
//     }

//     // Gemstone filter
//     if (selectedFilters.gemstone.length > 0) {
//       result = result.filter(item =>
//         selectedFilters.gemstone.includes(item.gemstone)
//       );
//     }

//     // Sorting
//     switch (selectedFilters.sortBy) {
//       case "newest":
//         result.sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0));
//         break;
//       case "price-low":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//         break;
//       case "discount":
//         result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
//         break;
//       case "popular":
//         result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
//         break;
//       default: // featured
//         result.sort((a, b) => {
//           const aScore = (a.isNew ? 10 : 0) + (a.isBestseller ? 5 : 0) + (a.featured ? 3 : 0);
//           const bScore = (b.isNew ? 10 : 0) + (b.isBestseller ? 5 : 0) + (b.featured ? 3 : 0);
//           return bScore - aScore;
//         });
//     }

//     return result;
//   }, [items, selectedFilters, searchQuery, filterOptions.price]);

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   // Handle filter changes
//   const handleFilterChange = useCallback((filterType, value) => {
//     setSelectedFilters(prev => {
//       const newFilters = { ...prev };

//       if (filterType === 'sortBy') {
//         newFilters[filterType] = value;
//       } else {
//         if (newFilters[filterType].includes(value)) {
//           newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
//         } else {
//           newFilters[filterType] = [...newFilters[filterType], value];
//         }
//       }

//       return newFilters;
//     });
//     setCurrentPage(1);
//   }, []);

//   // Toast notification
//   const showToast = useCallback((message) => {
//     const toast = document.createElement('div');
//     toast.className = 'collection-toast';
//     toast.textContent = message;
//     document.body.appendChild(toast);

//     setTimeout(() => toast.classList.add('show'), 10);

//     setTimeout(() => {
//       toast.classList.remove('show');
//       setTimeout(() => {
//         if (toast.parentNode) {
//           toast.parentNode.removeChild(toast);
//         }
//       }, 300);
//     }, 3000);
//   }, []);

//   // Add to cart handler
//   const handleAddToCart = useCallback((item) => {
//     addToCart({
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       originalPrice: item.originalPrice || item.price,
//       image: typeof item.image === 'string' ? item.image : (item.image?.default || ''),
//       quantity: 1,
//       category: item.category
//     });

//     showToast(`✨ ${item.name} added to cart!`);
//   }, [addToCart, showToast]);

//   // Buy now handler
//   const handleBuyNow = useCallback((item) => {
//     handleAddToCart(item);
//     navigate("/checkout");
//   }, [handleAddToCart, navigate]);

//   // Wishlist handler
//   const handleWishlistToggle = useCallback((item) => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     setWishlist(prev => {
//       const isInWishlist = prev.some(w => w.id === item.id);
//       if (isInWishlist) {
//         showToast(`❌ ${item.name} removed from wishlist`);
//         return prev.filter(w => w.id !== item.id);
//       } else {
//         showToast(`❤️ ${item.name} added to wishlist!`);
//         return [...prev, {
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           image: typeof item.image === 'string' ? item.image : (item.image?.default || ''),
//           originalPrice: item.originalPrice || item.price,
//           category: item.category,
//           addedAt: new Date().toISOString()
//         }];
//       }
//     });
//   }, [user, navigate, showToast]);

//   // Product Card Component
//   const ProductCard = useCallback(({ item }) => {
//     const isInWishlist = wishlist.some(w => w.id === item.id);

//     return (
//       <div className="collection-product-card" key={item.id}>
//         {/* Badges */}
//         <div className="product-badges">
//           {item.discount > 10 && (
//             <span className="badge discount">-{item.discount}%</span>
//           )}
//           {item.isNew && (
//             <span className="badge new">NEW</span>
//           )}
//           {item.isBestseller && (
//             <span className="badge bestseller">🔥 BESTSELLER</span>
//           )}
//           {item.inStock === false && (
//             <span className="badge out-of-stock">Out of Stock</span>
//           )}
//           {item.isHallmark && (
//             <span className="badge hallmark">Hallmark</span>
//           )}
//           {item.isPure && (
//             <span className="badge pure">Pure</span>
//           )}
//         </div>

//         {/* Wishlist Button */}
//         <button 
//           className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
//           onClick={(e) => {
//             e.stopPropagation();
//             handleWishlistToggle(item);
//           }}
//           title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//         >
//           {isInWishlist ? "❤️" : "🤍"}
//         </button>

//         {/* Quick View Button */}
//         <button 
//           className="quick-view-btn"
//           onClick={(e) => {
//             e.stopPropagation();
//             setQuickViewItem(item);
//           }}
//           title="Quick View"
//         >
//           👁️
//         </button>

//         {/* Product Image */}
//         <div 
//           className="product-image"
//           onClick={() => navigate(`/product/${item.id}`)}
//         >
//           <img 
//             src={typeof item.image === 'string' ? item.image : (item.image?.default || '')} 
//             alt={item.name} 
//             loading="lazy" 
//           />
//           <div className="product-overlay">
//             <button 
//               className="quick-view-overlay"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setQuickViewItem(item);
//               }}
//             >
//               Quick View
//             </button>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="product-info">
//           <div className="product-header">
//             <h3 className="product-name">{item.name}</h3>
//             <div className="product-rating">
//               <span className="stars">
//                 {"★".repeat(Math.floor(item.rating || 4))}
//                 {"☆".repeat(5 - Math.floor(item.rating || 4))}
//               </span>
//               <span className="rating-value">{item.rating || 4.0} ({item.reviews || 0})</span>
//             </div>
//           </div>

//           <p className="product-description">{item.description}</p>

//           <div className="product-specs">
//             {item.material && (
//               <span className="spec">
//                 <span className="spec-icon">💎</span>
//                 {item.material} {item.purity && `(${item.purity})`}
//               </span>
//             )}
//             {item.weight && (
//               <span className="spec">
//                 <span className="spec-icon">⚖️</span>
//                 {item.weight}
//               </span>
//             )}
//             {item.type && (
//               <span className="spec">
//                 <span className="spec-icon">🏷️</span>
//                 {item.type}
//               </span>
//             )}
//           </div>

//           {/* Price */}
//           <div className="product-price">
//             <div className="price-main">
//               {item.discount > 0 ? (
//                 <>
//                   <span className="original-price">₹{item.originalPrice?.toLocaleString() || item.price.toLocaleString()}</span>
//                   <span className="current-price">₹{item.price.toLocaleString()}</span>
//                   <span className="save-amount">
//                     Save ₹{((item.originalPrice || item.price * 1.2) - item.price).toLocaleString()}
//                   </span>
//                 </>
//               ) : (
//                 <span className="current-price">₹{item.price.toLocaleString()}</span>
//               )}
//             </div>
//             {item.delivery && (
//               <div className="delivery-info">
//                 <span className="delivery-icon">🚚</span>
//                 {item.delivery}
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="product-actions">
//             <button 
//               className="view-details-btn"
//               onClick={() => navigate(`/product/${item.id}`)}
//             >
//               View Details
//             </button>
//             <button 
//               className="add-to-cart-btn"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleAddToCart(item);
//               }}
//               disabled={!item.inStock}
//             >
//               {!item.inStock ? 'Out of Stock' : '🛒 Add to Cart'}
//             </button>
//           </div>

//           {/* Buy Now Button */}
//           {item.inStock && (
//             <button 
//               className="buy-now-btn"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleBuyNow(item);
//               }}
//             >
//               ⚡ Buy Now
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }, [wishlist, navigate, handleWishlistToggle, handleAddToCart, handleBuyNow]);

//   // Filter Section Component
//   const FilterSection = useCallback(({ title, options, type }) => {
//     const isChecked = (value) => {
//       if (type === 'sortBy') {
//         return selectedFilters[type] === value;
//       }
//       return selectedFilters[type].includes(value);
//     };

//     return (
//       <div className="filter-section">
//         <h4 className="filter-title">{title}</h4>
//         <div className="filter-options">
//           {options.map((option, index) => {
//             const label = option.label || option;
//             const value = option.value || option;
//             const checked = isChecked(value);

//             return (
//               <label key={index} className="filter-option">
//                 <input
//                   type={type === 'sortBy' ? 'radio' : 'checkbox'}
//                   checked={checked}
//                   onChange={() => handleFilterChange(type, value)}
//                 />
//                 <span className="checkmark"></span>
//                 <span className="option-label">{label}</span>
//                 {type === 'price' && (
//                   <span className="option-count">
//                     ({filteredItems.filter(item => {
//                       const range = filterOptions.price.find(r => r.label === value);
//                       if (!range) return false;
//                       if (range.max === Infinity) {
//                         return item.price >= range.min;
//                       }
//                       return item.price >= range.min && item.price <= range.max;
//                     }).length})
//                   </span>
//                 )}
//               </label>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }, [selectedFilters, filteredItems, filterOptions.price, handleFilterChange]);

//   // Clear all filters
//   const clearAllFilters = useCallback(() => {
//     setSelectedFilters({
//       price: [],
//       material: [],
//       jewelleryType: [],
//       category: [],
//       purity: [],
//       occasion: [],
//       gemstone: [],
//       sortBy: "featured"
//     });
//     setSearchQuery("");
//     setCurrentPage(1);
//   }, []);

//   // Active filter count
//   const activeFilterCount = useMemo(() => {
//     return Object.values(selectedFilters).reduce((acc, curr) => {
//       if (Array.isArray(curr)) {
//         return acc + curr.length;
//       }
//       return acc;
//     }, 0);
//   }, [selectedFilters]);

//   // Handle invalid category - FIXED: Check if category exists before using it
//   const validCategories = ['all', 'gold', 'silver', 'platinum', 'diamond', 'gemstone'];
//   const additionalValidCategories = allJewellery.map(item => item.category).filter(Boolean);
//   const allValidCategories = [...new Set([...validCategories, ...additionalValidCategories])];

//   // Get current category or default to 'all'
//   const currentCategory = category || 'all';

//   if (currentCategory && !allValidCategories.includes(currentCategory)) {
//     return (
//       <div className="collections-page">
//         <div className="category-not-found">
//           <h1>Collection Not Found</h1>
//           <p>The requested collection does not exist.</p>
//           <button onClick={() => navigate("/collections/all")} className="go-home-btn">
//             Browse All Jewellery
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Helper function to safely format category name
//   const formatCategoryName = (cat) => {
//     if (!cat) return 'All Jewellery';
//     if (cat === 'all') return 'All Jewellery';
//     return cat.charAt(0).toUpperCase() + cat.slice(1);
//   };

//   return (
//     <div className="collections-page">
//       {/* Hero Banner */}
//       <div className="collections-hero">
//         <div className="hero-overlay"></div>
//         <div className="hero-content">
//           <h1 className="hero-title">
//             {currentCategory === 'all' ? 'All Jewellery Collection' : `${formatCategoryName(currentCategory)} Collection`}
//           </h1>
//           <p className="hero-subtitle">
//             {currentCategory === 'all' 
//               ? 'Browse our complete jewellery collection across all categories'
//               : `Discover our exquisite range of ${currentCategory} jewellery crafted with precision and passion`}
//           </p>
//           <div className="hero-stats">
//             <div className="stat">
//               <span className="stat-number">{allJewellery.length}+</span>
//               <span className="stat-label">Total Items</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">{filteredItems.length}</span>
//               <span className="stat-label">Filtered</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">{filterOptions.material.length}</span>
//               <span className="stat-label">Materials</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Toggle */}
//       <div className="mobile-filter-header">
//         <button 
//           className="mobile-filter-toggle"
//           onClick={() => setShowMobileFilters(!showMobileFilters)}
//         >
//           🔧 Filters ({activeFilterCount})
//         </button>
//         {activeFilterCount > 0 && (
//           <button 
//             className="mobile-clear-filters"
//             onClick={clearAllFilters}
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="collections-container">
//         {/* Sidebar Filters */}
//         <div className={`collections-sidebar ${showMobileFilters ? 'mobile-show' : ''}`}>
//           <div className="sidebar-header">
//             <h3>Filters</h3>
//             <button 
//               className="clear-filters"
//               onClick={clearAllFilters}
//             >
//               Clear All
//             </button>
//           </div>

//           {/* Search */}
//           <div className="search-filter">
//             <input
//               type="text"
//               placeholder="Search jewellery..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="search-input"
//             />
//           </div>

//           {/* Sort */}
//           <div className="sort-filter">
//             <h4 className="filter-title">Sort By</h4>
//             <div className="sort-options">
//               {filterOptions.sortBy.map((option, index) => (
//                 <label key={index} className="sort-option">
//                   <input
//                     type="radio"
//                     name="sort"
//                     checked={selectedFilters.sortBy === option.value}
//                     onChange={() => handleFilterChange('sortBy', option.value)}
//                   />
//                   <span className="checkmark"></span>
//                   <span className="option-label">{option.label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Price Filter */}
//           {filterOptions.price.length > 0 && (
//             <FilterSection 
//               title="Price Range"
//               options={filterOptions.price}
//               type="price"
//             />
//           )}

//           {/* Material Filter */}
//           {filterOptions.material.length > 0 && (
//             <FilterSection 
//               title="Material"
//               options={filterOptions.material}
//               type="material"
//             />
//           )}

//           {/* Jewellery Type Filter */}
//           {filterOptions.jewelleryType.length > 0 && (
//             <FilterSection 
//               title="Jewellery Type"
//               options={filterOptions.jewelleryType}
//               type="jewelleryType"
//             />
//           )}

//           {/* Category Filter */}
//           {filterOptions.category.length > 0 && (
//             <FilterSection 
//               title="Category"
//               options={filterOptions.category}
//               type="category"
//             />
//           )}

//           {/* Purity Filter */}
//           {filterOptions.purity.length > 0 && (
//             <FilterSection 
//               title="Purity"
//               options={filterOptions.purity}
//               type="purity"
//             />
//           )}

//           {/* Occasion Filter */}
//           {filterOptions.occasion.length > 0 && (
//             <FilterSection 
//               title="Occasion"
//               options={filterOptions.occasion}
//               type="occasion"
//             />
//           )}

//           {/* Gemstone Filter */}
//           {filterOptions.gemstone.length > 0 && (
//             <FilterSection 
//               title="Gemstone"
//               options={filterOptions.gemstone}
//               type="gemstone"
//             />
//           )}

//           {/* Mobile Filter Close Button */}
//           <button 
//             className="mobile-filter-close"
//             onClick={() => setShowMobileFilters(false)}
//           >
//             Apply Filters
//           </button>
//         </div>

//         {/* Products Grid */}
//         <div className="collections-main">
//           {/* Header */}
//           <div className="collections-header">
//             <div className="header-left">
//               <h2 className="page-title">
//                 {formatCategoryName(currentCategory)} Collection
//               </h2>
//               <p className="page-subtitle">
//                 Showing {Math.min(currentItems.length, itemsPerPage)} of {filteredItems.length} products
//                 {activeFilterCount > 0 ? ` (${activeFilterCount} filters applied)` : ''}
//               </p>
//             </div>
//             <div className="header-right">
//               <select 
//                 className="sort-select"
//                 value={selectedFilters.sortBy}
//                 onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//               >
//                 {filterOptions.sortBy.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Active Filters Display */}
//           {activeFilterCount > 0 && (
//             <div className="active-filters">
//               {Object.entries(selectedFilters).map(([key, values]) => {
//                 if (!Array.isArray(values) || values.length === 0) return null;

//                 return values.map(value => (
//                   <span key={`${key}-${value}`} className="active-filter">
//                     {key}: {value}
//                     <button onClick={() => handleFilterChange(key, value)}>×</button>
//                   </span>
//                 ));
//               })}
//             </div>
//           )}

//           {/* Products Grid */}
//           {currentItems.length > 0 ? (
//             <>
//               <div className="collections-grid">
//                 {currentItems.map(item => (
//                   <ProductCard key={item.id} item={item} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="pagination">
//                   <button
//                     className="pagination-btn prev"
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                   >
//                     ← Previous
//                   </button>

//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }

//                     return (
//                       <button
//                         key={pageNum}
//                         className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
//                         onClick={() => setCurrentPage(pageNum)}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}

//                   {totalPages > 5 && currentPage < totalPages - 2 && (
//                     <span className="pagination-ellipsis">...</span>
//                   )}

//                   <button
//                     className="pagination-btn next"
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                   >
//                     Next →
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="no-products">
//               <div className="no-products-icon">🔍</div>
//               <h3>No jewellery found</h3>
//               <p>Try adjusting your filters or search terms</p>
//               <button 
//                 className="reset-filters-btn"
//                 onClick={clearAllFilters}
//               >
//                 Reset All Filters
//               </button>
//             </div>
//           )}

//           {/* Statistics */}
//           <div className="collection-statistics">
//             <h3>Collection Statistics</h3>
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <span className="stat-icon">💎</span>
//                 <div>
//                   <h4>Total Items</h4>
//                   <p>{allJewellery.length} jewellery pieces</p>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <span className="stat-icon">💰</span>
//                 <div>
//                   <h4>Price Range</h4>
//                   <p>₹{allJewellery.length > 0 ? Math.min(...allJewellery.map(i => i.price)).toLocaleString() : '0'} - ₹{allJewellery.length > 0 ? Math.max(...allJewellery.map(i => i.price)).toLocaleString() : '0'}</p>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <span className="stat-icon">🏷️</span>
//                 <div>
//                   <h4>Categories</h4>
//                   <p>{filterOptions.category.length} different types</p>
//                 </div>
//               </div>
//               <div className="stat-card">
//                 <span className="stat-icon">⭐</span>
//                 <div>
//                   <h4>Avg Rating</h4>
//                   <p>{allJewellery.length > 0 ? (allJewellery.reduce((sum, item) => sum + (item.rating || 0), 0) / allJewellery.length).toFixed(1) : '0.0'}/5</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       {quickViewItem && (
//         <div className="quick-view-modal">
//           <div className="modal-overlay" onClick={() => setQuickViewItem(null)}></div>
//           <div className="modal-content">
//             <button 
//               className="modal-close"
//               onClick={() => setQuickViewItem(null)}
//             >
//               ✕
//             </button>

//             <div className="modal-product">
//               <div className="modal-images">
//                 <img 
//                   src={typeof quickViewItem.image === 'string' ? quickViewItem.image : (quickViewItem.image?.default || '')} 
//                   alt={quickViewItem.name} 
//                 />
//               </div>

//               <div className="modal-details">
//                 <h2>{quickViewItem.name}</h2>
//                 <div className="modal-rating">
//                   <span className="stars">
//                     {"★".repeat(Math.floor(quickViewItem.rating || 4))}
//                     {"☆".repeat(5 - Math.floor(quickViewItem.rating || 4))}
//                   </span>
//                   <span>{quickViewItem.rating || 4.0} ({quickViewItem.reviews || 0} reviews)</span>
//                 </div>

//                 <p className="modal-description">{quickViewItem.description}</p>

//                 <div className="modal-specs">
//                   {quickViewItem.material && (
//                     <div className="spec">
//                       <span className="spec-label">Material:</span>
//                       <span className="spec-value">{quickViewItem.material} {quickViewItem.purity && `(${quickViewItem.purity})`}</span>
//                     </div>
//                   )}
//                   {quickViewItem.weight && (
//                     <div className="spec">
//                       <span className="spec-label">Weight:</span>
//                       <span className="spec-value">{quickViewItem.weight}</span>
//                     </div>
//                   )}
//                   {quickViewItem.type && (
//                     <div className="spec">
//                       <span className="spec-label">Type:</span>
//                       <span className="spec-value">{quickViewItem.type}</span>
//                     </div>
//                   )}
//                   {quickViewItem.occasion && (
//                     <div className="spec">
//                       <span className="spec-label">Occasion:</span>
//                       <span className="spec-value">{quickViewItem.occasion}</span>
//                     </div>
//                   )}
//                   <div className="spec">
//                     <span className="spec-label">Stock:</span>
//                     <span className="spec-value">{quickViewItem.inStock ? 'In Stock' : 'Out of Stock'}</span>
//                   </div>
//                 </div>

//                 <div className="modal-price">
//                   {quickViewItem.discount > 0 ? (
//                     <>
//                       <div className="price-original">₹{quickViewItem.originalPrice?.toLocaleString() || quickViewItem.price.toLocaleString()}</div>
//                       <div className="price-current">₹{quickViewItem.price.toLocaleString()}</div>
//                       <div className="price-save">
//                         Save ₹{((quickViewItem.originalPrice || quickViewItem.price * 1.2) - quickViewItem.price).toLocaleString()} 
//                         ({quickViewItem.discount}% off)
//                       </div>
//                     </>
//                   ) : (
//                     <div className="price-current">₹{quickViewItem.price.toLocaleString()}</div>
//                   )}
//                 </div>

//                 <div className="modal-actions">
//                   <button 
//                     className="modal-wishlist"
//                     onClick={() => {
//                       handleWishlistToggle(quickViewItem);
//                       setQuickViewItem(null);
//                     }}
//                   >
//                     {wishlist.some(w => w.id === quickViewItem.id) ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
//                   </button>
//                   <button 
//                     className="modal-add-to-cart"
//                     onClick={() => {
//                       handleAddToCart(quickViewItem);
//                       setQuickViewItem(null);
//                     }}
//                     disabled={!quickViewItem.inStock}
//                   >
//                     🛒 Add to Cart
//                   </button>
//                   <button 
//                     className="modal-buy-now"
//                     onClick={() => {
//                       handleBuyNow(quickViewItem);
//                       setQuickViewItem(null);
//                     }}
//                     disabled={!quickViewItem.inStock}
//                   >
//                     💳 Buy Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Export functions to add jewellery from other pages
// export const addJewellery = (item) => {
//   // This function can be called from other pages
//   // Store in localStorage temporarily
//   const existing = JSON.parse(localStorage.getItem('tempJewellery') || '[]');
//   existing.push(item);
//   localStorage.setItem('tempJewellery', JSON.stringify(existing));
//   return item;
// };

// // Export function to get all jewellery
// export const getAllJewellery = () => {
//   return JSON.parse(localStorage.getItem('allJewellery') || '[]');
// };

// export default Collections;



import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Collections.css";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Collections() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // If no category in URL, redirect to /collections/all
  useEffect(() => {
    if (location.pathname === '/collections') {
      navigate('/collections', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Filter states
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    material: [],
    jewelleryType: [], // platinum, gold, silver, gemstone, diamond
    category: [], // rings, necklaces, earrings, etc.
    purity: [], // 18K, 22K, 24K, 925, etc.
    occasion: [],
    gemstone: [],
    sortBy: "featured"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [allJewellery, setAllJewellery] = useState([]);

  // Debug logging
  useEffect(() => {
    console.log("All Jewellery Data:", allJewellery);
    console.log("Category from URL:", category);
    console.log("Current filters:", selectedFilters);
  }, [allJewellery, category, selectedFilters]);

  // ==============================================
  // JEWELLERY DATA - USING STRING IMAGE PATHS
  // ==============================================

  const jewelleryData = useMemo(() => [
    // Gold Jewellery
    {
      id: 1,
      name: "24K Gold Temple Necklace Set",
      category: "necklaces",
      price: 459999,
      originalPrice: 599999,
      discount: 23,
      image: require("../assets/t1.jpg"),
      rating: 4.9,
      reviews: 256,
      description: "Traditional temple jewellery with intricate carving",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "24K",
      type: "Traditional",
      weight: "50g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 2,
      name: "22K Gold Bridal Haram",
      category: "haram",
      price: 789999,
      originalPrice: 999999,
      discount: 21,
      image: require("../assets/t2.jpg"),
      rating: 4.8,
      reviews: 189,
      description: "Heavy bridal haram with polki and meenakari work",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "22K",
      type: "Bridal",
      weight: "120g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Wedding",
      gemstone: "Polki",
      delivery: "5-7 days"
    },
    {
      id: 3,
      name: "18K Gold Diamond Earrings",
      category: "earrings",
      price: 129999,
      originalPrice: 169999,
      discount: 24,
      image: require("../assets/t3.jpg"),
      rating: 4.7,
      reviews: 167,
      description: "Contemporary diamond stud earrings in 18K gold",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isPure: false,
      isHallmark: true,
      isTraditional: false,
      purity: "18K",
      type: "Contemporary",
      weight: "8g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Party",
      gemstone: "Diamond",
      delivery: "5-7 days"
    },
    {
      id: 4,
      name: "22K Gold Bangles Set",
      category: "bangles",
      price: 189999,
      originalPrice: 249999,
      discount: 24,
      image: require("../assets/t4.jpg"),
      rating: 4.9,
      reviews: 245,
      description: "Set of 7 kadas with traditional motifs",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "22K",
      type: "Traditional",
      weight: "45g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 5,
      name: "24K Gold Mangalsutra",
      category: "mangalsutra",
      price: 89999,
      originalPrice: 119999,
      discount: 25,
      image: require("../assets/t5.jpg"),
      rating: 4.8,
      reviews: 192,
      description: "Traditional mangalsutra with black beads and gold pendant",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "24K",
      type: "Traditional",
      weight: "15g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Wedding",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 6,
      name: "18K Gold Tennis Bracelet",
      category: "bracelets",
      price: 229999,
      originalPrice: 299999,
      discount: 23,
      image: require("../assets/t6.jpg"),
      rating: 4.6,
      reviews: 156,
      description: "Modern tennis bracelet with channel-set diamonds",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isPure: false,
      isHallmark: true,
      isTraditional: false,
      purity: "18K",
      type: "Contemporary",
      weight: "25g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Party",
      gemstone: "Diamond",
      delivery: "5-7 days"
    },
    {
      id: 7,
      name: "22K Gold Nose Pin Collection",
      category: "nose-pins",
      price: 29999,
      originalPrice: 39999,
      discount: 25,
      image: require("../assets/t7.jpg"),
      rating: 4.5,
      reviews: 78,
      description: "Set of traditional nose pins with different designs",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "22K",
      type: "Traditional",
      weight: "12g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 8,
      name: "24K Gold Coin Set",
      category: "coins",
      price: 589999,
      originalPrice: 759999,
      discount: 22,
      image: require("../assets/t8.jpg"),
      rating: 4.9,
      reviews: 203,
      description: "Set of 10 gold coins with Lakshmi embossing",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "24K",
      type: "Investment",
      weight: "100g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 9,
      name: "18K Gold Chain",
      category: "chains",
      price: 75999,
      originalPrice: 99999,
      discount: 24,
      image: require("../assets/t9.jpg"),
      rating: 4.7,
      reviews: 178,
      description: "Solid gold chain with secure clasp",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isPure: false,
      isHallmark: true,
      isTraditional: false,
      purity: "18K",
      type: "Contemporary",
      weight: "12g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Daily Wear",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 10,
      name: "22K Gold Toe Rings",
      category: "toe-rings",
      price: 15999,
      originalPrice: 21999,
      discount: 27,
      image: require("../assets/t10.jpg"),
      rating: 4.4,
      reviews: 42,
      description: "Traditional gold toe rings for married women",
      inStock: true,
      isNew: false,
      isBestseller: false,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "22K",
      type: "Traditional",
      weight: "4g",
      material: "Gold",
      jewelleryType: "gold",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    // Silver Jewellery
    {
      id: 11,
      name: "Sterling Silver Diamond Necklace",
      category: "necklaces",
      price: 15999,
      originalPrice: 21999,
      discount: 27,
      image: require("../assets/Silver1.jpg"),
      rating: 4.8,
      reviews: 142,
      description: "925 Sterling Silver with pave diamond accents",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: false,
      purity: "925",
      type: "Diamond",
      weight: "25g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Party",
      gemstone: "Diamond",
      delivery: "5-7 days"
    },
    {
      id: 12,
      name: "Oxidized Silver Tribal Earrings",
      category: "earrings",
      price: 4599,
      originalPrice: 6999,
      discount: 34,
      image: require("../assets/Silver2.jpg"),
      rating: 4.7,
      reviews: 89,
      description: "Traditional tribal design with oxidized finish",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "925",
      type: "Tribal",
      weight: "15g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 13,
      name: "Silver Gemstone Bracelet Set",
      category: "bracelets",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      image: require("../assets/Silver3.jpg"),
      rating: 4.6,
      reviews: 67,
      description: "Set of 3 bracelets with natural gemstones",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isPure: true,
      isHallmark: true,
      isTraditional: false,
      purity: "925",
      type: "Gemstone",
      weight: "30g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Casual",
      gemstone: "Multi",
      delivery: "5-7 days"
    },
    {
      id: 14,
      name: "Silver Filigree Anklet",
      category: "anklets",
      price: 3299,
      originalPrice: 4999,
      discount: 34,
      image: require("../assets/Silver4.jpg"),
      rating: 4.5,
      reviews: 45,
      description: "Delicate filigree work with pearl accents",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "925",
      type: "Filigree",
      weight: "12g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Traditional",
      gemstone: "Pearl",
      delivery: "5-7 days"
    },
    {
      id: 15,
      name: "Silver Statement Ring",
      category: "rings",
      price: 2599,
      originalPrice: 3999,
      discount: 35,
      image: require("../assets/Silver5.jpg"),
      rating: 4.7,
      reviews: 92,
      description: "Bold statement ring with cubic zirconia",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isPure: true,
      isHallmark: true,
      isTraditional: false,
      purity: "925",
      type: "Statement",
      weight: "8g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Party",
      gemstone: "CZ",
      delivery: "5-7 days"
    },
    {
      id: 16,
      name: "Silver Mangalsutra Set",
      category: "mangalsutra",
      price: 12999,
      originalPrice: 18999,
      discount: 32,
      image: require("../assets/Silver6.jpg"),
      rating: 4.9,
      reviews: 156,
      description: "Contemporary silver mangalsutra with black beads",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: false,
      purity: "925",
      type: "Contemporary",
      weight: "20g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Daily Wear",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 17,
      name: "Silver Nose Pin Collection",
      category: "nose-pins",
      price: 1799,
      originalPrice: 2799,
      discount: 36,
      image: require("../assets/Silver7.jpg"),
      rating: 4.4,
      reviews: 38,
      description: "Set of 5 different nose pin designs",
      inStock: true,
      isNew: false,
      isBestseller: false,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "925",
      type: "Traditional",
      weight: "10g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 18,
      name: "Silver Pendant with Chain",
      category: "pendants",
      price: 6999,
      originalPrice: 9999,
      discount: 30,
      image: require("../assets/Silver8.jpg"),
      rating: 4.8,
      reviews: 203,
      description: "Elegant pendant with adjustable chain",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: false,
      purity: "925",
      type: "Minimalist",
      weight: "15g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Casual",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 19,
      name: "Silver Bangles Set",
      category: "bangles",
      price: 11999,
      originalPrice: 16999,
      discount: 29,
      image: require("../assets/Silver9.jpg"),
      rating: 4.7,
      reviews: 78,
      description: "Set of 7 silver bangles with engraving",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "925",
      type: "Traditional",
      weight: "35g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 20,
      name: "Silver Toe Rings",
      category: "toe-rings",
      price: 1499,
      originalPrice: 2299,
      discount: 35,
      image: require("../assets/Silver10.jpg"),
      rating: 4.5,
      reviews: 42,
      description: "Pair of adjustable silver toe rings",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isPure: true,
      isHallmark: true,
      isTraditional: true,
      purity: "925",
      type: "Minimalist",
      weight: "5g",
      material: "Silver",
      jewelleryType: "silver",
      occasion: "Traditional",
      gemstone: "None",
      delivery: "5-7 days"
    },
    {
      id: 1,
      name: "Platinum Solitaire Diamond Ring",
      category: "rings",
      price: 189999,
      originalPrice: 249999,
      discount: 24,
      image: require("../assets/k1.jpg"),

      rating: 4.9,
      reviews: 156,
      description: "950 Platinum with 1-carat certified diamond",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isLuxury: true,
      isCertified: true,
      type: "Diamond",
      style: "Contemporary",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Wedding",
      gemstone: "Diamond",
      weight: "8g",
      delivery: "5-7 days"
    },
    {
      id: 2,
      name: "Platinum Wedding Band Set",
      category: "wedding-bands",
      price: 299999,
      originalPrice: 389999,
      discount: 23,
      image: require("../assets/k2.jpg"),
      rating: 4.8,
      reviews: 89,
      description: "His & Hers platinum wedding bands with milgrain detail",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isLuxury: true,
      isCertified: true,
      type: "Plain",
      style: "Classic",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Wedding",
      gemstone: "None",
      weight: "25g",
      delivery: "5-7 days"
    },
    {
      id: 3,
      name: "Platinum Tennis Bracelet",
      category: "bracelets",
      price: 459999,
      originalPrice: 599999,
      discount: 23,
      image: require("../assets/k3.jpg"),
      rating: 4.9,
      reviews: 67,
      description: "Channel-set diamonds in platinum tennis bracelet",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isLuxury: true,
      isCertified: true,
      type: "Diamond",
      style: "Luxury",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Party",
      gemstone: "Diamond",
      weight: "30g",
      delivery: "5-7 days"
    },
    {
      id: 4,
      name: "Platinum Stud Earrings",
      category: "earrings",
      price: 129999,
      originalPrice: 169999,
      discount: 24,
      image: require("../assets/k4.jpg"),
      rating: 4.7,
      reviews: 145,
      description: "0.75ct platinum diamond stud earrings",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isLuxury: false,
      isCertified: true,
      type: "Diamond",
      style: "Classic",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Daily Wear",
      gemstone: "Diamond",
      weight: "6g",
      delivery: "5-7 days"
    },
    {
      id: 5,
      name: "Platinum Pendant Necklace",
      category: "necklaces",
      price: 149999,
      originalPrice: 199999,
      discount: 25,
      image: require("../assets/k5.jpg"),
      rating: 4.6,
      reviews: 92,
      description: "Platinum pendant with sapphire accents",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isLuxury: true,
      isCertified: true,
      type: "Gemstone",
      style: "Contemporary",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Party",
      gemstone: "Sapphire",
      weight: "12g",
      delivery: "5-7 days"
    },
    {
      id: 6,
      name: "Platinum Men's Cufflinks",
      category: "men",
      price: 79999,
      originalPrice: 109999,
      discount: 27,
      image: require("../assets/k6.jpg"),
      rating: 4.8,
      reviews: 156,
      description: "Minimalist platinum cufflinks with onyx inlay",
      inStock: false,
      isNew: true,
      isBestseller: true,
      isLuxury: true,
      isCertified: true,
      type: "Minimalist",
      style: "Modern",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Formal",
      gemstone: "Onyx",
      weight: "10g",
      delivery: "5-7 days"
    },
    {
      id: 7,
      name: "Platinum Eternity Band",
      category: "rings",
      price: 229999,
      originalPrice: 299999,
      discount: 23,
      image: require("../assets/k7.jpg"),
      rating: 4.9,
      reviews: 203,
      description: "Full eternity band with channel-set diamonds",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isLuxury: true,
      isCertified: true,
      type: "Diamond",
      style: "Classic",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Anniversary",
      gemstone: "Diamond",
      weight: "15g",
      delivery: "5-7 days"
    },
    {
      id: 8,
      name: "Platinum Hoop Earrings",
      category: "earrings",
      price: 89999,
      originalPrice: 119999,
      discount: 25,
      image: require("../assets/k8.jpg"),
      rating: 4.5,
      reviews: 78,
      description: "Medium-sized platinum hoop earrings",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isLuxury: false,
      isCertified: true,
      type: "Plain",
      style: "Contemporary",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Casual",
      gemstone: "None",
      weight: "8g",
      delivery: "5-7 days"
    },
    {
      id: 9,
      name: "Platinum Chain Bracelet",
      category: "bracelets",
      price: 159999,
      originalPrice: 209999,
      discount: 24,
      image: require("../assets/k9.jpg"),
      rating: 4.7,
      reviews: 78,
      description: "Solid platinum chain bracelet with lobster clasp",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isLuxury: false,
      isCertified: true,
      type: "Chain",
      style: "Minimalist",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Daily Wear",
      gemstone: "None",
      weight: "20g",
      delivery: "5-7 days"
    },
    {
      id: 10,
      name: "Platinum Bangle",
      category: "bangles",
      price: 179999,
      originalPrice: 239999,
      discount: 25,
      image: require("../assets/k10.jpg"),
      rating: 4.8,
      reviews: 142,
      description: "Solid platinum bangle with engraved pattern",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isLuxury: true,
      isCertified: true,
      type: "Engraved",
      style: "Traditional",
      purity: "950",
      material: "Platinum",
      jewelleryType: "platinum",
      occasion: "Traditional",
      gemstone: "None",
      weight: "35g",
      delivery: "5-7 days"
    },

    // Gemstone Jewellery (10 items)
    {
      id: 11,
      name: "Ruby & Diamond Statement Ring",
      category: "rings",
      price: 189999,
      originalPrice: 249999,
      discount: 24,
      image: require("../assets/q11.jpg"),
      rating: 4.9,
      reviews: 256,
      description: "Natural Burmese ruby with diamond halo in 18K gold",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isNatural: true,
      isHandmade: true,
      gemstone: "Ruby",
      type: "Statement",
      metal: "18K Gold",
      origin: "Burma",
      birthstone: "July",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Party",
      purity: "18K",
      weight: "12g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false
    },
    {
      id: 12,
      name: "Emerald Pendant Necklace",
      category: "necklaces",
      price: 159999,
      originalPrice: 209999,
      discount: 24,
      image: require("../assets/q13.jpg"),
      rating: 4.8,
      reviews: 189,
      description: "Colombian emerald pendant with diamond accents",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isNatural: true,
      isHandmade: true,
      gemstone: "Emerald",
      type: "Pendant",
      metal: "Platinum",
      origin: "Colombia",
      birthstone: "May",
      material: "Platinum",
      jewelleryType: "gemstone",
      occasion: "Formal",
      purity: "950",
      weight: "15g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true
    },
    {
      id: 13,
      name: "Sapphire Tennis Bracelet",
      category: "bracelets",
      price: 229999,
      originalPrice: 299999,
      discount: 23,
      image: require("../assets/q3.jpg"),
      rating: 4.7,
      reviews: 167,
      description: "Kashmir blue sapphires with diamond spacers",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isNatural: true,
      isHandmade: false,
      gemstone: "Sapphire",
      type: "Tennis",
      metal: "White Gold",
      origin: "Kashmir",
      birthstone: "September",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Party",
      purity: "18K",
      weight: "25g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false
    },
    {
      id: 14,
      name: "Opal & Diamond Earrings",
      category: "earrings",
      price: 129999,
      originalPrice: 169999,
      discount: 24,
      image: require("../assets/q14.jpg"),
      rating: 4.6,
      reviews: 156,
      description: "Australian opal with diamond surround in yellow gold",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isNatural: true,
      isHandmade: true,
      gemstone: "Opal",
      type: "Stud",
      metal: "Yellow Gold",
      origin: "Australia",
      birthstone: "October",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Casual",
      purity: "18K",
      weight: "8g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false
    },
    {
      id: 15,
      name: "Amethyst Cocktail Ring",
      category: "rings",
      price: 89999,
      originalPrice: 119999,
      discount: 25,
      image: require("../assets/q15.jpg"),
      rating: 4.9,
      reviews: 203,
      description: "Large Brazilian amethyst in art deco setting",
      inStock: false,
      isNew: true,
      isBestseller: true,
      isNatural: true,
      isHandmade: true,
      gemstone: "Amethyst",
      type: "Cocktail",
      metal: "Silver",
      origin: "Brazil",
      birthstone: "February",
      material: "Silver",
      jewelleryType: "gemstone",
      occasion: "Party",
      purity: "925",
      weight: "10g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true
    },
    {
      id: 16,
      name: "Pearl & Gemstone Bracelet",
      category: "bracelets",
      price: 119999,
      originalPrice: 159999,
      discount: 25,
      image: require("../assets/q6.jpg"),
      rating: 4.7,
      reviews: 178,
      description: "Akoya pearls with alternating gemstone beads",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isNatural: true,
      isHandmade: true,
      gemstone: "Pearl",
      type: "Strand",
      metal: "14K Gold",
      origin: "Japan",
      birthstone: "June",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Traditional",
      purity: "14K",
      weight: "20g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false
    },
    {
      id: 17,
      name: "Peridot Drop Earrings",
      category: "earrings",
      price: 69999,
      originalPrice: 89999,
      discount: 22,
      image: require("../assets/q7.jpg"),
      rating: 4.5,
      reviews: 92,
      description: "Zabargad peridot with delicate gold work",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isNatural: true,
      isHandmade: false,
      gemstone: "Peridot",
      type: "Drop",
      metal: "Rose Gold",
      origin: "Egypt",
      birthstone: "August",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Casual",
      purity: "18K",
      weight: "6g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false
    },
    {
      id: 18,
      name: "Garnet & Diamond Ring",
      category: "rings",
      price: 75999,
      originalPrice: 99999,
      discount: 24,
      image: require("../assets/q8.jpg"),
      rating: 4.8,
      reviews: 245,
      description: "Tsavorite garnet with pavé diamond band",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isNatural: true,
      isHandmade: true,
      gemstone: "Garnet",
      type: "Halo",
      metal: "Platinum",
      origin: "Tanzania",
      birthstone: "January",
      material: "Platinum",
      jewelleryType: "gemstone",
      occasion: "Party",
      purity: "950",
      weight: "9g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true
    },
    {
      id: 19,
      name: "Aquamarine Pendant Set",
      category: "necklaces",
      price: 139999,
      originalPrice: 179999,
      discount: 22,
      image: require("../assets/q9.jpg"),
      rating: 4.6,
      reviews: 134,
      description: "Santa Maria aquamarine with matching earrings",
      inStock: true,
      isNew: false,
      isBestseller: false,
      isNatural: true,
      isHandmade: false,
      gemstone: "Aquamarine",
      type: "Set",
      metal: "White Gold",
      origin: "Brazil",
      birthstone: "March",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Casual",
      purity: "18K",
      weight: "18g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false
    },
    {
      id: 20,
      name: "Panna Citrine Brooch",
      category: "brooches",
      price: 89999,
      originalPrice: 119999,
      discount: 25,
      image: require("../assets/q10.jpg"),
      rating: 4.4,
      reviews: 48,
      description: "Madeira citrine in vintage-inspired design",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isNatural: true,
      isHandmade: true,
      gemstone: "Citrine",
      type: "Brooch",
      metal: "Gold Vermeil",
      origin: "Brazil",
      birthstone: "November",
      material: "Gold",
      jewelleryType: "gemstone",
      occasion: "Vintage",
      purity: "Vermeil",
      weight: "15g",
      delivery: "5-7 days",
      isHallmark: false,
      isPure: false
    },

    // Diamond Jewellery (10 items)
    {
      id: 21,
      name: "GIA Certified 1-Carat Solitaire Ring",
      category: "rings",
      price: 289999,
      originalPrice: 389999,
      discount: 26,
      image: require("../assets/DR.jpg"),
      rating: 4.9,
      reviews: 312,
      description: "GIA certified 1-carat diamond in platinum setting",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isCertified: true,
      isLuxury: true,
      isSolitaire: true,
      carat: "1.00",
      certification: "GIA",
      metal: "Platinum",
      clarity: "VS1",
      color: "D",
      material: "Platinum",
      jewelleryType: "diamond",
      occasion: "Engagement",
      purity: "950",
      weight: "7g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true,
      gemstone: "Diamond"
    },
    {
      id: 22,
      name: "Diamond Tennis Bracelet",
      category: "bracelets",
      price: 459999,
      originalPrice: 599999,
      discount: 23,
      image: require("../assets/DR6.jpg"),
      rating: 4.8,
      reviews: 189,
      description: "Channel-set diamonds with total 5 carat weight",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isCertified: true,
      isLuxury: true,
      isSolitaire: false,
      carat: "5.00",
      certification: "IGI",
      metal: "White Gold",
      clarity: "VS2",
      color: "G",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Luxury",
      purity: "18K",
      weight: "35g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false,
      gemstone: "Diamond"
    },
    {
      id: 23,
      name: "Diamond Stud Earrings",
      category: "earrings",
      price: 129999,
      originalPrice: 169999,
      discount: 24,
      image: require("../assets/DR9.jpg"),
      rating: 4.7,
      reviews: 267,
      description: "Pair of 0.5-carat diamond studs in 18K gold",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isCertified: true,
      isLuxury: false,
      isSolitaire: false,
      carat: "1.00",
      certification: "GIA",
      metal: "18K Gold",
      clarity: "VS1",
      color: "F",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Daily Wear",
      purity: "18K",
      weight: "5g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false,
      gemstone: "Diamond"
    },
    {
      id: 24,
      name: "Diamond Pendant Necklace",
      category: "necklaces",
      price: 159999,
      originalPrice: 209999,
      discount: 24,
      image: require("../assets/DR10.jpg"),
      rating: 4.6,
      reviews: 156,
      description: "0.75-carat diamond pendant with delicate chain",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isCertified: true,
      isLuxury: true,
      isSolitaire: true,
      carat: "0.75",
      certification: "IGI",
      metal: "White Gold",
      clarity: "VVS2",
      color: "E",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Party",
      purity: "18K",
      weight: "10g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false,
      gemstone: "Diamond"
    },
    {
      id: 25,
      name: "Three-Stone Diamond Ring",
      category: "rings",
      price: 389999,
      originalPrice: 499999,
      discount: 22,
      image: require("../assets/DR11.jpg"),
      rating: 4.9,
      reviews: 203,
      description: "Three diamonds representing past, present, future",
      inStock: false,
      isNew: true,
      isBestseller: true,
      isCertified: true,
      isLuxury: true,
      isSolitaire: false,
      carat: "2.50",
      certification: "GIA",
      metal: "Platinum",
      clarity: "VS1",
      color: "F",
      material: "Platinum",
      jewelleryType: "diamond",
      occasion: "Anniversary",
      purity: "950",
      weight: "12g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true,
      gemstone: "Diamond"
    },
    {
      id: 26,
      name: "Diamond Bangle",
      category: "bangles",
      price: 319999,
      originalPrice: 419999,
      discount: 24,
      image: require("../assets/DR12.jpg"),
      rating: 4.7,
      reviews: 178,
      description: "Half eternity diamond bangle in rose gold",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isCertified: true,
      isLuxury: true,
      isSolitaire: false,
      carat: "3.00",
      certification: "SGL",
      metal: "Rose Gold",
      clarity: "SI1",
      color: "H",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Luxury",
      purity: "18K",
      weight: "30g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false,
      gemstone: "Diamond"
    },
    {
      id: 27,
      name: "Diamond Hoop Earrings",
      category: "earrings",
      price: 89999,
      originalPrice: 119999,
      discount: 25,
      image: require("../assets/DR13.jpg"),
      rating: 4.5,
      reviews: 92,
      description: "Diamond hoop earrings with secure locking mechanism",
      inStock: true,
      isNew: false,
      isBestseller: true,
      isCertified: false,
      isLuxury: false,
      isSolitaire: false,
      carat: "0.50",
      certification: "None",
      metal: "Yellow Gold",
      clarity: "SI2",
      color: "I",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Casual",
      purity: "18K",
      weight: "8g",
      delivery: "5-7 days",
      isHallmark: false,
      isPure: false,
      gemstone: "Diamond"
    },
    {
      id: 28,
      name: "Diamond Eternity Ring",
      category: "rings",
      price: 229999,
      originalPrice: 299999,
      discount: 23,
      image: require("../assets/DR1.jpg"),
      rating: 4.8,
      reviews: 245,
      description: "Full eternity band with channel-set diamonds",
      inStock: true,
      isNew: true,
      isBestseller: true,
      isCertified: true,
      isLuxury: true,
      isSolitaire: false,
      carat: "2.00",
      certification: "GIA",
      metal: "Platinum",
      clarity: "VS2",
      color: "G",
      material: "Platinum",
      jewelleryType: "diamond",
      occasion: "Anniversary",
      purity: "950",
      weight: "10g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true,
      gemstone: "Diamond"
    },
    {
      id: 29,
      name: "Diamond Chain Bracelet",
      category: "bracelets",
      price: 179999,
      originalPrice: 239999,
      discount: 25,
      image: require("../assets/DR14.jpg"),
      rating: 4.6,
      reviews: 134,
      description: "Diamond station bracelet with adjustable length",
      inStock: true,
      isNew: false,
      isBestseller: false,
      isCertified: true,
      isLuxury: false,
      isSolitaire: false,
      carat: "1.50",
      certification: "IGI",
      metal: "White Gold",
      clarity: "VS1",
      color: "F",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Daily Wear",
      purity: "18K",
      weight: "18g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: false,
      gemstone: "Diamond"
    },
    {
      id: 30,
      name: "Diamond Nose Pin",
      category: "nose-pins",
      price: 29999,
      originalPrice: 39999,
      discount: 25,
      image: require("../assets/DR15.jpg"),
      rating: 4.4,
      reviews: 48,
      description: "Diamond nose pin with screw back for security",
      inStock: true,
      isNew: true,
      isBestseller: false,
      isCertified: false,
      isLuxury: false,
      isSolitaire: true,
      carat: "0.25",
      certification: "None",
      metal: "Gold",
      clarity: "SI1",
      color: "H",
      material: "Gold",
      jewelleryType: "diamond",
      occasion: "Traditional",
      purity: "22K",
      weight: "3g",
      delivery: "5-7 days",
      isHallmark: true,
      isPure: true,
      gemstone: "Diamond"
    },


  ], []);

  // Initialize jewellery data
  // Fetch jewellery data from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from backend...");
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log("Products fetched:", data.length);

        // Transform data to match frontend structure
        const formattedData = data.map(item => ({
          ...item,
          id: item._id, // Map _id to id
          // Ensure defaults for optional fields
          originalPrice: item.originalPrice || item.price,
          discount: item.discount || 0,
          // Handle image path (if it's a relative path from backend)
          image: item.image,
          rating: item.rating || 0,
          reviews: item.numReviews || 0,
          inStock: item.countInStock > 0 || item.inStock,

          // Ensure other fields exist for filters
          material: item.material || '',
          jewelleryType: item.jewelleryType || '',
          category: item.category || '',
          purity: item.purity || '',
          occasion: item.occasion || '',
          gemstone: item.gemstone || '',
          type: item.type || '',
          weight: item.weight || '',
          delivery: item.delivery || '5-7 days',
          isNew: item.isNew !== undefined ? item.isNew : true,
          isBestseller: item.isBestseller || false
        }));

        setAllJewellery(formattedData);

      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback or handle error - here we might want to start empty or show error
        // For now, we will just log it. 
      }
    };

    fetchProducts();
  }, []);

  // Get items for current category or all items if no category
  const items = useMemo(() => {
    console.log("Category parameter:", category);
    console.log("Total items in allJewellery:", allJewellery.length);

    if (!category || category === 'all') {
      console.log("Showing all items:", allJewellery.length);
      return allJewellery;
    }

    const filtered = allJewellery.filter(item => {
      const categoryParam = category.toLowerCase();
      const categoryMatch =
        (item.category && item.category.toLowerCase() === categoryParam) ||
        (item.jewelleryType && item.jewelleryType.toLowerCase() === categoryParam) ||
        (item.material && item.material.toLowerCase() === categoryParam) ||
        // Fallback for Admin Panel "Category" field which acts as Collection
        (item.category && item.category.toLowerCase() === categoryParam);

      return categoryMatch;
    });

    console.log(`Filtered items for category "${category}":`, filtered.length);
    return filtered;
  }, [allJewellery, category]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('jewellery-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('jewellery-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Filter options based on available jewellery data
  const filterOptions = useMemo(() => {
    const materials = [...new Set(allJewellery.map(item => item.material).filter(Boolean))];
    const jewelleryTypes = [...new Set(allJewellery.map(item => item.jewelleryType).filter(Boolean))];
    const categories = [...new Set(allJewellery.map(item => item.category).filter(Boolean))];
    const purities = [...new Set(allJewellery.map(item => item.purity).filter(Boolean))];
    const occasions = [...new Set(allJewellery.map(item => item.occasion).filter(Boolean))];
    const gemstones = [...new Set(allJewellery.map(item => item.gemstone).filter(Boolean))];

    return {
      price: [
        { label: "Under ₹10,000", min: 0, max: 10000 },
        { label: "₹10,000 - ₹25,000", min: 10000, max: 25000 },
        { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
        { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
        { label: "Over ₹1,00,000", min: 100000, max: Infinity }
      ],
      material: materials,
      jewelleryType: jewelleryTypes,
      category: categories,
      purity: purities,
      occasion: occasions,
      gemstone: gemstones,
      sortBy: [
        { value: "featured", label: "Featured" },
        { value: "newest", label: "Newest First" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Highest Rated" },
        { value: "discount", label: "Best Discount" },
        { value: "popular", label: "Most Popular" }
      ]
    };
  }, [allJewellery]);

  // Filter items based on selected filters
  const filteredItems = useMemo(() => {
    console.log("Applying filters...");
    let result = [...items];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.material && item.material.toLowerCase().includes(query)) ||
        (item.jewelleryType && item.jewelleryType.toLowerCase().includes(query))
      );
    }

    // Price filter
    if (selectedFilters.price.length > 0) {
      result = result.filter(item => {
        return selectedFilters.price.some(rangeLabel => {
          const priceRange = filterOptions.price.find(r => r.label === rangeLabel);
          if (!priceRange) return false;

          if (priceRange.max === Infinity) {
            return item.price >= priceRange.min;
          }
          return item.price >= priceRange.min && item.price <= priceRange.max;
        });
      });
    }

    // Material filter
    if (selectedFilters.material.length > 0) {
      result = result.filter(item =>
        selectedFilters.material.includes(item.material)
      );
    }

    // Jewellery Type filter
    if (selectedFilters.jewelleryType.length > 0) {
      result = result.filter(item =>
        selectedFilters.jewelleryType.includes(item.jewelleryType)
      );
    }

    // Category filter
    if (selectedFilters.category.length > 0) {
      result = result.filter(item =>
        selectedFilters.category.includes(item.category)
      );
    }

    // Purity filter
    if (selectedFilters.purity.length > 0) {
      result = result.filter(item =>
        selectedFilters.purity.includes(item.purity)
      );
    }

    // Occasion filter
    if (selectedFilters.occasion.length > 0) {
      result = result.filter(item =>
        selectedFilters.occasion.includes(item.occasion)
      );
    }

    // Gemstone filter
    if (selectedFilters.gemstone.length > 0) {
      result = result.filter(item =>
        selectedFilters.gemstone.includes(item.gemstone)
      );
    }

    // Sorting
    switch (selectedFilters.sortBy) {
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "popular":
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default: // featured
        result.sort((a, b) => {
          const aScore = (a.isNew ? 10 : 0) + (a.isBestseller ? 5 : 0) + (a.featured ? 3 : 0);
          const bScore = (b.isNew ? 10 : 0) + (b.isBestseller ? 5 : 0) + (b.featured ? 3 : 0);
          return bScore - aScore;
        });
    }

    console.log("Filtered items count:", result.length);
    return result;
  }, [items, selectedFilters, searchQuery, filterOptions.price]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };

      if (filterType === 'sortBy') {
        newFilters[filterType] = value;
      } else {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      }

      return newFilters;
    });
    setCurrentPage(1);
  }, []);

  // Toast notification
  const showToast = useCallback((message) => {
    const toast = document.createElement('div');
    toast.className = 'collection-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }, []);

  // Add to cart handler
  const handleAddToCart = useCallback((item) => {
    // Handle image property correctly
    let imageUrl = '';
    if (typeof item.image === 'string') {
      imageUrl = item.image;
    } else if (item.image && item.image.default) {
      imageUrl = item.image.default;
    } else {
      imageUrl = 'https://via.placeholder.com/300x300';
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      image: imageUrl,
      quantity: 1,
      category: item.category
    });

    showToast(`✨ ${item.name} added to cart!`);
  }, [addToCart, showToast]);

  // Buy now handler
  const handleBuyNow = useCallback((item) => {
    handleAddToCart(item);
    navigate("/checkout");
  }, [handleAddToCart, navigate]);

  // Wishlist handler
  const handleWishlistToggle = useCallback((item) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setWishlist(prev => {
      const isInWishlist = prev.some(w => w.id === item.id);
      if (isInWishlist) {
        showToast(`❌ ${item.name} removed from wishlist`);
        return prev.filter(w => w.id !== item.id);
      } else {
        showToast(`❤️ ${item.name} added to wishlist!`);
        return [...prev, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: typeof item.image === 'string' ? item.image : (item.image?.default || ''),
          originalPrice: item.originalPrice || item.price,
          category: item.category,
          addedAt: new Date().toISOString()
        }];
      }
    });
  }, [user, navigate, showToast]);

  // Product Card Component
  const ProductCard = useCallback(({ item }) => {
    const isInWishlist = wishlist.some(w => w.id === item.id);

    // Handle image source
    const imageSrc = typeof item.image === 'string' ? item.image : (item.image?.default || 'https://via.placeholder.com/300x300');

    return (
      <div className="collection-product-card" key={item.id}>
        {/* Badges */}
        <div className="product-badges">
          {item.discount > 10 && (
            <span className="badge discount">-{item.discount}%</span>
          )}
          {item.isNew && (
            <span className="badge new">NEW</span>
          )}
          {item.isBestseller && (
            <span className="badge bestseller">🔥 BESTSELLER</span>
          )}
          {item.inStock === false && (
            <span className="badge out-of-stock">Out of Stock</span>
          )}
          {item.isHallmark && (
            <span className="badge hallmark">Hallmark</span>
          )}
          {item.isPure && (
            <span className="badge pure">Pure</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistToggle(item);
          }}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>

        {/* Quick View Button */}
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewItem(item);
          }}
          title="Quick View"
        >
          👁️
        </button>

        {/* Product Image */}
        <div
          className="product-image"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          <img
            src={imageSrc}
            alt={item.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300';
            }}
          />
          <div className="product-overlay">
            <button
              className="quick-view-overlay"
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewItem(item);
              }}
            >
              QUICK VIEW
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-header">
            <h3 className="product-name">{item.name}</h3>
            <div className="product-rating">
              <span className="stars">
                {"★".repeat(Math.floor(item.rating || 4))}
                {"☆".repeat(5 - Math.floor(item.rating || 4))}
              </span>
              <span className="rating-value">{item.rating || 4.0} ({item.reviews || 0})</span>
            </div>
          </div>

          <p className="product-description">{item.description}</p>

          <div className="product-specs">
            {item.material && (
              <span className="spec">
                <span className="spec-icon">💎</span>
                {item.material} {item.purity && `(${item.purity})`}
              </span>
            )}
            {item.weight && (
              <span className="spec">
                <span className="spec-icon">⚖️</span>
                {item.weight}
              </span>
            )}
            {item.type && (
              <span className="spec">
                <span className="spec-icon">🏷️</span>
                {item.type}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="product-price">
            <div className="price-main">
              {item.discount > 0 ? (
                <>
                  <span className="original-price">₹{item.originalPrice?.toLocaleString() || item.price.toLocaleString()}</span>
                  <span className="current-price">₹{item.price.toLocaleString()}</span>
                  <span className="save-amount">
                    Save ₹{((item.originalPrice || item.price * 1.2) - item.price).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="current-price">₹{item.price.toLocaleString()}</span>
              )}
            </div>
            {item.delivery && (
              <div className="delivery-info">
                <span className="delivery-icon">🚚</span>
                {item.delivery}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="collections-button-group">
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
              }}
              disabled={!item.inStock}
            >
              CART
            </button>
            <button
              className="buy-now-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyNow(item);
              }}
              disabled={!item.inStock}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    );
  }, [wishlist, navigate, handleWishlistToggle, handleAddToCart, handleBuyNow]);

  // Filter Section Component
  const FilterSection = useCallback(({ title, options, type }) => {
    const isChecked = (value) => {
      if (type === 'sortBy') {
        return selectedFilters[type] === value;
      }
      return selectedFilters[type].includes(value);
    };

    return (
      <div className="filter-section">
        <h4 className="filter-title">{title}</h4>
        <div className="filter-options">
          {options.map((option, index) => {
            const label = option.label || option;
            const value = option.value || option;
            const checked = isChecked(value);

            return (
              <label key={index} className="filter-option">
                <input
                  type={type === 'sortBy' ? 'radio' : 'checkbox'}
                  checked={checked}
                  onChange={() => handleFilterChange(type, value)}
                />
                <span className="checkmark"></span>
                <span className="option-label">{label}</span>
                {type === 'price' && (
                  <span className="option-count">
                    ({filteredItems.filter(item => {
                      const range = filterOptions.price.find(r => r.label === value);
                      if (!range) return false;
                      if (range.max === Infinity) {
                        return item.price >= range.min;
                      }
                      return item.price >= range.min && item.price <= range.max;
                    }).length})
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  }, [selectedFilters, filteredItems, filterOptions.price, handleFilterChange]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedFilters({
      price: [],
      material: [],
      jewelleryType: [],
      category: [],
      purity: [],
      occasion: [],
      gemstone: [],
      sortBy: "featured"
    });
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(selectedFilters).reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        return acc + curr.length;
      }
      return acc;
    }, 0);
  }, [selectedFilters]);

  // Get current category or default to 'all'
  const currentCategory = category || 'all';

  // Helper function to safely format category name
  const formatCategoryName = (cat) => {
    if (!cat) return 'All Jewellery';
    if (cat === 'all') return 'All Jewellery';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="collections-page">
      {/* Debug Info - Remove after testing */}
      <div style={{
        background: '#f0f0f0',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        fontSize: '14px',
        display: 'none' // Set to 'block' to see debug info
      }}>
        <p><strong>Debug Info:</strong></p>
        <p>Total Items in Data: {allJewellery.length}</p>
        <p>Category from URL: {category || 'all'}</p>
        <p>Filtered Items: {filteredItems.length}</p>
        <p>Current Page Items: {currentItems.length}</p>
        <p>Active Filters: {activeFilterCount}</p>
      </div>

      {/* Hero Banner */}
      <div className="collections-hero">
        <div className="collections-hero-overlay"></div>
        <div className="collections-hero-content">
          <h1 className="collections-hero-title">
            {currentCategory === 'all' ? 'All Jewellery Collection' : `${formatCategoryName(currentCategory)} Collection`}
          </h1>
          <p className="collections-hero-subtitle">
            {currentCategory === 'all'
              ? 'Browse our complete jewellery collection across all categories'
              : `Discover our exquisite range of ${currentCategory} jewellery crafted with precision and passion`}
          </p>
          <div className="collections-hero-stats">
            <div className="stat">
              <span className="stat-number">{allJewellery.length}+</span>
              <span className="stat-label">Total Items</span>
            </div>
            <div className="stat">
              <span className="stat-number">{filteredItems.length}</span>
              <span className="stat-label">Filtered</span>
            </div>
            <div className="stat">
              <span className="stat-number">{filterOptions.material.length}</span>
              <span className="stat-label">Materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-header">
        <button
          className="mobile-filter-toggle"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          🔧 Filters ({activeFilterCount})
        </button>
        {activeFilterCount > 0 && (
          <button
            className="mobile-clear-filters"
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="collections-container">
        {/* Sidebar Filters */}
        <div className={`collections-sidebar ${showMobileFilters ? 'mobile-show' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button
              className="clear-filters"
              onClick={clearAllFilters}
            >
              Clear All
            </button>
          </div>

          {/* Search */}
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          {/* Sort */}
          <div className="sort-filter">
            <h4 className="filter-title">Sort By</h4>
            <div className="sort-options">
              {filterOptions.sortBy.map((option, index) => (
                <label key={index} className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedFilters.sortBy === option.value}
                    onChange={() => handleFilterChange('sortBy', option.value)}
                  />
                  <span className="checkmark"></span>
                  <span className="option-label">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          {filterOptions.price.length > 0 && (
            <FilterSection
              title="Price Range"
              options={filterOptions.price}
              type="price"
            />
          )}

          {/* Material Filter */}
          {filterOptions.material.length > 0 && (
            <FilterSection
              title="Material"
              options={filterOptions.material}
              type="material"
            />
          )}

          {/* Jewellery Type Filter */}
          {filterOptions.jewelleryType.length > 0 && (
            <FilterSection
              title="Jewellery Type"
              options={filterOptions.jewelleryType}
              type="jewelleryType"
            />
          )}

          {/* Category Filter */}
          {filterOptions.category.length > 0 && (
            <FilterSection
              title="Category"
              options={filterOptions.category}
              type="category"
            />
          )}

          {/* Purity Filter */}
          {filterOptions.purity.length > 0 && (
            <FilterSection
              title="Purity"
              options={filterOptions.purity}
              type="purity"
            />
          )}

          {/* Occasion Filter */}
          {filterOptions.occasion.length > 0 && (
            <FilterSection
              title="Occasion"
              options={filterOptions.occasion}
              type="occasion"
            />
          )}

          {/* Gemstone Filter */}
          {filterOptions.gemstone.length > 0 && (
            <FilterSection
              title="Gemstone"
              options={filterOptions.gemstone}
              type="gemstone"
            />
          )}

          {/* Mobile Filter Close Button */}
          <button
            className="mobile-filter-close"
            onClick={() => setShowMobileFilters(false)}
          >
            Apply Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="collections-main">
          {/* Header */}
          <div className="collections-header">
            <div className="header-left">
              <h2 className="page-title">
                {formatCategoryName(currentCategory)} Collection
              </h2>
              <p className="page-subtitle">
                Showing {Math.min(currentItems.length, itemsPerPage)} of {filteredItems.length} products
                {activeFilterCount > 0 ? ` (${activeFilterCount} filters applied)` : ''}
              </p>
            </div>
            <div className="header-right">
              <select
                className="sort-select"
                value={selectedFilters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                {filterOptions.sortBy.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="active-filters">
              {Object.entries(selectedFilters).map(([key, values]) => {
                if (!Array.isArray(values) || values.length === 0) return null;

                return values.map(value => (
                  <span key={`${key}-${value}`} className="active-filter">
                    {key}: {value}
                    <button onClick={() => handleFilterChange(key, value)}>×</button>
                  </span>
                ));
              })}
            </div>
          )}

          {/* Products Grid */}
          {currentItems.length > 0 ? (
            <>
              <div className="collections-grid">
                {currentItems.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn prev"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="pagination-ellipsis">...</span>
                  )}

                  <button
                    className="pagination-btn next"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No jewellery found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button
                className="reset-filters-btn"
                onClick={clearAllFilters}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Statistics */}
          <div className="collection-statistics">
            <h3>Collection Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon">💎</span>
                <div>
                  <h4>Total Items</h4>
                  <p>{allJewellery.length} jewellery pieces</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">💰</span>
                <div>
                  <h4>Price Range</h4>
                  <p>₹{allJewellery.length > 0 ? Math.min(...allJewellery.map(i => i.price)).toLocaleString() : '0'} - ₹{allJewellery.length > 0 ? Math.max(...allJewellery.map(i => i.price)).toLocaleString() : '0'}</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">🏷️</span>
                <div>
                  <h4>Categories</h4>
                  <p>{filterOptions.category.length} different types</p>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⭐</span>
                <div>
                  <h4>Avg Rating</h4>
                  <p>{allJewellery.length > 0 ? (allJewellery.reduce((sum, item) => sum + (item.rating || 0), 0) / allJewellery.length).toFixed(1) : '0.0'}/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewItem && (
        <div className="quick-view-modal">
          <div className="modal-overlay" onClick={() => setQuickViewItem(null)}></div>
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setQuickViewItem(null)}
            >
              ✕
            </button>

            <div className="modal-product">
              <div className="modal-images">
                <img
                  src={typeof quickViewItem.image === 'string' ? quickViewItem.image : (quickViewItem.image?.default || 'https://via.placeholder.com/300x300')}
                  alt={quickViewItem.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x300';
                  }}
                />
              </div>

              <div className="modal-details">
                <h2>{quickViewItem.name}</h2>
                <div className="modal-rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(quickViewItem.rating || 4))}
                    {"☆".repeat(5 - Math.floor(quickViewItem.rating || 4))}
                  </span>
                  <span>{quickViewItem.rating || 4.0} ({quickViewItem.reviews || 0} reviews)</span>
                </div>

                <p className="modal-description">{quickViewItem.description}</p>

                <div className="modal-specs">
                  {quickViewItem.material && (
                    <div className="spec">
                      <span className="spec-label">Material:</span>
                      <span className="spec-value">{quickViewItem.material} {quickViewItem.purity && `(${quickViewItem.purity})`}</span>
                    </div>
                  )}
                  {quickViewItem.weight && (
                    <div className="spec">
                      <span className="spec-label">Weight:</span>
                      <span className="spec-value">{quickViewItem.weight}</span>
                    </div>
                  )}
                  {quickViewItem.type && (
                    <div className="spec">
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">{quickViewItem.type}</span>
                    </div>
                  )}
                  {quickViewItem.occasion && (
                    <div className="spec">
                      <span className="spec-label">Occasion:</span>
                      <span className="spec-value">{quickViewItem.occasion}</span>
                    </div>
                  )}
                  <div className="spec">
                    <span className="spec-label">Stock:</span>
                    <span className="spec-value">{quickViewItem.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>

                <div className="modal-price">
                  {quickViewItem.discount > 0 ? (
                    <>
                      <div className="price-original">₹{quickViewItem.originalPrice?.toLocaleString() || quickViewItem.price.toLocaleString()}</div>
                      <div className="price-current">₹{quickViewItem.price.toLocaleString()}</div>
                      <div className="price-save">
                        Save ₹{((quickViewItem.originalPrice || quickViewItem.price * 1.2) - quickViewItem.price).toLocaleString()}
                        ({quickViewItem.discount}% off)
                      </div>
                    </>
                  ) : (
                    <div className="price-current">₹{quickViewItem.price.toLocaleString()}</div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    className="modal-wishlist"
                    onClick={() => {
                      handleWishlistToggle(quickViewItem);
                      setQuickViewItem(null);
                    }}
                  >
                    {wishlist.some(w => w.id === quickViewItem.id) ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
                  </button>
                  <div className="modal-button-group">
                    <button
                      className="modal-add-to-cart"
                      onClick={() => {
                        handleAddToCart(quickViewItem);
                        setQuickViewItem(null);
                      }}
                      disabled={!quickViewItem.inStock}
                    >
                      CART
                    </button>
                    <button
                      className="modal-buy-now"
                      onClick={() => {
                        handleBuyNow(quickViewItem);
                        setQuickViewItem(null);
                      }}
                      disabled={!quickViewItem.inStock}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export functions to add jewellery from other pages
export const addJewellery = (item) => {
  // This function can be called from other pages
  // Store in localStorage temporarily
  const existing = JSON.parse(localStorage.getItem('tempJewellery') || '[]');
  existing.push(item);
  localStorage.setItem('tempJewellery', JSON.stringify(existing));
  return item;
};

// Export function to get all jewellery
export const getAllJewellery = () => {
  return JSON.parse(localStorage.getItem('allJewellery') || '[]');
};

export default Collections;