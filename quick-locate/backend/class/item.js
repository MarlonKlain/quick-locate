export class Item {

    async listItems(){
        try {
            const response = await fetch("https://quick-locate.onrender.com/items", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            console.log(result);
            
            return result
        } catch (error) {
            console.error("Error:", error);
        }
    }

}