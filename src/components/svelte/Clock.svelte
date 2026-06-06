<script lang="ts">
    import { onMount } from "svelte";

    let time = $state(new Date());

    const formatter = new Intl.DateTimeFormat("zh", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    onMount(() => {
        const intervalId = window.setInterval(() => {
            time = new Date();
        }, 1000);

        return () => window.clearInterval(intervalId);
    });
</script>

<span> {formatter.format(time)}</span>
