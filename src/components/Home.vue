<template>
    <div>
        <el-button type="info" @click="logout">Logout</el-button>
    </div>
</template>

<script>
    import Login from "./Login";

    export default {
        name: "Home",
        data() {
            return{

            }
        },
        methods:{
            logout() {
                console.log("user ======> logout");
                window.sessionStorage.clear();
                this.$router.push(Login);
                console.log("logout && redirect")
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>