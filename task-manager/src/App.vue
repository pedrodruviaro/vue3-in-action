<script setup lang="ts">
import { computed, ref } from 'vue'

export type TodoCategories = 'low' | 'medium' | 'high'

export type Todo = {
  id: string
  content: string
  category: TodoCategories
  isCompleted: boolean
}

const todo = ref('')
const todoCategory = ref<TodoCategories>()

const todoList = ref<Todo[]>([])
const filteredTodos = ref<Todo[]>([])

const hasTodos = computed(() => todoList.value.length > 0)

function handleNewTodo() {
  if (!todo.value || !todoCategory.value) return

  const newTodo: Todo = {
    id: new Date().toISOString(),
    content: todo.value,
    category: todoCategory.value,
    isCompleted: false
  }

  todoList.value.push(newTodo)

  todo.value = ''
  todoCategory.value = undefined
}

function handleMarkTodoAsCompleted(id: string) {
  const todoToMark = todoList.value.find((todo) => todo.id === id)

  if (!todoToMark) return

  todoToMark.isCompleted = !todoToMark.isCompleted
}

function handleDeleteTodo(id: string) {
  const todoIndex = todoList.value.findIndex((todo) => todo.id === id)

  if (todoIndex === -1) return

  todoList.value.splice(todoIndex, 1)
}

const search = ref('')

const listToRender = computed(() => {
  if (search.value === '') {
    return todoList.value
  }

  return filteredTodos.value
})

function handleSearch() {
  filteredTodos.value = todoList.value.filter((todo) =>
    todo.content.toLowerCase().includes(search.value.toLowerCase())
  )
}
</script>

<template>
  <main class="container mt-16 grid gap-10">
    <div>
      <form class="flex gap-2" @submit.prevent="handleNewTodo">
        <input
          type="text"
          placeholder="Enter your todo"
          required
          class="border px-4 py-2 rounded-lg"
          v-model="todo"
        />
        <select required class="border px-4 py-2 rounded-lg" v-model="todoCategory">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit" class="px-6 py-2 bg-slate-200 rounded-lg">Add</button>
      </form>
    </div>

    <div class="flex items-center gap-3">
      <p>Search:</p>
      <input
        type="search"
        placeholder="Wash dishes..."
        class="border-b focus:outline-none"
        v-model="search"
        @input="handleSearch"
      />
    </div>

    <div>
      <ul class="grid gap-2.5" v-if="hasTodos">
        <li
          class="border rounded-lg p-2.5 border-l-8 flex items-center justify-start gap-2.5"
          v-for="todo in listToRender"
          :key="todo.id"
          :class="{
            'border-green-400': todo.category === 'low',
            'border-yellow-400': todo.category === 'medium',
            'border-red-400': todo.category === 'high'
          }"
        >
          <input
            type="checkbox"
            class="accent-slate-700"
            :checked="todo.isCompleted"
            @change="handleMarkTodoAsCompleted(todo.id)"
          />
          <p class="flex-1" :class="{ 'line-through': todo.isCompleted }">{{ todo.content }}</p>
          <button @click="handleDeleteTodo(todo.id)">&times;</button>
        </li>
      </ul>
    </div>
  </main>
</template>
