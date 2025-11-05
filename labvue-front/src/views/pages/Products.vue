<template>
    <h3>產品功能</h3>
    <div class="row">
        <div class="col-3">
            <button type="button" class="btn btn-primary" @click="openModal('insert')">開啟新增</button>
        </div>
        <div class="col-3">
            <input type="text" placeholder="請輸入產品名稱" v-model="findName" @input="callFind">
        </div>
        <div class="col-6">
            <ProductSelect :total="total" :options="[2, 3, 4, 5, 7, 10]" v-model="rows" @select-change="callFind">
            </ProductSelect>
        </div>
    </div>
    <br>

    <div class="row">
        <div>
            <Paginate :first-last-button="true" first-button-text="&lt;&lt;" last-button-text="&gt;&gt;"
                prev-text="&lt;" next-text="&gt;" :page-count="pages" :initial-page="current" v-model="current"
                :click-handler="callFind">
            </Paginate>
        </div>
    </div>
    <br>

    <div class="row">
        <div v-for="product in products" :key="product.id" class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
            <ProductCard :product="product" @delete="callRemove" @open-update="openModal">
            </ProductCard>
        </div>
    </div>

    <ProductModal ref="productModal" v-model:product="product" :is-show-insert="isShowInsert"
            @insert="callCreate" @update="callModify">
    </ProductModal>
</template>

<script setup>
    import ProductCard from "@/components/ProductCard.vue";
    import ProductSelect from "@/components/ProductSelect.vue";
    import ProductModal from "@/components/ProductModal.vue";
    import axiosapi from "@/plugins/axios.js";
    import Paginate from "vuejs-paginate-next";
    import Swal from "sweetalert2";
    import { ref, onMounted } from "vue";
    import useUserStore from "@/stores/user.js";

    const userStore = useUserStore();
    const products = ref([]);
    const product = ref({});
    const isShowInsert = ref(false);
    const findName = ref("");
    const productModal = ref(null);

    const total = ref(0);
    const rows = ref(3);
    const pages = ref(0);
    const current = ref(1);
    const start = ref(0);
    const lastPageRows = ref(0);

    function openModal(action, id) {
        console.log("openModal", action, id);
        if(action==='insert') {
            isShowInsert.value = true;
            product.value = {};
        } else {
            isShowInsert.value = false;
            callFindById(id);
        }
        productModal.value.showModal();
    }
    async function callCreate() {
        Swal.fire({
            title: '處理中......',
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        if(product.value.id==="") {
            product.value.id = null;
        }
        if(product.value.name==="") {
            product.value.name = null;
        }
        if(product.value.price==="") {
            product.value.price = null;
        }
        if(product.value.make==="") {
            product.value.make = null;
        }
        if(product.value.expire==="") {
            product.value.expire = null;
        }
        const request = product.value;
        try {
            const response = await axiosapi.post("http://localhost:8080/ajax/pages/products", request, {
                headers: {
                    "Authorization": `Bearer ${userStore.getToken()}`
                }
            });
            // console.log("error", error);

            if(response.data.success) {
                await Swal.fire({
                    text: response.data.message,
                    icon: 'success',
                });
                callFind(current.value);
                productModal.value.hideModal();
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'warning',
                });
            }
        } catch(error) {
            // console.log("error", error);
            Swal.fire({
                text: "執行錯誤："+ error.message,
                icon: 'error',
            });
        }
    }

    async function callModify() {
        // console.log("callModify");
        Swal.fire({
            title: '處理中......',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        if(product.value.id==="") {
            product.value.id = null;
        }
        if(product.value.name==="") {
            product.value.name = null;
        }
        if(product.value.price==="") {
            product.value.price = null;
        }
        if(product.value.make==="") {
            product.value.make = null;
        }
        if(product.value.expire==="") {
            product.value.expire = null;
        }
        const request = product.value;

        try {
            const response = await axiosapi.put(`http://localhost:8080/ajax/pages/products/${product.value.id}`, request, {
                headers: {
                    "Authorization": `Bearer ${userStore.getToken()}`
                }
            });
            // console.log("response", response);

            if(response.data.success) {
                await Swal.fire({
                    text: response.data.message,
                    icon: 'success',
                });
                callFind(current.value);
                productModal.value.hideModal();
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'warning',
                });
            }
        } catch(error) {
            console.log("error", error);
            Swal.fire({
                text: "執行錯誤："+ error.message,
                icon: 'error',
            });
        }
    }
    
    async function callFindById(id) {
        // console.log("callFindById");
        try {
            const response = await axiosapi.get(`http://localhost:8080/ajax/pages/products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${userStore.getToken()}`
                }
            });
            product.value = response.data.list[0];
        } catch(error) {
            console.log("error", error);
            Swal.fire({
                text: "執行錯誤："+ error.message,
                icon: 'error',
            });
        }
    }

    async function callRemove(id) {
        const result = await Swal.fire({
            text: "確定？",
            icon: "question",
            showDenyButton: true,
        });
        if(result.isConfirmed) {
            try {
                const response = await axiosapi.delete(`http://localhost:8080/ajax/pages/products/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${userStore.getToken()}`
                    }
                });
                // console.log("response", response);

                if(response.data.success) {
                    await Swal.fire({
                        text: response.data.message,
                        icon: 'success',
                    });
                    if(lastPageRows.value===1 && current.value>1) {
                        current.value = current.value-1;
                    }
                    callFind(current.value);
                    productModal.value.hideModal();

                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: 'warning',
                    });
                }
            } catch(error) {
                // console.log("error", error);
                Swal.fire({
                    text: "執行錯誤："+ error.message,
                    icon: 'error',
                });
            }
        }
    }
    function callFind(page) {
        if(page) {
            current.value = page;
            start.value = (page - 1) * rows.value;
        } else {
            current.value = 1;
            start.value = 0;
        }
        Swal.fire({
            title: '處理中......',
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        if(findName.value==='') {
            findName.value = null;
        }
        const request = {
            "start": start.value,
            "rows": rows.value,
            "sort": "id",
            "dir": false,
            "name": findName.value
        };
        axiosapi.post("/ajax/pages/products/find", request, {
            headers: {
                "Authorization": `Bearer ${userStore.token}`
            }
        }).then(function(response) {
            // console.log("response", response);
            products.value = response.data.list;
            total.value = response.data.count;
            pages.value = Math.ceil(total.value / rows.value);
            lastPageRows.value = total.value % rows.value;

            setTimeout(function() {
                Swal.close();
            }, 500);
        }).catch(function(error) {
            console.log("error", error);
            Swal.fire({
                text: "執行錯誤："+ error.message,
                icon: 'error',
            });
        });
    }
    onMounted(() => {
        callFind();
    });
</script>
    
<style>
    
</style>