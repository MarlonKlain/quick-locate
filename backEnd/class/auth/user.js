export class User {
    #username;
    #email;
    #password;
    constructor(firstName, lastName, username, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    async signUp(){
        if(!this.firstName || !this.lastName || !this.#username || !this.#email || !this.#password){
          return console.error("All field are required")      
        }

        const userData = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.#username,
            email: this.#email,
            password: this.#password,
        }
        
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
    
            const result = await response.json();
            console.log("Response from server:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async login(){
        if(!this.#username || !this.#password){
            return console.error("All field are required")
        }

        try {
            const response = await fetch(`http://localhost:3000/login/${this.#username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            console.log("Response from server:", result);
        } catch (error) {
            console.log(error)
        }
    }

    logout(){

    }

    
}
