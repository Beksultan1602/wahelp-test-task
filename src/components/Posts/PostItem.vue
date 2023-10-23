<template>
    <div class="post">
        <p style="margin-bottom: 10px;" v-for="user in users">{{user.name}}</p>
        <h2>{{ post.id }}. {{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <div class="post-comments">
            <h3 style="margin: 10px 0 10px 0;">Comments</h3>
            <template v-for="comment in comments">
                <p class="post-comments__email">{{ comment.email }}</p>
                <p class="post-comments__content"> {{ comment.body }}</p>
            </template>
            <div class="post-comments__add">
                <input v-model="newComment.name" placeholder="Имя">
                <input v-model="newComment.email" placeholder="Email">
                <textarea v-model="newComment.body" placeholder="Текст комментария"></textarea>
                <button @click="addComment">Отправить комментарий</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostItem",
    data() {
        return {
            comments: [],
            users: [],
            newComment: {
                postId: this.post.id,
                name: '',
                email: '',
                body: '',
            },
        }
    },
    props: {
        post: Object,
        totalPosts: Number
    },
    async created() {
        await this.loadComments()
        await this.loadUsers()
    },
    methods: {
        async loadComments() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.post.id}/comments`);
                if (response.ok) {
                    const data = await response.json();
                    this.comments = data;
                } else {
                    console.error('Ошибка при загрузке данных');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных', error);
            }
        },
        async loadUsers() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${this.post.userId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.users = data;
                } else {
                    console.error('Ошибка при загрузке данных');
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных', error);
            }
        },
        async addComment() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newComment),
                });

                if (response.ok) {
                    const createdComment = await response.json();
                    this.comments.push(createdComment);
                    this.newComment = {
                        postId: this.post.id,
                        name: '',
                        email: '',
                        body: '',
                    };
                } else {
                    console.error('Ошибка при отправке комментария');
                }
            } catch (error) {
                console.error('Ошибка при отправке комментария', error);
            }
        }
    }
}
</script>

<style lang="scss">
.post {
    margin: 0 auto 10px auto;
    border: 1px solid skyblue;
    padding: 10px;
    &-comments {
        &__email {
            font-size: 14px;
            color: skyblue;
        }
        &__add {
            display: flex;
            width: 100%;
            gap: 10px;
            margin-top: 10px;
        }
    }
}
</style>