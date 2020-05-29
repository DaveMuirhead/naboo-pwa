export default function ({ $axios, redirect }) {

    // Adds Authorization header
    const authToken = this.$store.state.token
    if (authToken) {
        $axios.setToken(authToken, 'Bearer')
    }

    // $axios.onRequest((config) => {
    //     // Refresh JWT token if needed
    //     config.headers['Authorization'] = `Bearer ${token}`
    //     return config
    // })

}