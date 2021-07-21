<!-- <template>
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
</template>-->

<template>
<v-container class=" lighten-5 mb-6">
    <v-row no-gutters> 
        <v-col  cols="1">
            <v-card
                class="pa-2 vcard-table font-weight-bold"
                outlined
                tile
                >№
            </v-card>
        </v-col >
        <v-col cols='3'>
            <v-card
                class="pa-2 vcard-table font-weight-bold"
                outlined
                tile                   
                >Date
            </v-card>
        </v-col>
        <v-col cols='5'>
            <v-card
                class="pa-2 vcard-table font-weight-bold"
                outlined
                tile
                >Category
            </v-card>
        </v-col>
        <v-col cols='2'>
            <v-card
                class="pa-2 vcard-table font-weight-bold"
                outlined
                tile    
                >Value
            </v-card>
        </v-col>
        <v-col cols='1'>
            <v-card
                class="pa-2 vcard-table font-weight-bold"
                outlined
                tile
                >Menu 
            </v-card>
        </v-col>
    </v-row>
    <v-row v-for="(item, idx) in getPaymentList" no-gutters
            :key="idx" name="tablelist">
           <v-col cols='1' >
               <v-card 
                    class="pa-2 vcard-table"
                    outlined
                    tile
                    >{{ item.id }}
                </v-card>
            </v-col>
            <v-col cols='3' >
                <v-card
                    class="pa-2 vcard-table"
                    outlined
                    tile
                    >{{ item.date }}
                </v-card>
            </v-col>
            <v-col cols='5'>
                <v-card
                    class="pa-2 vcard-table"
                    outlined
                    tile
                    >{{ item.category }}
                </v-card>
            </v-col>
            <v-col cols='2'>
                <v-card
                    class="pa-2 vcard-table"
                    outlined
                    tile
                    >{{ item.value }}
                </v-card>
            </v-col>
            <v-col cols='1'>
                <v-card
                    class="pa-2 vcard-table"
                    outlined
                    tile
                    >
                   <v-menu
                        
                        absolute
                        offset-y
                        
                    >
                        <template v-slot:activator="{ on}">
                        
                            <v-btn v-on="on" plain x-small class="table-item menu"><v-icon>mdi-dots-vertical</v-icon></v-btn>
                        
                        </template>
                        <v-card>
                            <ContextMenu :id="item.id" />
                       </v-card>
                    </v-menu>
                  
                </v-card>
            </v-col>
    </v-row>
     <!-- <v-row justify="center" align="center" v-for="(item, idx) in getPaymentList" no-gutters
            :key="idx" name="tablelist">
         
           <v-col  cols='1' >
                <v-divider v-if="idx==0"></v-divider>
                 {{ item.id }}
                 
                <v-divider class="pt-2 pb-2"></v-divider>
          </v-col>
            <v-col  cols='3' ><v-divider v-if="idx==0"></v-divider>{{ item.date }}<v-divider></v-divider></v-col>
            <v-col  cols='5'><v-divider v-if="idx==0"></v-divider>{{ item.category }}<v-divider></v-divider></v-col>
            <v-col cols='2'><v-divider v-if="idx==0"></v-divider>{{ item.value }}<v-divider></v-divider></v-col>
            <v-col cols='1'><v-divider v-if="idx==0"></v-divider>
                 <button class="table-item menu" @click="onClickMenu(item.id)">X</button>
             <v-divider></v-divider>    

            </v-col>
    </v-row> -->
</v-container>
</template>

<script>
import ContextMenu from './ContextMenu.vue'

export default {
    name: "PaymentsDisplay",
    components: {
        ContextMenu
    },
    props: {
        getPaymentList: {
            type: Array,
            default: ()=>[],
        },
    },
    data() {
        return {
            showMenu: false,
            settings: {},
             items: [
      { title: 'Click Me', q:"1" },
      { title: 'Click Me', q:"2" },
      { title: 'Click Me', q: "3" },
      { title: 'Click Me 2' },
    ],
        }
    }, 
    methods: {
        onClickMenu(id) {
            console.log('onClickMenu', id)
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
// .list{
//   display: flex;
//   flex-direction: column;
//    width: 500px;
// }

// .table-item{
//   padding-right: 50px;
// }
// .table-titles {
//     font-weight: bold;
//     text-align: left;
// }
// td {
//      border-bottom: 1px solid rgb(231, 228, 228);
//      padding-bottom: 10px;
//      padding-top: 10px;
// }

 .vcard-table{
     border-left: none !important;
     border-right: none !important;
     border-top: none !important;
 }
</style>
