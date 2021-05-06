<template>
  <v-card>
    <v-card-title>Restaurants</v-card-title>
    <v-card-text>
      <NewRestaurantForm />
      <RestaurantList />
    </v-card-text>
  </v-card>
</template>

<script>
import RestaurantList from '@/components/RestaurantList';
import NewRestaurantForm from '@/components/NewRestaurantForm';
export default {
  name: 'RestaurantScreen',
  components: {
    RestaurantList,
    NewRestaurantForm,
  },
};
</script>
