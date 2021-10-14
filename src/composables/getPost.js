import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getPost = (id) => {
	const post = ref(null);
	const error = ref(null);

	const load = async () => {
		try {
			// simulate delay
			await new Promise((resolve) => {
				setTimeout(resolve, 2000);
			});
			let res = await projectFirestore
				.collection("posts")
				.doc(id)
				.get();

			if (!res.exists) {
				throw Error("There is no ninjas here... Try again later");
			}
			console.log(res.data());
			post.value = {
				...res.data(),
				id: res.id,
			};
		} catch (err) {
			error.value = err.message;
			console.log(error.value);
		}
	};

	return { post, error, load };
};

export default getPost;
