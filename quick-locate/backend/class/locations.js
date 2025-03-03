export class Locations {
    async getAllLocations(){
        try {
            const response = await fetch("https://quick-locate.onrender.com/locations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            return response
        } catch (error) {
            console.error(error);
            
        }
    }
}