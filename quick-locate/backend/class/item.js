export class Item {

    async getItemsListFromDatabase(code = undefined){
        if(!code){
            try {
                const response = await fetch("https://quick-locate.onrender.com/items", {
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
        } else {
            try {
                const response = await fetch(`https://quick-locate.onrender.com/items/${code}`, {
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

}