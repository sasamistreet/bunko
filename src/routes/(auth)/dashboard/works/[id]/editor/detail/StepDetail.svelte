<script lang="ts">
    //import { page } from "$app/stores";
    import * as Form from "$lib/components/ui/form";
    import { stepDetailSchema, type StepDetailSchema } from "./schema";
    import{ type SuperValidated, type Infer, superForm, } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    export let data: SuperValidated<Infer<StepDetailSchema>>;
    const form = superForm(data, {
      resetForm: false,
      validators: zodClient(stepDetailSchema),
      onUpdated({ form }) {
        if (form.message) {
          toast.success("保存されました", {
            description: form.message.text,
            action: {
              label: "Undo",
              onClick: () => console.info("OK")
            }
          });
        }
      }
    });
    const { form: formData, enhance } = form;

    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Label } from "$lib/components/ui/label";
    import { Slider } from "$lib/components/ui/slider";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Switch } from "$lib/components/ui/switch";
    import { toast } from "svelte-sonner";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { type ComponentType } from 'svelte';
    import type { Icon } from "lucide-svelte";
    import { ChevronRight, ClipboardPaste,Upload, Trash2, MoreVertical, Maximize2, Minimize2, Undo2, Repeat, RefreshCw, BadgeCheck, IterationCcw, IterationCw} from "lucide-svelte";
    type transitionType = Array<{value:string, label:string, icon: ComponentType<Icon>}>;
    const transitions:transitionType = [
      { value: "FORWARD", label: "Forward", icon:ChevronRight },
      { value: "ENLARGE", label: "Enlarge", icon:Maximize2},
      { value: "SHRINK", label: "Shrink", icon:Minimize2 },
      { value: "REPEAT", label: "Repeat", icon:IterationCw},
      { value: "TURN", label: "Turn", icon:Repeat},
      { value: "ROTATE", label: "Rotate", icon:RefreshCw },
      { value: "COMPLETED", label: "Completed", icon:BadgeCheck }
    ];

    let scale = 100;
    let scaleArray = [scale]

    $formData.svgContent = 'Ctrl+Vで貼り付け';

    function handlePaste(event:ClipboardEvent) {
        const clipboardData = event.clipboardData;
        let pastedData:string | undefined
        if (clipboardData){
          pastedData = clipboardData.getData('Text');
          if (pastedData.startsWith('<svg') || pastedData.startsWith('<?xml')) {
            $formData.svgContent = resetScale(pastedData);
            //$formData.svgContent = resetScale(pastedData)
          } else {
            $formData.svgContent = "Paste SVG!"
          }
        } else {
          $formData.svgContent = "No Data"
        }
    }

    function resetScale(svgText:string){
      const domParser = new DOMParser();
      const parsedSVGDoc:XMLDocument = domParser.parseFromString(svgText, 'image/svg+xml');
      //const parsedSVG = parsedSVGDoc.childNodes[0];
      const svgElement = parsedSVGDoc.getElementsByTagName("svg");
      const element = svgElement[0];
      if (parsedSVGDoc !== null) {
        //element.setAttribute("width", "500");
        //const width = element.getAttribute("width")
        //const height = element.getAttribute("height")
        //element.removeAttribute("height");
        //element.setAttribute("viewBox", "0 0 "+width+" "+height)
      }
      
      const newSVG = new XMLSerializer().serializeToString(parsedSVGDoc);
      //return parsedSVG as string;
      return newSVG
    }

    function deleteSVG(){
      $formData.svgContent = 'Ctrl+Vで貼り付け';
      moving = false;
    }

    let left = 0;
    let top = 0
    let moving = false;
    function onMouseDown() {
          moving = true;
          console.log(moving);
    }

    function onMouseMove(e:MouseEvent) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }
      
    function onMouseUp() {
          moving = false;
          console.log(moving);
    }
</script>
<svelte:window on:mousemove={onMouseMove}  on:mouseup={onMouseUp}/>
<div class="p-4 bg-white shadow">
    <div class="flex justify-between">
      <h2 class="font-bold">1</h2>
      <Button variant="ghost" size="icon"><MoreVertical size={16}/></Button>
    </div>
    <form method="POST" use:enhance>
      <Form.Field {form} name="id">
        <Form.Control let:attrs>
          <Input {...attrs} type="hidden" bind:value={$formData.id}/>
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
                      <Button variant="ghost" size="icon" >
                          <Upload size={16}/>
                      </Button>
                  </div>
                  <div>
                      <Button variant="ghost" size="icon" class="" on:click={deleteSVG}>
                          <Trash2 size={16}/>
                      </Button>
                  </div>
              </div>
              
              <div on:paste={handlePaste}>
              <ContextMenu.Root>
                <ContextMenu.Trigger class="relative h-[480px] w-[480px] rounded-md border border-dashed text-sm overflow-hidden">
                  <div class="cursor-move flex absolute min-h-[480px] min-w-[480px]"  role="presentation" style:left={left}px style:top={top}px on:mousedown={onMouseDown}>
                  {@html $formData.svgContent}
                  </div>
                </ContextMenu.Trigger>
                <ContextMenu.Content class="w-64">
                  <ContextMenu.Item inset>
                    Paste
                    <ContextMenu.Shortcut>⌘V</ContextMenu.Shortcut>
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
              <Form.Field {form} name="svgContent">
              <Form.Control let:attrs>
                <Input {...attrs} type="hidden" bind:value={$formData.svgContent}/>
              </Form.Control>
              </Form.Field>
              
            </div>
            </div>
            <div class="grow">
              <h4>Default Viewport</h4>
              <div class="mb-4">
                <Form.Field {form} name="scale">
                  <Form.Control id="scale">
                    <Form.Label>Scale</Form.Label>
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
          <Form.Control let:attrs>
            <Form.Label for="caption">Caption</Form.Label>
            <Textarea {...attrs} bind:value={$formData.caption}/>
          </Form.Control>
        </Form.Field>
      </div>
      <Form.Fieldset {form} name="transition" class="mb-4">
        <Form.Legend>Transition</Form.Legend>
        <Form.Description>Select transition to next step.</Form.Description>
        <Form.FieldErrors />
        
        <RadioGroup.Root class="grid grid-cols-6 justify-content-center gap-8 pt-2" orientation="horizontal" bind:value={$formData.transition}>
          {#each transitions as transition}
          <Form.Control let:attrs>
            <Label class="[&:has([data-state=checked])>div]:border-primary">
              <RadioGroup.Item {...attrs} value="{transition.value}" class="sr-only" />
              <div class="flex items-center justify-center rounded-full p-1 border-2 border-muted hover:bg-accent">
                <svelte:component this={transition.icon} />
              </div>
              <span class="block w-full p-2 text-center font-normal">{transition.label}</span>
            </Label>
          </Form.Control>
          {/each}
          <RadioGroup.Input name="transition" />
        </RadioGroup.Root>
      </Form.Fieldset>
      <Form.Button class="mt-8">Submit</Form.Button>
    </form>
  </div>
  <style>
  </style>