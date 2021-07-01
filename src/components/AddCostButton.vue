<template>
    <div class="add-cost">
        <button class="add-cost_button" @click="clicked"> Add Cost +</button>
    </div>
</template>

<script>
export default {
    name: "AddCostButton",
    props: {
        
        },
    data() {
        return {
            
        }
    },
    methods: {
        clicked(){
            this.$emit('addCostClicked')
        }
    }
}

</script>

<style lang="scss" scoped >
.add-cost_button{
  font-size: 14px;
  background: rgb(92, 161, 161);
  color: white;
  border: none;
  width: 200px;
  height: 35px;
  margin-bottom: 30px;
}
</style>