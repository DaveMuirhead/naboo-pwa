<template>
  <div>
    <div v-if="editing">
      <form>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Full Name</label>
              <v-text-field v-model="full_name" dense></v-text-field>
            </div>
            <div>
              <label>Nickname</label>
              <v-text-field v-model="nickname" dense></v-text-field>
            </div>
            <div>
              <label>Street 1</label>
              <v-text-field v-model="street1" dense></v-text-field>
            </div>
            <div>
              <label>Street 2</label>
              <v-text-field v-model="street2" dense></v-text-field>
            </div>
            <div>
              <label>City</label>
              <v-text-field v-model="city" dense></v-text-field>
            </div>
            <div>
              <label>State</label>
              <v-text-field v-model="state" dense></v-text-field>
            </div>
            <div>
              <label>Postal Code</label>
              <v-text-field v-model="postal_code" dense></v-text-field>
            </div>
            <div>
              <label>Country</label>
              <v-text-field v-model="country" dense></v-text-field>
            </div>
            <div>
              <label>Telephone</label>
              <v-text-field v-model="phone1" dense></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Save</v-btn>
            <v-btn @click="editing = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </div>
    <div v-else>
        <v-card flat>
          <v-card-text>
            <div>
              <label>Full Name</label>
              <v-input>{{ full_name }}</v-input>
            </div>
            <div>
              <label>Nickname</label>
              <v-input>{{ nickname }}</v-input>
            </div>
            <div>
              <label>Street 1</label>
              <v-input>{{ street1 ? street1 : '(Not Set)' }}</v-input>
            </div>
            <div>
              <label>Street 2</label>
              <v-input>{{ street2 ? street2 : '(Not Set)' }}</v-input>
            </div>
            <div>
              <label>City</label>
              <v-input>{{ city ? city : '(Not Set)' }}</v-input>
            </div>
            <div>
              <label>State</label>
              <v-input>{{ state ? state : '(Not Set)' }}</v-input>
            </div>
            <div>
              <label>Postal Code</label>
              <v-input>{{ postal_code ? postal_code : '(Not Set)' }}</v-input>
            </div>
            <div>
              <label>Country</label>
              <v-input>{{ country ? country : '(Not Set)' }}</v-input>
            </div>
            <div>
              <label>Telephone</label>
              <v-input>{{ phone1 ? phone1 : '(Not Set)' }}</v-input>
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
    };
  },
  computed: {
    ...mapFields('accounts', [
      'account.full_name',
      'account.nickname',
      'account.street1',
      'account.street2',
      'account.city',
      'account.state',
      'account.postalCode',
      'account.country',
      'account.phone1'
    ]),
  }
};
</script>

<style scoped>
</style>