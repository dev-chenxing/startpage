<script lang="ts">
  import { tick } from "svelte";
  import BrowserItem from "./BrowserItem.svelte";
  import { mod } from "../lib/math.ts";

  type Entry = {
    name: string;
    icon?: string;
    href?: string;
    description?: string;
    search?: string;
    shortcut?: string;
    dialog?: boolean;
    content?: Array<Entry>;
  };

  interface Props {
    prompt: string;
    files: Entry[];
  }
  let { prompt, files }: Props = $props();

  function getEntriesAtColumn(column: number): Entry[] {
    if (column == 0) return files;
    if (column == 1) return files[activeIndexes[0]]?.content ?? [];
    if (column == 2)
      return (
        files[activeIndexes[0]]?.content?.[activeIndexes[1]]?.content ?? []
      );
    return [];
  }

  function getEntryAt(column: number, index: number) {
    if (index == -1) return undefined;
    return getEntriesAtColumn(column)[index];
  }

  let shortcuts = $derived.by(() => {
    const shortcuts: Record<string, Array<number>> = {};
    files.forEach((file, index) => {
      const shortcut = (file.shortcut ?? file.name[0]).toLowerCase();
      if (!shortcuts[shortcut]) shortcuts[shortcut] = [];
      shortcuts[shortcut].push(index);
    });
    return shortcuts;
  });

  let activeColumn = $state(0);
  let activeIndexes: Array<number> = $state([0, -1, -1]);
  let columns: Array<HTMLDivElement | null> = [null, null, null];
  let activeRoot = $derived(files[activeIndexes[0]]);
  let activeChildren = $derived(activeRoot?.content ?? []);
  let activeChild = $derived(getEntryAt(1, activeIndexes[1]));
  let focusedEntry = $derived(
    getEntryAt(activeColumn, activeIndexes[activeColumn]),
  );
  let submitEntry = $derived(activeChild ?? activeRoot);

  let isCtrlDown = $state(false);

  function getVisibleColumns() {
    return activeColumn == 0 ? [0, 1] : [0, 1, 2];
  }

  function getListState(column: number) {
    if (column == 0) {
      return {
        entries: files,
        activeIndex: activeIndexes[0],
      };
    }

    if (column == 1 && activeChildren.length > 0) {
      return {
        entries: activeChildren,
        activeIndex: activeIndexes[1],
      };
    }

    return {
      entries: [] as Entry[],
      activeIndex: -1,
    };
  }

  // Calculate the scrollTop value to scroll the container so that the item is visible and anchored at a specific offset
  function getScrollTopToScroll(
    container: HTMLDivElement,
    item: HTMLLIElement,
    totalEntries: number,
  ) {
    const anchorOffset =
      totalEntries > 12
        ? container.clientHeight - item.offsetHeight * 6
        : container.clientHeight / 2 - item.offsetHeight / 2;
    const maxScrollTop = Math.max(
      container.scrollHeight - container.clientHeight,
      0,
    );
    return Math.min(Math.max(item.offsetTop - anchorOffset, 0), maxScrollTop);
  }

  // Scroll the active item in each visible column into view, anchoring it at a specific offset from the top of the container
  async function scrollActiveItemIntoView() {
    await tick();

    for (const column of getVisibleColumns()) {
      const container = columns[column];
      const { entries, activeIndex } = getListState(column);

      if (!container || activeIndex < 0 || entries.length == 0) continue;

      const items = Array.from(container.querySelectorAll("ul > li"));
      const item = items[activeIndex];
      if (!(item instanceof HTMLLIElement)) continue;

      const targetScrollTop = getScrollTopToScroll(
        container,
        item,
        items.length,
      );
      if (Math.abs(container.scrollTop - targetScrollTop) < 1) continue;

      container.scrollTop = targetScrollTop;
    }
  }

  $effect(() => {
    activeColumn;
    activeIndexes[0];
    activeIndexes[1];
    files.length;
    activeChildren.length;

    void scrollActiveItemIntoView();
  });

  function openLink(href: string | undefined) {
    if (isCtrlDown) window.open(href, "_blank");
    else window.open(href, "_self");
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.ctrlKey) isCtrlDown = true;

    if (document.activeElement?.tagName == "INPUT") return;

    let activeIndexL = activeIndexes[0];
    let activeFileL = activeRoot;
    if (e.key == "ArrowDown") {
      if (activeIndexes[1] != -1) {
        activeIndexes[1] = mod(
          activeIndexes[1] + 1,
          activeFileL.content?.length ?? 0,
        );
      } else activeIndexes[0] = mod(activeIndexL + 1, files.length);
    } else if (e.key == "ArrowUp") {
      if (activeIndexes[1] != -1) {
        activeIndexes[1] = mod(
          activeIndexes[1] - 1,
          activeFileL.content?.length ?? 0,
        );
      } else activeIndexes[0] = mod(activeIndexL - 1, files.length);
    } else if (e.key == "ArrowRight") {
      let activeFile = focusedEntry;
      if (!activeFile) return;

      if (activeFile.dialog) {
        const dialog = document.querySelector("dialog");
        if (dialog) dialog.showModal();
      } else if (activeFile.content?.length ?? 0 > 0) {
        activeColumn += 1;
        activeIndexes[activeColumn] = 0;
      } else if (activeFile.href) {
        openLink(activeFile.href);
      }
    } else if (e.key == "ArrowLeft") {
      if (activeIndexes[1] != -1) {
        activeIndexes[activeColumn] = -1;
        activeColumn -= 1;
      }
    } else if (e.key.toLowerCase() in shortcuts) {
      let key = e.key.toLowerCase();
      let index = shortcuts[key].indexOf(activeIndexL);
      activeIndexes[0] = shortcuts[key][mod(index + 1, shortcuts[key].length)];
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
    openLink(`${submitEntry?.search}${encodeURIComponent(query)}`);
  }

  let dialog: HTMLDialogElement | null = null;
  function onDialogClick(e: MouseEvent) {
    // if clicking on the backdrop (dialog itself), close it
    if (e.target === dialog) dialog?.close();
  }
  function handleSubmit(e: Event) {
    e.preventDefault();
    onSubmit();
    dialog?.close();
  }
