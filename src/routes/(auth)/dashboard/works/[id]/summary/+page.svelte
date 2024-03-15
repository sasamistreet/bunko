<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Tabs from "$lib/components/ui/tabs";
</script>

<div class="container">
    <h1>Title</h1>
    <ul class="tabmenu pt-4 grid grid-cols-3 text-center">
        <li><a href="./">Edit</a></li>
        <li class="current">Summary</li>
        <li><a  href="./settings">Settings(Drafted)</a></li>
    </ul>
    <div class="grid grid-cols-3 gap-4 mb-8">
        <Card.Root>
          <Card.Content class="p-2 text-center">
            <p class="text-sm ">Total</p>
            <p class="text-2xl font-bold">¥1,000</p>
            <p class="text-sm">Earned Revenue</p>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Content class="p-2 text-center">
            <p class="text-sm ">Total</p>
            <p class="text-2xl font-bold">14</p>
            <p class="text-sm ">Licences Sold</p>
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
    <div class="flex">
        <div class="w-2/3">
            <Tabs.Root value="comments" class="w-[400px]">
                <Tabs.List>
                <Tabs.Trigger value="comments">Comments</Tabs.Trigger>
                <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
                <Tabs.Trigger value="Photos">Photos</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="comments">
                Make changes to your account here.
                </Tabs.Content>
                <Tabs.Content value="reviews">Change your password here.</Tabs.Content>
            </Tabs.Root>
        </div>
        <div class="w-1/3">
            <Card.Root>
                <Card.Content class="p-4">
                    <h3>Achievements</h3>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
      
</div>