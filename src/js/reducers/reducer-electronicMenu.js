export default function (state = false, action) {
    switch (action.type) {
        case 'SHOW_ELECTRONIC_MENU':
            console.log('showElectronicMenu');
            return action.payload;
        break;
        default:
        return state;
    }
    return state;
}
