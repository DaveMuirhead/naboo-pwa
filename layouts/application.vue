<!-- ====================================================================== -->
<!--  Application Layout                                                    -->
<!--                                                                        -->
<!--  This layout is designed to be used for all pages that are part        -->
<!--  of the application that the user experiences after login              -->
<!-- ====================================================================== -->
<template>
  <v-app>

    <!-- ====================================================================== -->
    <!--  Navigation Drawer                                                     -->
    <!-- ====================================================================== -->
    <v-navigation-drawer app v-model="drawer">

      <!-- Nav Drawer Header -->
      <template v-slot:prepend>
        <v-list-item two-line @click="editProfile()">
          <v-list-item-avatar color="primary" size="36">
            <div v-if="$auth.user.picture">
              <v-img src="$auth.user.picture"></v-img>
            </div>
            <div v-else>
              <v-icon dark>mdi-account-circle</v-icon>
            </div>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <div v-if="$auth.user.full_name">
                {{ $auth.user.full_name }}
              </div>
              <div v-else>
                {{ $auth.user.email }}
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $auth.user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>

      <!-- Nav Drawer Content -->
      <v-card elevation="0">
        <v-card-text>
          <v-list dense>
            <v-list-item link>
              <v-list-item-action>
                <v-icon color="primary">mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-action>
                <v-icon  color="primary">mdi-email</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Contact</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <!-- Nav Drawer Footer -->
      <template v-slot:append>
        <v-divider />
        <v-list-item key="manageAccount" @click="$auth.logout()">
          <v-list-item-action>
            <v-icon color="primary">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content text-color="primary">Sign Out</v-list-item-content>
        </v-list-item>
      </template>

    </v-navigation-drawer>


    <!-- ====================================================================== -->
    <!--  Application Bar                                                       -->
    <!-- ====================================================================== -->
    <v-app-bar app flat dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar dense flat dark color="primary">
        <v-toolbar-title>
          UpSprout
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items class="hidden-sm-and-down">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar color="white" size="42" v-on="on" v-bind="attrs">
                <v-icon color="primary" size="36">mdi-account-circle</v-icon>
              </v-avatar>
            </template>
            <v-list subheader>
              <v-list-item two-line class="menu-header" @click="editProfile()">
                <v-list-item-avatar color="primary" size="48">
                  <div v-if="$auth.user.picture">
                    <v-img src="$auth.user.picture"></v-img>
                  </div>
                  <div v-else>
                    <v-icon dark>mdi-account-circle</v-icon>
                  </div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <div v-if="$auth.user.full_name">
                      {{ $auth.user.full_name }}
                   </div>
                    <div v-else>
                      {{ $auth.user.email }}
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $auth.user.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item key="manageAccount" @click="$auth.logout()" v-if="$auth.loggedIn">
                <v-list-item-action>
                  <v-icon color="primary">mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content text-color="primary">Sign Out</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>

    </v-app-bar>

    <!-- ====================================================================== -->
    <!--  Content Area                                                          -->
    <!--                                                                        -->
    <!-- NOTE: using v-main here causes the content to be occluded by the       -->
    <!-- app-bar for some reason                                                -->
    <!-- ====================================================================== -->
    <v-container fill-height fluid>
      <!-- v-row align="center" justify="center" -->
        <!-- v-col cols="12" sm="8" md="4" -->
        <!-- v-col -->
            <nuxt />
        <!-- /v-col-->
      <!-- /v-row -->
    </v-container>


    <!-- ====================================================================== -->
    <!--  Footer                                                                -->
    <!-- ====================================================================== -->
    <v-footer app color="primary">
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    middleware: 'auth',
    props: {
      source: String,
    },

    data() {
      return {
        drawer: null,
        menus: [
          { title: 'Tour', icon: 'mdi-information', path: '/about/tour' },
          { title: 'Testimonials', icon: 'mdi-information', path: '/about/testimonials' },
          { title: 'Pricing', icon: 'mdi-tag', path: '/about/pricing' },
        ]
      }
    },

    methods: {
      editProfile() {
        this.$router.push("/account/" +  this.$auth.user.uuid)
      }
    },

  }
</script>