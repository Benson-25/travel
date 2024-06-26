Vue.createApp({
    data() {
        return{
            data:[],
            currentPage:0,
            locations:[],
            currentLocation: ''
        }
    },
    methods: {
        getUniqueList(){
            const locations = new Set();
            const vm = this;
            vm.data.forEach((item, i) => {
                locations.add(item.Zone)
            });
            console.log(locations)
            vm.locations = Array.from(locations)
        }
    },
    computed:{
        filterData(){
            const vm = this;
            let items = [];
            if (vm.currentLocation !== '') {
                items = vm.data.filter((item, i)=> {
                    return item.Zone == vm.currentLocation
                })
            }else {
                items = vm.data
            }


            console.log(vm.currentLocation)
           const newData = [] 
            items.forEach((item, i) => {
                if(i % 20 === 0){
                    newData.push([])
                }
                const page = parseInt(i / 20
                )
                newData[page].push(item)
            });
            console.log(newData)
            return newData
        }
    },
    created() { 
        const vm = this;//用變數帶入this才不會顯示出window，才不會錯誤
            axios.get('data.json') //JSON資料，以下查看資料是否正確，正確顯示.then 錯誤顯示.catch
            .then((response) =>{
                console.log(response)
                vm.data = response.data.infos
                console.log(vm.data)
                vm.getUniqueList()
            })
            .catch((error)=> {
                console.log(error)
            })
}
}).mount('#app')