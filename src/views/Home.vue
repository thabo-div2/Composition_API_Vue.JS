<template>
	<div class="home">
		<h1>Home</h1>
		<div v-if="error">
			{{ error }}
		</div>
		<div v-if="posts.length" class="layout">
			<PostList v-if="showPosts" :posts="posts" />
			<TagCloud :posts="posts" />
		</div>
		<div v-else><Spinner /></div>
		<div>
			<button @click="showPosts = !showPosts">Toggle Post</button>
			<button @click="posts.pop()">Delete a Post</button>
		</div>
	</div>
</template>

<script>
import PostList from "../components/PostList.vue";
import getPosts from "../composables/getPosts";
import Spinner from "../components/Spinner.vue";
import TagCloud from "../components/TagCloud.vue";

export default {
	name: "Home",
	components: { PostList, Spinner, TagCloud },
	setup() {
		const { posts, showPosts, error, load } = getPosts();

		load();

		return { posts, showPosts, error };
	},
};
</script>

<style>
.home {
	max-width: 1200px;
	margin: 0 auto;
	padding: 10px;
}
.layout {
	display: grid;
	grid-template-columns: 3fr 1fr;
	gap: 20px;
}
</style>
