<template>
	<div class="tag">
		<div v-if="error">{{ error }}</div>
		<div v-if="posts.length" class="layout">
			<PostList :posts="tagged_posts" />
			<TagCloud :posts="tagged_posts" />
		</div>
		<div v-else>
			<Spinner />
		</div>
	</div>
</template>

<script>
import { useRoute } from "vue-router";
import getPosts from "../composables/getPosts";
import Spinner from "../components/Spinner.vue";
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";
import { computed } from "vue";

export default {
	components: { Spinner, PostList, TagCloud },
	setup() {
		const route = useRoute();

		const { posts, error, load } = getPosts();

		const tagged_posts = computed(() => {
			return posts.value.filter((p) => p.tags.includes(route.params.tag));
		});

		load();

		return { posts, load, error, tagged_posts };
	},
};
</script>

<style>
.tag {
	max-width: 1200px;
	margin: 0 auto;
	padding: 10px;
}
</style>
