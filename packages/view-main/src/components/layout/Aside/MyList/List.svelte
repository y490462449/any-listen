<script lang="ts">
  import ListItem from './ListItem.svelte'
  import Menu from './Menu.svelte'
  import { useListItemHeight } from '@/modules/app/reactive.svelte'
  import type { Position } from '@/components/base/Menu.svelte'
  import { getAllList } from '@/modules/musicLibrary/store/actions'
  import { scrollPointerEvents } from '@/shared/compositions/scrollPointerEvents'
  import { verticalScrollbar } from '@/shared/compositions/verticalScrollbar'
  import { defaultLists, useUserList } from '@/modules/musicLibrary/reactive.svelte'
  import type { ComponentExports } from 'svelte'
  // import { sortable } from '@/shared/compositions/sortable'
  // console.log(params)
  const listItemHeight = useListItemHeight(3.2)
  // const picStyle = $derived(`height:${listItemHeight.val * 0.64}px; width:${listItemHeight.val * 0.64}px;`)
  const picStyle = $derived(`height:${listItemHeight.val * 0.5}px;`)

  let menu: ComponentExports<typeof Menu>

  const userLists = useUserList(null)
  const lists = $derived([...$defaultLists, ...userLists.val])
  let activeIndex = $state(-1)

  const showMenu = (item: (typeof lists)[number] | null, position: Position) => {
    menu.show(item, position)
  }

  // const handleCreate: ComponentProps<Menu>['oncreate'] = info => {
  //   let position = lists.length
  //   if (info) {
  //     let index = lists.findIndex(l => l.id == info.id)
  //     if (index != -1) position = index + 1
  //   }
  //   console.log(position)
  // }
  // const handleRename: ComponentProps<Menu>['onrename'] = info => {}

  // const onchange = (...args: any[]) => {
  //   console.log(args, 2)
  // }
  let t: 'a' | 'b' = Math.random() > 0.5 ? 'a' : 'b'
  switch (t) {
    case 'a':
      break

    default:
      break
  }
</script>

<div class="list">
  {#await getAllList()}
    <div class="list-container tip">Loading...</div>
  {:then _}
    <div
      class="list-container"
      role="list"
      use:scrollPointerEvents
      use:verticalScrollbar={{ offset: '0.15rem', scrollbarWidth: '0.4rem' }}
      oncontextmenu={(event) => {
        event.preventDefault()
        event.stopPropagation()
        activeIndex = -1
        showMenu(null, { x: event.pageX, y: event.pageY })
      }}
    >
      <ul class="list">
        {#each lists as item, index (item.id)}
          <li class="list-item draggable-item" data-id={item.id}>
            <ListItem
              listInfo={item}
              active={activeIndex == index}
              {index}
              {picStyle}
              oncontextmenu={(event) => {
                event.preventDefault()
                event.stopPropagation()
                activeIndex = index
                showMenu(item, { x: event.pageX, y: event.pageY })
              }}
            />
          </li>
        {/each}
      </ul>
    </div>
  {:catch error}
    <div class="list-container tip">Load failed: {error.message}</div>
  {/await}
</div>
<Menu
  bind:this={menu}
  onhide={() => {
    activeIndex = -1
  }}
/>

<style lang="less">
  .list {
    position: relative;
    height: 100%;
  }
  .list-container {
    // outline: none;
    height: 100%;
    position: relative;
    display: block;
    contain: strict;
  }
  .list-item {
    padding: 0 12px;
  }
  .tip {
    align-items: center;
    justify-content: center;
  }
</style>
