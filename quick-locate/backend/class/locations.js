export class Locations {

    async getAllLocations(){
        try {
            const response = await fetch("https://quick-locate.onrender.com/locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            return result
        } catch (error) {
            console.error(error);
            
        }
    }

    async registerNewLocation(location){
        const data = {
            item_location: location
        }
        try {
            const response = await fetch("https://quick-locate.onrender.com/locations", {
                method:"POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json()
            console.log(result);
            
            return result
        } catch (error) {
            console.error(error);
        }
    }
}