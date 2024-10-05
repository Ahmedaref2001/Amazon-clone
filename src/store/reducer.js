export const initialState = {
  cart: localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
  user: null,
  loading:false,
  searchValue:""
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER": {
        return {...state,user: action.payload}
    }

    case "SET_SEARCH_VALUE": {
      return { ...state, searchValue: action.payload };
    }

    case "ADD_LOADER": {
      return { ...state, loading:true};
    }

    case "REMOVE_LOADER": {
      return { ...state, loading:false};
    }

    case "ADD_TO_CART": {
      let cartItem = state.cart;
      let newCartItem = state.cart;
      let product = cartItem.find((ele) => ele.id === action.payload.id);
      if (product) {
        newCartItem = cartItem.map((ele) => {
          if (ele.id === action.payload.id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return ele;
          }
        });
      } else {
        newCartItem = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem("cart",JSON.stringify(newCartItem))
      return {
        ...state,
        cart: newCartItem,
      };
    }

    case "INCREASE_QUANTITY": {
      let cartItem = state.cart;
      let newCartItem = cartItem.map((ele) => {
        if (ele.id === action.payload.id) {
          return { ...ele, quantity: ele.quantity + 1 };
        } else {
          return ele;
        }
      });
      localStorage.setItem("cart",JSON.stringify(newCartItem))
      return {
        ...state,
        cart: newCartItem,
      };
    }

    case "DECREASE_QUANTITY": {
      let cartItem = state.cart;
      let newCartItem = cartItem.map((ele) => {
        if (ele.id === action.payload.id) {
            return { ...ele, quantity: ele.quantity - 1 };
        } else {
          return ele;
        }
      }).filter((ele)=>ele.quantity>0);

      localStorage.setItem("cart",JSON.stringify(newCartItem))
      return {
        ...state,
        cart: newCartItem,
      };
    }

    case "REMOVE_PRODUCT": {
        let cartItem = state.cart;
        let newCartItem = cartItem.filter((ele) => ele.id!==action.payload.id);
        localStorage.setItem("cart",JSON.stringify(newCartItem))
        return {
          ...state,
          cart: newCartItem,
        };
      }

      case "REMOVE_CART": {
        localStorage.removeItem("cart")
        return {
          ...state,
          cart: [],
        };
      }

    default:
      return state;
  }
};
