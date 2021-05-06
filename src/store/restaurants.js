const restaurants = (api, stateOverrides) => ({
  namespaced: true,
  state: {
    records: [],
    loading: false,
    loadError: false,
    ...stateOverrides,
  },
  actions: {
    load({commit}) {
      commit('startLoading');
      api
        .loadRestaurants()
        .then(records => {
          commit('storeRecords', records);
        })
        .catch(() => {
          commit('recordLoadingError');
        });
    },
  },
  mutations: {
    storeRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
    startLoading(state) {
      state.loading = true;
      state.loadError = false;
    },
    recordLoadingError(state) {
      state.loadError = true;
      state.loading = false;
    },
  },
});

export default restaurants;