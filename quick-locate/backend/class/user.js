import { Alert } from "react-native";

export class User {
    // # prefix indicates private class fields
    // These properties can only be accessed/modified within the class
    // They are hidden from external code for security/encapsulation
    // This is common practice for sensitive data like passwords
    #username;
    #email;
    #password;
    #passwordConfirm;

    constructor(firstName, lastName, username, email, password, passwordConfirm) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#username = username;
        this.#email = email;
        this.#password = password;
        this.#passwordConfirm = passwordConfirm
    }
    async signUp(){
        // Checking if both passwords are the same
        if(this.#password != this.#passwordConfirm){
            return Alert.alert("Error","You wrote two different passwords");
        }

        const userData = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.#username,
            email: this.#email,
            password: this.#password,
        }
        
        try {
            const response = await fetch("https://quick-locate.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
    
            const result = await response.json();
            console.log("Response from server:", result);
            return {
                data: result,
                status: response.status
            } 
        } catch (error) {
            console.error("Error:", error);
        }
    }
    async login(){

        const userData = {
            username: this.#username,
            password: this.#password,
        }

        try {
            const response = await fetch("https://quick-locate.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const result = await response.json();
            console.log("Response from server:", result);
            return result
        } catch (error) {
            console.log(error)
        }
    }

}