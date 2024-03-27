<script>
    import * as Avatar from "$lib/components/ui/avatar";
    import { Button } from "$lib/components/ui/button";
    import { setMode, resetMode } from "mode-watcher";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    
    import { Toggle } from "$lib/components/ui/toggle"
    import {
        Bell,
      CreditCard,
      Languages,
      LogOut,
      Settings,
      ShoppingBag,
      Sun,
      User,
    } from "lucide-svelte";
</script>
<DropdownMenu.Root>
    <Button variant="ghost" size="icon">
      <Bell strokeWidth={1}/>
    </Button>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" size="icon">
        <ShoppingBag strokeWidth={1}/>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
      <DropdownMenu.Label>Cart</DropdownMenu.Label>
      <DropdownMenu.Separator />
    </DropdownMenu.Content>
  </DropdownMenu.Root>
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar.Root class="h-8 w-8">
          <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56" align="end">
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <User class="mr-2 h-4 w-4" />
          <span><a href="/account">Profile</a></span>
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CreditCard class="mr-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Settings class="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>
        <span>Works</span>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
          <span>Theme</span>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Languages class="mr-2 h-4 w-4" />
            <span>Languages</span>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>
              <span>日本語</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span>English</span>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Sun class="mr-2 h-4 w-4" />
            <span>Theme</span>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item on:click={() => setMode("light")}>Light</DropdownMenu.Item>
            <DropdownMenu.Item on:click={() => setMode("dark")}>Dark</DropdownMenu.Item>
            <DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Group>
      
      <DropdownMenu.Separator />
      <DropdownMenu.Item>
        <LogOut class="mr-2 h-4 w-4" />
        <span><a href="/logout">Log out</a></span>
        <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>