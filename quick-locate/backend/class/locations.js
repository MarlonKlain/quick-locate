import { Alert } from "react-native";

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
                const response = await fetch(`https://quick-locate.onrender.com/locations/?location=${location}`,  {
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

    async deleteFreeLocation(code, location){
        if(code){
            console.log("Remova todos os itens endereçados nessa localização antes de exclui-la!")
        }

        const data = [
            location,
        ]

        try {
            const response = await fetch("https://quick-locate.onrender.com/delete-free-location", {
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
        }
    }
}