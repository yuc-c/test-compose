import { defineStore } from 'pinia'
import { ref } from 'vue';

const useUserStore = defineStore("user", function() {
    const token = ref("");
    function getToken() {
        return token.value;
    }
    function setToken(value) {
        token.value = value;
    }

    const email = ref("");
    function getEmail() {
        return email.value;
    }
    function setEmail(value) {
        email.value = value;
    }

    return {
        token, getToken, setToken,
        email, getEmail, setEmail,
    }
}, {
    persist: {
        storage: sessionStorage,
    }
});

export default useUserStore;
