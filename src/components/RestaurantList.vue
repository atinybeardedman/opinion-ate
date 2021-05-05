<template>
  <div>

    <v-alert v-if="loadError" type="error" data-testid="loading-error">
      Restaurants could not be loaded
    </v-alert>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      data-testid="loading-indicator"
    ></v-progress-circular>
    <v-list-item
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      data-testid="restaurant"
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ restaurant.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
  name: 'RestaurantList',
  mounted() {
    this.loadRestaurants();
  },
  methods: mapActions({
    loadRestaurants: 'restaurants/load',
  }),
  computed: mapState({
    loadError: state => state.restaurants.loadError,
    loading: state => state.restaurants.loading,
    restaurants: state => state.restaurants.records,
  }),
};
</script>
