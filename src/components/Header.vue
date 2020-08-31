<template>
    <header>
        <div class="header-wrapper">
            <img src="../assets/icons/menu.png" alt="menu" class="burger-menu" @click="menuToggle">
        </div>
    </header>
</template>

<script>
    export default {
        props:['menuToggle'],
        name: "Header",
    }
</script>

<style>
    header{
        height: 60px;
        width: 100%;
        background-color: #232323;
        flex: 0 0 auto;
    }

    .header-wrapper{
        width: 90%;
        margin: 0 auto;
    }

    .burger-menu{
        display: none;
    }
    @media (max-width: 768px ) {
        header{
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .burger-menu{
            display: flex;
            align-items: center;
            margin-left: auto;
            margin-right: 30px;
            cursor: pointer;
            z-index: 50;
        }
    }
</style>