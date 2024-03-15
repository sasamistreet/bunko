<script lang="ts">
    import { page } from "$app/stores";
    import * as Form from "$lib/components/ui/form";
    import { stepDetailSchema, type StepDetailSchema } from "./schema";
    import{
      type SuperValidated,
      type Infer,
      superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    export let data: SuperValidated<Infer<StepDetailSchema>>;
    const form = superForm(data, {
      validators: zodClient(stepDetailSchema),
    });
    const { form: formData, enhance } = form;
    //export let form: SuperValidated<StepDetailSchema> = $page.data;
    import { onMount, onDestroy, getContext } from 'svelte';

    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Label } from "$lib/components/ui/label";
    import * as Select from "$lib/components/ui/select";
    import { Slider } from "$lib/components/ui/slider";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Switch } from "$lib/components/ui/switch";
    import { toast } from "svelte-sonner";
    import { ChevronRight, ClipboardPaste,Upload, Trash2, MoreVertical, Maximize2, Minimize2, Undo2, Repeat, IterationCw, RefreshCw, RefreshCcw, BadgeCheck} from "lucide-svelte";
	  //import FormButton from "$lib/components/ui/form/form-button.svelte";
    const transitionList = [
      { value: "FORWARD", label: "Forward", icon:"ChevronRight" },
      { value: "EXPAND", label: "Expand", icon:"Maximize2"},
      { value: "SHRINK", label: "Shrink", icon:"Minimize2" },
      { value: "REPEAT", label: "Repeat", icon:"IterationCw" },
      { value: "TURN", label: "Turn", icon:"Repeat"},
      { value: "ROTATE", label: "Rotate", icon:"RefreshCw" },
      { value: "COMPLETED", label: "Completed", icon:"BadgeCheck" }
    ];

    let work = 1
    let step = 1
    let stepData = {};
    let value = 1;
    
    $: selectedTransitionValue = selectedTransition.value
    /*$: selected = transitionList.find((t) => t.value === selectedValue);*/
    let selectedTransition = transitionList[0]

    let scale = 100;
    let scaleArray = [scale]
    let angle = 0;
    let angleArray = [angle]

    let svgContent = 'Ctrl+Vで貼り付け';

    function handlePaste(event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('Text');

        if (pastedData.startsWith('<svg')) {
        svgContent = pastedData;
        }
    }

    /*onMount(async() => {
        if ( step > 0 ){
            form = await fetch(`/api/steps?work=${work}&step=${step}`).then( res => res.json() );
        } else {
            //ダミー
            form = await fetch(`/api/steps?work=1&step=1`).then( res => res.json() );
        }
	});*/

</script>
<div class="p-4 bg-white shadow">
    <div class="flex justify-between">
      <h2 class="font-bold">1</h2>
      <Button variant="ghost" size="icon"><MoreVertical size={16}/></Button>
    </div>
    <form method="POST" use:enhance>
      <Form.Field {form} name="id">
        <Form.Control let:attrs>
          <Input id="id" type="hidden" value={$formData.id}/>
      </Form.Control>
      </Form.Field>
      <Tabs.Root value="diagram" class="w-full">
        <Tabs.List class="grid w-full grid-cols-3">
          <Tabs.Trigger value="diagram">Diagram</Tabs.Trigger>
          <Tabs.Trigger value="photo">Photo</Tabs.Trigger>
          <Tabs.Trigger value="video">Video</Tabs.Trigger>
        </Tabs.List>
      
        <Tabs.Content value="diagram">
          <div class="flex gap-4 mb-4">
            <div>
              <div class="flex justify-between">
                  <div>
                      <Button variant="ghost" size="icon">
                          <ClipboardPaste size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                          <Upload size={16}/>
                      </Button>
                  </div>
                  <div>
                      <Button variant="ghost" size="icon" class="">
                          <Trash2 size={16}/>
                      </Button>
                  </div>
              </div>
            <ContextMenu.Root>
              <ContextMenu.Trigger
                class="flex h-[480px] w-[480px] items-center justify-center rounded-md border border-dashed text-sm"
              >
                Click to Paste
              </ContextMenu.Trigger>
              <ContextMenu.Content class="w-64">
                <ContextMenu.Item inset>
                  Paste
                  <ContextMenu.Shortcut>⌘V</ContextMenu.Shortcut>
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
            </div>
            <div class="grow">
              <h4>Default Viewport</h4>
              <div class="mb-4">
                <Form.Field {form} name="angle">
                    <Form.Label>Rotation</Form.Label>
                    <Form.Control id="angle">
                    <Slider bind:value={angleArray} max={180} min={-180} step={1} />
                    <Input  type="number" bind:value={angleArray[0]} class="my-2 p-1 h-8 w-12 inline text-right"/> °
                    </Form.Control>
                </Form.Field>
              </div>
              <div class="mb-4">
                <Form.Field {form} name="scale">
                    <Form.Label>Scale</Form.Label>
                    <Form.Control id="scale">
                      <Slider bind:value={scaleArray} max={500} min={10} step={1}/>
                      <Input type="number" bind:value={scaleArray[0]} class="my-2 p-1 h-8 w-24 inline text-right"/> %
                    </Form.Control>

                </Form.Field>
              </div>
              <Label>Position</Label>
              <div class="">
                <Label for="x">X:</Label>
                <Input id="x" class="my-2 p-1 h-8 w-24 inline mr-4"/>
                <Label for="y">Y:</Label>
                <Input id="y" class="my-2 p-1 h-8 w-24 inline"/>
              </div>
              <Label>Transition</Label>
              <div class="flex items-center">
                <div class="flex items-center justify-center bg-muted w-24 h-24 mr-2">{selectedTransitionValue}</div>
                <Form.Field {form} name="transition" let:setValue>
                  <Form.Control let:attrs>
                    <Select.Root selected={selectedTransition}  items={transitionList}>
                      <Select.Trigger  {...attrs} placeholder="select transition" class="w-48">
                        <Select.Value placeholder="Select transition" />
                      </Select.Trigger>
                        <Select.Content>
                          {#each transitionList as transition}
                            <Select.Item value={transition.value}>{transition.label}</Select.Item>
                          {/each}
                        </Select.Content>
                        <select bind:value={selectedTransitionValue} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          {#each transitionList as transition}
                              <option value={transition.value}>{transition.label}</option>
                          {/each}
                        </select>
                    </Select.Root>
                    <input hidden bind:value={$formData.transition} name={attrs.value} />
                </Form.Control>
                </Form.Field>
              </div>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="photo">
          <div class="flex gap-4 mb-4">
          <Switch />
            <div>
              <div>
                <Button variant="ghost">
                  <Upload size={16}/>
                </Button>
                <Button variant="ghost">
                  <Trash2 size={16}/>
                </Button>
              </div>
              <div class="flex h-[480px] w-[480px] items-center justify-center rounded-md border border-dashed text-sm">
                Upload Photo
              </div>
            </div>
            <div class="grow">
              
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="video">

        </Tabs.Content>
      </Tabs.Root>
      <div class="mb-4">
        <Form.Field {form} name="caption">
            <Form.Label for="caption">Caption</Form.Label>
            <Textarea id="caption" name="caption" value={$formData.caption} />
        </Form.Field>
      </div>
      <Form.Button class="mt-8" on:click={() => toast("Saved!")}>Submit</Form.Button>
    </form>
  </div>