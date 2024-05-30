<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py- sm:px-6 lg:px-8">
      <div class="relative isolate overflow-hidden px-6 pt-16  sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24" style="background-color: #f9f9f9;">
       
        
      <div class="relative isolate px-6 lg:px-8">
      
        <div class="mx-auto max-w-7xl py-12 sm:px-6 sm:py-25 lg:px-8">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
  Esplora, scopri e acquista pubblicazioni specializzate         
 </div>
            
          </div>
          <div class="text-center">
            <h1 class="text-4xl font-medium tracking-tight sm:text-6xl">Quale libro stai cercando?</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <search-bar></search-bar>
         </div>
          </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2" />
        </div>
      </div>
       
      </div>
    </div>
  </div>
</template>


<script>
import SearchBar from '@/components/SearchBar.vue'



export default {
name: 'HeroBanner',
components: {
SearchBar,
}
}
</script>
