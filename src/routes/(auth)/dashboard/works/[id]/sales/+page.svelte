<script lang="ts">
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import RangeCalendar from "$lib/components/ui/range-calendar/range-calendar.svelte";
    import { today, getLocalTimeZone } from "@internationalized/date";
    const start = today(getLocalTimeZone());
    const end = start.add({ days: 7 });
    let value = {
        start,
        end
    };
</script>
<Label for="price">Price</Label>
<Input id="price" type="number" class="mb-8"/>
<div class="flex justify-between mb-2">
    <h3>Sale</h3>
    <Switch id="sale" />
    <Label for="sale"></Label>
</div>
<Label for="sale">Rate</Label>
<div class="flex mb-4">
    <Input id="sale" type="number" class="max-w-20"/><span class="text-xl">%</span>
</div>
<Label for="saledate">Date</Label>
<div class="flex">
    <RangeCalendar bind:value class="border rounded-md" id="saledate"/>
</div>