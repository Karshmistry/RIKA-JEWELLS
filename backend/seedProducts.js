
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const products = [
    // --- GOLD ---
    {
        name: "24K Gold Temple Necklace Set",
        category: "Gold",
        price: 459999,
        image: "/assets/t1.jpg",
        rating: 4.9,
        numReviews: 256,
        description: "Traditional temple jewellery with intricate carving. Type: necklaces",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "22K Gold Bridal Haram",
        category: "Gold",
        price: 789999,
        image: "/assets/t2.jpg",
        rating: 4.8,
        numReviews: 189,
        description: "Heavy bridal haram with polki and meenakari work. Type: haram",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "18K Gold Diamond Earrings",
        category: "Gold",
        price: 129999,
        image: "/assets/t3.jpg",
        rating: 4.7,
        numReviews: 167,
        description: "Contemporary diamond stud earrings in 18K gold. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "22K Gold Bangles Set",
        category: "Gold",
        price: 189999,
        image: "/assets/t4.jpg",
        rating: 4.9,
        numReviews: 245,
        description: "Set of 7 kadas with traditional motifs. Type: bangles",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "24K Gold Mangalsutra",
        category: "Gold",
        price: 89999,
        image: "/assets/t5.jpg",
        rating: 4.8,
        numReviews: 192,
        description: "Traditional mangalsutra with black beads and gold pendant. Type: mangalsutra",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "18K Gold Tennis Bracelet",
        category: "Gold",
        price: 229999,
        image: "/assets/t6.jpg",
        rating: 4.6,
        numReviews: 156,
        description: "Modern tennis bracelet with channel-set diamonds. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "22K Gold Nose Pin Collection",
        category: "Gold",
        price: 29999,
        image: "/assets/t7.jpg",
        rating: 4.5,
        numReviews: 78,
        description: "Set of traditional nose pins with different designs. Type: nose-pins",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "24K Gold Coin Set",
        category: "Gold",
        price: 589999,
        image: "/assets/t8.jpg",
        rating: 4.9,
        numReviews: 203,
        description: "Set of 10 gold coins with Lakshmi embossing. Type: coins",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "18K Gold Chain",
        category: "Gold",
        price: 75999,
        image: "/assets/t9.jpg",
        rating: 4.7,
        numReviews: 178,
        description: "Solid gold chain with secure clasp. Type: chains",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "22K Gold Toe Rings",
        category: "Gold",
        price: 15999,
        image: "/assets/t10.jpg",
        rating: 4.4,
        numReviews: 42,
        description: "Traditional gold toe rings for married women. Type: toe-rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },

    // --- SILVER ---
    {
        name: "Sterling Silver Diamond Necklace",
        category: "Silver",
        price: 15999,
        image: "/assets/Silver1.jpg",
        rating: 4.8,
        numReviews: 142,
        description: "925 Sterling Silver with pave diamond accents. Type: necklaces",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Oxidized Silver Tribal Earrings",
        category: "Silver",
        price: 4599,
        image: "/assets/Silver2.jpg",
        rating: 4.7,
        numReviews: 89,
        description: "Traditional tribal design with oxidized finish. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Gemstone Bracelet Set",
        category: "Silver",
        price: 8999,
        image: "/assets/Silver3.jpg",
        rating: 4.6,
        numReviews: 67,
        description: "Set of 3 bracelets with natural gemstones. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Filigree Anklet",
        category: "Silver",
        price: 3299,
        image: "/assets/Silver4.jpg",
        rating: 4.5,
        numReviews: 45,
        description: "Delicate filigree work with pearl accents. Type: anklets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Statement Ring",
        category: "Silver",
        price: 2599,
        image: "/assets/Silver5.jpg",
        rating: 4.7,
        numReviews: 92,
        description: "Bold statement ring with cubic zirconia. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Mangalsutra Set",
        category: "Silver",
        price: 12999,
        image: "/assets/Silver6.jpg",
        rating: 4.9,
        numReviews: 156,
        description: "Contemporary silver mangalsutra with black beads. Type: mangalsutra",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Nose Pin Collection",
        category: "Silver",
        price: 1799,
        image: "/assets/Silver7.jpg",
        rating: 4.4,
        numReviews: 38,
        description: "Set of 5 different nose pin designs. Type: nose-pins",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Pendant with Chain",
        category: "Silver",
        price: 6999,
        image: "/assets/Silver8.jpg",
        rating: 4.8,
        numReviews: 203,
        description: "Elegant pendant with adjustable chain. Type: pendants",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Bangles Set",
        category: "Silver",
        price: 11999,
        image: "/assets/Silver9.jpg",
        rating: 4.7,
        numReviews: 78,
        description: "Set of 7 silver bangles with engraving. Type: bangles",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Silver Toe Rings",
        category: "Silver",
        price: 1499,
        image: "/assets/Silver10.jpg",
        rating: 4.5,
        numReviews: 42,
        description: "Pair of adjustable silver toe rings. Type: toe-rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },

    // --- PLATINUM ---
    {
        name: "Platinum Solitaire Diamond Ring",
        category: "Platinum",
        price: 189999,
        image: "/assets/k1.jpg",
        rating: 4.9,
        numReviews: 156,
        description: "950 Platinum with 1-carat certified diamond. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Wedding Band Set",
        category: "Platinum",
        price: 299999,
        image: "/assets/k2.jpg",
        rating: 4.8,
        numReviews: 89,
        description: "His & Hers platinum wedding bands with milgrain detail. Type: wedding-bands",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Tennis Bracelet",
        category: "Platinum",
        price: 459999,
        image: "/assets/k3.jpg",
        rating: 4.9,
        numReviews: 67,
        description: "Channel-set diamonds in platinum tennis bracelet. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Stud Earrings",
        category: "Platinum",
        price: 129999,
        image: "/assets/k4.jpg",
        rating: 4.7,
        numReviews: 145,
        description: "0.75ct platinum diamond stud earrings. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Pendant Necklace",
        category: "Platinum",
        price: 149999,
        image: "/assets/k5.jpg",
        rating: 4.6,
        numReviews: 92,
        description: "Platinum pendant with sapphire accents. Type: necklaces",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Men's Cufflinks",
        category: "Platinum",
        price: 79999,
        image: "/assets/k6.jpg",
        rating: 4.8,
        numReviews: 156,
        description: "Minimalist platinum cufflinks with onyx inlay. Type: men",
        countInStock: 0,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Eternity Band",
        category: "Platinum",
        price: 229999,
        image: "/assets/k7.jpg",
        rating: 4.9,
        numReviews: 203,
        description: "Full eternity band with channel-set diamonds. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Hoop Earrings",
        category: "Platinum",
        price: 89999,
        image: "/assets/k8.jpg",
        rating: 4.5,
        numReviews: 78,
        description: "Medium-sized platinum hoop earrings. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Chain Bracelet",
        category: "Platinum",
        price: 159999,
        image: "/assets/k9.jpg",
        rating: 4.7,
        numReviews: 78,
        description: "Solid platinum chain bracelet with lobster clasp. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Platinum Bangle",
        category: "Platinum",
        price: 179999,
        image: "/assets/k10.jpg",
        rating: 4.8,
        numReviews: 142,
        description: "Solid platinum bangle with engraved pattern. Type: bangles",
        countInStock: 10,
        brand: "Rika Jewels"
    },

    // --- GEMSTONE ---
    {
        name: "Ruby & Diamond Statement Ring",
        category: "Gemstone",
        price: 189999,
        image: "/assets/q11.jpg",
        rating: 4.9,
        numReviews: 256,
        description: "Natural Burmese ruby with diamond halo in 18K gold. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Emerald Pendant Necklace",
        category: "Gemstone",
        price: 159999,
        image: "/assets/q13.jpg",
        rating: 4.8,
        numReviews: 189,
        description: "Colombian emerald pendant with diamond accents. Type: necklaces",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Sapphire Tennis Bracelet",
        category: "Gemstone",
        price: 229999,
        image: "/assets/q3.jpg",
        rating: 4.7,
        numReviews: 167,
        description: "Kashmir blue sapphires with diamond spacers. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Opal & Diamond Earrings",
        category: "Gemstone",
        price: 129999,
        image: "/assets/q14.jpg",
        rating: 4.6,
        numReviews: 156,
        description: "Australian opal with diamond surround in yellow gold. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Amethyst Cocktail Ring",
        category: "Gemstone",
        price: 89999,
        image: "/assets/q15.jpg",
        rating: 4.9,
        numReviews: 203,
        description: "Large Brazilian amethyst in art deco setting. Type: rings",
        countInStock: 0,
        brand: "Rika Jewels"
    },
    {
        name: "Pearl & Gemstone Bracelet",
        category: "Gemstone",
        price: 119999,
        image: "/assets/q6.jpg",
        rating: 4.7,
        numReviews: 178,
        description: "Akoya pearls with alternating gemstone beads. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Peridot Drop Earrings",
        category: "Gemstone",
        price: 69999,
        image: "/assets/q7.jpg",
        rating: 4.5,
        numReviews: 92,
        description: "Zabargad peridot with delicate gold work. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Garnet & Diamond Ring",
        category: "Gemstone",
        price: 75999,
        image: "/assets/q8.jpg",
        rating: 4.8,
        numReviews: 245,
        description: "Tsavorite garnet with pavé diamond band. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Aquamarine Pendant Set",
        category: "Gemstone",
        price: 139999,
        image: "/assets/q9.jpg",
        rating: 4.6,
        numReviews: 134,
        description: "Santa Maria aquamarine with matching earrings. Type: necklaces",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Panna Citrine Brooch",
        category: "Gemstone",
        price: 89999,
        image: "/assets/q10.jpg",
        rating: 4.4,
        numReviews: 48,
        description: "Madeira citrine in vintage-inspired design. Type: brooches",
        countInStock: 10,
        brand: "Rika Jewels"
    },

    // --- DIAMOND ---
    {
        name: "GIA Certified 1-Carat Solitaire Ring",
        category: "Diamond",
        price: 289999,
        image: "/assets/DR.jpg",
        rating: 4.9,
        numReviews: 312,
        description: "GIA certified 1-carat diamond in platinum setting. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Tennis Bracelet",
        category: "Diamond",
        price: 459999,
        image: "/assets/DR6.jpg",
        rating: 4.8,
        numReviews: 189,
        description: "Channel-set diamonds with total 5 carat weight. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Stud Earrings",
        category: "Diamond",
        price: 129999,
        image: "/assets/DR9.jpg",
        rating: 4.7,
        numReviews: 267,
        description: "Pair of 0.5-carat diamond studs in 18K gold. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Pendant Necklace",
        category: "Diamond",
        price: 159999,
        image: "/assets/DR10.jpg",
        rating: 4.6,
        numReviews: 156,
        description: "0.75-carat diamond pendant with delicate chain. Type: necklaces",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Three-Stone Diamond Ring",
        category: "Diamond",
        price: 389999,
        image: "/assets/DR11.jpg",
        rating: 4.9,
        numReviews: 203,
        description: "Three diamonds representing past, present, future. Type: rings",
        countInStock: 0,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Bangle",
        category: "Diamond",
        price: 319999,
        image: "/assets/DR12.jpg",
        rating: 4.7,
        numReviews: 178,
        description: "Half eternity diamond bangle in rose gold. Type: bangles",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Hoop Earrings",
        category: "Diamond",
        price: 89999,
        image: "/assets/DR13.jpg",
        rating: 4.5,
        numReviews: 92,
        description: "Diamond hoop earrings with secure locking mechanism. Type: earrings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Eternity Ring",
        category: "Diamond",
        price: 229999,
        image: "/assets/DR1.jpg",
        rating: 4.8,
        numReviews: 245,
        description: "Full eternity band with channel-set diamonds. Type: rings",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Chain Bracelet",
        category: "Diamond",
        price: 179999,
        image: "/assets/DR14.jpg",
        rating: 4.6,
        numReviews: 134,
        description: "Diamond station bracelet with adjustable length. Type: bracelets",
        countInStock: 10,
        brand: "Rika Jewels"
    },
    {
        name: "Diamond Nose Pin",
        category: "Diamond",
        price: 29999,
        image: "/assets/DR15.jpg",
        rating: 4.4,
        numReviews: 48,
        description: "Diamond nose pin with screw back for security. Type: nose-pins",
        countInStock: 10,
        brand: "Rika Jewels"
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/RikaJewels');

        // clear existing products
        await Product.deleteMany();

        // Get admin user
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            console.error('Admin user not found. Please run createAdmin.js first.');
            process.exit(1);
        }

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log('Processed ' + products.length + ' products.');
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
