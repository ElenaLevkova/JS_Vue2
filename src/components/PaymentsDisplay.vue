<template>
    <div class="list">
        <table class="table table-bordered">
            <thead>
            <tr class="table-titles">
                <th>№</th>
                <th>Date</th>
                <th>Category</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
                <tr  v-for="(item, idx) in getPaymentList" 
                            :key="`${idx}d`"  class="table-items" name="tablelist">
                    <td  class="table-item">{{item.id}}</td>
                    <td  class="table-item">{{item.date}}</td>
                    <td  class="table-item">{{item.category}}</td>
                    <td  class="table-item">{{item.value}}</td>
                    <td>
                        <button class="table-item menu" @click="onClickMenu(item.id)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>


export default {
    name: "PaymentsDisplay",
    props: {
        getPaymentList: {
            type: Array,
            default: ()=>[],
        },
    }, methods: {
        onClickMenu(id) {
            this.$modal.show('menu', {
                header: 'ContextMenu', 
                compName: "ContextMenu", 
                id: id
          })
        }
    }
}
</script>


<style lang="scss" scoped>
.list{
  display: flex;
  flex-direction: column;
   width: 500px;
}

.table-item{
  padding-right: 50px;
}
.table-titles {
    font-weight: bold;
    text-align: left;
}
td {
     border-bottom: 1px solid rgb(231, 228, 228);
     padding-bottom: 10px;
     padding-top: 10px;
}

</style>
