<template>
  <TodoApp title="Todo App"/>
</template>

<script>
import TodoApp from './components/TodoApp.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    TodoApp
  },
  setup(){
    //logic for auth and other things
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 60px;
}
</style>
