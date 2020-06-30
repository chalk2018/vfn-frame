# vfn-frame

Created with CodeSandbox

#### 利用链式调用构建前端的框架

目前还在设计阶段

```
//设计使用方式
$vf(#root)
.render('div',{
  attrs:{
    'width':'200px',
    'height':'100px'
  },
  inAttrs:{
    requestData:{}
  },
  onClick(){
    this.requestData = {'a':2}
    this.open();
  },
  open(){
    console.log('open')
  }
})
.render('span',{},(vfNode)=>{
  vfNode.render('a',{},(vfNode)=>{
    vfNode.render('img',{});
  }).render('div',{});
})
```
