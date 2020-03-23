import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: null,
        userIcon: null,
        loginState: false,

        popularRecommendList: [],
        preferenceRecommendList: [],
        coldRecommendList: [],
        loadingCalculation: 3,

        searchQuery: {
            content: '',
            limit: '',
        },
        searchEventWatcher: false

    },
    mutations: {
        setUser(state, payload) {
            state.username = payload.username;
            state.userIcon = payload.userIcon;
            state.loginState = true;
        },
        delUser(state) {
            state.username = null;
            state.userIcon = null;
            state.loginState = false;
        },

        setPopularRecommendList(state, payload) {
            state.popularRecommendList = payload.popularRecommendList;
            state.loadingCalculation -= 1;
        },
        setColdRecommendList(state, payload) {
            state.coldRecommendList.push(payload.totalColdRecommendList.slice(0, 4));
            state.coldRecommendList.push(payload.totalColdRecommendList.slice(4, 8));
            state.loadingCalculation -= 1;
        },
        setPreferenceRecommendList(state, payload) {
            state.preferenceRecommendList.push(payload.totalPreferenceRecommendList.slice(8, 12));
            state.preferenceRecommendList.push(payload.totalPreferenceRecommendList.slice(12, 16));
            state.loadingCalculation -= 1;
        },

        setSearchQuery(state, payload) {
            state.searchQuery.content = payload.content;
            state.searchQuery.limit = payload.limit;
            state.searchEventWatcher = !state.searchEventWatcher;
        }
    },
    actions: {},
    modules: {}
});
