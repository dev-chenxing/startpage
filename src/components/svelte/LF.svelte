<script lang="ts">
  import { mod } from "./utils.ts";
  interface Props {
    prompt: string;
    files: Entry[];
  }
  let { prompt, files }: Props = $props();

  let activeIndex = $state(0);

  function onkeydown(e: KeyboardEvent) {
    if (e.key == "ArrowDown") {
      activeIndex = mod(activeIndex + 1, files.length);
    } else if (e.key == "ArrowUp") {
      activeIndex = mod(activeIndex - 1, files.length);
    } else if (e.key == "ArrowRight") {
      if (files[activeIndex].href) window.open(files[activeIndex].href, "_self");
    }
  }
</script>

<svelte:window {onkeydown} />

<div class="w-full">
  <span class="text-grey">{prompt}</span>
  <span>~/{files[activeIndex].name}</span>
</div>
<div class="h-full w-full grid grid-cols-[minmax(140px,max-content)_minmax(140px,max-content)_1fr] border">
  <div class="p-2 lf-pane-left">
    <ul>
      {#each files as { name, icon }, index}
        <li class={"px-2 leading-snug " + (index === activeIndex ? "bg-white text-black" : "")}>
          <span class="text-sm mr-0.5">{icon || " "}</span>
          {name}
        </li>
      {/each}
    </ul>
  </div>
  <div class="p-2 border-x">
    <ul>
      {#if files[activeIndex].content?.length === 0}
        <li class={"px-2 leading-snug text-red"}>EMPTY</li>
      {:else if files[activeIndex].href}
        <li class={"px-2 leading-snug"}>
          Press 󰜵 key to follow link <a href={files[activeIndex].href}>{files[activeIndex].href}</a>
        </li>
      {/if}
    </ul>
  </div>
  <div class="p-2"></div>
</div>
