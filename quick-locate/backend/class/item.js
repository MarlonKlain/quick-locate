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
                const response = await fetch(`https://quick-locate.onrender.com/items/?code=${code}`, {
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

    async modifyLocation(code, location) {
        const data = {
            code: code,
            location: location
        }
        try {
            const response = await fetch(`https://quick-locate.onrender.com/modify-location`, {
                method: "PUT",
                headers: {
                    "Content-Type:": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json()
            return result
        } catch (error) {
            console.log(error);
        }
    }

}