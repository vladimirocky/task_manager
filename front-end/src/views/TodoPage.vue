<template>
  <div class="hello">
    <h1>Todo App</h1>
    <form @submit="addTodo" class="todo-input">
      <div class="col-5">
        <input v-model="todoName" type="text" class="add-input form-control" placeholder="Add new todo">
      </div>
      <button
        :disabled="!todoName"
        class="btn btn-primary"
      >
        Add
      </button>
    </form>
    <div v-if="todos.length" class="wrap">
      <table class="table ">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" class="text-start">Message</th>
          <th scope="col">Completed</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
          <TodoItem
            v-for="todo in todos"
            :todo="todo"
            :key="todo.id"
            @complete="(value)=> completeItem(value, todo.id)"
            @save="(name)=> saveEditedItem(name, todo)"
            @delete="deleteItem(todo.id)"
          />
        </tbody>
      </table>
    </div>
    <div v-else class="no-todos">
      Empty list...
    </div>
  </div>
</template>

<script>

import {defineComponent, onMounted, ref} from "vue";
import TodoItem from "@/components/TodoItem";
import api from '../lib/axios'

export default defineComponent({
  name: 'TodoPage',
  components: {TodoItem},

  setup() {
    const todoName = ref('')

    const todos = ref([])

    onMounted(()=>{
      loadTodos()
    })

    function loadTodos() {
      return api.getTodos().then((res)=>{
        todos.value = res.data.data
      })
    }

    function addTodo(e){
      e.preventDefault()
      if(!todoName.value){ return }

      api.addTodo({ message: todoName.value, completed: false}).then(()=>{
        loadTodos()
        todoName.value = ''
      })


    }
    function completeItem(value, id) {
      api.updateTodo(id,  { completed: value }).then(loadTodos)
    }
    function saveEditedItem(name, todo) {
      todo.name = name
      api.updateTodo(todo.id, { message: name }).then(loadTodos)
    }
    function deleteItem(id) {
      api.deleteTodo(id).then(loadTodos)
    }

    return {
      todoName,
      addTodo,
      todos,
      completeItem,
      saveEditedItem,
      deleteItem
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-input{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  column-gap: 10px;
}

.btn:disabled,
.btn[disabled]{
  background-color: lightgray;
  border-color: lightgray;
  border-color: lightgray;
  color: gray;
}
.wrap{
  max-width: 900px;
  margin: 0 auto;
}
</style>
