<template>
  <tr>
    <th scope="row">
      <input
        class="form-check-input"
        :checked="todo.attributes.completed"
        type="checkbox"
        @change="$emit('complete', $event.target.checked)"
      >
    </th>
    <td class="text-start">
      <input
        v-if="editMode"
        v-model="itemName"
        type="text"
        class="form-control"
        @blur="saveEditedItem"
      >
      <h4
        v-else
        :class="{'text-decoration-line-through text-secondary': todo.attributes.completed}"
      >
        {{ todo.attributes.message }}
      </h4>
    </td>
    <td>
      <span v-if="todo.attributes.completed" class="badge bg-success">Success</span>
    </td>
    <td class="text-end">
      <button
        v-if="editMode"
        @click="saveEditedItem"
        class="btn btn-primary"
      >
        Save
      </button>

      <div v-else class="d-flex justify-content-end">
        <button
          v-if="!todo.attributes.completed"
          @click="editMode = true"
          class="btn btn-primary"
        >
          Edit
        </button>
        <button @click="$emit('delete')" class="btn btn-danger">Delete</button>
      </div>

    </td>
  </tr>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  name: "TodoItem",
  props: {
    todo: Object
  },
  setup(props, { emit }){
    const editMode = ref( false)

    const itemName = ref('')

    onMounted(()=>{
      itemName.value = props.todo.attributes.message
    })

    function saveEditedItem() {
      if(itemName.value !== props.todo.attributes.message){
        emit('save', itemName.value)
      }
      editMode.value = false
    }

    return{
      editMode,
      itemName,
      saveEditedItem
    }
  }
})
</script>

<style scoped>

button{
  margin-right: 8px;
}
</style>
