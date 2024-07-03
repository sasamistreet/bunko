<script lang="ts">
  import {page} from "$app/stores";
  import { Button } from "$lib/components/ui/button";

  const subtotal = $page.data.subtotal.toLocaleString();
  const tax = $page.data.tax.toLocaleString();
  const total = $page.data.total.toLocaleString();
</script>
<div class="md:flex grid-cols-2 w-full h-screen">
  <div class="bg-muted flex flex-col w-1/2">
    <div class="grow">
      a
    </div>
  </div>
  <div class="w-1/2 flex justify-center">
    <div class="w-full max-w-md flex flex-col place-content-center">
      <dl class="lk abx">
        <div class="flex justify-between border-b py-4 text-sm"><dt class="text-zinc-400">Subtotal</dt><dd class="awa awe axv">{subtotal}</dd></div>
        <div class="flex justify-between border-b py-4 text-sm"><dt class="text-zinc-400">Tax</dt><dd class="">{tax}</dd></div>
      </dl>
      <div class="flex justify-between py-4 text-lg"><dt class="">Total</dt><dd class="">{total}</dd></div> 
      <Button class="w-full">Order</Button>
    </div>
  </div>
</div>