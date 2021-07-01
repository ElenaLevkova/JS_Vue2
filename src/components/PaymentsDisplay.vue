<template>
    <div class="list">
        <!-- <div class="item" 
            v-for="(item, idx) in items" 
            :key="idx">
            {{ idx + 1 }} - {{ item }}
        </div> -->
        
        <!-- <div class="item">
            <spot>
                №
            </spot>
           <div class=" item-idx"
            v-for="(item, idx) in displayedItems" 
            :key="idx">
            {{ idx + 1 }}
        </div> 
        </div>
        <div class="item">
            <spot>
                Date
            </spot>
        <div class=" item-date"
            v-for="(item, idx) in displayedItems" 
            :key="`${idx}date`">
            {{ displayedItems[idx].date }}
        </div>
        </div>
        <div class="item">
            <spot>
                Category
            </spot>
        <div class=" item-category"
            v-for="(item, idx) in displayedItems" 
            :key="idx">
            {{ displayedItems[idx].category }}
        </div>
        </div>
        <div class="item">
            <spot>
                Value
            </spot>
            <div class=" item-value"
                v-for="(item, idx) in displayedItems" 
                :key="idx">
                {{ displayedItems[idx].value }}
            </div>
        </div> -->

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
    <tr  v-for="(item, idx) in displayedItems" 
                :key="`${idx}d`"  class="table-items">
      <td  class="table-item">{{idx + 1 + (page-1)*perPage}}</td>
      <td  class="table-item">{{displayedItems[idx].date}}</td>
      <td  class="table-item">{{displayedItems[idx].category}}</td>
      <td  class="table-item">{{displayedItems[idx].value}}</td>
    </tr>
    </tbody>
  </table>

        <nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<button type="button" class="page-link" 
                        v-if="page != 1" 
                        @click="page--" 
                        @mouseover="onHover" 
                        @mouseleave="onNotHover"> &lt; </button>
				</li>
				<li class="page-item">
					<button type="button"  
                        v-for="pageNumber in pages" :key="pageNumber" 
                        class="page-link"
                        @click="showMobileMenu=pageNumber; page=pageNumber"
                        :class="(showMobileMenu===pageNumber) ? 'active' :''  "
                        @mouseover="onHover" 
                        @mouseleave="onNotHover"
                        > {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link"
                        v-if="page < pages.length"   
                        @click="page++"
                        @mouseover="onHover" 
                        @mouseleave="onNotHover"> &gt; </button>
				</li>
			</ul>
		</nav>

    </div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        items: {
            type: Array,
            default: ()=>[],
        }
    },
     data () {
		return {
            page: 1,
			perPage: 9,
			pages: [],	
            showMobileMenu: 1	
		}
	},
	methods:{
        setPages () {
            this.pages = []
			let numberOfPages = Math.ceil(this.items.length / this.perPage)
            //console.log('setPages',numberOfPages, this.items.length )
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index)
                //console.log('pages', this.pages )
			}
            //console.log('numberOfPages', numberOfPages )
		},
		paginate (items) {
            const {page, perPage} = this
			let from = (page * perPage) - perPage
			let to = (page * perPage)
            console.log('paginate', page,  perPage)
			return  items.slice(from, to)
		},
        onHover(event) {
            event.target.style.color = 'red'
        },
        onNotHover(event) {
            console.log('className', event.target.classList,event.target.classList.contains('active') )
            if  (!event.target.classList.contains('active')) {
            event.target.style.color = 'black'}
            else {
                event.target.style.color = ''
            }
        },
      
	},
	computed: {
		displayedItems () {
			return this.paginate(this.items)
		}
	},
	watch: {
		items () {
            //console.log('items')
			this.setPages()
		}
	},
    created(){
            this.setPages ()
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
nav {
    margin: auto;
}
button.page-link {
    font-size: 20px;
    border: none;
    background: none;
}
.active {
    color: blue;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline;
  margin: 5px 5px;
}
</style>
