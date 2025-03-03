export class Item {

    async listItems(){
        try {
            const response = await fetch("http://localhost:3000/locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            return result
        } catch (error) {
            console.error("Error:", error);
        }
    }

}