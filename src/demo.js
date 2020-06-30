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

console.log(
  window
    .$vf("#app")
    .render(
      "a",
      {
        attrs: {
          innerHTML: "asdfdsafsadfsadf",
          href: "www.baidu.com",
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
        "<div></div>"
      ]
    )
    .render("div", {})
);
