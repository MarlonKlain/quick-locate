export class Item {

    async getItemsListFromDatabase(code){
        console.log(code);
            try {
                const response = await fetch(`https://quick-locate.onrender.com/items?code=${code}`, {
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