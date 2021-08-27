  const actions = {
    /**
     * 添加购物车
     * @param {*} content 
     * @param {*} payload 
     */
    addCart(content,payload) {
      return new Promise((resolve,reject) => {
          // 1、查找当前购物车中是否以及存在该商品
        let oldProduct = content.state.cartList.find(item => item.iid === payload.iid);

        // 2、判断是增加新的商品还是增加产品个数
        if(oldProduct){
          content.commit('addConuter', oldProduct);
          resolve('当前商品数量加一');
        }else {
          payload.count = 1;
          // 首次添加产品时默认将其勾选
          payload.checked = true;
          content.commit('addNewProduct',payload);
          resolve('添加新商品成功');
        }
      });
    }
  }
  export default actions;