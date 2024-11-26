<script lang="ts">
    type Entry = {
        name: string;
        icon?: string;
    };

    const files: Entry[] = [
        //
        { name: "Books", icon: " " },
        { name: "Documents", icon: " " },
        { name: "Downloads", icon: " " },
        { name: "Music", icon: " " },
        { name: "Pictures", icon: " " },
        { name: "Repos", icon: " " },
        { name: "Videos", icon: " " },
    ];
    let activeIndex = 0;
</script>

<div class="w-full">
    <span class="text-grey">陈刑@chenxing.io</span>
    <span>~/{files[activeIndex].name}</span>
</div>
<div class="h-full w-full grid grid-cols-[minmax(140px,max-content)_minmax(140px,max-content)_1fr] border">
    <div class="p-2 lf-pane-left">
        {#each files as { name, icon }, index}
            <ul>
                <li class={"px-2 leading-snug " + (index === activeIndex ? "bg-white text-black" : "")}>
                    <span class="text-sm mr-0.5">{icon || " "}</span>
                    {name}
                </li>
            </ul>
        {/each}
    </div>
    <div class="p-2 border-x"></div>
    <div class="p-2"></div>
</div>
