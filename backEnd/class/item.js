export class Item {
    constructor(){
        let code;
        let partnumber;
        let description;
        let location;
    }
    async listItems(){
        try {
            const response = await fetch("http://localhost:3000/items", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
    
            const result = await response.json();
            console.log("Response from server:", result);
            return result
        } catch (error) {
            console.error("Error:", error);
        }
    }
}