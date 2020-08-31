<template>
    <div class="container">
        <transition name="slide-fade">
            <app-sidebar
                    @changeOptions="toggleOption"
                    @changeActiveCategory="changeActiveCategory"
                    :categories="categories"
                    :activeCategory="activeCategory"
                    :options="options"
                    v-if="mobileSidebarIsOpen"
                    :class="{sidebarActive: mobileSidebarIsOpen}"
            ></app-sidebar>
        </transition>
        <div class="wrapper">
            <app-sidebar
                    @changeOptions="toggleOption"
                    @changeActiveCategory="changeActiveCategory"
                    :categories="categories"
                    :activeCategory="activeCategory"
                    :options="options"
            ></app-sidebar>
            <div class="main-content">
                <app-main-content-top
                        :title="getTitle"
                        @toggleVideoView="toggleVideoView"
                        @changeSearchingWord = "changeSearchingWord"
                ></app-main-content-top>
                <div class="main-content__list" :class="videoViewType === 'tile' ? 'tile' : 'list' ">
                    <app-video-item  v-for="item  in sortedData"
                                     :key="item.id"
                                     :title="item.title"
                                     :access="item.access"
                                     :covers="item.covers.main"
                                     :link="item.options.link"
                                     :videoViewType = "videoViewType"
                    ></app-video-item>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Sidebar from "./Sidebar";
    import data from "../assets/data/data.json"
    import MainContentTop from "./MainContentTop";
    import VideoItem from "./VideoItem";

    export default {
        props:['mobileSidebarIsOpen', 'closeSidebarMenu'],
        name: "MainPage",
        components: {
            appSidebar: Sidebar,
            appMainContentTop: MainContentTop,
            appVideoItem: VideoItem
        },
        data() {
            return {
                data,
                sortedData: null,
                categories: [
                    {
                        key: 'all',
                        title: "Всі теми",
                        count: 0
                    },
                    {
                        key: 'excise_tax',
                        title: "Акцизний податок",
                        count: 0
                    },
                    {
                        key: 'currency',
                        title: "Валюта",
                        count: 0
                    },
                    {
                        key: 'production',
                        title: "Виробництво і собівартість",
                        count: 0
                    },
                    {
                        key: 'vacation',
                        title: "Відпустки",
                        count: 0
                    },
                    {
                        key: 'business_trips',
                        title: "Відрядження",
                        count: 0
                    },
                    {
                        key: 'income',
                        title: "Доходи та витрати",
                        count: 0
                    },
                ],
                options: [
                    {
                        key: 'promo',
                        title: 'Акція',
                        count: 0,
                        isActive: false
                    },
                    {
                        key: 'popular',
                        title: 'Популярнi',
                        count: 0,
                        isActive: false
                    },
                    {
                        key: 'new',
                        title: 'Новинки',
                        count: 0,
                        isActive: false
                    },
                ],
                activeCategory: "all",
                videoViewType: 'tile',
                searchingWord: ''
            }
        },
        created() {
            this.getCategoriesCount()
            this.getOptionCount()
            this.getVideoView()
            this.sortedData = this.data
        },
        methods: {
            toggleOption(value) {
                this.options.map((option) => {
                    if (option.key === value) {
                        option.isActive = !option.isActive
                    }
                    return option
                })
                this.closeSidebarMenu()
                this.search()
            },
            getCategoriesCount() {
                let data = this.sortedData ? this.sortedData : this.data

                this.categories.forEach((category) => {
                    category.count = data.filter(item => item.theme === category.key).length
                })
                this.categories[0].count = data.length
            },
            getOptionCount() {
                let data = this.sortedData ? this.sortedData : this.data
                let promoCount = data.filter(item => item.options.sale).length
                let popularCount = data.filter(item => item.options.popular).length
                let month = new Date().getMonth() - 1
                let newCount = data.filter((item) => {
                    let itemMonth = new Date(item.date).getMonth()
                    return itemMonth >= month
                })
                this.options[0].count = promoCount
                this.options[1].count = popularCount
                this.options[2].count = newCount.length
            },
            changeActiveCategory(key) {
                this.activeCategory = key
                this.closeSidebarMenu()
                this.search()
            },
            toggleVideoView(videoView) {
                localStorage.videoViewType = videoView
                this.videoViewType = videoView
            },
            getVideoView() {
                localStorage.videoViewType ? this.videoViewType = localStorage.videoViewType : this.videoViewType = 'tile'
            },
            changeSearchingWord(newWord){
                this.searchingWord = newWord
                this.search()
            },
            search(){
                let temp =[]
                if(!this.searchingWord){
                    temp = JSON.parse(JSON.stringify(this.data))
                }
                else {
                     temp = this.data.filter( item => item.title.toLowerCase().includes(this.searchingWord.toLowerCase()))
                }
                this.sortedData = JSON.parse(JSON.stringify(temp))
                this.getOptionCount()

                //sorted by option
                let ischekedOptions = this.options.some( option=> option.isActive )
                if(ischekedOptions){
                    let tempOptions =[]
                    //let month = new Date().getMonth() - 1
                    if(this.options[0].isActive){
                        tempOptions = temp.filter(item => item.options.sale)
                    }
                    if(this.options[1].isActive){
                         temp.forEach(item => {
                            let isExist = tempOptions.some( some => some.id === item.id)
                            if(item.options.popular && !isExist){
                                tempOptions.push(item)
                            }

                        })
                    }
                    if(this.options[2].isActive){
                        temp.forEach(item => {
                            let isExist = tempOptions.some( some => some.id === item.id)
                            let month = new Date().getMonth() - 1
                            let itemMonth = new Date(item.date).getMonth()
                            if((itemMonth >= month) && !isExist){
                                tempOptions.push(item)
                            }
                        })
                    }

                    temp = JSON.parse(JSON.stringify(tempOptions))
                }
                this.sortedData = JSON.parse(JSON.stringify(temp))
                this.getCategoriesCount()
                if(this.activeCategory !== 'all'){
                    temp = temp.filter( item =>item.theme === this.activeCategory)
                }
                this.sortedData = JSON.parse(JSON.stringify(temp))
            },
/*            closeSidebarMenu(){
                this.$emit('closeSidebarMenu')
            }*/
        },
        computed: {
            getTitle() {
                if (this.activeCategory === 'all') {
                    return 'усі відео'
                }
                let categoryTemp = this.categories.filter((category) => this.activeCategory === category.key)
                return categoryTemp[0].title
            },
            getOptions(){
                if (this.activeCategory === 'all') {
                    return this.data
                }
                return this.sortedData.filter( item => item.theme === this.activeCategory)
            }
        }
    }
</script>

<style lang="scss">
    .container{
        display: flex;
        flex: 1 0 auto;
    }
    .wrapper {
        width: 1155px;
        display: flex;
        margin: 0 auto;
        box-sizing: border-box;

        .main-content {
            flex: 1;
            padding: 45px 30px;

            &__list{
                margin-top: 44px;
            }

            &__list.tile{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }

    }
    @media (max-width: 1280px ) {
        .wrapper{
            width: 90%;
        }
    }
    @media (max-width: 768px ) {
        .wrapper {
            .main-content {
                &__list{
                    margin-top: 20px;
                }
            }
        }
    }
    //////////////////////////
    .slide-fade-enter-active {
        transition: all .5s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(-100px);
        opacity: 0;
    }



</style>