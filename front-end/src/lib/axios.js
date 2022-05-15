import Axios from 'axios'

import token from '@/lib/auth'

class API {
    adapter

    constructor() {
        this.token = token
        this.adapter = Axios.create({
            baseURL: 'api/'
        })

        this.adapter.interceptors.request.use(
            (config) => {
                const res = config
                if(this.token){
                  res.headers.Authorization = `Bearer ${this.token}`
                }
                return config
            })
    }

    getTodos(){
        return this.adapter.get(`tasks?sort[0]=completed`)
    }

    addTodo(data){
        return this.adapter.post('tasks', {data})
    }

    updateTodo(id, data){
        return this.adapter.put(`tasks/${id}`, {data})
    }
    deleteTodo(id){
        return this.adapter.delete(`tasks/${id}`)
    }

    registerUser(data) {
      return this.adapter.post(`auth/local/register`, data).then((response) => {
        document.cookie = `token=${response.data.jwt}`
      })
    }

    login(data) {
      return this.adapter.post(`auth/local/`, data).then((response) => {
        document.cookie = `token=${response.data.jwt}`
      })
    }

}

export default new API()
