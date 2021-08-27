    const getters = {
      /**
       * 获取产品列表
       * @param {*} state 
       */
      getCartList(state) {
          return state.cartList;
      },

      /**
       * 获取添加的产品数量
       * @param {*} state 
       */
      getCartListLength(state) {
          return state.cartList.length;
      }
    }

    export default getters;