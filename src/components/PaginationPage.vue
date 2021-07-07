<template>
        <nav>
			<ul class="pagination">
				<li class="page-item">
					<button type="button" class="page-link" 
                        v-if="page != 1" 
                        @click="onClick(--page)" 
                        @mouseover="onHover" 
                        @mouseleave="onNotHover"> &lt; </button>
				</li>
				<li class="page-item">
					<button type="button"  
                        v-for="pageNumber in countPages" :key="pageNumber" 
                        class="page-link"
                        @click="showMobileMenu=pageNumber; onClick(pageNumber)"
                        :class="(showMobileMenu===pageNumber) ? 'active' :''  "
                        @mouseover="onHover" 
                        @mouseleave="onNotHover"
                        > {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link"
                        v-if="page < countPages"   
                        @click="onClick(++page)"
                        @mouseover="onHover" 
                        @mouseleave="onNotHover"> &gt; </button>
				</li>
			</ul>
		</nav>

</template>

<script>
export default {
    name: "PaginationPage",
    props: {
        page:{
			type: Number,
            default: 1,
		},
		perPage:{
			type: Number,
            default: 3,
		},
		lengthArr: Array,
		countPages: Number

    },
	data () {
		return {
             showMobileMenu: 1	
		}
	},
     
	methods:{
		onClick(page) {
			this.$emit('changePage', page)
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
	// computed: {
	// 	pagesCount(){
	// 		console.log('pagesCount', Math.ceil(this.lengthArr.length/this.perPage))
    //         return Math.ceil(this.lengthArr.length / this.perPage)
    //     }
		
	// },

}
</script>


<style lang="scss" scoped>

nav {
    //margin: auto;
	width: 500px;
	
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
  width: 300px;
  margin: auto;
}
li {
  display: inline;
  margin: 5px 5px;
}
</style>
