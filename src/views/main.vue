<template>
    <div class="box">
        <button @click="num--">less--</button>
        <div :style="{color:num > 3 ? 'red' : 'blue'}">{{num}} | {{count}}</div>
        <div>{{msg}}</div>
        <button @click="num++">add++</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                num: 0,
                msg: ""
            }
        },
        computed: {
            count() {
                this.msg = "输出" + (this.num + 100)
                return this.num + 100
            }
        },
        watch: {
            msg(newVal, oldVal) {
                return newVal
            }
        }
    }
</script>
<style lang="less" scoped>
    .box {
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & div {
            white-space: nowrap;
        }
    }
</style>