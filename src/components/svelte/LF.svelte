<script lang="ts">
  import { mod } from "./utils.ts";
  interface Props {
    prompt: string;
    files: Entry[];
  }
  let { prompt, files }: Props = $props();
  let shortcuts: Record<string, Array<number>> = {};
  files.forEach((file, index) => {
    if (!file.shortcut) file.shortcut = file.name[0];
    if (!shortcuts[file.shortcut]) shortcuts[file.shortcut] = [];
    shortcuts[file.shortcut].push(index);
  });

  let activeIndexes: Array<number | undefined> = $state([
    0,
    undefined,
    undefined,
  ]);
  let isCtrlDown = $state(false);

  function openLink(href: string | undefined) {
    if (isCtrlDown) window.open(href, "_blank");
    else window.open(href, "_self");
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.ctrlKey) isCtrlDown = true;

    if (document.activeElement?.tagName == "INPUT") return;

    let activeIndexL = activeIndexes[0] ?? 0;
    let activeFileL = files[activeIndexL];
    if (e.key == "ArrowDown") {
      if (activeIndexes[1] != undefined) {
        activeIndexes[1] = mod(
          activeIndexes[1] + 1,
          activeFileL.content?.length ?? 0
        );
      } else activeIndexes[0] = mod(activeIndexL + 1, files.length);
    } else if (e.key == "ArrowUp") {
      if (activeIndexes[1] != undefined) {
        activeIndexes[1] = mod(
          activeIndexes[1] - 1,
          activeFileL.content?.length ?? 0
        );
      } else activeIndexes[0] = mod(activeIndexL - 1, files.length);
    } else if (e.key == "ArrowRight") {
      if (activeFileL.dialog) {
        const dialog = document.querySelector("dialog");
        if (dialog) dialog.showModal();
      } else if (activeFileL.href) {
        openLink(activeFileL.href);
      } else if (activeFileL.content?.length ?? 0 > 0) {
        console.log("hello");
        activeIndexes[1] = 0;
      }
    } else if (e.key == "ArrowLeft") {
      if (activeIndexes[1] != undefined) {
        activeIndexes[1] = undefined;
      }
    } else if (e.key in shortcuts) {
      let index = shortcuts[e.key].indexOf(activeIndexL);
      activeIndexes[0] =
        shortcuts[e.key][mod(index + 1, shortcuts[e.key].length)];
    }
  }
  function onkeyup(e: KeyboardEvent) {
    switch (e.key) {
      case "Control":
        isCtrlDown = false;
        e.preventDefault();
        break;
    }
  }

  let query = $state("");
  function onSubmit() {
    openLink(`${files[activeIndexes[0] ?? 0].search}${query}`);
  }
</script>

<svelte:window {onkeydown} {onkeyup} />

<div class="w-full">
  <span class="text-grey">{prompt}</span>
  <span>~/{files[activeIndexes[0] ?? 0].name}</span>
</div>
<div
  class="h-full w-full grid grid-cols-[minmax(140px,max-content)_minmax(140px,max-content)_1fr] border"
>
  <div class="p-2 lf-pane-left">
    <ul>
      {#each files as { name, icon, href, content, shortcut }, index}
        <li
          class={"px-2 leading-snug " +
            (index === activeIndexes[0] ? "bg-white text-black" : "")}
        >
          <span class="text-sm mr-0.5"
            >{icon || (href && " ") || (content && " ") || " "}</span
          >
          {name}
        </li>
      {/each}
    </ul>
  </div>
  <div class="p-2 border-x">
    <ul>
      {#if files[activeIndexes[0] ?? 0].content?.length == 0}
        <li class={"px-2 leading-snug text-red"}>EMPTY</li>
      {:else if files[activeIndexes[0] ?? 0].content?.length}
        {#each files[activeIndexes[0] ?? 0].content ?? [] as { name, icon, href, content, shortcut }, index}
          <li
            class={"px-2 leading-snug " +
              (index === activeIndexes[1] ? "bg-white text-black" : "")}
          >
            <span class="text-sm mr-0.5"
              >{icon || (href && " ") || (content && " ") || " "}</span
            >
            {name}
          </li>
        {/each}
      {:else if files[activeIndexes[0] ?? 0].dialog}
        <li class={"px-2 leading-snug"}>
          Press 󰜵 key to {files[activeIndexes[0] ?? 0].description}
        </li>
      {:else if files[activeIndexes[0] ?? 0].href}
        <li class={"px-2 leading-snug"}>
          Press 󰜵 key to follow link <a
            class="underline"
            href={files[activeIndexes[0] ?? 0].href}
            >{files[activeIndexes[0] ?? 0].href}</a
          >
        </li>
      {/if}
    </ul>
  </div>
  <div class="p-2"></div>
</div>
<dialog class="bg-black text-white border">
  <form class="py-1 px-2" action="javascript:void(0);" autocomplete="off">
    <p>
      <label for="input"> {files[activeIndexes[0] ?? 0].name}</label>
      <input
        id="input"
        class="bg-black text-white ml-1 w-96"
        bind:value={query}
      />
      <input
        type="submit"
        value="󰘌"
        class="cursor-pointer w-6"
        onclick={onSubmit}
      />
    </p>
  </form>
</dialog>
