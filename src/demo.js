// $vf
//   .render("div", {
//     attr: {},
//     inAttr: {},
//     created: function(el) {},
//     updated: function(el) {},
//     destroy: function(el) {}
//   })
//   .render("a", {})
//   .if(() => {
//     return true;
//   })
//   .render("p", {})
//   .loopRender("div", {});
let freeNode = window.$vf().render(
  "div",
  {
    attrs: {
      style: "color:yellow;"
    }
  },
  ["this is sub"]
);
console.log(
  window
    .$vf("#app")
    .render(
      "a",
      {
        attrs: {
          href: "http://www.baidu.com",
          style: "width:100px;background:red;"
        }
      },
      [
        "asdfsadf",
        vNode => {
          // console.log(vNode);
          console.log(vNode.render("p", {}, ["vvvvv"]).$el);
          console.log(vNode.$el); //此时未被渲染所以为null
        },
        "adsfdsaf",
        freeNode,
        "<div></div>"
      ]
    )
    .render("div", {})
);
