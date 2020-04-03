<template>
  <div id="app">
    <app-menu></app-menu>
    <div class="router-container">
      <router-view/>
    </div>
  </div>
</template>


<script>
import Menu from '@/components/Menu'

export default {
  components: {
    "app-menu": Menu
  }
}
</script>
