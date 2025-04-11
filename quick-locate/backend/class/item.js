export class Item {

    // This method works in two different ways:
    // If no parameter is passed, it will return all items from the database
    // If a code is passed as parameter, it will return information about that specific item
    async getItemsListFromDatabase(code = undefined) {
        if(!code) {
            try {
                // Making the request
                const response = await fetch("https://quick-locate.onrender.com/items", {
                    // Setting the method type
                    method: "GET",
                    // Extra information sent with the request
                    headers: {
                        // The data type of the sent/retrieved data
                        "Content-Type": "application/json",
                   },
                });
                // Converts the server's response from text format to JavaScript objects
                const result = await response.json();
                return result;
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
                
                return result;
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    // This method updates the item location based on user selection
    async modifyLocation(code, location) {
        // Creating an object that will be sent
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
                // Converts the JavaScript object (data) into a JSON string
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // This method is used whenever the user uses the search bar or selects a filter
    async filter(column, filter, sorter) {
        try {
            const response = await fetch(`https://quick-locate.onrender.com/filter?column=${column}&filter=${filter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();

            // Sorting the data in ascending or descending order based on user selection
            if(sorter == "ASC") {
                console.log(column);
                result.filterResult.sort((a, b) => a[column] - b[column]);
                console.log("ASC:", result);
                return result;
            } else if(sorter == "DESC") {
                result.filterResult.sort((a, b) => b[column] - a[column]);
                console.log("DESC:", result);
                return result;
            } else {
                console.log("Not sorted:", result);
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }
}