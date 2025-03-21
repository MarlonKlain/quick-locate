export class Locations {

    async getAllFreeLocations(){
        try {
            const response = await fetch("https://quick-locate.onrender.com/all-free-locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            console.log(result);
            
            return result
        } catch (error) {
            console.error(error);
            
        }
    }

    async getAllLocations (){
        try {
            const response = await fetch("https://quick-locate.onrender.com/locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json()
            return result
        } catch (error) {
            console.error(error);
        }
    }

    async deleteLocationDatabase(location) {
        const data = {
            item_location: location
        }

        try {
            const response = await fetch ("https://quick-locate.onrender.com/delete-location", {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            const result = response.json()
            
            return result
        } catch (error) {
            console.error(error);
        }
    }
}