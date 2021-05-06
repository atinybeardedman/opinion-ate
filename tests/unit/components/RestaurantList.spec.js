import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

const findByTestId = (wrapper, testId, index = -1) => {
  if (index > -1) {
    return wrapper.findAll(`[data-testid="${testId}"]`).at(index);
  } else {
    return wrapper.find(`[data-testid="${testId}"]`);
  }
};

describe('RestaurantList', () => {
  Vue.use(Vuetify);
  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  const mountWithStore = (state = {records, loading: false}) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });
    wrapper = mount(RestaurantList, {localVue, store, vuetify: new Vuetify()});
  };

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });
  describe('when loading succeeds', () => {
    beforeEach(() => {
      mountWithStore();
    });

    it('displays the restaurants', () => {
      expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
      expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
    });

    it('does not display the loading indicator when not loading', () => {
      expect(findByTestId(wrapper, 'loading-indicator').exists()).toBe(false);
    });

    it('does not display an error message', () => {
      expect(findByTestId(wrapper, 'loading-error').exists()).toEqual(false);
    });
  });

  describe('when loading fails', () => {
    it('displays an error message', () => {
      mountWithStore({loadError: true});
      expect(findByTestId(wrapper, 'loading-error').exists()).toBe(true);
    });
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({loading: true});
    expect(findByTestId(wrapper, 'loading-indicator').exists()).toBe(true);
  });
});
