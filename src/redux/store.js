import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { bookingReducer } from './reducers/booking';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';
import { cartReducer } from './reducers/cart';
import { wishlistReducer } from './reducers/wishlist';
import { sellerReducer } from './reducers/seller';
import { messageReducer } from './reducers/message';


const Store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer,
        seller: sellerReducer,
        products: productReducer,
        events: eventReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        message: messageReducer,
    }
});

export default Store;