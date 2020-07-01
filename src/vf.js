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
  // 生命周期钩子调用
  //模板引擎
  var templateDriver = function(template) {
    function templateStr(data, str) {
      // 匹配字符串中{{}}的内容，whole是整个匹配，sub是括号内子表达式
      return str.replace(/\{\{(.+?)\}\}/g, (whole, sub) => {
        console.log("whole", whole);
        console.log("sub", sub);
        let subResult = eval("data." + sub);
        // if(sub.includes(".")){

        // }
        return subResult;
        // //sub是data而且data为基础类型，直接用值替代data
        // if (sub === "data" && !(data instanceof Object)) return data;
        // //subKey保存字符串分割以后的key
        // let subKey = sub.split(".");
        // //subKey是空或者data不是对象，返回匹配的whole，不替换
        // if (!subKey || !(data instanceof Object)) return whole;
        // //s1Key不空而且data是对象
        // let i = 1; //i指向当前key的索引
        // let value = data; //value指向当前的obj.key
        // while (value[subKey[i]]) {
        //   //obj.key存在时，
        //   value = value[subKey[i]]; //替换value
        //   i++; //指针后移
        // }
        // return value; //obj.key不存在，查询完毕，用value替换匹配的m
      });
    }
    console.log(
      templateStr({ a: 1, vva: 4 }, "asdf{{vva}}ads{{a==2?vva:'yy'}}")
    );
  };
  templateDriver();
  //逻辑运算
  var logicCompute = function() {};
  logicCompute();
  //事件绑定
  var eventDriver = function() {};
  eventDriver();
  //双向绑定
  var mvvmDriver = function() {};
  mvvmDriver();
  //虚拟dom
  var vNode = function(parentNode) {
    return {
      $pel: parentNode, //父节点dom元素
      $el: null, //当前节点dom元素，默认null，render选然后才可获取
      render: (el, vfAttrObj, childrenRender) => {
        // 创建节点
        let currDom = document.createElement(el);
        this.$el = currDom;
        // 获取属性key
        var vfattrs = Object.keys(vfAttrObj);
        vfattrs.forEach((attrName, index) => {
          var vfattr = vfAttrObj[attrName]; //属性值
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
        // console.log(parentNode);
        //子节点渲染调用
        if (!!childrenRender) {
          childrenRender.forEach((childContent, index) => {
            if (typeof childContent === "function") {
              //子节点为回调函数时，回调执行渲染
              childContent(new vNode(currDom));
            } else if (typeof childContent === "string") {
              //子节点为字符串时，直接渲染
              // console.log(currDom);
              currDom.appendChild(document.createTextNode(childContent));
            } else if (
              typeof childContent === "object"
              // && childContent.type === "vfDomNode"
            ) {
              //子节点为vfDomNode对象时，渲染子组件内容
              currDom.appendChild(childContent.$el);
            } else {
              //子节点为其他类型时，转换字符串渲染
              currDom.appendChild(
                document.createTextNode(String(childContent))
              );
            }
          });
        }
        //返回当前节点虚拟dom
        let _vNode = null;
        return (
          (parentNode.appendChild(currDom) &&
          (_vNode = new vNode(parentNode)) &&
          (_vNode.$el = currDom) && //设置当前节点dom
            false) ||
          _vNode
        );
      }
    };
  };
  //根节点选择器
  return function(selector) {
    this.rootDom = selector
      ? document.querySelector(selector)
      : document.createElement("div");
    let _vNode = new vNode(this.rootDom);
    // _vNode.type = "vfDomNode";
    return _vNode;
  };
});
