import Axios from 'axios'

class API {
    adapter

    constructor() {
        this.adapter = Axios.create({
            baseURL: 'api/'
        })

        this.adapter.interceptors.request.use(
            (config) => {
                const res = config
                res.headers.Authorization = `Bearer 1a2a97710c31dcbf7363fd45f843bf1333063710900a66dbb7ff6b8c2fc064e15e979b1bca44b24c959587f3dd805dc70088b7005a384a35263ddeb8aac1f66912aad72ea63e6d70bab03a983c5c79308273a86b4b96337b5516d98be0081d501ad3f0a909503548b51ab738d765dbfd447acebacc02bb5d3139a34540f96523`
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

}

export default new API()
