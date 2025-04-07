import { onMounted, ref } from "vue";
import { Api } from "@/api/api"; // Certifique-se de que a Api está configurada corretamente

export function useBank() {
    const banks = ref(null);
    const error = ref(null);
    const loading = ref(true);
    const api = new Api('tecnospeed');

    const fetchBanks = async () => {
        try {
            const response = await api.get('/bank'); 

            if (!response.ok) { 
                error.value = `Erro HTTP! Status: ${response.status}`;
                return;
            }
            
            banks.value = await response.json(); 
        } catch (err) {
            error.value = err.message || err; 
        } finally {
            loading.value = false; 
        }
    };

    onMounted(() => {
        fetchBanks();
    });

    return {
        banks,
        error,
        loading,
    };
}