<template>
    <div class="sidebar">
        <div class="accordion">
            <div class="accordion__header" @click="showOptions = !showOptions">
                <img src="../assets/icons/video.png" class="accordion__header-icon" alt="list">
                <slot name="header">ВІДЕО</slot>
                <img src="../assets/icons/chevron.png" class="accordion__header-icon-chevron categories"
                     :class="{ rotate: showOptions }" alt="chevron">
            </div>
            <transition name="accordion"
                        @before-enter="beforeEnter" @enter="enter"
                        @before-leave="beforeLeave" @leave="leave">
                <div class="accordion__body" v-show="showOptions">
                    <div class="body-inner checkboxes">
                        <div v-for ="option in options" :key="option.key">
                            <input type="checkbox" :id="option.key" >
                            <label :for="option.key" @click="changeOptions(option.key)">{{option.title}}({{option.count}}) </label>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="accordion">
            <div class="accordion__header" @click="showCategories = !showCategories">
                <img src="../assets/icons/list2.png" class="accordion__header-icon" alt="list">
                <slot name="header">теми</slot>
                <img src="../assets/icons/chevron.png" class="accordion__header-icon-chevron categories"
                     :class="{ rotate: showCategories }" alt="chevron">
            </div>
            <transition name="accordion"
                        @before-enter="beforeEnter" @enter="enter"
                        @before-leave="beforeLeave" @leave="leave">
                <div class="accordion__body" v-show="showCategories">
                    <div class="body-inner">
                        <ul>
                            <li
                                    v-for="category in categories"
                                    :key=category.key
                                    @click="changeActiveCategory(category.key)"
                                    :class="{active : activeCategory === category.key}"
                            >{{category.title}}({{category.count}})
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['categories', 'activeCategory', "options"],
        name: "Sidebar",
        data() {
            return {
                showCategories: true,
                showOptions: true,
                activeOptions: {
                    promoOption: false,
                    popularOption: false,
                    newOption: false
                },
            }
        },
        methods: {
            beforeEnter: function (el) {
                el.style.height = '0';
            },
            enter: function (el) {
                el.style.height = el.scrollHeight + 'px';
            },
            beforeLeave: function (el) {
                el.style.height = el.scrollHeight + 'px';
            },
            leave: function (el) {
                el.style.height = '0';
            },
            changeOptions(key) {
                this.$emit("changeOptions", key)
            },
            changeActiveCategory(key) {
                this.$emit("changeActiveCategory", key)
            },
        },
        watch: {
            changeOption: function () {
                console.log("asd")
            }
        }
    }
</script>

<style lang="scss">
    .sidebar {
        width: 278px;
        height: 100%;
        padding-top: 30px;
        padding-left: 15px;
        padding-right: 15px;
        background-color: #ffffff;
        box-sizing: border-box;
        -webkit-box-shadow: 0 13px 60px -5px rgba(0,0,0,0.23);
        -moz-box-shadow: 0 13px 60px -5px rgba(0,0,0,0.23);
        box-shadow: 0 13px 60px -5px rgba(0,0,0,0.23);
    }

    .accordion {
        background-color: #e6e6e6;
        border-radius: 10px;
        padding: 1px 1px;
        margin-bottom: 15px;

        &__header {
            padding: 14px 15px;
            display: flex;
            align-items: center;
            color: #232323;
            font-weight: 700;
            font-size: 14px;
            line-height: 14px;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            position: relative;

            &-icon-chevron {
                position: absolute;
                top: 21px;
                right: 19px;
                transform: rotate(0deg);
                transition-duration: 0.3s;
            }

            &-icon-chevron.rotate {
                transform: rotate(180deg);
                transition-duration: 0.3s;
            }

            &-icon {
                padding-right: 10px;
            }
        }


        &__body {
            overflow: hidden;
            background-color: #fff;
            border-top: 0;
            padding: 0;
            transition: 150ms ease-out;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

            .checkboxes {
                margin-top: 12px;

                label:hover{
                    text-decoration: underline;
                }
            }

            & ul {
                overflow: hidden;
                padding: 0;

                li {
                    list-style: none;
                    padding-left: 15px;
                    padding-bottom: 12px;
                    font-size: 14px;
                    font-weight: 300;
                    line-height: 14px;
                    cursor: pointer;
                }
                li:hover{
                    text-decoration: underline;
                }

                li.active {
                    color: #e63333;
                    font-weight: 400;
                }

                li:last-child {
                    padding-bottom: 0;
                }
            }

            input[type="checkbox"] {
                display: none;
            }

            label {
                color: #232323;
                cursor: pointer;
                font-size: 14px;
                font-weight: 300;
                line-height: 14px;
                padding: 0 0 12px 15px;
                display: flex;
                align-items: center;
            }

            label:before {
                content: url("../assets/icons/checkbox-unchecked.png");
                display: inline-block;
                width: 16px;
                height: 17px;
                border-radius: 3px;
                margin-right: 6px;
                //  border: 2px solid #cccccc;
                background-color: #fcfcfc;
            }

            input:checked + label:before {
                content: url("../assets/icons/checked-checkbox.png");
                border-radius: 3px;
                //  border: 2px solid #ed3434;
            }

            input:checked + label {
                color: #e63333;
                font-weight: 400;
            }

            input:disabled + label:before {
                background: #eee;
                color: #aaa;
            }
        }
    }

    @media (max-width: 768px ) {
        .sidebar{
            display: none;
        }
    }
    .sidebarActive{
        display: block;
        position: absolute;
        z-index: 20;
    }


</style>