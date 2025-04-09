export class Item {

    //this method works in two different ways
    //if any paramanter is passed, it will return all the items from the database
    //if a code is passed as paramanter it will return all the information about that respective item(code)
    async getItemsListFromDatabase(code = undefined){
        if(!code){
            try {
                //Making the request
                const response = await fetch("https://quick-locate.onrender.com/items", {
                    //setting the method type
                    method: "GET",
                    //Extra information sent with the request
                    headers: {
                        //The data type of the send/retrieve data
                        "Content-Type": "application/json",
                   },
                });
                // Converts the server's response from text format to JavaScript objects
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
                console.log(result);
                
                return result
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    //this method will update the item location, based on what the user choose
    async modifyLocation(code, location) {

        //creating a object that will be sent
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
                //Converts the JavaScript object (data) into a JSON string
                body: JSON.stringify(data)
            });
            const result = await response.json()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
        }
    }

    //this method will be used every time the user uses the search bar or select a filter
    async filter(column, filter, sorter){
        try {
            const response = await fetch(`https://quick-locate.onrender.com/filter?column=${column}&filter=${filter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json()

            //sorting the data in ascending or descendig, based on what the user choose
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