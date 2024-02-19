## Introduce
一个`react`虚拟列表组件，实现无限滚动
## How to use?
必须配置:给components的每一项元素设置data-index属性
- 如果你的虚拟列表的头部位置(第一项位置)距离document.body的顶部有一段距离，给包裹虚拟列表的外层元素加上`position:relative`属性
```typescript
<div style={{position:'relative'}}>
<VirtualList components={...}/>
</div>
```