</script>

<svelte:window {onkeydown} {onkeyup} />

{#snippet entryDetails(entry: Entry | undefined)}
  {#if entry?.description}
    <li class={"px-2 leading-snug wrap-anywhere"}>
      {entry.description}
    </li>
  {:else if entry?.href}
    <li class={"px-2 leading-snug wrap-anywhere"}>
      Press 󰜵 key to follow link <a class="underline" href={entry.href}>
        {entry.href}
      </a>
    </li>
  {/if}
{/snippet}

<div class="h-full flex flex-col w-full">
  <div class="w-full flex flex-col md:inline">
    <span class="text-black/70 dark:text-white/70">{prompt}</span>
    <span class="text-cyan-700 dark:text-cyan-300/90">
      ~/{activeRoot?.name}
    </span>
  </div>
  <div class="w-full grid md:grid-cols-5 border flex-1 min-h-0">
    <!-- Left Pane -->
    <div
      bind:this={columns[0]}
      class={`p-2 overflow-y-auto ${activeColumn == 0 ? "col-span-3" : activeColumn == 1 ? "hidden md:flex md:col-span-1" : ""}`}
    >
      <ul>
        {#each files as entry, index}
          <BrowserItem {entry} isActive={index === activeIndexes[0]} href />
        {/each}
      </ul>
    </div>
    <!-- Middle Pane -->
    <div
      bind:this={columns[1]}
      class={`p-2 overflow-y-auto ${activeColumn == 0 ? "hidden md:flex md:col-span-2 border-l" : activeColumn == 1 ? "md:col-span-2 md:border-x" : "hidden"}`}
    >
      <ul>
        {#if activeChildren.length == 0 && activeRoot?.content}
          <li class={"px-2 leading-snug text-red-700 dark:text-red-400"}>
            EMPTY
          </li>
        {:else if activeChildren.length}
          {#each activeChildren as entry, index}
            <BrowserItem {entry} isActive={index === activeIndexes[1]} />
          {/each}
        {:else}
          {@render entryDetails(activeRoot)}
        {/if}
      </ul>
    </div>
    <!-- Right Pane -->
    <div
      bind:this={columns[2]}
      class={`p-2 overflow-y-auto ${activeColumn == 0 ? "hidden" : activeColumn == 1 ? "hidden md:flex md:col-span-2" : ""}`}
    >
      <ul>
        {@render entryDetails(activeChild)}
      </ul>
    </div>
  </div>
</div>

<dialog
  bind:this={dialog}
  class="fixed inset-0 m-auto border border-black/70 bg-white text-black backdrop:bg-black/5 dark:border-white/70 dark:bg-black dark:text-white dark:backdrop:bg-black/60"
  onclick={onDialogClick}
>
  <form class="py-1 px-2" action="javascript:void(0);" autocomplete="off">
    <p class="inline-flex">
      <label for="input"> {submitEntry?.name}</label>
      <input id="input" class="ml-1 lg:w-96" bind:value={query} />
      <input
        type="submit"
        value="󰘌"
        class="w-6 cursor-pointer"
        onclick={handleSubmit}
      />
    </p>
  </form>
</dialog>
