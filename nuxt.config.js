import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ,
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  server: {
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/style/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/vuelidate.js'}
  ],
  /*
  ** Build modules
  */
 buildModules: [
    'vue-browser-detect-plugin/nuxt'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "http://10.0.0.217:4004/api",
    credentials: true,
    debug: true
  },
  /*
  ** Auth module configuration
  ** See https://auth.nuxtjs.org/
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/sessions', method: 'post', propertyName: false },
          logout: { url: '/sessions', method: 'delete' },
          user: { url: '/users/current', method: 'get',  propertyName: false }
        },
        tokenRequired: false,
        tokenType: false
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#74C010',
          secondary: {
            base: '#74C010',
            lighten3: '#a0d367',
            darken3: '#4E9D00'
          },
          accent: '#1B676B',
          background: '#f9fbe7',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: '#74C010',
          secondary: {
            base: '#74C010',
            lighten3: '#a0d367',
            darken3: '#4E9D00'
          },
          accent: '#9c27b0',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
      },
      options: {
        customProperties: true
      },
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
  }
}
