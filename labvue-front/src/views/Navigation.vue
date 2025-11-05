<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <span class="navbar-brand">Vue串接</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/">首頁</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/secure/login">登入</RouterLink>
                    </li>                    
                    <li class="nav-item dropdown" v-show="userStore.getToken()!=''">
                        <span class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            網站功能1
                        </span>
                        <ul class="dropdown-menu">
                            <li><RouterLink class="dropdown-item" to="/pages/products">產品</RouterLink></li>

                        </ul>
                    </li>
                </ul>
                <form class="ms-auto">
                    <select class="form-select form-select-sm w-auto" v-model="$i18n.locale">
                        <option value="zh">中文</option>
                        <option value="en">English</option>
                        <option value="de">德文</option>
                    </select>
                </form>
            </div>
        </div>
    </nav>
</template>
    
<script setup>
    import { RouterLink } from 'vue-router';
    import useUserStore from '@/stores/user.js';

	const userStore = useUserStore();
</script>
    
<style>
    
</style>