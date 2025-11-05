<template>
    <h3>{{ t("login.title") }}</h3>
	<table>
		<tbody>
			<tr>
				<td>{{t("login.username")}}</td>
				<td><input type="text" name="username" v-model="username"></td>
				<td></td>
			</tr>
			<tr>
				<td>{{t("login.password")}}</td>
				<td><input type="text" name="password" v-model="password"></td>
				<td></td>
			</tr>
			<tr>
				<td> </td>
				<td align="right"><button type="button" @click="login">{{t("login.login")}}</button></td>
			</tr>
		</tbody>
	</table>
</template>
    
<script setup>
	import { ref } from 'vue'
	import axiosapi from '@/plugins/axios.js';
	import Swal from 'sweetalert2';
	import { useRouter } from 'vue-router';
	import useUserStore from '@/stores/user.js';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const userStore = useUserStore();
	const router = useRouter();
	const username = ref(null);
	const password = ref(null);

	function login() {
		Swal.fire({
			title: '處理中...',
			allowOutsideClick: false,
			showConfirmButton: false,
		});
		const request = {
			username: username.value,
			password: password.value
		};
		userStore.setToken("");
		userStore.setEmail("");
		axiosapi.post("/ajax/secure/login", request).then(function(response) {
			console.log("response", response);
			if(response.data.success) {
				Swal.fire({
					text: response.data.message,
					icon: "success",
				}).then(function(result) {
					userStore.setToken(response.data.token);
					userStore.setEmail(response.data.email);
					router.push("/");
				});
			} else {
				Swal.fire({
					text: response.data.message,
					icon: "warning",
				});
			}
		}).catch(function(error) {
			console.log("error", error);
			Swal.fire({
				text: "執行失敗："+ error.message,
				icon: "error",
			});
		});
	}
</script>
    
<style>
    
</style>