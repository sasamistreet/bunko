<script>
    import * as Accordion from "$lib/components/ui/accordion";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";

</script>
<Accordion.Root multiple>
    <Accordion.Item value="difficulty">
      <Accordion.Trigger>Difficulty</Accordion.Trigger>
      <Accordion.Content>
        <div>
            <Checkbox id="easy" />
            <Label for="easy">Easy</Label>
        </div>
        <div>
            <Checkbox id="intermediate" />
            <Label for="intermediate">Intermediate</Label>
        </div>
        <div>
            <Checkbox id="difficult" />
            <Label for="difficult">Difficult</Label>
        </div>
        <div>
            <Checkbox id="complex" />
            <Label for="complex">Super complex</Label>
        </div>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="PaperSheets">
        <Accordion.Trigger>Paper Sheets</Accordion.Trigger>
        <Accordion.Content>
            <div class="">
                <Checkbox id="one" />
                <Label for="one">One</Label>
            </div>
            <div>
                <Checkbox id="multiple" />
                <Label for="multiple">Multiple Sheet</Label>
            </div>
            <div>
                <Checkbox id="Moduler" />
                <Label for="moduler">Moduler</Label>
            </div>
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="PaperType">
        <Accordion.Trigger>Paper Type</Accordion.Trigger>
        <Accordion.Content>
            <div class="">
                <Checkbox id="square" />
                <Label for="square">Square</Label>
            </div>
            <div>
                <Checkbox id="rectangle" />
                <Label for="rectangle">Rectangle</Label>
            </div>
            <div>
                <Checkbox id="other" />
                <Label for="other">Other</Label>
            </div>
        </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Tools">
        <Accordion.Trigger>Tools</Accordion.Trigger>
        <Accordion.Content>
            <div class="">
                <Checkbox id="scissors" />
                <Label for="scissors">scissors</Label>
            </div>
            <div>
                <Checkbox id="cutter" />
                <Label for="cutter">cutter</Label>
            </div>
            <div>
                <Checkbox id="glue" />
                <Label for="glue">glue</Label>
            </div>
        </Accordion.Content>

    </Accordion.Item>
  </Accordion.Root>