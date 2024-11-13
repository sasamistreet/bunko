<script lang="ts">
	//import { onDestroy, setContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { ChevronLeft, ChevronRight, Columns2,Columns3, Fullscreen, Minimize,Maximize2,Minimize2,CircleDashed } from 'lucide-svelte'
	import Step, { expand } from './Step.svelte';
	//import { current } from './steps.svelte'
	import { page } from '$app/stores';
	
    let current = $state(3);
    let steps = $derived([current-2, current-1, current, current+1, current+2])
	const work = $page.params.id

    type Props = {
        total: number;
    };
    const  { total }:Props = $props();

	let hoverstep = $state(1);
	let left = $state(0);
	let display = $state("none");
	

	function forward(){
		if (current < total){
			current++;
		}
	}
	function back(){
		if (current > 1){
			current--;
		}
	}

	function showHoverStep(e: MouseEvent) {
		left = e.clientX - 12;
		display = "block";
		hoverstep = Math.ceil((e.offsetX / (e.target as HTMLInputElement).clientWidth) * parseInt((e.target as HTMLInputElement).getAttribute('max')!, 10));
	}
	function hideHoverStep(){
		display = "none";
	}

	//let instance:any = $state()
	function expandChild(){
		expand();
	}

	
	
</script>
<svelte:window/>
<div class="viewer">
	<ul class="step-list">
		{#each steps as step, i (step)}
		<li id="{step.toString()}" class="step" class:current="{current == step}" animate:flip="{{ duration: 200, easing: quintOut }}" >
			    <Step step={step} total={total} current={current} />
		</li>
		{/each}
	</ul>
	<div class="overlayTools ml-48">
		<button onclick={expandChild}><Maximize2 strokeWidth={1} /></button>
		<button><Minimize2 strokeWidth={1} /></button>
		<button><CircleDashed strokeWidth={1} /></button>
	</div>
	<button onclick={back} class="viewer-nav viewer-nav-back"><ChevronLeft /></button>
	<button onclick={forward} class="viewer-nav viewer-nav-forward"><ChevronRight /></button>
</div>

<div class="viewer-toolbar">
    <div class="toolbar-item w-1/4">
        <button onclick={back} ><Columns2 strokeWidth={1}/></button>
    </div>
    <div class="toolbar-stepper w-1/2">
        <div>
            <span class="uk-text-left" data-uk-icon="thumbnails"></span>
        </div>
		<div class="toolbar-tooltip" style="left: {left}px; display: {display};" >{hoverstep}</div>
        <input class="steps-slider w-full my-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" type="range" bind:value={current} onmousemove={showHoverStep} onmouseout={hideHoverStep} onblur={hideHoverStep} min=1 max={total} aria-label="Range">
    </div>
    <div class="toolbar-item w-1/4 text-right">
        <button onclick={back} ><Fullscreen strokeWidth={1}/></button>
    </div>
</div>

<style>
	.viewer{
		position:relative;
		height:100%;
		width:100%;
		padding:0;
		margin:0;
		overflow-x: hidden;
	}
	.viewer-nav{
		opacity:0;
		position:absolute;
		top:0%;
		height:100%;
		width:12.5%;
		vertical-align: middle;
		text-align: center;
		border:none;
		transition: all .2s ease-out;
		background-color: rgba(0,0,0,0.3);
		cursor: pointer;
	}
	.viewer-nav:hover{
		opacity:1;
		transition: all .2s ease-in;
	}
	.viewer-nav-back{
		left:0;
	}
	.viewer-nav-forward{
		right:0;
	}

	.step-list{
		list-style: none;
		width:150%;
		padding:0;
		margin:0;
		margin-left:-25%;
		min-height:480px;
		display:flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position:relative;
		justify-content: center;
		
	}

	.step{
		display:flex;
		width:25%;

		align-items: center;
		justify-content: center;
		position:relative;
		background:#fafafa;
		height:480px;
		overflow: hidden;
		padding:0;
		margin:0;
		transition:all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.current{
		/*min-width:480px;*/
		width: 50%;
		background:#ffffff;
		transition:all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
	}
	
	.viewer-toolbar{

		color:#ddd;
		display:flex;
		width:100%;
        align-items: center;
		justify-content: center;
		position:relative;
		margin-top:auto;
	}

    .toolbar-stepper{
        min-width:480px;
        display:flex;
		flex-basis:480px;
		flex-grow:1;
    }

	.toolbar-tooltip{
		position:absolute;
		bottom:34px;
		background:rgba(0,0,0,0.5);
		color:#FFF;
		width:2rem;
		text-align:center;
		padding:2px 0px;
		border-radius: 2px;
	}
	.viewer-toolbar button{
		padding:0;
		margin:0;
		background:transparent;
		border:none;
		color:#fff;
		cursor: pointer;
	}
</style>