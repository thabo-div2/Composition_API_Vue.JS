<template>
	<header>
		<h1>The Dojo Blog</h1>
	</header>
	<nav>
		<router-link :to="{ name: 'Home' }">Home</router-link>
		<router-link :to="{ name: 'Create' }">Create Post</router-link>
	</nav>
</template>

<script>
export default {};
</script>

<style>
header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	max-width: 1200px;
	margin: 0 auto;
	padding: 10px;
}
header h1 {
	color: #dfdfdf;
	font-size: 48px;
}
a {
	color: #bbb;
	text-decoration: none;
	margin-left: 20px;
}
a.router-link-active {
	color: #444;
	font-weight: bold;
}
</style>
