export default function (state = null, action) {
    switch (action.type) {
        case 'SET_PACKAGE_PRODUCT':
            return action.payload ;
            break;
        default:
        return state;
    }
    return state;
}
