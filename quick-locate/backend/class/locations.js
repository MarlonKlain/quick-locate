export class Locations {
    async getAllLocations(){
        try {
            const response = await fetch("http://localhost:3000/locations", {
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