<template>
    <div class="video-card" :class="videoViewType === 'tile'? 'card-tile' : 'card-list'">
        <img :src="covers" alt="cover" class="video-card__cover">
        <div class="video-card__info">
            <div class="video-card__title" v-html="title"></div>
            <a  v-if="access" :href="link" class="video-card__btn-watch card-btn">ДИВИТИСЯ</a>
            <a  v-else :href="link" class="video-card__btn-buy card-btn" >Придбати</a>
        </div>
    </div>
</template>

<script>
    export default {
        props:[ 'title', 'access', 'covers', 'link', 'videoViewType'],
        name: "TileVideoItem"
    }
</script>

<style scoped lang="scss">
    .video-card{
        display: flex;
        flex-direction: column;
        width: 260px;
        margin-bottom: 30px;
        margin-right: 18px;

        &__cover{
            height: 340px;
        }
        &__info{
            height: 179px;
            border-radius: 0 0 10px 10px;
            border: 1px solid #c7c7c7;
            border-top: none;
            background-color: #ffffff;
            padding: 20px 20px 20px 15px;
        }
        &__title{
            height: 120px;
            color: #232323;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            overflow: hidden;
        }
        .card-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            width: 180px;
            height: 34px;
            border-radius: 17px;
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            cursor: pointer;
            text-align: center;
            box-sizing: border-box;
            padding-right: 20px;
        }
        .video-card__btn-watch{
            border: 1px solid #c7c7c7;
            background-color: #ffffff;
            color: #232323;
            position: relative;
        }
        .video-card__btn-watch:hover{
            border: 1px solid  #ed3434;
        }
        .video-card__btn-watch:after{
            content: url("../assets/icons/buy.png");
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            position: absolute;
            background-color: #ed3434;
            top: -1px;
            right: -1px;
            border-radius: 50%;

        }
        .video-card__btn-buy{
            background-color: #ed3434;
            border: none;
            position: relative;
            color: #ffffff;
        }
        .video-card__btn-buy:hover{
            background-color: #a11313;
        }
        .video-card__btn-buy:after{
            content: url("../assets/icons/buy.png");
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            position: absolute;
            top: 0px;
            right: 0px;
        }
    }

    .video-card:nth-child(3n+3) {
        margin-right: 0;
    }
    .video-card.card-list{
       display: flex;
        width: 100%;
        flex-direction: row;
        height: 160px;

        .video-card__cover{
            height: 100%;
        }
        .video-card__info{
            height: 100%;
            box-sizing: border-box;
            flex: 1;
            border-radius:  0 5px 5px 0;
        }
        .video-card__title{
            height: 80px;
            color: #232323;
            font-size: 24px;
            font-weight: 500;
            line-height: 34px;
            overflow: hidden;
        }
        .card-btn{
            margin-right: 0;
            margin-left: auto;
        }
    }
</style>