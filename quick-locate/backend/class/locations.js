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

    async getLocations (location = undefined){
        if(!location){
                try {
                const response = await fetch("https://quick-locate.onrender.com/locations", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const result = await response.json()
                console.log(result);
                
                return result
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch(`http://localhost:3000/location/?location=${location}`,  {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const result = await response.json()
                return result
            } catch (error) {
                
            }
        }
    }

}