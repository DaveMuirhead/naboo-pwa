<template>
  <div>
    <div v-if="editing">
      <form @submit.prevent="next">
        <v-card flat>
          <v-card-text>
            <div>
              <label>Account ID</label>
              <v-input>{{ uuid }}</v-input>
            </div>
            <div>
              <label>Account Type</label>
              <v-input>{{ account_type }}</v-input>
            </div>
            <div>
              <h3 align="center">Update Primary Email Address</h3>
            </div>
            <div v-if="!confirming">
              <br/>
              <p>Enter a new email address. An email with a verification code (valid for 10 minutes) will be sent to the new email address. You will be required to enter a code found in that email to verify your ownership of the new email address.</p>
            </div>
            <div>
              <label>New Email Address</label>
              <v-text-field v-model="newEmail" :disabled="confirming" dense outlined></v-text-field>
            </div>
            <div v-if="confirming">
              <div>
                <p>An email with a verification code was just sent to {{ newEmail}}. Please enter the code found on that email in the field below.</p>
              </div>
              <label>Enter Verification Code</label>
              <v-text-field v-model="code" :error-messages="codeMessages" dense outlined></v-text-field>
              <div>
                <p>The verification code we sent is valid for 10 minutes. <nuxt-link to="#" @click.native="resendCode()">Send me another code.</nuxt-link></p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="!confirming" color="primary" @click.prevent="start">Update</v-btn>
            <v-btn v-if="confirming" color="primary" @click.prevent="complete">Confirm</v-btn>
            <v-btn @click.prevent="cancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </div>
    <div v-else>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Account ID</label>
              <v-input>{{ uuid }}</v-input>
            </div>
            <div>
              <label>Account Type</label>
              <v-input>{{ account_type }}</v-input>
            </div>
            <div>
              <label>Account Email</label>
              <v-input>{{ email }}</v-input>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editing = !editing">Edit</v-btn>
          </v-card-actions>
        </v-card>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';
const { mapFields } = createHelpers({
  getterType: 'getAccountField',
  mutationType: 'updateAccountField',
});
export default {
  data() {
    return {
      editing: false,
      newEmail: null,
      newEmailError: null,
      confirming: false,
      secret: null,
      code: null,
      codeMessages: null
    };
  },
  computed: {
    ...mapFields('accounts', [
      'account.uuid',
      'account.account_type',
      'account.email'
    ]),
  },
  methods: {
    start() {
      this.$store
        .dispatch("accounts/startEmailChange", this.newEmail)
        .then(result => {
          console.log("startEmailChange succeeded with result:")
          console.log(JSON.parse(JSON.stringify(result)))
          this.secret = result.secret;
          this.confirming = true;
        })
        .catch(response => {
          console.log("startEmailChange failed with response:")
          console.log(JSON.parse(JSON.stringify(response)))
        })
    },
    complete() {
      this.codeMessages = null;
      if (!this.code) {
        this.codeMessages = "Please enter a verification code.";
      }
      else {
        this.$store
          .dispatch("accounts/completeEmailChange", { new_email: this.newEmail, code: this.code, secret: this.secret})
          .then(result => {
            this.$auth.fetchUser();
            this.editing = false;
            this.confirming = false;
          })
          .catch(response => {
            //TODO handle errors (invalid code, unauthenticated, etc.)
            console.log("completeEmailChange failed with response");
            console.log(JSON.parse(JSON.stringify(response)));
          })
      }
    },
    cancel() {
      this.editing = false;
      this.newEmail = null,
      this.newEmailError = null,
      this.confirming = false,
      this.secret = null,
      this.code = null,
      this.codeMessages = null
    },
    resendCode() {
      alert('not implemented yet')
    },
    next() {
      if (this.confirming) {
        this.confirm();
      }
      else {
        this.start();
      }
    }
  }
};
</script>

<style scoped>
</style>