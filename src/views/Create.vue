<template>
	<div class="create">
		<form @submit.prevent="addPost">
			<div>
				<label>Title:</label>
				<input v-model="title" type="text" required />
			</div>
			<div>
				<label>Content:</label>
				<textarea v-model="body" required></textarea>
			</div>
			<div>
				<label>Tags(Hit enter to add a tag):</label>
				<input
					@keydown.enter.prevent="handleKeyDown"
					v-model="tag"
					type="text"
				/>
				<div v-for="tag in tags" :key="tag" class="pill">
					<p>#{{ tag }},</p>
				</div>
			</div>
			<button>Add Post</button>
		</form>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";

export default {
	setup() {
		const title = ref("");
		const body = ref("");
		const tag = ref("");
		const tags = ref([]);

		const router = useRouter();

		const handleKeyDown = () => {
			if (!tags.value.includes(tag.value)) {
				tag.value = tag.value.replace(/\s/, ""); // removes all whitespace
				tags.value.push(tag.value);
			}
			tag.value = "";
		};

		const addPost = async () => {
			const post = {
				title: title.value,
				body: body.value,
				tags: tags.value,
			};
			const data = await fetch("http://localhost:3000/posts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(post),
			});
			if (!data.ok) {
				throw Error("that post does not exist");
			}

			router.push({ name: "Home" });
		};

		return { title, body, tag, handleKeyDown, tags, addPost };
	},
};
</script>

<style>
form {
	max-width: 480px;
	margin: 0 auto;
	text-align: left;
}
input,
textarea {
	display: block;
	margin: 10px 0;
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
	border: 1px solid #eee;
}
textarea {
	height: 160px;
}
label {
	display: inline-block;
	margin-top: 30px;
	position: relative;
	font-size: 20px;
	color: white;
	margin-bottom: 10px;
}
label::before {
	content: "";
	display: block;
	width: 100%;
	height: 100%;
	background: #ff8800;
	position: absolute;
	z-index: -1;
	padding-right: 40px;
	left: -30px;
	transform: rotateZ(-1.5deg);
}
button {
	display: block;
	margin-top: 30px;
	background: #ff8800;
	color: white;
	border: none;
	padding: 8px 16px;
	font-size: 18px;
}
.pill {
	display: inline-block;
	margin: 10px 10px 0 0;
	color: #444;
	background: #ddd;
	padding: 8px;
	border-radius: 20px;
	font-size: 14px;
}
</style>
