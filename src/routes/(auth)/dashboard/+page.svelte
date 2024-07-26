<script lang="ts">
    import {Badge} from "$lib/components/ui/badge"
    import * as Table from "$lib/components/ui/table";
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import AspectRatio from "$lib/components/ui/aspect-ratio/aspect-ratio.svelte";
    import { Check } from "lucide-svelte";

    const periods = [
      { value: "Daily", label: "Daily" },
      { value: "Weekly", label: "Weekly" },
      { value: "Monthly", label: "Monthly" },
    ];
</script>
<div class="container">
    <div class="my-4 flex justify-between">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <Select.Root portal={null}>
        <Select.Trigger class="w-[180px]">
          <Select.Value placeholder="Period" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each periods as period}
              <Select.Item value={period.value} label={period.label}>
                {period.label}
              </Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
        <Select.Input name="favoriteFruit" />
      </Select.Root>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <Card.Root>
        <Card.Content class="p-2 text-center">
          <p class="text-2xl font-bold">¥1,000</p>
          <p class="text-sm">Earned Revenue</p>
        </Card.Content>
      </Card.Root>
      <Card.Root>
        <Card.Content class="p-2 text-center">
          <p class="text-2xl font-bold">14</p>
          <p class="text-sm ">Works Sold</p>
        </Card.Content>
      </Card.Root>
      <Card.Root>
        <Card.Content class="p-4">
          <p>4 Wishlist (60% Positive)</p>
          <p>1 Comments</p>
          <p>2 Reviews Posted</p>
          <p>1 Gallery Post</p>
          <p>5 Achieved</p>
          <p class="text-right">All Nortifications</p>
        </Card.Content>
      </Card.Root>
    </div>
    <div>
      <h2 class="mt-8 mb-4 text-xl font-bold">Works</h2>
      <div class="grid grid-cols-6">
        <a href="./dashboard/works/1"><AspectRatio ratio={1 / 1} class="bg-white shadow" /></a>
      </div>
      <div class="text-right"><a href="./dashboard/works">All Works</a></div>
    </div>
    <div>
      <h2 class="mt-8 text-xl font-bold">Payments</h2>
      <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Status</Table.Head>
              <Table.Head>Title</Table.Head>
              <Table.Head>Payment</Table.Head>
              <Table.Head>User</Table.Head>
              <Table.Head class="text-right">Date</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell class="font-medium"><span class="text-teal-400"><Check size={16} class="inline"/> Paid</span></Table.Cell>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell>$250.00</Table.Cell>
              <Table.Cell>user</Table.Cell>
              <Table.Cell class="text-right">2024.1.1</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
    </div>
</div>