<template>
    <div class="main-content-header">
        <h2 class="main-content-header__title">{{title}}</h2>
        <div class="main-content-header__hr"></div>
        <div class="main-content-header__right-side">
            <label>
                <input
                        class="main-content-header__searchbar"
                        v-model ="searchingWord"
                        @keyup="changeSearchingWord"
                >
            </label>
            <div class="toggle-view-btns">
                <div class="toggle-view-btn__tile" @click="toggleVideoView('tile')"><img src="../assets/icons/tile.png" alt="tile"></div>
                <div class="toggle-view-btn__list" @click="toggleVideoView('list')"><img src="../assets/icons/list.png" alt="list"></div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:['title'],
        name: "MainContentTop",
        data() {
            return {
                searchingWord: ''
            }
        },
        methods:{
            toggleVideoView(viewType){
                this.$emit('toggleVideoView', viewType )
            },
            changeSearchingWord(){
                this.$emit('changeSearchingWord', this.searchingWord)
            }
        }
    }
</script>

<style scoped lang="scss">
    .main-content-header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;


        &__title{
            font-size: 35px;
            font-weight: 300;
            line-height: 38px;
            text-transform: uppercase;
            letter-spacing: 0.88px;
            margin: 0;
            text-align: center;
        }
        &__hr{
            display: flex;
            border: 1px solid #d3d3d3;
            flex: 1;
            margin-left: 15px;
            margin-right: 52px;
        }
        &__searchbar{
            width: 194px;
            height: 27px;
            border-radius: 5px;
            border: 1px solid #e6e6e6;
            background-color: #ffffff;
            position: relative;
            padding-left: 15px;
            box-sizing: border-box;

            background-image: url("../assets/icons/search.png");
            background-position: 95% 50%;
            background-repeat: no-repeat;
        }
        &__searchbar:hover,
        &__searchbar:active,
        &__searchbar:focus
        {
            border: 1px solid #cacaca;
        }
        &__right-side{
            display: flex;
            align-items: center;

            .toggle-view-btns{
                display: flex;
                align-items: center;
                margin-left: 21px;
                width: 75px;
                justify-content: space-between;
                padding-top: 6px;
            }
            .toggle-view-btn__tile,
            .toggle-view-btn__list{
                cursor: pointer;
            }
        }

    }
    @media (max-width: 768px ) {
        .main-content-header{
            flex-direction: column-reverse;

            &__title{
                font-size: 24px;
                font-weight: 700;
                line-height: 30px;
            }
            &__hr{
                display: none;
            }
            &__searchbar{
                width: 100%;
                background-position: 95% 50%;
                height: 30px;
            }
            &__right-side{
                flex-direction: column;
                margin-bottom: 20px;
                width: 100%;
                label{
                    width: 100%;
                    margin-bottom: 24px;
                }

            }

        }
    }
</style>