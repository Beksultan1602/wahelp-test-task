<template>
    <div class="app">
        <div class="tabs">
            <div
                class="tabs__item"
                :class="{ active: activeTab === 'posts' }"
                @click="switchTab('posts')"
            >
                Посты
            </div>
            <div
                class="tabs__item"
                :class="{ active: activeTab === 'users' }"
                @click="switchTab('users')"
            >
                Пользователи
            </div>
        </div>
        <template v-if="isFiltered">
            <h3>Посты пользователя {{ creatorName }}</h3>
            <p @click=clearFilters>x</p>
        </template>
        <div class="tab-content">
            <div :class="{ active: activeTab === 'posts' }">
               <PostItem v-for="post in data" :key="post.id" :post="post" :totalPosts="totalData"/>
            </div>
            <div :class="{ active: activeTab === 'users' }">
                <UserItem v-for="user in data" :key="user.id" :user="user" :totalUsers="totalData" @filterByUser="filterByUser"/>
            </div>

        </div>
    </div>
</template>

<script>

import PostItem from "@/components/Posts/PostItem";
import UserItem from "@/components/Users/UserItem";
export default {
    name: 'App',
    components: {UserItem, PostItem},
    data() {
        return {
            activeTab: 'posts',
            data: [],
            currentPage: 1,
            dataPerPage: 20,
            totalData: 0,
            loading: false,
            isFiltered: false,
            selectedUserId: null,
            creatorName: ''
        }
    },
    async created() {
        await this.loadData()
    },
    watch: {
        activeTab(oldVal, newVal) {
            this.loadData()
        },
        isFiltered(oldVal, newVal) {
            this.activeTab = 'posts'
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        filterByUser(userId, userName) {
            this.isFiltered = true;
            this.selectedUserId = userId;
            this.creatorName = userName
        },
        switchTab(tab) {
            this.activeTab = tab;
        },
        handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollY + windowHeight >= documentHeight - 200) {
                this.loadMoreData()
            }
        },
        async loadMoreData() {
            if (this.loading) return;

            if (this.data.length >= this.totalPosts) return;

            this.loading = true;
            this.currentPage++;

            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/${this.activeTab}?_page=${this.currentPage}&_limit=${this.dataPerPage}${this.isFiltered ? `&userId=${this.selectedUserId}` : ''}`
                );
                if (response.ok) {
                    const newPosts = await response.json();
                    this.data = this.data.concat(newPosts);
                    this.loading = false;
                } else {
                    console.error('Ошибка при загрузке данных');
                    this.loading = false;
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных', error);
                this.loading = false;
            }
        },
        async loadData() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/${this.activeTab}?_page=${this.currentPage}&_limit=${this.dataPerPage}${this.isFiltered ? `&userId=${this.selectedUserId}` : ''}`);
                if (response.ok) {
                    const data = await response.json();
                    this.data = data;
                    this.totalData = parseInt(response.headers.get('x-total-count'));
                } else {
                    console.error('Ошибка при загрузке данных');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных', error);
            }
        },
        clearFilters() {
            this.isFiltered = false
            this.selectedUserId = null
            this.creatorName = ''
            this.loadData()
        },
    },
}
</script>

<style lang="scss">
.app {
    max-width: 1366px;
    margin: 0 auto;
    box-sizing: border-box;
    p, h2, h3 {
        margin: 0;
    }
    .tabs {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 10px;
        &__item {
            border: 1px solid;
            padding: 10px;
            cursor: pointer;
            &.active {
                background: skyblue;
            }
        }
    }
    .tab-content {
        .active {
            display: block;
        }

        > div {
            display: none;
        }
        .div {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
    }
}

</style>
