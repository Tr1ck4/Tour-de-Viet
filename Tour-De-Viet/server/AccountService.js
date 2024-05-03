
class AccountService {
    constructor(username, password, citizenID, name, address, age, tel, email) {
        this.baseUrl = 'http://localhost:3000';
        this.username = username;
        this.password = password;
        this.citizenID = citizenID;
        this.name = name;
        this.address = address;
        this.age = age;
        this.tel = tel;
        this.email = email;
    }
    async login(username, password) {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response;

        } catch (error) {
            console.error('Login error:', error.message);
        }
    }
    async fetchAccount(userName) {
        const response = await fetch(`${this.baseUrl}/api/accounts/${userName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get user');
        }
        return response.json();
    } catch(error) {
        console.error('Error getting user:', error);
        if (error.message === 'Token not found') {
            window.location.href('/login');
        }
        throw error;
    }

    async createAccount(newData) {
        return fetch(`${this.baseUrl}/api/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": newData.username,
                "password": newData.password,
                "name": newData.name,
                "email": newData.email,
            })
        })
            .then(response => response.status)
            .catch(error => {
                console.error('Error creating account:', error);
            });
    }

    async updateAccount(newData) {
        return fetch(`${this.baseUrl}/api/accounts/${newData.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": newData.username,
                "password": newData.password,
                "citizenID": newData.citizenID,
                "name": newData.name,
                "address": newData.address,
                "age": newData.age,
                "tel": newData.tel,
                "email": newData.email,
            })
        })
            .then(response => response.status)
            .catch(error => {
                console.error('Error updating account:', error);
                if (error.message === 'Token not found') {
                    window.location.href('/login');
                }
            }
            );
    }

}

export default AccountService;





