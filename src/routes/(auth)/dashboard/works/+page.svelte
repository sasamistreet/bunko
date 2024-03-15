<script>
    import { Badge } from "$lib/components/ui/badge"
    import { Button } from "$lib/components/ui/button"
    import * as Table from "$lib/components/ui/table";
    import { Bookmark, ShoppingCart, ThumbsUp, Plus, Banknote } from "lucide-svelte";
</script>

<div class="">
    <div class="flex justify-between pt-4 pb-8">
      <h1 class="text-2xl font-bold">Works</h1>
      <Button><Plus />Add Work</Button>
    </div>
    <ul>
        <li>
          <a class="block rounded bg-white p-4 mb-4 shadow flex justify-between hover:shadow-md" href="works/1">
            <div>Title</div>
            <div class="flex gap-4 align-middle">
              <div><ThumbsUp size={16} class="inline"/>100%<span class="text-xs">(12)</span></div>
              <div><Banknote size={16} class="inline"/>¥10,000<span class="text-xs">(100)</span></div>
              <div class=""><Bookmark size={16} class="inline"/>300</div>
              <div class="text-xs text-slate-400">Created on 2024.1.1<br>Modified on 2024.1.1</div>
            </div>
          </a>
        </li>
        <li class="rounded bg-white p-4 shadow">
            <div class="text-slate-400"><Badge variant="outline" class="inline mr-2">下書き</Badge>Title</div>
        </li>
    </ul>
</div>