<template>
    <div class="add">
        <button class="add_button" @click="clicked"> {{nameButton}} </button>
    </div>
</template>

<script>
export default {
    name: "AddButton",
    props: {
        nameButton: String
        },
    data() {
        return {
           // text: this.nameButton
        }
    },
    methods: {
        clicked(){
            this.$emit('onClicked')
        }
    }
}

</script>

<style lang="scss" scoped >
.add_button{
  font-size: 14px;
  background: rgb(92, 161, 161);
  color: white;
  border: none;
  width: 200px;
  height: 35px;
  margin-bottom: 15px;
}
</style>