<script lang="ts">
  type EntryLike = {
    name: string;
    icon?: string;
    href?: string;
    content?: Array<EntryLike>;
  };

  interface Props {
    entry: EntryLike;
    isActive: boolean;
    href?: boolean;
  }

  let { entry, isActive, href = false }: Props = $props();

  function getIcon(currentEntry: EntryLike) {
    return (
      currentEntry.icon ||
      (currentEntry.href && " ") ||
      (currentEntry.content && " ") ||
      " "
    );
  }
</script>

<li
  class={"px-2 leading-snug " +
    (isActive
      ? "bg-black text-white dark:bg-white dark:text-black rounded-lg"
      : "")}
>
  {#if href && entry.href}
    <a class="flex gap-1" href={entry.href}>
      <span class="text-sm mr-0.5">{getIcon(entry)}</span>
      <span class="truncate">{entry.name}</span>
    </a>
  {:else}
    <span class="flex gap-1">
      <span class="text-sm mr-0.5">{getIcon(entry)}</span>
      <span class="truncate">{entry.name}</span>
    </span>
  {/if}
</li>
