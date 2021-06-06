<template>
  <form @submit.prevent="handleSave">
    <v-text-field
      placeholder="Add Restaurant"
      filled
      type="text"
      v-model="name"
      data-testid="new-restaurant-name-field"
    ></v-text-field>
    <v-btn
      color="primary"
      class="black--text"
      data-testid="new-restaurant-submit-button"
      type="submit"
      >Add</v-btn
    >
  </form>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'NewRestaurantForm',
  data() {
    return {
      name: '',
    };
  },
  methods: {
    ...mapActions({
      createRestaurant: 'restaurants/create',
    }),
    handleSave() {
      this.createRestaurant(this.name).then(() => {
        this.name = '';
      });
    },
  },
};
</script>
