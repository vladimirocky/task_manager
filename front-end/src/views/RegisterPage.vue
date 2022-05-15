<template>
  <section>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
               class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                placeholder="Enter a valid Name"
              />
            </div>
            <div class="form-outline mb-4">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Enter a valid email address"
              />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input
                v-model="password"
                type="password"
                id="formPass"
                class="form-control form-control-lg"
                placeholder="Enter password"
              />
              <label class="form-label" for="formPass">Password</label>
            </div>
            <div class="form-outline mb-3">
              <input
                v-model="confirmPassword"
                type="password"
                id="formConfPass"
                class="form-control form-control-lg"
                placeholder="Confirm password"
              />
              <label class="form-label" for="formConfPass">Confirm Password</label>
            </div>
            <div class="form-outline mb-3">
              <div class="form-outline mb-3">
                <router-link to="login">Login</router-link>
              </div>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;"
                @click="register"
              >
                Register
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useRouter} from 'vue-router'
import api from '../lib/axios'

export default defineComponent({

  setup(){
    const router = useRouter()

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    function register() {
      if(!name.value || !email.value || !password.value || !confirmPassword.value) { return }
      if(password.value !== confirmPassword.value){ return }

      api.registerUser({
        username: name.value,
        email: email.value,
        password: password.value
      }).then(()=> {
        name.value = ''
        email.value = ''
        password.value = ''
        confirmPassword.value = ''
        router.replace({name: 'todos'})
      })

    }

    return {
      name,
      email,
      password,
      confirmPassword,
      register
    }

  }

})
</script>

<style scoped>

</style>
