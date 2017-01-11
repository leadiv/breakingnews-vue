/* global window global */
import BreakingNewsBanner from './components/breaking-news-banner';

// Install the components
export function install(Vue) {
    Vue.component('breaking-news-banner', BreakingNewsBanner);
}

// Expose the components
export {
    BreakingNewsBanner,
};

// Plugin
const plugin = {
    install,
};

// Auto-install
const GlobalVue = (typeof window !== 'undefined' && window.Vue) ||
                  (typeof global !== 'undefined' && global.Vue) ||
                  null;

if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default plugin;
