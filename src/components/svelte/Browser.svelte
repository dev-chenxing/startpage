<script lang="ts">
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
  let activeRoot = $derived(files[activeIndexes[0]]);
  let activeChildren = $derived(activeRoot?.content ?? []);
  let activeChild = $derived(getEntryAt(1, activeIndexes[1]));
  let focusedEntry = $derived(
    getEntryAt(activeColumn, activeIndexes[activeColumn]),
  );
  let submitEntry = $derived(activeChild ?? activeRoot);

  let isCtrlDown = $state(false);

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

<div class="w-full">
  <span class="text-black/70 dark:text-white/70">{prompt}</span>
  <span class="text-cyan-700 dark:text-cyan-300/90">
    ~/{activeRoot?.name}
  </span>
</div>
<div
  class="h-full w-full grid grid-cols-[minmax(140px,max-content)_minmax(140px,max-content)_1fr] border"
>
  <div class="p-2 lf-pane-left">
    <ul>
      {#each files as entry, index}
        <BrowserItem {entry} isActive={index === activeIndexes[0]} href />
      {/each}
    </ul>
  </div>
  <div class="p-2 border-x">
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
  <div class="p-2">
    <ul>
      {@render entryDetails(activeChild)}
    </ul>
  </div>
</div>
<dialog
  bind:this={dialog}
  class="fixed inset-0 m-auto border border-black/70 bg-white text-black backdrop:bg-black/5 dark:border-white/70 dark:bg-black dark:text-white dark:backdrop:bg-black/60"
  onclick={onDialogClick}
>
  <form class="py-1 px-2" action="javascript:void(0);" autocomplete="off">
    <p>
      <label for="input"> {submitEntry?.name}</label>
      <input id="input" class="ml-1 w-96" bind:value={query} />
      <input
        type="submit"
        value="󰘌"
        class="w-6 cursor-pointer"
        onclick={handleSubmit}
      />
    </p>
  </form>
</dialog>
