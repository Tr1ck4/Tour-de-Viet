
class Account {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    async fetchAccount(userName) {
        return fetch(`${this.baseUrl}/api/accounts/${userName}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }

    async createAccount(username, password, citizenID, name, address, age, tel, email) {
        const requestData = {
            username,
            password,
            citizenID,
            name,
            address,
            age,
            tel,
            email
        };

        return fetch(`${this.baseUrl}/api/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error creating account:', error);
            });
    }

    async updateAccount(username, password, citizenID, name, address, age, tel, email) {
        return fetch(`${this.baseUrl}/api/accounts/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, citizenID, name, address, age, tel, email })
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error updating account:', error);
            });
    }

}

export default Account;





