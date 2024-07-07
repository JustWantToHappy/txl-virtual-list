import React from 'react'
import VirtualItem from './VirtualItem'

interface VirtualListProps {
  preHeight?: number//预测列表项高度
  extraRenderCount?: number//额外渲染的列表项个数
  components: React.ReactElement[]|string[];
}

const getStartIndex = (tops: number[], offset:number,scrollTop: number, extraRenderCount: number) => {
  let left = 0, right = tops.length
  while (left < right) {
    const mid = left + (~~((right - left) / 2))
    if (tops[mid]+offset >= scrollTop) right = mid
    else left = mid + 1
  }
  return Math.max(0, left - extraRenderCount - 1)
}

const getEndIndex = (tops: number[], offset:number,scrollTop: number, extraRenderCount: number, clientHeight: number) => {
  let left = 0, right = tops.length
  while (left < right) {
    const mid = left + (~~((right - left) / 2))
    if (tops[mid]+offset < scrollTop + clientHeight) left = mid + 1
    else right = mid
  }
  return Math.min(tops.length - 1, left + extraRenderCount)
}

// eslint-disable-next-line react/display-name
export const VirtualList =React.forwardRef<HTMLDivElement, VirtualListProps>((props, ref) => {
  const { preHeight = 50, extraRenderCount = 4, components } = props
  const heightsRef = React.useRef<number[]>([])
  const [scrollTop, setScrollTop] = React.useState(0)
  const [tops, setTops] = React.useState<number[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  const getVirtualItemHeight = React.useCallback((index: number) => {
    return heightsRef.current[index] ?? preHeight
  }, [preHeight])

  const getTops = React.useCallback(() => {
    const tops: number[] = [0]
    for (let i = 1; i <= components.length; i++) {
      tops[i] = tops[i - 1] + getVirtualItemHeight(i - 1)
    }
    return tops
  }, [components.length, getVirtualItemHeight])

  const setVirtualItemHeight = React.useCallback((index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height
      setTops(getTops())
    }
  }, [getTops])

  React.useEffect(() => {
    setTops(getTops())
  }, [components.length, getTops])

  React.useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(Math.max(0, window.scrollY))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return function () {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  const getCurrentRenderItems = () => {
    const height = tops[tops.length - 1] ?? 0
    const clientHeight =window.innerHeight;
		const offset=containerRef.current?.offsetTop??0;
    const startIndex = getStartIndex(tops,offset, scrollTop, extraRenderCount)
    const endIndex = getEndIndex(tops, offset,scrollTop, extraRenderCount, clientHeight)
    return (<div
      style={{
        width: '100%',
        height: height + 'px'
      }}>
      {components.slice(startIndex, endIndex).map((component,index:number) => {
			const currentIndex=startIndex+index;
        return <VirtualItem
          key={component.key}
          setHeight={setVirtualItemHeight}
          style={{ position: 'absolute', width: '100%', top: `${tops[currentIndex]}px`}}
          index={currentIndex}>
          {component}
        </VirtualItem>
      })}
    </div>)
  }

  return (<div
    ref={containerRef}
		style={{width:"100%",position:"relative"}}>
    {getCurrentRenderItems()}
  </div>)
})