    const mutations = {
      /**
       * 增加商品个数
       * @param {*} state 
       * @param {*} payload 
       */
      addConuter(state,payload) {
        payload.count += 1;
      },
      /**
       * 添加新的商品
       * @param {*} state 
       * @param {*} payload 
       */
      addNewProduct(state,payload) {
        state.cartList.push(payload);
      },
      /**
       * 修改购物车商品列表被选中状态
       * @param {*} state 
       * @param {*} payload 
       */
      changeChecked(state,payload) {
        let oldProduct = state.cartList.find(item => item.iid === payload.iid);
        oldProduct.checked = !payload.checked;
      }
    }

    export default mutations;