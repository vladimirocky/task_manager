import Axios from 'axios'

import auth from '@/lib/auth'

class API {
    adapter

    constructor() {
        this.adapter = Axios.create({
            baseURL: 'api/'
        })

        this.adapter.interceptors.request.use(
            (config) => {
                const res = config
                if(auth.token){
                  res.headers.Authorization = `Bearer ${auth.token}`
                }
                return config
            })

        // this.adapter.interceptors.response.use(
        //   (response) => response,
        //   (error) => {
        //     const res = error.response
        //     const COMPLETE_STATUSES = [401, 403];
        //     if (res && COMPLETE_STATUSES.includes(Number(res.status))) {
        //       if(this.token){
        //         // auth.deleteCookie()
        //       }
        //     }
        //   },
        // )
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
        auth.setCookie('token', response.data.jwt)
      })
    }

    login(data) {
      return this.adapter.post(`auth/local/`, data).then((response) => {
        auth.setCookie('token', response.data.jwt)
      })
    }

}

export default new API()
