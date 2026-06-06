<script lang="ts">
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
    let shortcuts = $derived.by(() => {
        const shortcuts: Record<string, Array<number>> = {};
        files.forEach((file, index) => {
            const shortcut = (file.shortcut ?? file.name[0]).toLowerCase();
            if (!shortcuts[shortcut]) shortcuts[shortcut] = [];
            shortcuts[shortcut].push(index);
        });
        return shortcuts;
    });

    let activeIndexes: Array<number> = $state([0, -1, -1]);
    let activeColumn = $state(0);
    let isCtrlDown = $state(false);

    function openLink(href: string | undefined) {
        if (isCtrlDown) window.open(href, "_blank");
        else window.open(href, "_self");
    }

    function onkeydown(e: KeyboardEvent) {
        if (e.ctrlKey) isCtrlDown = true;

        if (document.activeElement?.tagName == "INPUT") return;

        let activeIndexL = activeIndexes[0];
        let activeFileL = files[activeIndexL];
        if (e.key == "ArrowDown") {
            if (activeIndexes[1] != -1) {
                activeIndexes[1] = mod(activeIndexes[1] + 1, activeFileL.content?.length ?? 0);
            } else activeIndexes[0] = mod(activeIndexL + 1, files.length);
        } else if (e.key == "ArrowUp") {
            if (activeIndexes[1] != -1) {
                activeIndexes[1] = mod(activeIndexes[1] - 1, activeFileL.content?.length ?? 0);
            } else activeIndexes[0] = mod(activeIndexL - 1, files.length);
        } else if (e.key == "ArrowRight") {
            let activeFile: Entry;
            if (activeColumn == 0) activeFile = files[activeIndexes[0]];
            else if (activeColumn == 1) {
                let content = files[activeIndexes[0]].content ?? [];
                activeFile = content[activeIndexes[1]];
            } else if (activeColumn == 2) {
                let content = files[activeIndexes[0]].content ?? [];
                content = content[activeIndexes[1]].content ?? [];
                activeFile = content[activeIndexes[2]];
            } else {
                activeFile = { name: "error" };
            }
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
        let activeFile: Entry;
        if (activeIndexes[1] != -1) {
            let content = files[activeIndexes[0]].content ?? [];
            activeFile = content[activeIndexes[1]];
        } else activeFile = files[activeIndexes[0]];
        openLink(`${activeFile.search}${encodeURIComponent(query)}`);
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

<svelte:window
    {onkeydown}
    {onkeyup}
/>

<div class="w-full">
    <span class="text-black/70 dark:text-white/70">{prompt}</span>
    <span>~/{files[activeIndexes[0]].name}</span>
</div>
<div class="h-full w-full grid grid-cols-[minmax(140px,max-content)_minmax(140px,max-content)_1fr] border">
    <div class="p-2 lf-pane-left">
        <ul>
            {#each files as { name, icon, href, content }, index}
                <li class={"px-2 leading-snug " + (index === activeIndexes[0] ? "bg-black text-white dark:bg-white dark:text-black" : "")}>
                    {#if href}
                        <a {href}
                            ><span class="text-sm mr-0.5">{icon || (href && " ") || (content && " ") || " "}</span>
                            {name}</a
                        >
                    {:else}
                        <span class="text-sm mr-0.5">{icon || (href && " ") || (content && " ") || " "}</span>
                        {name}
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    <div class="p-2 border-x">
        <ul>
            {#if files[activeIndexes[0]].content?.length == 0}
                <li class={"px-2 leading-snug text-red-700 dark:text-red-400"}>EMPTY</li>
            {:else if files[activeIndexes[0]].content?.length}
                {#each files[activeIndexes[0]].content ?? [] as { name, icon, href, content }, index}
                    <li class={"px-2 leading-snug " + (index === activeIndexes[1] ? "bg-black text-white dark:bg-white dark:text-black" : "")}>
                        <span class="text-sm mr-0.5">{icon || (href && " ") || (content && " ") || " "}</span>
                        {name}
                    </li>
                {/each}
            {:else if files[activeIndexes[0]].description}
                <li class={"px-2 leading-snug"}>
                    {files[activeIndexes[0]].description}
                </li>
            {:else if files[activeIndexes[0]].href}
                <li class={"px-2 leading-snug"}>
                    Press 󰜵 key to follow link <a
                        class="underline"
                        href={files[activeIndexes[0]].href}>{files[activeIndexes[0]].href}</a
                    >
                </li>
            {/if}
        </ul>
    </div>
    <div class="p-2">
        <ul>
            {#if activeIndexes[1] != -1}
                {#if files[activeIndexes[0]].content?.[activeIndexes[1]]?.href}
                    <li class={"px-2 leading-snug"}>
                        Press 󰜵 key to follow link <a
                            class="underline"
                            href={files[activeIndexes[0]].content?.[activeIndexes[1]]?.href}>{files[activeIndexes[0]].content?.[activeIndexes[1]]?.href}</a
                        >
                    </li>
                {:else if files[activeIndexes[0]].content?.[activeIndexes[1]]?.description}
                    <li class={"px-2 leading-snug"}>
                        {files[activeIndexes[0]].content?.[activeIndexes[1]]?.description}
                    </li>
                {/if}
            {/if}
        </ul>
    </div>
</div>
<dialog
    bind:this={dialog}
    class="fixed inset-0 m-auto border border-black/70 bg-white text-black backdrop:bg-black/5 dark:border-white/70 dark:bg-black dark:text-white dark:backdrop:bg-black/60"
    onclick={onDialogClick}
>
    <form
        class="py-1 px-2"
        action="javascript:void(0);"
        autocomplete="off"
    >
        <p>
            <label for="input"> {files[activeIndexes[0]].name}</label>
            <input
                id="input"
                class="ml-1 w-96"
                bind:value={query}
            />
            <input
                type="submit"
                value="󰘌"
                class="w-6 cursor-pointer"
                onclick={handleSubmit}
            />
        </p>
    </form>
</dialog>
