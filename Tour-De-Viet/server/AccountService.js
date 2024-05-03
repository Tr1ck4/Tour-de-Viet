
class Account {
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
    async logout(){
        try {
            const response = await fetch(`${this.baseUrl}/api/logout`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok){
                throw new Error('Cannot logout');
            }
            return response;
        }catch (error){
            console.error('Logout error:', error.message);
        }
        
    }
    async login(username, password) {
        try {
            const response = await fetch(`${this.baseUrl}/api/login`, {
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
    async fetchAccount() {
        const response = await fetch(`${this.baseUrl}/api/accounts/info}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        );
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
                console.error('Error creating account:', error);
            });
    }

    async updateAccount(newData) {
        let token = localStorage.getItem('token');
        return fetch(`${this.baseUrl}/api/accounts/${newData.susername}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
            if (error.message === 'Token not found'){
                window.location.href('/login');
              }
            }
        );
    }

}

export default Account;





