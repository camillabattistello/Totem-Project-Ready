<template>
  <nav-bar />
  <router-view />
  <footer-bar />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
	name: 'App',
	components: {
		NavBar,
		FooterBar,
	}
}
</script>

<style>
#app {
	font-family: "Poppins", sans-serif !important;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #101010;
	margin-top: 0px;
}
p {	font-family: "Poppins", sans-serif !important;
}
h1, h2, h3, h4, h5, h6, span {
	
	color: #0d2451;
	font-weight: 500 !important;
	letter-spacing: 0px !important;
}
</style>
