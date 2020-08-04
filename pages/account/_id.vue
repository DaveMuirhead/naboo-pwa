<template>
  <v-row>
    <v-col md="6" sm="8">
      <v-expansion-panels v-model="panel" multiple>

        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">
            Account Settings
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- <v-container>
              <v-row dense>
                <v-col class="subtitle-2">
                  These are the settings for the primary account holder. You may change the Account Email address. 
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-divider />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col> -->
                  <AccountSettingsEditor />
                <!-- </v-col>
              </v-row>
            </v-container> -->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">
            Profile Picture
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <AvatarSettingsEditor />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">
            Contact Information
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <ContactSettingsEditor />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="font-weight-bold">
            Security Settings
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <SecuritySettingsEditor />
          </v-expansion-panel-content>
        </v-expansion-panel>
        
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import AccountSettingsEditor from '@/components/account/AccountSettingsEditor';
import AvatarSettingsEditor from '@/components/account/AvatarSettingsEditor';
import ContactSettingsEditor from '@/components/account/ContactSettingsEditor';
import SecuritySettingsEditor from '@/components/account/SecuritySettingsEditor';
export default {
  layout: "application",
  components: {
    AccountSettingsEditor,
    AvatarSettingsEditor,
    ContactSettingsEditor,
    SecuritySettingsEditor
  },
  data() {
    return {
       panel: [0, 1, 2, 3],
    }
  }
};
</script>

<style scoped>
</style>