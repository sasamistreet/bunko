<script lang="ts">
  import { Button } from "$lib/components/ui/button"
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
        <div class="flex justify-between border-b py-4 text-sm"><dt class="text-zinc-400">Subtotal</dt><dd class="awa awe axv">￥1,000</dd></div>
        <div class="flex justify-between border-b py-4 text-sm"><dt class="text-zinc-400">Tax</dt><dd class="">￥10</dd></div>
      </dl>
      <div class="flex justify-between py-4 text-lg"><dt class="">Total</dt><dd class="">￥1,010</dd></div> 
      <Button class="w-full">Order</Button>
    </div>
  </div>
</div>