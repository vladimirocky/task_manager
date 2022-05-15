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
              <input v-model="email" type="email" id="form3Example3" class="form-control form-control-lg"
                     placeholder="Enter a valid email address" />
              <label class="form-label" for="form3Example3">Email address</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input v-model="password" type="password" id="form3Example4" class="form-control form-control-lg"
                     placeholder="Enter password" />
              <label class="form-label" for="form3Example4">Password</label>
            </div>

            <div class="form-outline mb-3">
              <router-link to="register">Register</router-link>
            </div>


            <div class="text-center text-lg-start mt-4 pt-2">
              <button @click="login" type="button" class="btn btn-primary btn-lg"
                      style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
            </div>

          </form>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import api from "@/lib/axios";

export default defineComponent({

  setup(){
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    function login() {
      if(!email.value || !password.value ) { return }

      api.login({
        identifier: email.value,
        password: password.value
      }).then(()=> {
        email.value = ''
        password.value = ''
        router.replace({name: 'todos'})
      })

    }

    return {
      email,
      password,
      login
    }

  }

})
</script>

<style scoped>

</style>
