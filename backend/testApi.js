import fetch from 'node-fetch';

async function testProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        console.log('Status Base:', response.status);

        const response2 = await fetch('http://localhost:5000/api/products/');
        console.log('Status Slash:', response2.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Data:', data.length ? 'Found ' + data.length + ' products' : 'No products found');
            if (data.length > 0) console.log('Sample:', data[0]);
        } else {
            console.log('Error:', await response.text());
        }
    } catch (e) {
        console.log('Fetch failed:', e.message);
    }
}

testProducts();
