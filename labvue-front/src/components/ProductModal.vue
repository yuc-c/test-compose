<template>
    <div class="modal fade" ref="exampleModalRef" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">產品</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tbody>
                            <tr>
                                <td>Id : </td>
                                <td><input type="text" name="id" :value="product.id" @input="doInput('id', $event.target.value)"></td>
                            </tr>
                            <tr>
                                <td>Name : </td>
                                <td><input type="text" name="name" :value="product.name" @input="doInput('name', $event.target.value)"></td>
                            </tr>
                            <tr>
                                <td>Price : </td>
                                <td><input type="text" name="price" :value="product.price" @input="doInput('price', $event.target.value)"></td>
                            </tr>
                            <tr>
                                <td>Make : </td>
                                <td><input type="text" name="make" :value="product.make" @input="doInput('make', $event.target.value)"></td>
                            </tr>
                            <tr>
                                <td>Expire : </td>
                                <td><input type="text" name="expire" :value="product.expire" @input="doInput('expire', $event.target.value)"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    <button type="button" class="btn btn-primary" v-show="isShowInsert" @click="emits('insert')">新增</button>
                    <button type="button" class="btn btn-primary" v-show="!isShowInsert" @click="emits('update')">修改</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    const props = defineProps(["product", "isShowInsert"]);
    const emits = defineEmits(["update:product", "insert", "update"]);
    function doInput(key, value) {
        emits("update:product", {
            ...props.product, [key]: value
        });
    }

    import { ref, onMounted } from 'vue'
    import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    const exampleModalRef = ref(null);
    const modal = ref(null);
    onMounted(function() {
        modal.value = new bootstrap.Modal( exampleModalRef.value );
    });
    function showModal() {
        modal.value.show();
    }
    function hideModal() {
        modal.value.hide();
    }
    defineExpose({
        showModal, hideModal
    });
</script>
    
<style>
    
</style>