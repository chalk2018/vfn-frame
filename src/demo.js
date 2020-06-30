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
          href: "www.baidu.com"
        }
      },
      vNode => {
        console.log(vNode);
        vNode.render("p", {});
      }
    )
    .render("div", {})
);
