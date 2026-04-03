import axios from 'axios';

const test = async () => {
    try {
        // First login as admin
        console.log('Logging in...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@rikajewels.com',
            password: 'admin123'
        });

        const token = loginRes.data.token;
        console.log('Token received:', !!token);

        // Fetch users
        console.log('Fetching users...');
        const usersRes = await axios.get('http://localhost:5000/api/admin/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Users found:', usersRes.data.length);
        console.log(usersRes.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

test();
