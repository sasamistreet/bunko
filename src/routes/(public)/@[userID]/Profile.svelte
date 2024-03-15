<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
	import * as Card from "$lib/components/ui/card";
</script>

<Card.Root class="">
    <Card.Header>
        <Avatar.Root class="h-12 w-12 mx-auto">
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
      <Card.Title class="text-center">user</Card.Title>
      <Card.Description class="text-center">@1111</Card.Description>
      <Card.Description>Deploy your new project in one-click.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
          </div>
          <div class="flex flex-col space-y-1.5">
          </div>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">

    </Card.Footer>
  </Card.Root>