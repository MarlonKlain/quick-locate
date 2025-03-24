export class Item {

    async getItemsListFromDatabase(code = undefined){
        if(!code){
            try {
                const response = await fetch("https://quick-locate.onrender.com/items", {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
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
            const response = await fetch("https://quick-locate.onrender.com/modify-location", {
                mode: 'no-cors',
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async filter(column, filter, sorter){
        try {
            const response = await fetch(`https://quick-locate.onrender.com/filter?column=${column}&filter=${filter}`, {
                mode: 'no-cors',
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json()
            if(sorter == "ASC"){
                console.log(column);
                
                result.filterResult.sort((a, b ) => a[column] - b[column])
                console.log("ASC:", result);
                return result
            } else if(sorter == "DESC"){
                result.filterResult.sort((a, b ) => b[column] - a[column])
                console.log("DESC:", result);
                return result
            } else {
                console.log("Not sorted:", result);
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
}