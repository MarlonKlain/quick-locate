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
            const response = await fetch("https://quick-locate.onrender.com/modify-location", {
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
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json()
            console.log(result.filterResult);
            if(sorter == "ASC"){
                const resultSorted = result.filterResult.sort(({column:a}, {column:b})=> a-b)
                console.log(resultSorted);
                
                // return resultSorted
            } else if(sorter == "DESC"){
                const resultSorted = result.filterResult.sort(({column:a}, {column:b})=> b-a)
                console.log(resultSorted);
                
                // return resultSorted
            } else {
                console.log(result);
                // return result
            }
        } catch (error) {
            console.log(error)
        }
    }
}