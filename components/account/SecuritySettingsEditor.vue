<template>
  <div>
    <div v-if="editing">
      <h3 align="center">Update Password</h3>
      <form>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Current Password</label>
              <v-text-field
                dense
                v-model="currentPassword"
                @blur="$v.currentPassword.$touch()"
                :type="showCurrentPassword ? 'text' : 'password'"
                :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showCurrentPassword = !showCurrentPassword"
                :error-messages="currentPasswordErrors"
              ></v-text-field>
            </div>
            <div>
              <label>New Password</label>
              <v-text-field
                dense
                v-model="newPassword"
                @blur="$v.newPassword.$touch()"
                :type="showNewPassword ? 'text' : 'password'"
                :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showNewPassword = !showNewPassword"
                :error-messages="newPasswordErrors"
              ></v-text-field>
            </div>
            <div>
              <label>Confirm Password</label>
              <v-text-field
                dense
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>
            </div>
            <div>
              In order to protect your account make sure your password:
              <ul>
                <li>Is 8 characters or longer</li>
                <li>Has at least one lower case letter</li>
                <li>Has at least one upper case letter</li>
                <li>Has at least one number</li>
                <li>Has at least one special character (e.g., @, #, $, &amp;, +)</li>
              </ul>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="update">Update</v-btn>
            <v-btn @click="cancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </div>
    <div v-else>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Password</label>
              <v-input>********</v-input>
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      editing: false,
      currentPassword: null,
      currentPasswordError: null,
      newPassword: null,
      newPasswordError: null,
      confirmPassword: null,
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    };
  },
  validations: {
    currentPassword: {
      required
    },
    newPassword: {
      required,
      strongPassword(password) {
        return (
          /[a-z]/.test(password) && // checks for a-z
          /[A-Z]/.test(password) && // checks for A-Z
          /[0-9]/.test(password) && // checks for 0-9
          /\W|_/.test(password) &&  // checks for special char
          password.length >= 8      // checks for length
        )
      }
    }
  },
  computed: {
    currentPasswordErrors() {
      const errors = []
      if (!this.$v.currentPassword.$dirty) {
        return errors;
      }
      else if (!this.$v.currentPassword.required) {
        errors.push('Current Password is required.')
      }
      else if (this.currentPasswordError) {
        errors.push(this.currentPasswordError);
      }
      return errors;
    },
    newPasswordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) {
        return errors;
      }
      else if (!this.$v.newPassword.required) {
        errors.push('Password is required.')
      }
      else if (!this.$v.newPassword.strongPassword) {
        errors.push('Please choose a stronger password.')
      }
      else if (this.newPasswordError) {
        errors.push(this.newPasswordError);
      }
      return errors;
    }
  },
  methods: {
    update() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log("calling update")
        this.passwordError = null;
        this.$store
          .dispatch(
            "password/update", 
            {
              uuid: this.$route.params.id,
              old_password: this.currentPassword, 
              new_password: this.newPassword
            })
          .then(result => {
            this.editing = false;
            this.resetForm();
          })
          .catch(response => {
            console.log(JSON.parse(JSON.stringify(response)))
            if (response.status == 401) {
              this.currentPasswordError = "That password does not match."
            }
            else {
              var json = JSON.parse(JSON.stringify(error.response.data));
              var errors = json["errors"];

              var passwordErrors = errors["password"];
              if (passwordErrors && passwordErrors.length) {
                this.passwordError = passwordErrors[0];
              }
            }
          })
      }
    },
    cancel() {
      this.editing = false;
      this.resetForm();
    },
    resetForm() {
      this.currentPassword = null;
      this.currentPasswordError = null;
      this.newPassword = null;
      this.newPasswordError = null;
      this.confirmPassword = null;
      this.showCurrentPassword = false;
      this.showNewPassword = false;
      this.showConfirmPassword = false;
    }
  }
};
</script>

<style scoped>
</style>