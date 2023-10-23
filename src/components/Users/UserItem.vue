<template>
    <div>
        <div>
            <p>{{ user.name }}</p>
            <button @click="showUserPosts(user.id, user.name)">Посмотреть посты пользователя</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserItem",
    data() {
        return {
        };
    },
    props: {
        user: Object,
        totalUsers: Number
    },
    methods: {
        showUserPosts(userId, userName) {
            this.$emit('filterByUser', userId, userName);
        }
    }
}
</script>

<style scoped>

</style>