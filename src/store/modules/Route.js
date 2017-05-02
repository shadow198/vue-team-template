import lazyLoading from 'serves/lazyLoading'
const state = {
    items:[
        {
            name: 'home',
            path: '/home/:id',
            component: lazyLoading('Home')
        },
    ]
};
export default {
    state,
}