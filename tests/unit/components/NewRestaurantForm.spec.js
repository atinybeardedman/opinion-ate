import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import NewRestaurantForm from '@/components/NewRestaurantForm';
import {findByTestId} from '../testHelpers';

Vue.use(Vuetify);

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  beforeEach(() => {
    restaurantsModule = {
      namespaced: true,
      actions: {
        create: jest.fn().mockName('creat'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    const div = document.createElement('div');
    document.body.appendChild(div);
    wrapper = mount(NewRestaurantForm, {
      localVue,
      store,
      vuetify: new Vuetify(),
      attachTo: div,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('initially', () => {
    it('does not display a validation error', () => {
      expect(findByTestId(wrapper, 'new-restaurant-name-error').exists()).toBe(
        false,
      );
    });
  });

  describe('when filled in', () => {
    beforeEach(() => {
      findByTestId(wrapper, 'new-restaurant-name-field').setValue(
        restaurantName,
      );
      findByTestId(wrapper, 'new-restaurant-submit-button').trigger('click');
    });

    it('dispatches the create action', () => {
      expect(restaurantsModule.actions.create).toHaveBeenCalledWith(
        expect.anything(),
        restaurantName,
      );
    });

    it('does not display a validation error', () => {
      expect(findByTestId(wrapper, 'new-restaurant-name-error').exists()).toBe(
        false,
      );
    });

    it('clears the name', () => {
      const fieldEl = findByTestId(wrapper, 'new-restaurant-name-field')
        .element;
      expect(fieldEl.value).toEqual('');
    });
  });

  describe('when empty', () => {
    beforeEach(() => {
      findByTestId(wrapper, 'new-restaurant-name-field').setValue('');
      findByTestId(wrapper, 'new-restaurant-submit-button').trigger('click');
    });

    it('displays a validation error', () => {
      expect(
        findByTestId(wrapper, 'new-restaurant-name-error').text(),
      ).toContain('Name is required');
    });
  });

  describe('when correcting a validation error', () => {
    beforeEach(() => {
      findByTestId(wrapper, 'new-restaurant-name-field').setValue('');
      findByTestId(wrapper, 'new-restaurant-submit-button').trigger('click');

      findByTestId(wrapper, 'new-restaurant-name-field').setValue(
        restaurantName,
      );
      findByTestId(wrapper, 'new-restaurant-submit-button').trigger('click');
    });

    it('clears the validation error', () => {
      expect(findByTestId(wrapper, 'new-restaurant-name-error').exists()).toBe(false);
    });
  });
});
