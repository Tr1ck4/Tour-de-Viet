
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

    async fetchAccount(userName) {

        const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const parsedToken = JSON.parse(storedToken);
                const tokenValue = parsedToken.token;
                if (tokenValue) {
                    console.log("Token found:", tokenValue);
                    return fetch(`${this.baseUrl}/api/accounts/${userName}`,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenValue}`
                        }
                    })
                        .then(response => {
                            response.status;
                        })
                        .then(data=>{
                            console.log(data);
                        })
                        .catch(error => {
                            console.error('Error fetching accounts:', error);
                        }
                    );
                } else {
                    console.log("Token value not found.");
                }
            } else {
                console.log("Token not found in local storage.");
            }
        
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
        return fetch(`${this.baseUrl}/api/accounts/${newData.username}`, {
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

export default AccountService;





