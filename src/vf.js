(function(root, factory) {
  // if (typeof define === "function" && define.amd) {
  //   define([], factory);
  // } else if (typeof exports === "object") {
  //   module.exports = factory();
  // } else {
  //   root.$vf = factory();
  // }
  root.$vf = factory();
})(window, function() {
  var vNode = function(parentNode) {
    return {
      render: (el, vfnode, childRender) => {
        // 创建节点
        var currDom = document.createElement(el);
        // 获取属性key
        var vfattrs = Object.keys(vfnode);
        vfattrs.forEach((attrName, index) => {
          var vfattr = vfnode[attrName]; //属性值
          //html原生属性赋值
          if (attrName === "attrs") {
            for (let n in vfattr) {
              currDom.setAttribute(n, vfattr[n]);
            }
          }
          //内部数据属性赋值
          else if (attrName === "inAttrs") {
            for (let n in vfattr) {
              currDom[n] = vfattr[n];
            }
          }
          //生命周期函数，以及其它函数绑定
          else {
            currDom[attrName] = vfattr;
          }
        });
        //渲染当前节点，链式渲染均为并列节点元素
        parentNode.appendChild(currDom);
        console.log(parentNode);
        //子节点渲染调用
        if (!!childRender) {
          childRender(new vNode(currDom));
        }
        //返回当前节点虚拟dom
        return (
          (parentNode.appendChild(currDom) && false) || new vNode(parentNode)
        );
      }
    };
  };
  return function(selector) {
    this.rootDom = document.querySelector(selector);
    return new vNode(this.rootDom);
  };
});
