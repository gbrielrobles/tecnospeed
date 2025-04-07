
export class Api {
    constructor(api) {
        switch (api) {
            case 'tecnospeed':
                this.baseURL = import.meta.env.VITE_API_TECNOSPEED_URL;
                break;
        }
    }

    async get(url) {
        const response = await fetch(`${this.baseURL}${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }

}